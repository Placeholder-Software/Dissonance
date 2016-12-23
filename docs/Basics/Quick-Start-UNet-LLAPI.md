# Quick Start: Dissonance with UNet Low Level API (LLAPI)

> This Quick Start guide is for those of you integrating Dissonance into a game without piggybacking onto your game's existing networking system.

This tutorial will guide you through the steps required to get a basic Dissonance setup working in your project. By the end of this tutorial, you will having working voice comms with all users talking in a global chat room.

Before beginning this tutorial, please refer to the [installation guide](/Basics/Getting-Started) to learn how to install Dissonance into your project.

A demo scene for this tutorial can be found in the `Dissonance/Integrations/UNet_LLAPI/Demo` folder.

## Step 1: Dissonance Comms Object

> Dissonance runs mostly from a single game object, which should be placed somewhere near the root of your scene. This object contains the main "Dissonance Comms" behavior, together with the UNet LLAPI networking script. For this quick start guide, we will also attach transmission and receipt trigger scripts to this object.

To place the default Dissonance object into your scene, drag and drop the `DissonanceSetup` prefab from the `Dissonance/Integrations/UNet_LLAPI` folder into your scene.

Once you have instantiated the `DissonanceSetup` prefab, you should have an object with two scripts attached: "Dissonance Comms" and `UNetCommsNetwork`.

## Step 2: Configure the Network

The `UNetCommsNetwork` script is responsible for transporting comms traffic for Dissonance across the network. 

Dissonance manages its own set of sockets for its own client/server network upon which comms data is routed. As the UNet LLAPI does not have any uniform concept of a game session, Dissonance does not automatically know anything about the peers in the game; it needs to be told to start the server on one of the clients, or to connect to the server's IP on the other clients.

### Starting the Server

To start the server, grab a reference to the `UNetCommsNetwork` script on the Dissonance entity, and call `InitializeAsServer`.

```
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.InitializeAsServer();
```

### Connect to the Server

To connect to the server as a client, grab a reference to the `UNetCommsNetwork` script on the Dissonance entity, and call `InitializeAsClient`.

```
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.InitializeAsClient(serverIpWithoutPort);
```

### Configuring the port

By default, the Dissonance server will listen on (and the client will try to connect to) port `5589`. To change this port, set the `Config.Port` property on the `UNetCommsNetwork` *before* initializing the client or server. This will need to be done on both clients and the server.

```
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.Config.Port = 1234;
dissonanceNetwork.InitializeAsServer();
```

> **Note** Dissonance does not provide any NAT punch-through tooling. Your game will have to provide means to connect to servers hosted behind NAT.

## Step 3: Add a Broadcast Trigger

You now have a functional Dissonance comms system, but you are not yet transmitting anything.

Before you can speak to anyone, you need to add a "Voice Broadcast Trigger" script to our scene. This script can be placed anywhere, but for this tutorial, you should simply add it to the DissonanceSetup game object you created in step 1.

The "Voice Broadcast Trigger" controls when the user's microphone is being transmitted to other players, and to whom the user is talking. There are many configuration options on this script to provide more advanced control of under what sitations we should be transmitting and who to, but for this tutorial simply leave the settings at default.

![Broadcast Trigger Configuration](/images/VoiceBroadcastTrigger_Default.png)

The default broadcast trigger configuration includes two settings of note:
1. Transmit on *Voice Activation*. This means Dissonance will transmit whenever it detects that the user is speaking.
2. Transmit to the 'Global' chat room.

## Step 4: Add a Receipt Trigger

Now you are talking into the 'Global' room automatically whenever you speak. However, you still can't hear anyone speaking. This is because you are not listening to the 'Global' room and so you are not receiving any of these transmissions.

To listen to the 'Global' room, add a "Voice Receipt Trigger" to the scene. Like the "Voice Broadcast Trigger", this script can be placed anywhere, but for this tutorial you should simply add it to the DissonanceSetup game object.

![Receipt Trigger Configuration](/images/VoiceReceiptTrigger_Default.png)

Again, we will leave this on the default configuration, which should have trigger activation disabled and be listening to the 'Global' chat room.

## You're Done!

Congratulations, you have now added voice comms to your game! What to do next?

* [Transmit on key press with Push-to-Talk](/Tutorials/Push-to-Talk)
* [Set up per-team chat channels](/Tutorials/Team-Chat-Rooms)
* [Direct message another player](/Tutorials/Direct-Player-Transmit)
* [Send text chat messages](/Tutorials/Text-Chat)
* [3D Positional Audio](/Tutorials/Position-Tracking)
* [3D Area Chat Rooms](/Tutorials/Collider-Chat-Room)
* [Proximity Chat: Talk to players near each other](/Tutorials/Proximity-Chat)