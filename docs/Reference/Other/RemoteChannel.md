# RemoteChannel

A `RemoteChannel` struct represents a snapshot of information about a channel which a player is speaking through.

## Read Only Properties

### Type : ChannelType

Get the type of this channel. A channel is either to a Room (in which case the local player will only hear voices if they are subscribed to the Room) or to a player (in which case the appropriate player will hear the voice without needing to subscribe to it).

### Options : PlaybackOptions

Get the `PlaybackOptions` which have been set for this channel. The actual playback options used are an aggregation of the options set on all the channels the local player is receiving voice from the given player through.

#### Options.IsPositional : bool

Get whether this channel should be played with positional audio. Actual audio playback will be positional only if *all* channels from the given player are set to positional playback.

#### Options.AmplitudeMultiplier : float

Get the amplitude multiplier to apply to audio through this channel. The _maximum_ multiplier from all channels from the given player will be used.

#### Options.Priority : ChannelPriority

Get the priority of audio through this channel. The _maximum_ priority from all channels from the given player will be used.

### TargetName : string

Get the name of the target of this channel. This is either a room name or a player name, depending upon the `Type` property.