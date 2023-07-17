Dissonance is built to be completely decoupled from the underlying networking system, this allows Dissonance to run on top of various different Unity networking assets (e.g. UNet, Forge, Photon etc) just by swapping which Dissonance network component is used. If none of the [existing integrations](../Basics/Choosing-A-Network.md) work for your application then you may need to build a custom network integration.

### Getting Started

Dissonance includes a set of base classes which implement most of the networking logic for you:

 * `BaseCommsNetwork` - This is the main comms network component which you place into your scene. It manages the networking, starting and stopping Dissonance networking in response to network events.
 * `BaseServer` - This is a class created by the comms network component on one of the peers in the session. It manages the session as other peers join and leave. You will extend this class to implement your server logic.
 * `BaseClient` - This is a class created by the comms network component on all the peers in the session. It manages sending and receiving voice. You will extend this class to implement your client logic.

Create the `CustomCommsNetwork` class which extends `BaseCommsNetwork`:

```csharp
public class CustomCommsNetwork
  : BaseCommsNetwork<
      CustomServer,      // A class which implements BaseServer
      CustomClient,      // A class which implements BaseClient
      CustomPeer,        // A struct which represents a network connection
      Unit,              // Nothing
      Unit               // Nothing
  >
{
}
```

As you can see `BaseCommsNetwork` requires 5 type parameters, which specify all the parts of your custom network integration:

 - `CustomServer` - This is a class you will create which extends `BaseServer`
 - `CustomClient` - This is a class you will create which extends `BaseClient`
 - `CustomPeer` - This is a struct you will create which represents another peer in the network session.
 - `CustomClientParam` - This is a struct you will create which contains the data necessary create a network connection (e.g. an IP address). If your network does not need this (e.g. it is already running before Dissonance is started) then just pass `Unit`.
 - `CustomServerParam` - This is a struct you will create which contains the data necessary host a network session (e.g. a port number). If your network does not need this (e.g. it is already running before Dissonance is started) then just pass `Unit`.

To create all these types define two new classes:

 - `class CustomCommsNetwork : BaseCommsNetwork {}`
 - `class CustomClient : BaseClient {}`
 - `class CustomServer : BaseServer {}`

And three new structs:

 - `struct CustomPeer : IEquatable<CustomPeer> {}`
 - `struct CustomServerParam {}`
 - `struct CustomClientParam {}`

 Once you have done this you will have a large number of build errors like "abstract member [...] not implemented" - these are the things you must implement before the network integration can work.

## `CustomCommsNetwork : BaseCommsNetwork`

In your custom comms network class you will need to create your custom client and custom server objects. Dissonance will call these methods when a server or client needs to be created. You shouldn't connect to the network in this method, simply create the objects.

```csharp
protected override CustomServer CreateServer(CustomServerParam details)
{
    return new CustomServer(this, details);
}

protected override CustomClient CreateClient(CustomClientParam details)
{
    return new CustomClient(this, details);
}
```

If you need to do any other setup work for your network system you can override the `Initialize` method.

```csharp
protected override void Initialize()
{
    Network.DoSomethingImportant();

    // Don't forget to call base.Initialize!
    base.Initialize();
}
```

Finally you need to start the network and tell it to connect, there are two main techniques for this. Some integrations (e.g. Mirror/Photon) have a network system which is already connected and Dissonance can use that, other integrations (e.g. WebRTC) host a network session specifically for voice chat.

If you are using the first technique then you need to monitor the external network system and make sure that Dissonance is running in the same way as the network system by calling `RunAsHost`, `RunAsDedicatedServer`, `RunAsClient` or `Stop`. Here is how this is implemented in the HLAPI network integration:

```csharp
// Check every frame
protected override void Update()
{
    // Check if Dissonance is ready
    if (IsInitialized)
    {
        // Check if the HLAPI is ready
        var networkActive = NetworkManager.singleton.isNetworkActive && (NetworkServer.active || NetworkClient.active);
        if (networkActive)
        {
            // Check what mode the HLAPI is in
            var server = NetworkServer.active;
            var client = NetworkClient.active;

            // Check what mode Dissonance is in and if
            // they're different then call the correct method
            if (Mode.IsServerEnabled() != server || Mode.IsClientEnabled() != client)
            {
                // HLAPI is server and client, so run as a non-dedicated
                // host (passing in the correct parameters)
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
            //Network is not active, make sure Dissonance is not active
            Stop();
        }
    }

    base.Update();
}
```

If you are using the second technique then you will need to decide when to call `RunAsHost`, `RunAsDedicatedServer`, `RunAsClient` or `Stop` at the appropriate times.

## `CustomClient : BaseClient`

This class handles all of the client side logic of Dissonance, one of these will be created on every single peer in the session (including the host). There will be two build errors to fix in this class.

`Base class [...] doesn't contain a parameterless constructor`. To fix this simply add a constructor which passes a `CustomCommsNetwork` to the base class:

