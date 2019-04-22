# Voice Receipt Trigger

The Voice Receipt Trigger controls which rooms are being listened to by the local player.

![Voice Receipt Trigger Inspector](../../images/VoiceReceiptTrigger_Overview.png "Voice Receipt Trigger Inspector")

## Trigger Activation

This determines whether the receiver will only receive when the local player is within a trigger zone. See the Unity documentation on [Trigger Zones](https://unity3d.com/learn/tutorials/topics/physics/colliders-triggers). Using trigger activation requires the same basic setup as using [Positional Audio](../../Tutorials/Position-Tracking.md). This setting can be configured from a script by modifying the `UseTrigger` field.

## Chat Room

Determines which room this receiver is for. Available rooms are listed in a dropdown box and new rooms may be added by clicking the "Config Rooms" button. The target room name can be configured from a script by modifying the `RoomName` field.