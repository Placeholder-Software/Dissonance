There are several options for controlling speech from scripts, depending on what you want to achieve.

### Muting The Local Player

If you want to completely prevent a player from speaking you can set the `IsMuted` property on the `DissonanceComms` component to true.

```csharp
DissonanceComms comms;
comms.IsMuted = true;

// User cannot speak

comms.IsMuted = false;

// User can speak
```

### Deafening The Local Player

If you want to completely prevent the local player from hearing any speech you can set the `IsDeafened` property on the `DissonanceComms` component to true.

```csharp
DissonanceComms comms;
comms.IsDeafened = true;

// User cannot hear

comms.IsDeafened = false;

//User can hear
```

### Muting Remote Players

If you want to *locally* mute a remote player (prevent yourself from hearing them talk) you can set the `IsLocallyMuted` property on their player object.

```csharp
DissonanceComms comms;
var player = comms.FindPlayer(player_id);
player.IsLocallyMuted = true;

// You will not hear user when they speak

player.IsLocallyMuted = false;

// You will hear user when they speak
```

### Disabling Triggers

The [`VoiceBroadcastTrigger`](../Reference/Components/Voice-Broadcast-Trigger.md) is the normal way to trigger voice transmission. Simply disabling this component will prevent it from triggering any voice transmissions until it is enabled again.

```csharp
VoiceBroadcastTrigger trigger;

trigger.enabled = false;

// This trigger cannot send voice

trigger.enabled = true;

// This trigger can send voice
```

### Opening Channels

The most general way to control player voice transmission from scripts is to open and close channels, for more information about channels see [this tutorial](Directly-Using-Channels.md). To start talking open a channel, to stop talking dispose the channel:

```csharp
DissonanceComms comms;

var channel = comms.RoomChannels.Open("Room ID", true, ChannelPriority.Default);

//Player speech will be transmitted to the room named "Room ID"

channel.Dispose();

//Player speech will no longer be transmitted by this channel
```