```csharp
public CustomClient(CustomCommsNetwork network, CustomClientParam details)
    : base(network)
{
}
```

`abstract member [...] not implemented`. There will be four of these errors to fix:

#### public override void Connect()

This will be called when you need to connect to the session. You should start connecting to the network when this is called, once you have finished connecting (which may take a long time) you must call `base.Connected()`. In systems where there is already a network connection setup you may just immediately call `base.Connected()`.

#### protected override void ReadMessages()

This will be called periodically to poll messages from the network system. Any packets you receive must be passed to `base.NetworkPacketReceived`.

#### protected override void SendReliable(ArraySegment<byte> packet)

This method sends a packet to the server using a **reliable** and **in order** channel (e.g. TCP). Packets sent with this method are not latency sensitive but MUST arrive in order. If you detect that a reliable packet has been lost you should immediately stop the Dissonance network session.

#### protected override void SendUnreliable(ArraySegment<byte> packet)

This methods sends a packet to the server using an **unreliable** and **unordered** channel (e.g. UDP). Packets sent with this method are _extremely_ latency sensitive and must arrive as soon as possible or not at all. It is expected that some packets sent using this method may be lost or arrive out of order.

## `CustomServer : BaseServer`

This class handles all the server side logic of Dissonance, one of these will be created on a single peer in the session and handles managing the session. In the basic configuration all voice data is relayed via this peer (see P2P section for details on how to avoid this). There will be five "abstract member [...] not implemented" errors to fix:

#### `public override void Connect()`

This will be called when you need to host a new network session (e.g. open a socket).

#### `public override void Disconnect()`

This will be called when you need to stop hosting a session (e.g. close the socket).

#### `protected override void ReadMessages()`

This will be called periodically to poll messages from the network system. Any packets you receive should be to `base.NetworkPacketReceived`. The `base.NetworkPacketReceived` method on the server requires an instance of your `CustomPeer` type which indicates who sent the message.

#### `protected override void SendReliable(CustomPeer destination, ArraySegment<byte> packet)`

This method sends a reliable packet to another peer using a **reliable** and **in order** channel (e.g. TCP). Packets sent with this method are not latency sensitive but MUST arrive in order. If you detect that a reliable packet has been lost you should immediately stop the Dissonance network session.

If you need some extra information about who the packet is being sent to, you should add it to the `CustomPeer` struct. Remember to go to the `ReadMessages` method and add that information to the `CustomPeer` struct you passed in to `NetworkPacketReceived`.

#### `protected override void SendUnreliable(CustomPeer destination, ArraySegment<byte> packet)`

This methods sends a packet to the server using an **unreliable** and **unordered** channel (e.g. UDP). Packets sent with this method are _extremely_ latency sensitive and must arrive as soon as possible or not at all. It is expected that some packets sent using this method may be lost or arrive out of order.

#### `ClientDisconnected`

When a peer disconnects from the server you must call `ClientDisconnected` to notify the server.

## Editor Inspector

Finally you should create an inspector for your CustomCommsNetwork. Doing this is very simple, extend the `BaseDissonanceCommsNetworkEditor` class and pass the same 5 generic types you defined above. Attach the `CustomEditor` attribute to the class. 

```csharp
[CustomEditor(typeof(CustomCommsNetwork))]
public class CustomCommsNetworkEditor
    : BaseDissonnanceCommsNetworkEditor<
        CustomCommsNetwork,
        CustomServer,
        CustomClient,
        CustomConn,
        CustomClientParam,
        CustomServerParam
    >
{
}
```

This will set up a basic inspector for you.

## Testing

At this point you should have a basic voice chat system functioning with your custom network. You should set up a test scene to test it. While the test scene is running check these things:

 - Look at the inspector for your `CustomCommsNetwork` component.
    - Once the network session is started the `Mode` should shows "Server & Client", "Client" or "Server" depending on the mode this peer is running in.
    - Once the network session has connected the `Connection Status` should show "Connected"
 - Try sending a [text chat](Text-Chat.md) message.
 - Create a [broadcast and receipt](Global-Chat-Room.md) trigger and speak.
 - Look at the inspector for the `DissonanceComms` component. It shows a list of client in the session, disconnect a client and make sure they disappear.

## Extensions: Loopback

The Dissonance networking system create a `CustomClient` _and_ a `CustomServer` on the host machine (unless running a dedicated server). The server must be able to send and receive message to this local peer the same as any other peer. This can cause complications with some network systems which do not handle this kind of "loopback" correctly. You must also be careful to make sure you can distinguish messages from other peers to the host - make sure that they don't get processed by the host client object.

To handle this many of the Dissonance integrations have a special check for loopback. For example in the HLAPI integration there is a `HlapiCommsNetwork:PreprocessPacketToClient` method which is given all packets sent from the server to the client, it checks if the packet is a loopback packet and if so it passes it directly to the client and HLAPI itself never has to deal with this packet.

