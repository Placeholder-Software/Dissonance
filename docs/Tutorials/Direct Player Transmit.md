# Direct Player Messaging

This tutorial will explain how to broadcast a voice message directly to a specific player, rather than to all players in a room. There are two ways to achieve this.

## Set The Player Name

To transmit to a specific player, change the Channel Type option on the `VoiceBroadcastTrigger` to "Player", then give the player name for Recipient Player Name.

![Broadcast Trigger configured for player messaging](/images/VoiceBroadcastTrigger_Player.png)

To change the targetted player at run time modify the `PlayerId` field of the `VoiceBroadcastTrigger` behaviour.

```
GetComponent<VoiceBroadcastTrigger>().PlayerId = "TheNewRemotePlayerName";
```

## Target A Player Behaviour

If you have set up Dissonance [position tracking](Tutorials/Position-Tracking) in your game then the game objects which represent your players will all have a behaviour on them which implements the `IDissonancePlayer` interface. For example if you are using the Forge Networking integration this is the `ForgePlayer` component.

To transmit to this player change the Channel Type option on a `VoiceBroadcastTrigger` attached to the same game object to "Self".

![Broadcast Trigger configured for alternative player messaging](/images/BroadcastToSelf_Inspector.png)