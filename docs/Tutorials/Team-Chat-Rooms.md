## Team Chat Rooms

A team chat room is a set of rooms where all users *on the same team* talk to and listen to the same room. To create a setup like this requires a small amount of scripting as it depends on how your game defines what a "team" actually is!

To create a team chat setup first create multiple pairs of broadcasters and receivers, one for each team.

![Example of team chat configuration](/images/TeamChat_Inspector.png)

With the setup as shown here every player will speak and and listen to every team channel. To fix this add a unique token to each pair of triggers (e.g. the team name), once you have done this none of the triggers will activate and no one will speak or listen to any of the team rooms.

Finally, when you create a player and assign them to a team run a script which adds the appropriate token to the local player. Exactly how this code works depends a lot on exactly how your game defines what a team is, feel free to [ask for help](https://www.reddit.com/r/dissonance_voip/). Here is some example code:

```
void OnAssignPlayerToTeam(string teamName)
{
    //Find local comms object
    var comms = FindObjectOfType<DissonanceComms>();
    
    //Sanity check that we found what we're looking for
    if (comms == null)
    {
        Debug.Log("Cannot find voice components for team '{0}'", teamName);
        return;
    }

    //Add the token for the team
    comms.AddToken(teamName);
}
```

## Additional Global Chat Room

If you want to still have a global voice chat room *and* have per team chat rooms this can be achieved by simply having the normal [global chat room](Global-Chat-Room.md) configuration with a different activation mode (e.g. a different push-to-talk input axis, such as 'v' to team chat and 'b' to global chat).

![Example of two different PTT axes](/images/VoiceBroadcastTrigger_DifferentPTT.png "Example of two different PTT axes")
