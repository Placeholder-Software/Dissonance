# IServerClientState

Represents a single client in the server admin API.

## Properties

### Name : String

The name of this client. This is the same as the `DissonanceComms.LocalPlayerName` property for this client.

### IsConnected : bool

Indicates if this client is still connected to the voice session.

### Rooms: ReadOnlyCollection<string>

A collection of all the rooms this player is currently listening to.

### Channels : ReadOnlyCollection<RemoteChannel>

A collection of all the channels this player is currently speaking through.

### LastChannelUpdateUtc : DateTime

When the `Channels` collection was last updated

### PacketLoss : float

Get the estimated packet loss factor for this client (0 to 1).

## Events

### OnStartedListeningToRoom : Action<IServerClientState, string>

Event fires when player starts listening to a room channel.

### OnStoppedListeningToRoom : Action<IServerClientState, string>

Event fires when player stops listening to a room channel.

### StartedSpeaking : Action

!!! important ""
    StartedSpeaking event requires `EnableChannelMonitoring = true`

Event fires when player starts speaking to any channel.

### StoppedSpeaking : Action

!!! important ""
    StoppedSpeaking event requires `EnableChannelMonitoring = true`

Event fires when player stops speaking to all channels.

### OnVoicePacket : VoicePacket

!!! important ""
    OnVoicePacket event requires `EnableChannelMonitoring = true`

Event fires for every voice packet from this player.

## Methods

### RemoveFromRoom(string roomName)

Immediately remove this player from a room, preventing them from listening to it. 

!!! note ""
    This does **not** prevent the client from immediately re-joining the room.

### Reset()

Remove this client from the voice session, forcing them to immediately reconnect.

# IServerClientState<TPeer>

Dissonance network integrations must specify a `TPeer` type, which represents a network connection from the server to a specific client. The exact type depends on the network integration you are using. An `IServerClientState` object can be cast to an `IServerClientState<TPeer>` object to access additional properties.

## Properties

### Peer : ClientInfo<TPeer>

Access the `ClientInfo` object for this client. This object exposes a `TPeer Connection { get; }` property.