```csharp
internal bool PreprocessPacketToClient(ArraySegment<byte> packet,
    HlapiConn destination)
{
    // No client means this can't be loopback
    if (Client == null)
        return false;

    // HLAPI way to check if this is loopback.
    if (NetworkManager.singleton.client.connection != destination.Connection)
        return false;

    // This is loopback!

    // check that we have a valid local client,
    // in cases of startup or in-progress shutdowns
    if (Client != null)
    {
        // Don't immediately deliver the packet, add it to a queue and
        // deliver it next frame. This prevents the local client from
        // executing "within" the local server which can cause
        // confusing stack traces.
        _loopbackQueue.Add(packet.CopyTo(_loopbackBuffers.Get()));
    }

    return true;
}
```

## Extensions: Peer To Peer

Currently the network integration you have built sends all packets to the server, which then relays them to other clients. If possible you _may_ want to implement peer to peer voice communications. However, you should consider the bandwidth of your game before implementing peer to peer as it is not always beneficial to use it.

In a non P2P setup voice follows a path like:

```csharp
Speaker -> Server -> Listener #1
                  -> Listener #2
                  -> Listener #3
```

In this case the bandwidth used by the speaker is 1 voice stream `~20 kilobits/second`. The bandwidth used by each listener is 1 voice stream `~20 kilobits/second`. The bandwidth used by the server is `(Speakers + Listeners) * Bandwidth = (1 + 3) * ~20 = ~80 kilobits/second`. In this setup the bandwidth of each client (speaker or listener) is the minimum possible. If your game uses client devices with tight bandwidth limits this may be the best setup.

In a P2P setup the voice follows a different path:

```csharp
Speaker -> Listener #1
        -> Listener #2
        -> Listener #3
```

The bandwidth on the server has been reduced (to zero). However, the total bandwidth for the speaker client is now `Listeners * Bandwidth = 3 * ~20 = ~60 kilobits/second`.

### Implementing P2P

If you have decided to use peer to peer you need to modify your `CustomClient` class. Wherever you call `NetworkReceivePacket` you should modify it to capture the return value of the method call, if the value is not call `ReceiveHandshakeP2P` with it and a `CustomPeer` object for the sender of the message. For example in the Photon Unity Networking (PUN) integration the receiving code is implemented like this:

```csharp
// This event is called by PUN when a packet arrives
public void PacketDelivered(byte eventcode, ArraySegment<byte> data,
    int senderid)
{
    // Skip events we don't care about
    if (eventcode != _network.EventCodeToClient)
        return;

    // Receive the packet, capture return value
    var id = NetworkReceivedPacket(data);

    // If the value is not null
    // pass to handshake method with the `senderid` of this packet
    if (id.HasValue)
        ReceiveHandshakeP2P(id.Value, senderid);
}
```

You now need to implement two more methods for sending packets:

#### `SendReliableP2P(List<ClientInfo<TPeer?>> destinations, ArraySegment<byte> packet)`
#### `SendUnreliableP2P(List<ClientInfo<TPeer?>> destinations, ArraySegment<byte> packet)`

These methods send a packet to a list of destinations. You should send the packet to as many of these destinations as possible and remove them from the list. Once you are done call the base method with the remaining items in the list, they will be sent via the server as usual. For example the PUN implementation of this is:

```csharp
private void SendUnreliableP2P(IList<ClientInfo<int?>> destinations,
    ArraySegment<byte> packet)
{
    // Build a list of destinations we know how to send to
    // i.e. have a non-null Connection object
    var dests = new List<int>();
    foreach (var item in destinations)
        if (item.Connection.HasValue)
            dests.Add(item.Connection);
      
    // Remove all the ones we can send to from the input list
    destinations.RemoveAll(dests);
  
    // Send the packets to the list of destinations through PUN
    _network.Send(packet, dests, reliable: false);
      
    // Call base to do server relay for all the peers we don't
    // know how to contact
    base.SendUnreliableP2P(destinations, packet);
}
```

Because there is a fall-back mechanism you can mix P2P and non-P2P packets as necessary. For example you start by sending everything via the server, establish a p2p connection between clients and if it fails (e.g. due to firewall or NAT settings) you can simply keep on sending via relay for that specific pair of clients. Alternatively you could monitor client bandwidth and send via P2P if there is spare bandwidth - falling back to server relay if the client is close to reaching it's bandwidth limit.

Finally you need to start establishing p2p connections. Override the `OnServerAssignedSessionId` method, when this is called you should send a "handshake" packet to every peer you know how to contact directly. This will tell those peers that you are available for p2p communication. For example in the PUN integration this is implemented as:

```csharp
protected override void OnServerAssignedSessionId(uint session, ushort id)
{
    base.OnServerAssignedSessionId(session, id);

    // Create the handshake packet to send
    var packet = new ArraySegment<byte>(WriteHandshakeP2P(session, id));

    // Send this to everyone else in the session through PUN
    _network.Send(packet, _network.EventCodeToClient, new RaiseEventOptions {
        Receivers = ReceiverGroup.Others,
    }, true);
}
```