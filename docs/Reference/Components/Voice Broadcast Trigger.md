## Voice Broadcast Trigger

The Voice Broadcast Trigger controls which rooms the local voice data is broadcast to.

![Voice Broadcast Trigger Inspector](/images/VoiceBroadcastTrigger_Overview.png "Voice Broadcast Trigger Inspector")

### Channel Type

The channel type option determines what this broadcaster is broadcasting to. This setting can be configured from a script by modifying the `ChannelType` field on the VoiceBroadcastTrigger component.

##### Room

When set to "Room" the broadcaster sends voice to the specified room. Available rooms are listed in a dropdown box and new rooms may be added by clicking the "Config Rooms" button. The target room name can be configured from a script by modifying the `RoomName` field.

##### Player

When set to "Player" the broadcaster sends voice to the specified player. The inspector will show a text box to enter the name of the player to send to. The *local* player name is set on the DissonanceComms component. The target player name can be configured from a script by modifying the `PlayerId` field.

##### Self

When set the "Self" the broadcaster will look for a sibling component which implements the `IDissonancePlayer` interface and will transmit to that player.

### Disable On Local Player

todo

### Disable On Remote Player

todo

### Use Positional Data

todo

### Activation Mode

todo

### Trigger Activation

todo