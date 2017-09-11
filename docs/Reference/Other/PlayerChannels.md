# PlayerChannels

This object exposes properties and methods to do with players that the local player is *speaking* to.

### Count : int

The number of players which the local player is a speaking to.

### Contains(PlayerChannel) : bool

Returns a boolean value indicating if the local player is speaking to the given channel.

### Open(string, [bool], [ChannelPriority], [float]) : PlayerChannel

Opens a channel to begin speaking to the given player and returns a [PlayerChannel](/Reference/Other/PlayerChannel.md) object which represents this open channel (and can be used to close it).

Takes three optional parameters.
1. A boolean value indicating if this channel should use positional playback
2. A ChannelPriority which indicates the priority of this channel
3. A float which indicates the volume to play back this channel with

### Close(PlayerChannel) : bool

Closes the given channel and returns a boolean indicating if the channel was open in the first place.