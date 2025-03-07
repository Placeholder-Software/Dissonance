## Server Scripting

The controls in Dissonance for where audio is being sent ([VoiceBroadcastTrigger](../Reference/Components/Voice-Broadcast-Trigger.md)/[Channels](Directly-Using-Channels.md)) and received ([VoiceReceiptTrigger](../Reference/Components/Voice-Receipt-Trigger.md)/[Rooms](../Reference/Other/Rooms.md)) are client side. Dissonance has a limited server side API which allows some control/monitoring from the server.

### Access

The server side API can be accessed from `ServerAdmin` property on the comms network component which is next to the `DissonanceComms` component in your scene. The exact name of this script depends on the network integration you are using, for example for Mirror it is the `MirrorCommsNetwork` component.

The `ServerAdmin` property will return null on clients.

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

Some features of the admin API require that "channel monitoring" is enabled, this makes the server do some extra work to decode packets and extract the channel data from them. By default this is **disabled** and all features which require it will return default values (null, or otherwise "empty" responses).

To enable channel monitoring, set the property to `true` during initialisation:

```csharp
admin.EnableChannelMonitoring = true;
```

### Packet Spoofing

!!! important ""
    Detecting packet spoofing requires `EnableChannelMonitoring = true`

Dissonance voice packets include a header which indicates where they came from (i.e. who is speaking). A malicious client could change this field to send packets as if they're coming from another player. Since packets may be relayed via the server clients cannot reliably detect this.

if the server ever detects this it will invoke the `VoicePacketSpoofed` event. You can subscribe to this and handle it (e.g. kick the malicious client):

```csharp
admin.VoicePacketSpoofed += (IServerClientState actualSender, IServerClientState? victim) =>
{
    Debug.LogWarning($"{actualSender.Name} spoofed a packet from {victim?.Name ?? "nobody"}.");
    KickThatPersonFromGame(actualSender);
};
```

### Per-Client Info

Some per-client information is available, this is exposed as an `IServerClientState` object for each player. You can access per-player info through:

```csharp
// Events
admin.ClientJoined += state => Debug.Log(state.Name)`;
admin.ClientLeft += state => Debug.Log(state.Name)`;

// Collection
foreach (var state in admin.Clients)
    Debug.Log(state.Name);
```

See the [`IServerClientState` reference docs](../Reference/Networking/IServerClientState.md) for more information on the properties available.