## Script Controlled Speech

There are several options for controlling speech from scripts, depending on what you want to achieve.

### Muting The Player

If you want to completely prevent a player from speaking you can set the `Mute` property on the `DissonanceComms` component to true.

```
DissonanceComms comms;
comms.Mute = true;

// User cannot speak

comms.Mute = false;

// User can speak
```

### Disabling Triggers

The [`VoiceBroadcastTrigger`](/Reference/Components/Voice-Broadcast-Trigger) is the normal way to trigger voice transmission. Simply disabling this component will prevent it from triggering any voice transmissions until it is enabled again.

```
VoiceBroadcastTrigger trigger;

trigger.enabled = false;

// This trigger cannot send voice

trigger.enabled = true;

// This trigger can send voice
```

### Opening Channels

The most general way to control player voice transmission from scripts is to open and close channels, for more information about channels see [this tutorial](Tutorials/Directly-Using-Channels.md). To start talking open a channel, to stop talking dispose the channel:

```
DissonanceComms comms;

var channel = comms.RoomChannels.Open("Room ID", true, ChannelPriority.Default);

//Player speech will be transmitted to the room named "Room ID"

channel.Dispose();

//Player speech will no longer be transmitted by this channel
```