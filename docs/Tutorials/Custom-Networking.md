## Tutorial: Custom Network Integration

Dissonance is built to be completely decoupled from the underlying networking system, this allows Dissonance to run on top of various different Unity networking assets (e.g. UNet, Forge, Photon etc) just by swapping which Dissonance network component is used. If none of the [existing integrations](../Basic/Choosing-A-Network.md) work for your application then you may need to build a custom network integration.

### Getting Started

Dissonance includes a set of base classes which implement most of the networking logic for you:

 * `BaseCommsNetwork` - This is the main comms network component which you place into your scene. It manages the networking, starting and stopping Dissonance networking in response to network events.
 * `BaseServer` - This is a class created by the comms network component on one of the peers in the session. It manages the session as other peers join and leave. You will extend this class to implement your server logic.
 * `BaseClient` - This is a class created by the comms network component on all the peers in the session. It manages sending and receiving voice. You will extend this class to implement your client logic.

These classes all take 5 type parameters, which specify some extra details about your network system:

 - `TServer` - This is the type of the class you have extended from `BaseServer`
 - `TClient` - This is the type of the class you have extended from `BaseClient`
 - `TPeer` - This is a type of your choice which represents other peers in the network. For now just create a new empty `struct` type and fill in the details later.
 - `TClientParam` - This is the type of data needed for a client to join the session (e.g. an IP address). If your network does not need this (e.g. it is already running before Dissonance is started) then just pass `Unit`.
 - `TServerParam` - This is the type of data needed for a server to host a session (e.g. a port number). If your network does not need this (e.g. it is already running before Dissonance is started) then just pass `Unit`.

Here is an example from the HLAPI integration of these types in use:

```csharp
public class HlapiCommsNetwork
  : BaseCommsNetwork<
      HlapiServer,      // A class which implements BaseServer
      HlapiClient,      // A class which implements BaseClient
      HlapiConn,        // A struct which contains a HLAPI NetworkConnection
      Unit,             // Nothing
      Unit              // Nothing
  >
```

You should now have several new classes and structs:

 - `CustomCommsNetwork : BaseCommsNetwork`
 - `CustomClient : BaseClient`
 - `CustomServer : BaseServer`
 - `CustomPeer struct`
 - `ServerParam` (maybe)
 - `ClientParam` (maybe)

You will have a number of build errors like "abstract member [...] not implemented" - these are the things you must implement before the network integration can work.

## `CustomCommsNetwork : BaseCommsNetwork`

In your custom comms network class you will need to create your custom client and custom server objects. Dissonance will call these methods when a server or client needs to be created. You shouldn't connect to the network in this method, simply create the objects. Here are examples from the HLAPI integration:

```csharp
// We specified `Unit` as `TServerParam`, so we get given a `Unit`
protected override HlapiServer CreateServer(Unit details)
{
    return new HlapiServer(this);
}

// We specified `Unit` as `TClientParam`, so we get given a `Unit`
protected override HlapiClient CreateClient(Unit details)
{
    return new HlapiClient(this);
}
```

You may also need to override the `Initialize` method. This allows you to setup your network system before any networking is done. The HLAPI integration look like this:

```csharp
protected override void Initialize()
{
    //Sanity check the channel configuration set in the inspector
    //... << Removed code for simplicity of example >>

    // HLAPI requires a message handler for every type code.
    //Register one which just discards packets while Dissonance is _not_ running.
    NetworkServer.RegisterHandler(TypeCode, NullMessageReceivedHandler);

    // Don't forget to call base.Initialize!
    base.Initialize();
}
```

Finally you need to decide how your network integration will be started, there are two techniques for this. Some integrations (e.g. HLAPI/Photon) have a network system which is already running and Dissonance simply uses that, in this case the `CustomCommsNetwork` should watch the status of the external network system and make sure that the Dissonance network is synchronized with it (e.g. when the external network stops Dissonance should stop and when it starts Dissonance should start). Some other integrations (e.g. WebRTC/LLAPI) host a separate network session entirely within the custom network components, in this case you may want to add StartNetwork/StopNetwork methods to your component which you can use to control the networking.

If you are using the first technique then you need to monitor the external network system and make sure that Dissonance is running in the same way as the network system. Here is how this is implemented in the HLAPI network integration:

```csharp
// Check every frame
protected override void Update()
{
    // Check if Dissonance is ready
    if (IsInitialized)
    {
        // Check if the HLAPI is ready
        var networkActive = NetworkManager.singleton.isNetworkActive &&
            (NetworkServer.active || NetworkClient.active);
        if (networkActive)
        {
            // Check what mode the HLAPI is in
            var server = NetworkServer.active;
            var client = NetworkClient.active;

            // Check what mode Dissonance is in and if
            // they're different then call the correct method
            if (Mode.IsServerEnabled() != server
                || Mode.IsClientEnabled() != client)
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

As you can see this is ultimately calling the methods `RunAsHost` (if HLAPI is a client and a server), `RunAsDedicatedServer` (if HLAPI is just a server), `RunAsClient` (if HLAPI is just a client) or `Stop` if HLAPI is not running.

If you are using the self hosted technique you should expose public methods which call these 4 methods when you want to start/stop networking.

## `CustomClient : BaseClient`

This class handles all of the client side logic of Dissonance, one of these will be created on every single peer in the session (including the host). There will be two build errors to fix in this class.

`Base class [...] doesn't contain a parameterless constructor`. To fix this simply add a constructor which passes a `CustomCommsNetwork` to the base class:

