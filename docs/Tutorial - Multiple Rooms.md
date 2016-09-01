## Tutorial: Multiple Rooms

There is a video version of this tutorial [here](TODO).

Dissonance supports multiple "rooms" for voice. Which rooms a player sends and receives from are configured by two components - a "Voice Broadcast Trigger" component controls which rooms a player sends voice to and a "Voice Receipt Trigger" component controls which rooms a player hears voice from. This system is very flexible and allows many different types of setup. For details on these components see the reference documentation for [Voice Broadcast Trigger](Reference/Components/Voice Broadcast Trigger.md) and [Voice Receipt Trigger](Reference/Components/Voice Receipt Trigger.md).

This tutorial will describe several different systems you may want, and how to create them. All these examples assume you already have a DissonanceVoiceComms component setup with a playback prefab and a network integration - see [Basic VoIP](Tutorial - Basic VoIP.md) (step 2) for details on how to set this up.

### Global chat Room

A global chat room which everyone speaks in and everyone hears is very simple and was demonstrated in the [Basic VoIP](Tutorial - Basic VoIP.md) tutorial. To achieve this simply create a Voice Broadcast Trigger and a Voice Receipt Trigger on the root Dissonance game object, set the room for both of them to "Global". Both components will activate when the scene loads and all players will speak/listen to the same room.

If you bind the global chat broadcast trigger to a new input axis such as "GlobalChat" you can add this setup to all your games while still keeping more advanced chat such as per team chat rooms.

![Example of inspector for a single global chat room](/images/GlobalChatRoom_Inspector.png "Example of inspector for a single global chat room")

### Team Chat Room

To create a team chat room you simply want to create the same system as for a single global chat room but duplicated multiple times - once for each team. Then you should disable all of the components. When your game assigns the local player to a team you should simply insert a small script to activate the correct chat room.

This depends a lot on how your networking system assigns players to teams, feel free to [ask for help](https://www.reddit.com/r/dissonance_voip/). Here is some example code:

```
void AssignPlayerToTeam(string teamName)
{
    //Find the broadcaster and receiver in the scene which correspond to the correct team
    var broadcaster = FindObjectsOfType<VoiceBroadcastTrigger>().SingleOrDefault(b => b.RoomName == teamName);
    var receiver = FindObjectsOfType<VoiceReceiptTrigger>().SingleOrDefault(r => r.RoomName == teamName);
    
    //Sanity check that we found what we're looking for
    if (broadcaster != null && receiver != null)
    {
        //enable the components for this team
        broadcaster.enabled = true;
        receiver.enabled = true;
    }
    else
        Debug.Log("Cannot find voice components for team '{0}'", teamName);
}
```

### Location Chat

To create a chat room which requires you to be standing in a certain place in the game to join the room you should use trigger volumes. Using trigger volumes requires that you have properly set up Dissonance for [positional audio](Tutorial - Positional Audio.md) as this is used to track when the player enters and exits the trigger volumes.

To create a Unity trigger volume you need to attach 2 new components to the same game object as the broadcaster/receiver you want to trigger - A RigidBody component and a collider component. On the collider component check the "Is Trigger" checkbox and on the relevant Voice Broadcaster Trigger/Voice Receipt Trigger components check the "Proximity Activation" Checkbox.

Whenever the game object which represents the local player enters the trigger volume the triggers will activate, and the player will be able to speak/hear in the relevant room.

![Example of inspector for a trigger volume](/images/RoomTriggerVolume_Inspector.png "Example of inspector for a trigger volume")

### Proximity Chat Room

todo
