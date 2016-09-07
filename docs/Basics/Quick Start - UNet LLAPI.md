# Quick Start: Dissonance with UNet Low Level API (LLAPI)

> This Quick Start guide is for those of you integrating Dissonance into a game without piggybacking onto your game's existing networking system.

This tutorial will guide you through the steps required to get a basic Dissonance setup working in your project. By the end of this tutorial, you will having working voice comms with all users talking in a global chat room.

Before beginning this tutorial, please refer to the [installation guide](/Basics/Getting Started.md) to learn how to install Dissonance into your project.

A demo scene for this tutorial can be found in the `Dissonance/Integrations/UNet_LLAPI/Demo` folder.

## Step 1: Dissonance Comms Entity

> Dissonance runs mostly from a single entity, which should be placed somewhere near the root of your scene. This entity contains the main `DissonanceComms` behavior, together with the UNet LLAPI networking script. For this quick start guide, we will also attach transmission and receipt trigger scripts to this entity.

To place the default Dissonance entity into your scene, drag and drop the `DissonanceSetup` prefab from the `Dissonance/Integrations/UNet_LLAPI` folder into your scene.

Once you have instantiated the `DissonanceSetup` prefab, you should have an entity with two scripts attached: `DissonanceComms` and `UNetCommsNetwork`. We will explain and configure these next.

## Step 2: Configure the Network

The `UNetCommsNetwork` script is responsible for transporting comms traffic for Dissonance across the network. 

Dissonance manages its own set of sockets for its own client/server network upon which comms data is routed. As the UNet LLAPI does not have any uniform concept of a game session, Dissonance does not automatically know anything about the peers in the game; it needs to be told to start the server on one of the clients, or to connect to the server's IP on the other clients.

### Starting the Server

To start the server, grab a reference to the `UNetCommsNetwork` script on the Dissonance entity, and call `InitializeAsServer`.

```c#
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.InitializeAsServer();
```

### Connect to the Server

To connect to the server as a client, grab a reference to the `UNetCommsNetwork` script on the Dissonance entity, and call `InitializeAsClient`.

```c#
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.InitialzeAsClient(serverIpWithoutPort);
```

### Configuring the port

By default, the Dissonance server will listen on (and the client will try to connect to) port `5589`. To change this port, set the `Config.Port` property on the `UNetCommsNetwork` *before* initializing the client or sever. This will need to be done on both clients and the server.

```c#
var dissonanceNetwork = GetComponent<UNetCommsNetwork>();
dissonanceNetwork.Config.Port = 1234;
dissonanceNetwork.InitializeAsServer();
```

> **Note** Dissonance does not provide any NAT punch-through tooling. Your game will have to provide means to connect to servers hosted behind NAT.

## Step 3: Add a Broadcast Trigger

We now have a working Dissonance comms system, but we are not transmitting anything.

Before we can speak to anyone, we need to add a `VoiceBroadcastTrigger` script to our scene. This script can be placed anywhere, but for this tutorial, we will add it to the DissonanceSetup entity we created earlier.

The `VoiceBroadcastTrigger` controls when the user's microphone is being transmitted to other players, and to whom the user is talking. There are many configuration options on this script to provide more advanced control of under what situations we should be transmitting and who to, but for this tutorial we will leave these settings at default.

![Broadcast Trigger Configuration](/images/VoiceBroadcastTrigger_Default.png)

The default broadcast trigger configuration includes two settings of note to us here:
1. Transmit on *Voice Activation*. This means Dissonance will transmit whenever it detects that the user is speaking.
2. Transmit to the 'Global' chat room.

## Step 4: Add a Receipt Trigger

Now we are talking into the 'Global' room automatically whenever the user speaks. However, we can't hear anyone. This is because we are not listening to the 'Global' room ourselves, and so are not receiving any of these transmissions.

To listen to the 'Global' room, add a `VoiceReceiptTrigger` to the scene. Like the `VoiceBroadcastTrigger`, this script can be placed anywhere, but for this tutorial we will add it to the DissonanceSetup entity.

![Receipt Trigger Configuration](/images/VoiceReceiptTrigger_Default.png)

Again, we will leave this on the default configuration, which should have trigger activation disabled and be listening to the 'Global' chat room.

## And We're Done!

Congratulations, you have now added voice comms to your game! What to do next?

* [Transmit on key press with Push-to-Talk](/Tutorials/Push-to-Talk)
* [Set up per-team chat channels](/Tutorials/Team Chat Rooms)
* [Direct message another player](/Tutorials/Direct Player Transmit)
* [Send text chat messages](/Tutorials/Text Chat)
* [3D Positional Audio](/Tutorials/Positional Audio)
* [3D Area Chat Rooms](/Tutorials/Collider Chat Room)
* [Proximity Chat: Talk to players near each other](/Tutorials/Proximity Chat)