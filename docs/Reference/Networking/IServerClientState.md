# IServerClientState

Represents a single client in the server admin API.

## Properties

### Name : String

The name of this client. This is the same as the `DissonanceComms.LocalPlayerName` property for this client.

### IsConnected : bool

Indicates if this client is still connected to the voice session.

### Rooms: ReadOnlyCollection<string>

A collection of all the rooms this player is currently listening to. This corresponds to the active `VoiceReceiptTrigger`s on this client.

### Channels : ReadOnlyCollection<RemoteChannel>

A collection of all the channels this player is currently speaking through. This corresponds to the active `VoiceBroadcastTrigger`'s on the client.

### LastChannelUpdateUtc : DateTime

When the `Channels` collection was last updated

### PacketLoss : float

Get the estimated packet loss for this client (0 to 1).

## Events

### OnStartedListeningToRoom : Action<IServerClientState, string>

Event fires when player starts listening to a room channel.

### OnStoppedListeningToRoom : Action<IServerClientState, string>

Event fires when player stops listening to a room channel.

### StartedSpeaking : Action

vent fires when player starts speaking to any channel.

### StoppedSpeaking : Action

Event fires when player stops speaking to all channels.

### OnVoicePacket : VoicePacket

Event fires for every voice packet from this player.

## Methods

### RemoveFromRoom(string roomName)

Immediately remove this player from a room, preventing them from listening to it. 

!!! note ""
    This does **not** prevent the client from immediately re-joining the room.

### Reset()

Remove this client from the voice session, forcing them to immediately reconnect.