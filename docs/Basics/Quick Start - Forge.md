# Quick Start: Dissonance with Forge Networking

> This Quick Start guide is for those of you integrating Dissonance into a game with **Forge Networking**.

This tutorial will guide you through the steps required to get a basic Dissonance setup working in your project. By the end of this tutorial, you will having working voice comms with all users talking in a global chat room. There is a video version of this tutorial [here](TODO).

Before beginning this tutorial, please refer to the [installation guide](/Basics/Getting Started.md) to learn how to install Dissonance into your project.

A demo scene for this tutorial can be found in the `Dissonance/Integrations/Forge/Demo` folder.

## Step 1: Dissonance Comms Object

> Dissonance runs mostly from a single game object, which should be placed somewhere near the root of your scene. This game object contains the main "Dissonance Comms" behavior, together with the Forge networking script.

To place the default Dissonance game object into your scene, drag and drop the `DissonanceSetup` prefab from the `Dissonance/Integrations/ForgeNetworking` folder into your scene. This should create a game object with two scripts attached: "Dissonance Comms" and "Forge Comms Network".

> The Forge integration automatically configures itself once started, it's only requirement is that it is enabled in a scene after the forge network session is started. It is recommended that you either programmatically instantiate the Dissonance object after initializing the Forge network, or load Dissonance in a separate scene which is loaded after the scene containing the Forge network setup.

## Step 2: Add a Broadcast Trigger

You now have a functional Dissonance comms system, but you are not yet transmitting anything.

Before you can speak to anyone, you need to add a "Voice Broadcast Trigger" script to our scene. This script can be placed anywhere, but for this tutorial, you should simply add it to the DissonanceSetup game object you created in step 1.

The "Voice Broadcast Trigger" controls when the user's microphone is being transmitted to other players, and to whom the user is talking. There are many configuration options on this script to provide more advanced control of under what sitations we should be transmitting and who to, but for this tutorial simply leave the settings at default.

![Broadcast Trigger Configuration](/images/VoiceBroadcastTrigger_Default.png)

The default broadcast trigger configuration includes two settings of note:
1. Transmit on *Voice Activation*. This means Dissonance will transmit whenever it detects that the user is speaking.
2. Transmit to the 'Global' chat room.

## Step 3: Add a Receipt Trigger

Now you are talking into the 'Global' room automatically whenever you speak. However, you still can't hear anyone speaking. This is because you are not listening to the 'Global' room and so you are not receiving any of these transmissions.

To listen to the 'Global' room, add a "Voice Receipt Trigger" to the scene. Like the "Voice Broadcast Trigger", this script can be placed anywhere, but for this tutorial you should simply add it to the DissonanceSetup game object.

![Receipt Trigger Configuration](/images/VoiceReceiptTrigger_Default.png)

Again, leave this on the default configuration, which should have trigger activation disabled and be listening to the 'Global' chat room.

## You're Done!

Congratulations, you have now added voice comms to your game! What to do next?

* [Transmit on key press with Push-to-Talk](/Tutorials/Push-to-Talk)
* [Set up per-team chat channels](/Tutorials/Team Chat Rooms)
* [Direct message another player](/Tutorials/Direct Player Transmit)
* [Send text chat messages](/Tutorials/Text Chat)
* [3D Positional Audio](/Tutorials/Positional Audio)
* [3D Area Chat Rooms](/Tutorials/Collider Chat Room)
* [Proximity Chat: Talk to players near each other](/Tutorials/Proximity Chat)