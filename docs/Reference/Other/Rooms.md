# Rooms

This object exposes properties and method to do with rooms that the local player is *listening* to. For rooms the player is speaking to see [this documentation](Reference/Other/RoomChannels.md) intead.

### Count : int

The number of rooms which the local player is a listening to.

### Contains(string) : bool

Returns a boolean value indicating if the local player is listening to a room with the given name.

### Join(string) : RoomMembership

Begin listening to the room with the given name. Returns a "RoomMembership" object which can be used to stop listening to the room.

### Leave(RoomMembership) : bool

Stop listening to the room represented by the given RoomMembership.