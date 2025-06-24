## Server Scripting

Dissonance is primarily client authoritative. For example the client controls where audio is being sent to ([VoiceBroadcastTrigger](../Reference/Components/Voice-Broadcast-Trigger.md)/[Channels](Directly-Using-Channels.md)) and received from ([VoiceReceiptTrigger](../Reference/Components/Voice-Receipt-Trigger.md)/[Rooms](../Reference/Other/Rooms.md)).

Dissonance has a server side API which allows server side control & monitoring of clients from the server.

### Access

The server side API can be accessed from `ServerAdmin` property on the comms network component which is next to the `DissonanceComms` component in your scene. Accessing this property will return `null` on clients.

```csharp
// Get the DissonanceComms object in the scene
var comms = DissonanceComms.GetSingleton();

// Get the network component which is next to it.
// This must be cast to the correct type for whichever network integration you are using!
var network = (MirrorCommsNetwork)comms.GetComponent<ICommsNetwork>();

// This will return null on clients
var admin = network.ServerAdmin;
```

### Channel Monitoring

Some features of the admin API require that "channel monitoring" is enabled, this makes the server partially decode packets to extract the channel data from them. By default this is **disabled** and all features which require it will return default values (null, or otherwise "empty" responses).

To enable channel monitoring, set the property to `true` during initialisation:

```csharp
admin.EnableChannelMonitoring = true;
```

### Packet Spoofing

!!! important ""
    Detecting packet spoofing requires `EnableChannelMonitoring = true`

Dissonance voice packets include a header which indicates who sent the packet (i.e. who is speaking). A malicious client could change this field to send packets as if they're coming from another player. Since packets may be relayed via the server clients cannot reliably detect this.

If the server ever detects this it will invoke the `VoicePacketSpoofed` event. You can subscribe to this and handle it (e.g. kick the malicious client):

```csharp
admin.VoicePacketSpoofed += (IServerClientState actualSender, IServerClientState? victim) =>
{
    Debug.LogWarning($"{actualSender.Name} spoofed a packet from {(victim?.Name ?? "nobody")}.");
};
```

### Per-Client Info

Per-client information is exposed as an `IServerClientState` object for each client. See the [`IServerClientState` reference docs](../Reference/Networking/IServerClientState.md) for more information on the properties available.

```csharp
// Events
admin.ClientJoined += state => Debug.Log($"{state.Name} joined Dissonance session")`;
admin.ClientLeft += state => Debug.Log($"{state.Name} left Dissonance session")`;

// Collection
foreach (var state in admin.Clients)
    Debug.Log(state.Name);
```