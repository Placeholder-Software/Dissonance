# PlayerChannel

This object represents a single speech channel directly to another player opened with the [PlayerChannels](/Reference/Other/PlayerChannels.md) API. The other player will receive the local voice without having to take any action.

### Dispose()

Closes this channel.

### SubscriptionId : ushort

Get the unique ID of this channel. This is only unique among the set of open channels - once this channel is closed the ID may be re-used by another channel.

### TargetId : string

Get the name of the player this channel is sending voice to.

### IsOpen : bool

Get a value indicating if this channel is currently open. Once a channel is closed you should release the channel struct - it is useless (re-opening the channel will create a new PlayerChannel struct).

Once IsOpen becomes false then accessing most other properties will immediately throw an exception.

### Positional : bool

Get or set whether audio sent through this channel should use positional playback.

If there are multiple channels open sending the same voice then playback will only be positional if *all* channels are set to use positional playback. 

### Priority : ChannelPriority

Get or set the priority of voice sent with this channel.

If priority is set to `None` then it will fall back to using the priority set on the local DissonanceComms component in the `PlayerPriority` property.

If there are multiple channels open sending the same voice data then playback will use the highest priority.

### Volume : float

Get or set the volume to play back the voice sent through this channel. Volume is a direct multiplier on the audio data and should be between 0 and 1.

If there are multiple channels open sending the same voice then playback will use the loudest volume.