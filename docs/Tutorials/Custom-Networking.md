## Tutorial: Custom Network Integration

Dissonance is built to be completely decoupled from the underlying networking system, this allows Dissonance to run on top of various different Unity networking assets (e.g. UNet, Forge, Photon etc) just by swapping which Dissonance network component is used. If you wish to use a publicly available networking system which Dissonance does not yet have an integration for [raise an issue](https://github.com/Placeholder-Software/Dissonance) and see if we'll build the integration into Dissonance. However if you're writing a custom network system and want to use Dissonance you'll have to write your own integration.

### ICommsNetwork

Fundamentally writing a new network integration requires that you implement the `Dissonance.Networking.ICommsNetwork` interface. This interface should be implemented on a MonoBehaviour and then an instance of that behaviour should be attached to the same game object as your `DissonanceComms` behaviour. Dissonance will automatically find the behaviour and use it as needed.

When you are implementing this interface you will have to encode and decode packets containing the necessary data (which may be in format you wish to design). If you want to use the same format as other Dissonance implementations the format is documented [here](/Reference/Networking/Packet-Format). There are helper structs for reading and writing network packets in the default format avilable: `Dissonance.Networking.PacketWriter` and `Dissonance.Networking.PacketReader`.

The `ICommsNetwork` interface is as minimal as possible so you should be able to fit it over any networking system with almost any number of players.

### BaseCommsNetwork

Most custom networks will not need to implement `ICommsNetwork`, Dissonance includes a set of base classes which implement most of the networking logic for you. These classes assume a session with a host which everyone can communicate with (and optionally support direct p2p communication).

All of the built in network integrations are built on top of these `BaseCommsNetwork` classes. To using these for your custom network you should create a new class e.g. `MyCustomCommsNetwork` which inherits the `BaseCommsNetwork` class. This requires five generic parameters:

    BaseCommsNetwork<TServer, TClient, TPeer, TClientParam, TServerParam>
    
`TServer` is the class which represents server side logic. You should create a new class e.g. `MyCustomServer` and inherit `BaseServer` (base server requires the same generic parameters as the BaseCommsNetwork).

`TClient` is the class which represents client side logic. You should create a new class e.g. `MyCustomClient` and inherit `BaseClient` (base client requires the same generic parameters as the BaseCommsNetwork).

`TPeer` is a type of your choice which you will use to represent a connection to another player. Dissonance will use this when it wants to tell you to send a packet to a player, so you should look at your network system and use whatever type it uses to represent a destination when sending a packet. This type must be a struct, if your network uses a class this isn't a problem - just write a very minimal "wrapper" struct which contains your object.

`TClientParam` is the data which will be passed to the network system when joining. For example you may want to pass an IP address and port to the client. If you don't want to pass any data use the `Unit` type.

`TServerParam` is the data which will be passed to the network system when hosting. For example you may want to pass a port to host on. If you don't want to pass any data use the `Unit` type.

Once you have created all these classes you will have compile errors complaining about "abstract member [...] not implemented". Fix these starting with `MyCustomCommsNetwork`:

`CreateServer` simply requires that you create an instance of your server class. `CreateClient` simply requires that you create an instance of your client class (which you pass in as `TServer` above). Finally you need to write an update method which checks the network state and initializes things when ready.

Here are some example code snippets from the HLAPI integration:

```
public class HlapiCommsNetwork
  : BaseCommsNetwork<
      HlapiServer,      // A class which implements BaseServer
      HlapiClient,      // A class which implements BaseClient
      HlapiConn,        // A struct which contains a HLAPI NetworkConnection
      Unit,             // Nothing
      Unit              // Nothing
  >
```

```
protected override HlapiServer CreateServer(Unit details)   // We specified `Unit` above, so we get given a `Unit`
{
    // Simply create an instance of the class
    return new HlapiServer(this);
}

protected override HlapiClient CreateClient(Unit details)   // We specified `Unit` above, so we get given a `Unit`
{
    // Simply create an instance of the class
    return new HlapiClient(this);
}
```

The `Update` method should tell the comms system how to behave - most implementations will want a method very similar to this one, the details will simply depend upon how your network asset exposes details about servers and clients. In this example you can see that we check what mode the HLAPI is in, then check what mode Dissonance is in and, if they're different, tell Dissonance to switch modes.

```
protected override void Update()
{
    // Check is Dissonance is ready
    if (IsInitialized)
    {
        // Check if the HLAPI is ready
        var networkActive = NetworkManager.singleton.isNetworkActive && (NetworkServer.active || NetworkClient.active);
        if (networkActive)
        {
            // Check what mode the HLAPI is in (is if it a server, is it a client?)
            var server = NetworkServer.active;
            var client = NetworkClient.active;

            // Check what mode Dissonance is in, if they're different then call the correct method
            if (Mode.IsServerEnabled() != server || Mode.IsClientEnabled() != client)
            {
                // HLAPI is server and client, so run as a non dedicated host (passing in the correct parameters, in this case nothing)
                if (server && client)
                    RunAsHost(Unit.None, Unit.None);
                    
                // HLAPI is just a server, so run as a dedicated host
                else if (server)
                    RunAsDedicatedServer(Unit.None);
                    
                // HLAPI is just a client, so run as a client
                else if (client)
                    RunAsClient(Unit.None);
            }
        }
        else if (Mode != NetworkMode.None)
        {
            //Network is not active, so make sure Dissonance is not active too
            Stop();
        }
    }

    base.Update();
}
```

### BaseClient

As mentioned above you should implement this class and pass it in as a generic parameter to BaseCommsNetwork. This represents all of the client side logic of a Dissonance session. One of these will automatically be created on all peers (including the host). There will be two types of errors to fix in the blank class, "Base class [...] doesn't contain a parameterless constructor" and "abstract member [...] not implemented". To fix the first simply add a constructor which accepts an instance of `MyCustomCommsNetwork` and passes it to the base constructor:

```
public MyCustomClient(MyCustomCommsNetwork network)
    : base(network)
{
}
```

There are four abstract methods to implement:

```
public override void Connect()
```

This will be called automatically and is a place to do any client specific setup (e.g. register packet handlers, connect to the server etc). Once your client has finished this setup you must call `base.Connected();`.

```
protected override void ReadMessages()
```

This will be called periodically to poll messages from the network system. If your network system requires you to check for messages you should do it here, if your network system is event based then you can just leave this method empty. Any packets you receive here should be passed to `base.NetworkPacketReceived`.

```
protected override void SendReliable(ArraySegment<byte> packet)
```

This method sends a packet to the server. There will be a low volume of important messages sent using this method. Packets sent using this method must be reliable (i.e. they must arrive eventually) and they must be ordered (i.e. they must arrive in the same order they were sent with). Latency of these packets is not critical. If your networking system has a TCP connection to the server that would be ideal for these messages.

```
protected override void SendUnreliable(ArraySegment<byte> packet)
```

This method sends a packet to the server. There will be a high volume of messages sent using this method (e.g. voice packets). Packets sent using this method are *extremely* sensitive to latency and must arrive as soon as possible. It is expected that some packets will arrive out of order or be completely lost and never arrive at all. If your networking system has a plain UDP socket connected to the server that would be ideal for these messages.

### BaseServer

This represents the server side logic of a Dissonance session. One of these will be created wherever `InitializeAsServer()` is called (which should only be called on one peer). There will be five "abstract member [...] not implemented" errors to fix.

```
public override void Connect()
```

This will be called automatically and is a place to do any server specific setup (e.g. register packet handlers, open a listening socket etc).

```
public override void Disconnect()
```

This will be called when the session is being destroyed and is a place to tear down any of the server specific setup (e.g. unregister packet handlers).

```
protected override void ReadMessages()
```

This will be called periodically to poll messages from the network system. If your network system requires you to check for messages you should do it here, if your network system is event based then you can just leave this method empty. Any packets you receive here should be passed to `base.NetworkPacketReceived`.

```
protected override void SendReliable(TPeer destination, ArraySegment<byte> packet)
```

This method sends a packet to the specified destination. The type of the destination parameter is whatever you specified in the generic type parameters at the start of this tutorial. The value will be some value which was previously passed into `NetworkPacketReceived`. There will be a low volume of important messages sent using this method. Packets sent using this method must be reliable (i.e. they must arrive eventually) and they must be ordered (i.e. they must arrive in the same order they were sent with). Latency of these packets is not critical. If your networking system has a TCP connection to the server that would be ideal for these messages.

```
protected override void SendUnreliable(TPeer destination, ArraySegment<byte> packet)
```

This method sends a packet to the the specified destination. There will be a high volume of messages sent using this method (e.g. voice packets). Packets sent using this method are *extremely* sensitive to latency and must arrive as soon as possible. It is expected that some packets will arrive out of order or be completely lost and never arrive at all. If your networking system has a plain UDP socket connected to the server that would be ideal for these messages.

### A Note On Loopback

The Dissonance networking system creates both a client *and* a server on the peer which is the server. The server must be able to send a receive messages to this client in the same way as any other client even though it is effectively sending messages to itself! If your network system cannot handle this you should detect when the server and client are the same peer (query the `ServerEnabled` flag) and directly pass the data across without touching the network at all. For example this is done in the `PreprocessPacketToClient` and `PreprocessPacketToServer` methods in the `HlapiCommsNetwork`, these methods check if the destination is the local peer, and if so directly pass the packet across and it never touches the network. If your networking system can handle loopback you still need to be careful to ensure that packets sent to the server and packets sent to the client do not get mixed up (e.g. use different channels for the two different messages).

## Peer To Peer

Everything you have set up so far is for a strictly client/server based architecture - all clients send *all* packets to the server and then the server forwards the packets on to the appropriate clients. If your network asset supports direct communication between peers it is far better to send the voice directly between peers; significantly reducing latency and bandwidth costs. If you want to see an example of doing this download the Dissonance PUN integration.

To do this you need to make a few changes to your client class.

Somewhere in your code you will be calling `NetworkReceivedPacket` to deliver packets to the local client. You should capture the return value of this message and, if it is not null, call `ReceiveHandshakeP2P` with the return value and your `TPeer` object for the sender of the message.

For example in the PUN integration previously we had:

```
public void PacketDelivered(byte eventcode, ArraySegment<byte> data, int senderid)
{
  NetworkReceivedPacket(data);
}
```

This was changed to:

```
public void PacketDelivered(byte eventcode, ArraySegment<byte> data, int senderid)
{
  var id = NetworkReceivedPacket(data);
  if (id.HasValue)
    ReceiveHandshakeP2P(id.Value, senderid); //senderid is my TPeer object
}
```

In your client you will have implemented `SendReliable` and `SendUnreliable` to send packets directly to the server. Now you should override two more methods:

`SendReliableP2P(List<ClientInfo<TPeer?>> destinations, ArraySegment<byte> packet)`
`SendUnreliableP2P(List<ClientInfo<TPeer?>> destinations, ArraySegment<byte> packet)`

These methods should send the given packet to as many of the destinations as possible. Each `ClientInfo` object in the list has a nullable TPeer object (which you supplied earlier to the `ReceiveHandshakeP2P` method) which you can use to identify who to send to. If you cannot send the packet to any of the destinations leave them in the list and pass it to the base method, this will send the packet using server relay.

For example in the PUN integration we have this:

```
private void SendUnreliableP2P(IList<ClientInfo<int?>> destinations, ArraySegment<byte> packet)
{
  // Build a list of destinations we know how to send to
  var dests = new List<int>();
  foreach (var item in destinations)
    if (item.Connection.HasValue)
      dests.Add(item.Connection);
      
  // Remove all the ones we can send to from the input
  destinations.RemoveAll(dests);
  
  // Do the PUN sending
  _network.Send(packet, dests, reliable: false);
      
  // Call base to do server relay for all the peers we don't know how to contact
  base.SendUnreliableP2P(destinations, packet);
}
```

Finallyyou should override the `OnServerAssignedSessionId` method. When this method is called you should broadcast a "handshake" packet to all peers you can contact. This will tell those peers that you are available for p2p communication. For example the PUN integration does this:

```
protected override void OnServerAssignedSessionId(uint session, ushort id)
{
    base.OnServerAssignedSessionId(session, id);

    // Call helper method to create packet
    var packet = new ArraySegment<byte>(WriteHandshakeP2P(session, id));

    // Reliable PUN broadcast packet to everyone
    _network.Send(packet, _network.EventCodeToClient, new RaiseEventOptions {
        Receivers = ReceiverGroup.Others,
    }, true);
}
```