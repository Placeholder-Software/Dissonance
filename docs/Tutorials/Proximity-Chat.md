# Grid Proximity

Grid proximity creates an infinite grid of cells, each cell can be though of as unique chat room. Players are automatically placed into all cells which are within range of their position. This means that only nearby players can be heard.

## Setup

1. Set up [position tracking](Position-Tracking.md), this tells Dissonance where players are.
2. Add a `Voice Proximity Broadcast Trigger` to the scene. This controls when voice will be **sent to**.

!!! warning ""
    Do **not** attach the proximity broadcast trigger to the player prefab!

![Voice Proximity Broadcast Trigger Inspector](../images/ProximityBroadcastTrigger_Inspector.png)

3. Choose a `Chat Room` for this trigger. e.g. `"Red Team Proximity Chat"`
4. Choose a range, all other players within this distance will hear your voice.
5. Choose an `Activation Mode` which decides when voice should be transmitted.

6. Add a `Voice Proximity Receipt Trigger` to the scene. This controls when voice will be **received**.

!!! warning ""
    Do **not** attach the proximity receipt trigger to the player prefab!

![Voice Proximity Receipt Trigger Inspector](../images/ProximityReceiptTrigger_Inspector.png)

7. Set the `Chat Room` to the same value as the broadcast trigger.
8. Set the range to **exactly the same value** as the broadcast trigger.

## Extra Setup: Fading With Distance

At the moment voices will cut off the moment they go out of range, with no fading in volume. A [Custom Playback Prefab](Playback-Prefab.html) gives you control over the `AudioSource` Dissonance uses for audio playback - including the Distance/Attenuation curve. Set the curve to fade to near zero volume at the same range as the proximity broadcast trigger.

## Debugging Common Errors

If proximity chat is not working, check through these quick debugging steps:

- First, check that a normal (non-proximity) voice chat channel works to ensure that this is a problem with proximity chat!
- Proximity chat relies on [position tracking](Position-Tracking.md) being correctly set up. While the game is running with at least 2 players connected:
  - Check the tracking script, attached to your player is initialised
  - In the `DissonanceComms` inspector expand the player list. **Every** player should have `(Positional)` next to their name.
- In the `DissonanceComms` inspector expand the player list, and expand the channels list for the local player. When transmitting locally, you should see some channels appear here (with the name you set for your proximity broadcast trigger).
- Select the `Proximity Broadcast Trigger`, you should see a grid of rooms (drawn as gizmos, ensure gizmos are not hidden) with the rooms near the player highlighted as you move around.