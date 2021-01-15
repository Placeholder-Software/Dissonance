This tutorial will explain how to use the channel API for fine grained control over when and where voice is sent. Channels are the system which are used internally by the transmit triggers which come with Dissonance. Direct use of channels requires writing scripts.

Using a channel is quite simple - when a channel is open voice will be sent to whoever is appropriate. A single client may have *multiple* channels open at once, potentially all sending to the same remote player. The remote playback system will correctly handle this situation and will only play the voice back once. There are two kinds of channels, which correspond to two different types of receivers.

### Player Channels

When a player channel is opened the local voice is sent to the player associated with that channel. The receiving player does not need to take any action to receive the voice. This is accessed through the ```PlayerChannels``` property on the DissonanceComms object.

```csharp
DissonanceComms comms;
PlayerChannel channel = comms.PlayerChannels.Open(string playerId, bool positional, ChannelPriority priority);
```

### Room Channels

When a room channel is opened no voice is sent anywhere by default. Receiving players must take an action to indicate that they wish to receive the voice (i.e. join the room). This is accessed through the ```RoomChannels``` property on the DissonanceComms object (to open a sending channel) and the ```Rooms``` property (to control receipt).

```csharp
DissonanceComms comms;
RoomChannel channel = comms.RoomChannels.Open(string roomId, bool positional, ChannelPriority priority);
```

```csharp
DissonanceComms comms;
comms.Rooms.Join(string roomId);
```

### Managing An Open Channel

When you open a channel you receive back an object which represents that channel. This object allows you to control the channel while it is still open.

```bool IsOpen { get; }```

This property indicates if the channel is open. A channel will remain open until you explicitly close it.

```bool Positional { get; set; }```

This property indicates if this channel should be played back with positional data. You may change this value at any time.

When a channel is using positional audio the remote playeback system will position the playback in space so that it sounds like the player voice is coming from the correct direction. If a channel is *not* using positional audio the voice will be non-directional.

```ChannelPriority Priority { get; set; }```

This property indicates the [priority](Channel-Priority.md) associated with data sent over this channel. You may change this value at any time.

When a receiver is receiving multiple channels simultaneously it will only play the highest priority channel(s) it is currently receiving.

```Dispose()```

Close the channel.