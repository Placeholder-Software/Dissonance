## Tutorial: Position Tracking

Also see [this video](https://youtu.be/HXMYDbuLwVI?t=1179) about position tracking.

This tutorial will explain how to configure your project to track the position of players. This is required for 3D positional audio playback of remote player voice chat and collider trigger support for `VoiceBroadcastTrigger` and `VoiceReceiptTrigger`. There are some additional steps required for this to work with Photon BOLT, if you are not using that network integration instead see the more general [position tracking tutorial](Position-Tracking.md).

## BOLT State Synchronisation

First you need to modify the bolt state which you use for your player; add a new string property called `DissonancePlayerId`.

![Bolt State](../images/Bolt-State.png)

Now you need to create a new script which will use this state. Dissonance includes a base class which does most of the work for you.

```
using Dissonance.Integrations.PhotonBolt;

public class DissonancePlayerTracking
    : BoltPlayer< ??? >            // <-- See below
{
    public DissonancePlayerTracking()
        : base("DissonancePlayerId", state => state.DissonancePlayerId, (state, id) => state.DissonancePlayerId = id)
    {
    }
}
```

The `???` in the example needs to be replaced with the state which bolt has generated for your player.

## Setup Tracking

To setup position tracking you simply need to attach the DissonancePlayerTracking component to the game object which represents each player.
 
Ensure that this component is attached to *all* entities in the scene which represent a player (both the local player and all remote players). If you have a prefab which is used to construct your players you can simply attach the behaviour to this prefab.
 
![A Player Prefab with position tracking behaviour added](../images/PlayerPrefab_PositionalAudio.png)

## Using Position Tracking 

### Positional Audio

When positional audio is enabled the voice from remote players will sound like it is coming from the correct position. To enable this simply tick the "use positional data" checkbox on the voice broadcast trigger.

![A broadcast trigger with positional audio enabled](../images/VoiceBroadcastTrigger_Positional.png)

### Collider Chat Room

Voice broadcaster triggers and voice receipt triggers can be configured to only send/receive audio when the local player is inside a certain volume. See [this](Collider-Chat-Room.md) tutorial for how to achieve this.

### Direct Transmit To Player

When position tracking is enable transmitting to a specific player is simplified. If a `Voice Broadcast Trigger` is attached to a player entity it can be configured to transmit to the player represented by the game object. See [this](Direct-Player-Transmit.md) tutorial for details.

