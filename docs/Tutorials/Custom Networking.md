## Tutorial: Custom Network Integration

Dissonance is built to be completely decoupled from the underlying networking system, this allows Dissonance to run on top of various different Unity networking assets (e.g. UNet, Forge, Photon etc) just by swapping which Dissonance network component is used. Writing a new integration is a very advanced topic and should be avoided if possible! If you wish to use a publicly available networking system which Dissonance does not yet have an integration for [raise an issue](https://github.com/Placeholder-Software/Dissonance) and see if we'll build the integration into Dissonance. However if you're writing a custom network system and want to use Dissonance you'll have to write your own integration.

### ICommsNetwork

Fundamentally writing a new network integration requires that you implement the `Dissonance.ICommsNetwork` interface. This interface should be implemented on a MonoBehaviour and then an instance of that behaviour should be attached to the same game object as your `DissonanceComms` behaviour. Dissonance will automatically find the behaviour and use it as needed.

When you are implementing this interface you will have to encode and decode packets containing the necessary data (which may be in format you wish to design). If you want to use the same format as other Dissonance implementations the format is documented [here](Reference/Networking/Packet Format.md). There are helper structs for reading and writing network packets in the default format avilable: `Dissonance.Networking.PacketWriter` and `Dissonance.Networking.PacketReader`.

### BaseCommsNetwork

`BaseCommsNetwork` is a convenience class which implements a lot of the complexity of `ICommsNetwork` for you (including all packet reading and writing). This is how all of the built-in networking integrations are built. To start with you should create a new class e.g. `MyCustomCommsNetwork` which inherits the `BaseCommsNetwork` class. This requires three generic parameters:

    BaseCommsNetwork<TServer, TClient, TPeer>
    
`TServer` is the class which represents server side logic. You should create a new class e.g. `MyCustomServer` and inherit `BaseServer` (base server requires the same three generic parameters as the BaseCommsNetwork).

`TClient` is the class which represents client side logic. You should create a new class e.g. `MyCustomClient` and inherit `BaseClient` (base client requires the same three generic parameters as the BaseCommsNetwork).

`TPeer` is a type of your choice which you will use to represent a connection to another player. This could be a unique ID number (e.g. the UNet LLAPI integration uses an `int` to represent players) or it could be a more complex class (e.g. the Forge integration uses a `ForgePeer` class to represent players). This depends a lot upon what your network system uses to represent players, if you're unsure what to use try looking at how your network system sends packets to specific players - what type does it use to specify which player to send to?

Once you have created all these classes you will have compile errors complaining about "abstract member [...] not implemented". Fix these starting with `MyCustomCommsNetwork`:

`CreateServer` simply requires that you create an instance of your server class. `CreateClient` simply requires that you create an instance of your client class. `Initialize` should begin the process of connecting to the network; first you should do any setup work required before you connect (e.g. register packet handlers) and *then* call either `InitializeAsServer()` or `InitializeAsClient()`. You should call `InitializeAsServer()` on only one peer (e.g. your server) and `InitializeAsClient()` on all other peers. For example here is the initialisation of the Photon integration:

```
protected override void Initialize()
{
    //Register packet handlers
    PhotonPeer.RegisterType(stuff)
    PhotonNetwork.OnEventCall += OnEvent;

    //Set a flag to indicate that we're connecting
    _connecting = true;
}

public override void Update()
{
    base.Update();

    //Check the flag set in initialize
    if (_connecting)
    {
        //We need to wait until photon is completely done setting up before we try to setup dissonance
        if (PhotonNetwork.connectionStateDetailed != ClientState.Joined)
            return;

        //Choose which initialization to call
        if (PhotonNetwork.isMasterClient)
            InitializeAsServer();
        else
            InitializeAsClient();
            
        //We're done, unset the flag
        _connecting = false;
    }
}
```

### BaseClient

This represents the client side logic of a Dissonance session. One of these will be created on all peers (including the server). There will be two types of errors to fix in the blank class, "Base class [...] doesn't contain a parameterless constructor" and "abstract member [...] not implemented". To fix the first simply add a constructor which accepts an instance of `MyCustomCommsNetwork` and passes it to the base constructor:

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

The Dissonance networking system creates both a client *and* a server on the peer which is the server. The server must be able to send a receive messages to this client in the same way as any other client even though it is effectively sending messages to itself! If your network system cannot handle this you should detect when the server and client are the same peer (query the `ServerEnabled` flag) and directly pass the data across without touching the network at all. For example this is done in the `PreprocessPacketToClient` method in the `ForgeCommsNetwork`.

If your networking system can handle loopback you still need to be careful to ensure that packets sent to the server and packets sent to the client do not get mixed up (e.g. use different channels for the two different messages).

```
//This is called before any packet is sent from server to client through forge networking.
//If it returns true the packet is not sent to forge at all.
public bool PreprocessPacketToClient(ArraySegment<byte> packet, ForgePeer destination, uint channel, bool reliable)
{
    //Is this loopback?
    if (ServerEnabled && destination.Peer.NetworkId != BNetworking.PrimarySocket.Me.NetworkId)
        return false;

    //Directly pass this data to the client (forge doesn't ever see this packet)
    Client.NetworkReceivedPacket(source: destination, data: packet);

    return true;
}
```