## Team Chat Rooms

A team chat room is a set of rooms where all users *on the same team* talk to and listen to the same room. To create a setup like this requires a small amount of scripting as it depends on how your game defines what a "team" actually is!

![Example of team chat configuration](/images/TeamChat_Inspector.png "Example of team chat configuration")

1. Create multiple sets of broadcaster and receiver components (one pair for each team).
2. Set all of them to have exactly the same activation mode.
3. Disable *all* of the components
4. Add a small piece of code to activate the appropriate components when a player is assigned to a team. This depends a lot on exactly how your game defines what a team is, feel free to [ask for help](https://www.reddit.com/r/dissonance_voip/). Here is some example code:

```
void OnAssignPlayerToTeam(string teamName)
{
    //Find the broadcaster and receiver in the scene which correspond to the correct team
    var broadcaster = FindObjectsOfType<VoiceBroadcastTrigger>().SingleOrDefault(b => b.RoomName == teamName);
    var receiver = FindObjectsOfType<VoiceReceiptTrigger>().SingleOrDefault(r => r.RoomName == teamName);
    
    //Sanity check that we found what we're looking for
    if (broadcaster == null || receiver == null)
    {
        Debug.Log("Cannot find voice components for team '{0}'", teamName);
        return;
    }

    //enable the components for this team
    broadcaster.enabled = true;
    receiver.enabled = true;
}
```

## Additional Global Chat Room

If you want to still have a global voice chat room *and* have per team chat rooms this can be achieved by simply having the normal [global chat room](/Tutorials/Global-Chat-Room.md) configuration with a different push-to-talk input axis (e.g. 'v' to team chat and 'b' to global chat).

![Example of two different PTT axes](/images/VoiceBroadcastTrigger_DifferentPTT.png "Example of two different PTT axes")