```csharp
public CustomClient(CustomCommsNetwork network)
    : base(network)
{
}
```

You already implemented the `CreateClient` method in your `CustomCommsNetwork` which uses this constructor. Make sure to pass in other parameters here (e.g. connection parameters) as necessary.

`abstract member [...] not implemented`. There will be four of these errors to fix:

#### public override void Connect()

This will be called when you need to connect to the session. Once you have finished connecting (which may take a long time) you should call `base.Connected()`. For example in the HLAPI integration this simply binds a message handler and immediately calls `Connected`, wheras in the LLAPI integration it starts connecting the network socket and does not call `Connected` until that succeeds.

#### protected override void ReadMessages()

This will be called periodically to poll messages from the network system. Any packets you receive should be to `base.NetworkPacketReceived`.

#### protected override void SendReliable(ArraySegment<byte> packet)

This method sends a packet to the server using a **reliable** and **in order** channel (e.g. TCP). Packets sent with this method are not latency sensitive but MUST arrive in order. If you detect that a reliable packet has been lost you should immediately stop the Dissonance network session.

#### protected override void SendUnreliable(ArraySegment<byte> packet)

This methods sends a packet to the server using an **unreliable** and **unordered** channel (e.g. UDP). Packets sent with this method are _extremely_ latency sensitive and must arrive as soon as possible or not at all. It is expected that some packets sent using this method may be lost or arrive out of order.

## `CustomServer : BaseServer`

This class handles all the server side logic of Dissonance, one of these will be created on a single peer in the session and handles managing the session. In the basic configuration all voice data is relayed via this peer (see P2P section for details on how to avoid this). There will be five "abstract member [...] not implemented" errors to fix:

#### `public override void Connect()`

This will be called when you need to host a session, you should do any setup required here. For example in the HLAPI integration this binds message handlers, in the LLAPI integration it creates and opens a listen socket.

#### `public override void Disconnect()`

This will be called when you need to stop hosting a session, you should do any required teardown here.

#### `protected override void ReadMessages()`

This will be called periodically to poll messages from the network system. Any packets you receive should be to `base.NetworkPacketReceived`. The `base.NetworkPacketReceived` method on the server requires an instance of your `TPeer` type (e.g. `CustomPeer`).

#### `protected override void SendReliable(TPeer destination, ArraySegment<byte> packet)`

This method sends a reliable packet to another peer using a **reliable** and **in order** channel (e.g. TCP). Packets sent with this method are not latency sensitive but MUST arrive in order. If you detect that a reliable packet has been lost you should immediately stop the Dissonance network session.

This is where you should decide what your `CustomPeer` struct needs to contain. Whatever information you require to specify which peer to send to should be added into your struct. For example in the HLAPI integration sending requires a `NetworkConnection` object, so the `CustomPeer` struct contains a single `NetworkConnection` field.

#### `protected override void SendUnreliable(TPeer destination, ArraySegment<byte> packet)`

This methods sends a packet to the server using an **unreliable** and **unordered** channel (e.g. UDP). Packets sent with this method are _extremely_ latency sensitive and must arrive as soon as possible or not at all. It is expected that some packets sent using this method may be lost or arrive out of order.

#### `ClientDisconnected`

Finally there is one more method that you must call when appropriate: `ClientDisconnected` indicates that a client has left the session. You should call this as soon as you know a client has left.

## Editor Inspector

Finally you should create an inspector for your CustomCommsNetwork. Doing this is very simple, extend the `BaseDissonanceCommsNetworkEditor` class and pass the same 5 generic types you defined above. Attach the `CustomEditor` attribute to the class. For example in the HLAPI integration the inspector looks like this:

```csharp
[CustomEditor(typeof(HlapiCommsNetwork))]
public class UNetCommsNetworkEditor
    : BaseDissonnanceCommsNetworkEditor<
        HlapiCommsNetwork,
        HlapiServer,
        HlapiClient,
        HlapiConn,
        Unit,
        Unit
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
internal bool PreprocessPacketToClient(ArraySegment<byte> packet, HlapiConn destination)
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

Because there is a fallback mechanism you can mix P2P and non-P2P packets as necessary. For example you start by sending everything via the server, establish a p2p connection between clients and if it fails (e.g. due to firewall or NAT settings) you can simply keep on sending via relay for that specific pair of clients. Alternatively you could monitor client bandwidth and send via P2P if there is spare bandwidth - falling back to server relay if the client is close to reaching it's bandwidth limit.

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