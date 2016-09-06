# Team Chat Rooms

In this tutorial, we will build team chat channels allowing each user to hold V to talk to their team, with dynamic team channels.

## Step 1: Create Our Team Chat Key Binding

We will use the default Unity input axis API to define a new input axis for our team chat button.

Open input settings via Edit->Project Settings->Input. Increase the `size` field to create a new axis, then expand the axis and rename it to "TeamChat", and the description to "Push-to-Talk Team Chat". Set the `Positive Button` to `v`.

## Step 2: Setup Broadcast/Receive Triggers

Create a new game object, and name it "Team Chat". Add `VoiceBroadcastTrigger` and `VoiceReceiveTrigger` scripts to the entity.

Change the activation mode of the broadcast trigger to `Push To Talk`, and set the input axis name to `TeamChat`.

Disable both scripts. We will enable them once we know which team the player belongs to.

## Step 3: Join the Team Chat Room

We will create a new chat room for every team, named after the team name, and dynamically place the player into this room. Create a new script and place it on the same entity as the triggers:

```c#
public void JoinTeamChatRoom(string teamName)
{
    // find the broadcaster and receiver triggers
    var broadcaster = GetComponent<VoiceBroadcastTrigger>();
    var receiver = GetComponent<VoiceReceiptTrigger>();

    // set the room name to the team chat room
    broadcaster.RoomName = teamName + " Chat";
    receiver.RoomName = teamName + " Chat";
    
    // enable the triggers to join the team chat room
    broadcaster.enabled = true;
    receiver.enabled = true;    
}
```

Once you know which team the player belongs to, call `JoinTeamChatRoom` to enable their push to talk team chat.