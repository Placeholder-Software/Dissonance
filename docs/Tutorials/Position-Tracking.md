## Tutorial: Position Tracking

Also see [this video](https://youtu.be/HXMYDbuLwVI?t=1179) about position tracking.

This tutorial will explain how to configure your project to track the position of players. This is required for 3D positional audio playback of remote player voice chat and collider trigger support for `VoiceBroadcastTrigger` and `VoiceReceiptTrigger`.

## Setup Tracking

To setup position tracking you simply need to attach a single behaviour to all your player entities. This behaviour depends upon which network integration you are using, it will be located in the folder for your integration:

 - Integrations/UNet_HLAPI/HlapiPlayer
 - Integrations/ForgeNetworking/ForgePlayer
 - Integrations/PhotonUnityNetworking/PhotonPlayer
 
Ensure that this component is attached to *all* entities in the scene which represent a player (both the local player and all remote players). If you have a prefab which is used to construct your players you can simply attach the behaviour to this prefab. For slightly more advanced setups you may need to write your own player script for position tracking, you can find documentation for this [here](/Tutorials/Custom-Position-Tracking.md).
 
![A Player Prefab with position tracking behaviour added](/images/PlayerPrefab_PositionalAudio.png)

## Using Position Tracking

### Positional Audio

When positional audio is enabled the voice from remote players will sound like it is coming from the correct position. To enable this simply tick the "use positional data" checkbox on the voice broadcast trigger.

![A broadcast trigger with positional audio enabled](/images/VoiceBroadcastTrigger_Positional.png)

### Collider Chat Room

Voice broadcaster triggers and voice receipt triggers can be configured to only send/receive audio when the local player is inside a certain volume. See [this](/Tutorials/Collider-Chat-Room) tutorial for how to achieve this.

### Direct Transmit To Player

When position tracking is enable transmitting to a specific player is simplified. If a `Voice Broadcast Trigger` is attached to a player entity it can be configured to transmit to the player represented by the game object. See [this](/Tutorials/Direct-Player-Transmit) tutorial for details.

