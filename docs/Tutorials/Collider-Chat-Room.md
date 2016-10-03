# Collider Chat Rooms

There is a video version of this tutorial [here](TODO).

This tutorial will introduce volume triggers for transmission and receipt triggers, and how they can be used to implement localised chat rooms which allow users standing within the same area in your game world to chat with each other. This tutorial builds upon the setup in the [Position tracking](Tutorials/Position-Tracking) guide.

> [Position Tracking](Tutorials/Position-Tracking) must be set up to allow Dissonance to track player positions for collider chat rooms to function.

A demo scene for this tutorial can be found in `Dissonance/Demos`.

## Step 1: Define our room volume

Imagine your game has multiple physical lobby rooms all connected to a central corridor. You decide that we want players to be able to speak to and hear the other players in whatever room they are in, and for this to dynamically update as they move from room to room.

The first thing you will need to do is define the volume which represents your lobby room using a Unity [trigger volume](https://unity3d.com/learn/tutorials/topics/physics/colliders-triggers).

Create a new game object called "LobbyChatRoom". Add a "Box Collider" to the game object, set it's size to the size of your lobby room and check "Is Trigger".

![Box Collider](/images/BoxCollider.png)

## Step 2: Add a Receipt Trigger

To allow you to hear the users talking in the lobby chat room you will need to add a "Voice Receipt Trigger" to the game object. Unlike the "Global" chat channel in the quick start guide, here you will add this to the same game object as the "Box Collider".

Enable "Trigger Activation" on the "Voice Receipt Trigger" to tell the script to only listen to the room when the player is within the collider attached to the game object.

## Step 3: Define a new Chat Rooms

Right now, the receipt trigger is listening to the "Global" chat room, not the chat room for the lobby.

On the inspector for the "Voice Receipt Trigger" click "Config Rooms" to go to Dissonance's room configuration. By default, Dissonance creates three chat rooms; "Global", "Red Team" and "Blue Team". Click "Add Room", and rename the new room to "Lobby".

![Room Configuration with Lobby](/images/RoomConfiguration_Lobby.png)

Now, go back to the receipt trigger, and change the selection in the "Chat Room" drop down to the new "Lobby" room.

![ReceiptTrigger with Lobby room available](/images/VoiceReceiptTrigger_LobbyRoom.png)

> Chat rooms can be named dynamically when configuring the triggers programatically.

## Step 4: Add a Broadcast Trigger

You now have a receiver configured to hear other people alking in the lobby room, but no one is saying anything! You need to add a broadcast trigger to the room.

Add a "Voice Broadcast Trigger" script to the game object. Use a Channel Type of "Room", and choose the "Lobby" room.

![BroadcastTrigger with Lobby room available](/images/VoiceBroadcastTrigger_LobbyRoom.png)

## Finished

You now have a trigger box set up as a chat room. Players standing within the collider can talk to each other in the "Lobby" chat room, players who walk out of the volume will not be able to speak to or hear from the lobby room.