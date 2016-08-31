# Voice Broadcast Trigger

The Voice Broadcast Trigger controls which room(s) the local voice data is sent to.

![Voice Broadcast Trigger Inspector](/images/VoiceBroadcastTrigger_Overview.png "Voice Broadcast Trigger Inspector")

## Channel Type

This option determines what this broadcaster is broadcasting to. This setting can be configured from a script by modifying the `ChannelType` field on the VoiceBroadcastTrigger component.

#### Room

When set to "Room" the broadcaster sends voice to the specified room. Available rooms are listed in a dropdown box and new rooms may be added by clicking the "Config Rooms" button. The target room name can be configured from a script by modifying the `RoomName` field.

#### Player

When set to "Player" the broadcaster sends voice to the specified player. The inspector will show a text box to enter the name of the player to send to. The *local* player name is set on the DissonanceComms component. The target player name can be configured from a script by modifying the `PlayerId` field.

#### Self

When set the "Self" the broadcaster will look for a sibling component which implements the `IDissonancePlayer` interface and will transmit to that player.

## Disable On Local Player

When this is set the broadcaster will look for a sibling component which implements the `IDissonancePlayer` interface - if that player is the local player then this broadcaster will never transmit any voice. This setting can be configured from a script by modifying the `DisableForLocalPlayer` field.

## Disable On Remote Player

When this is set the broadcaster will look for a sibling component which implements the `IDissonancePlayer` interface - if that player is a remote player then this broadcaster will never transmit any voice. This setting can be configured from a script by modifying the `DisableForRemotePlayer` field.

## Use Positional Data

This determines whether the playback of the data sent through this broadcaster should use 3D audio playback (i.e. voice will sound as if it is coming from a certain position in space). Positional audio requires some additional setup (but does not use *any* additional CPU or network bandwidth at all when enabled). See the [Positional Audio](Tutorial - Positional Audio.md) tutorials for information about how to set up your project for positional audio playback. This option can be configured from a script by modifying the `BroadcastPosition` field.

## Activation Mode

This option determines when voice data should be sent. This setting can be configured from a script by modifying the `Mode` field. Voice will only be broadcast when the component is "active", this can be controlled in two ways.

There are two methods which can be called from scripts:

```
public void StartSpeaking();
public void StopSpeaking();
```

These methods activate and deactivate the transmitter respectively. The other way to activate the component is with triggers, this is documented further below.

#### None

When set to "None" the broadcaster will never broadcast any voice.

#### OpenMic

When set to "OpenMic" the broadcaster will constantly broadcast voice.

#### Voice Activation

When set to "Voice Activation" the broadcaster will monitor the microphone recording and will only broadcast sound when it detects someone speaking. See [Voice Detector](Reference/Audio/VAD.md) for more details.

#### Push To Talk

When set to "Push To Talk" the broadcaster will broadcast voice while a certain input axis is held down. When this option is selected the inspector will show a text box to allow you to select an input axis. See the Unity documentation on [Input Manager](https://docs.unity3d.com/Manual/class-InputManager.html) for information about creating a new input axis.

## Trigger Activation

This determines whether the broadcaster will only broadcast when the local player is within a trigger zone. See the Unity documentation on [Trigger Zones](https://unity3d.com/learn/tutorials/topics/physics/colliders-triggers). Using trigger activation requires the same basic setup as using [Positional Audio](Tutorial - Positional Audio.md). This setting can be configured from a script by modifying the `UseTrigger` field.