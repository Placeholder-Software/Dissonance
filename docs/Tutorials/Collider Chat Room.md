# Collider Chat Rooms

This tutorial will introduce volume triggers for transmission and receipt triggers, and how they can be used to implement localised chat rooms which allow users standing within the same area in your game world to chat with each other. This tutorial builds upon the setup we built in the [Positional Audio](Tutorials/Positional Audio) guide.

> [Positional Audio](Tutorials/Positional Audio) must be set up to allow Dissonance to track player positions for spacial chat rooms to function. 3D audio does not need to be enabled.

A demo scene for this tutorial can be found in `Dissonance/Demos`.

## Step 1: Define our room volume

Imagine our game has multiple physical lobby rooms all connected to a central corridor. We decide that we want players to be able to speak to and hear the other players in whatever room they are in, and for this to dynamically update as they move from room to room.

The first thing we will need to do is define the volume which represents our lobby room. We will use Unity's trigger volumes to define our room's volume.

Create a new game object called "LobbyChatRoom". Add a `BoxCollider` to the entity, set it's size as appropriate, and check "Is Trigger".

![Box Collider](images/BoxCollider.png)

## Step 2: Add a Receipt Trigger

To allow us to hear the users talking in the lobby chat room, we will need to add a `VoiceReceiptTrigger` to our entity. Unlike the "Global" chat channel in the quick start guide, here we will add this to the entity containing our `BoxCollider`.

We want to enable "Trigger Activation", to tell the script to only listen to the room when the player is within the collider attached to the entity.

## Step 3: Define a new Chat Rooms

Right now, our receipt trigger is listening to the "Global" chat room. We want to create a new chat room for our lobby.

Click on "Configure Rooms" to go to Dissonance's static room configuration. By default, Dissonance creates three chat rooms; "Global", "Red Team" and "Blue Team". We want to add a new "Lobby" chat room. Click "Add Room", and rename the new room to "Lobby".

![Room Configuration with Lobby](images/RoomConfiguration_Lobby.png)

Now, go back to the receipt trigger, and change the selection in the "Chat Room" drop down to our new "Lobby" room.

![ReceiptTrigger with Lobby room available](images/VoiceReceiptTrigger_LobbyRoom.png)

> Chat rooms can be named dynamically when configuring the triggers programatically.

## Step 4: Add a Broadcast Trigger

We can not hear other user's talking in the lobby room, but no one is talking! We need to add a broadcast trigger to our room.

Add a `VoiceBroadcastTrigger` script to the entity. Use a Channel Type of "Room", and choose our "Lobby" room.

## Finished

We now have a trigger box set up as a chat room, whereby players standing within the collider can talk to each other in the "Lobby" chat room.