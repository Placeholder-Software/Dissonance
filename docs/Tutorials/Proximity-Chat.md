# Proximity Chat

Also see [this video](https://youtu.be/HXMYDbuLwVI?t=323) about proximity chat rooms.

This tutorial will explain how to build a proximity chat system where players can only talk to other players who are standing close to them. How this will work in your game depends upon exactly how you create player objects - feel free to [ask for help](https://www.reddit.com/r/dissonance_voip/).

Proximity chat rooms work by combining [direct player transmission](Direct-Player-Transmit.md) and [collider chat rooms](Collider-Chat-Room.md). Each player in your game should have a voice broadcast trigger attached to it (set to broadcast directly to that player) and configured as a collider chat room with a suitable collision volume (e.g. a large sphere). When two players stand close to one another they will enter each others transmission trigger volumes and begin talking to one another.

![Player Proximity Chat](/images/PlayerProximityChat_Inspector.png)

In this example channel type is set to "Self", this means the broadcast trigger searches for one of the Dissonance [position tracking](Position-Tracking.md) behaviours and transmits directly to the player which that represents.