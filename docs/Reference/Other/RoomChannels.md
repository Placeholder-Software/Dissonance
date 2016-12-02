# RoomChannels

This object exposes properties and method to do with rooms that the local player is *speaking* to. For rooms the player is listening to see [this documentation](Reference/Other/Rooms.md) intead.

### Count : int

The number of rooms which the local player is a speaking to.

### Contains(RoomChannel) : bool

Returns a boolean value indicating if the local player is speaking to the given channel.

### Open(string, [bool], [ChannelPriority]) : RoomChannel

Opens a channel to begin speaking to the given room and returns an object which represents this open channel (and can be used to close it).

Takes two optional parameters. A boolean value indicating if this channel should use positional playback and a ChannelPriority which indicates the priority of this channel.

### Close(RoomChannel) : bool

Closes the given channel and returns a boolean indicating if the channel was open in the first place.