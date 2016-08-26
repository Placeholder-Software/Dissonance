## Tutorial: Basic VoIP

There is a video version of this tutorial [here](TODO).

In this tutorial you will create a very basic voice chat system with a single global room which all users talk in.

To follow this tutorial you'll need to have already imported Dissonance into your project. To see how to do that follow this [Getting Started](Tutorial---Getting-Started) tutorial.

### 1. Create Scene

First you should create a new scene and add a blank new entity (Hierarchy > Right Click > Create Empty). Name the entity "Dissonance".

### 2. Add DissonanceVoiceComms

Select the new entity you just created and then in the component Inspector click "Add Component" and add a "Dissonance Voice Comms" component. This component is the main place where you can configure Dissonance from.

The inspector will show two errors, which you will need to fix next.

#### 2a. Add Playback Prefab

Dissonance needs to know *how* to play back the voice data - for this tutorial you're just going to use the default. Open the Assets/Dissonance folder and drag the "PlaybackPrefab" into the appropriate box on the component.

This will cause one of the two errors to disappear.

#### 2b. Add Network Integration

Dissonance needs to know what network system you want to use to send your data. For this demo you should just use the LLAPI (UNet Low Level Networking API) integration. To do this click Add Component on the Dissonance entity and add "U Net Voice Network".

The Dissonance Voice Comms component should now not show any errors.

Just for this demo you also need to add another component which creates a network session and displays a basic user interface. Add "Llapi Manager" to the Dissonance entity.

### 3. Add Broadcaster

If you run the game now you should see a screen which asks you to create or join a server. If you run two instances of the game you should be able to run one as the server and connect the other to "localhost". However, you will not hear any voice because neither client has a way to transmit any voice!

Add a "Voice Broadcast Trigger" component to your Dissonance entity. From here you can configure how voice should be transmitted and which room should hear the transmission. Change "Activation Mode" to "Open Mic", make sure "Position Data" is unchecked and leave everything else with the default settings.

These settings mean that the Dissonance will transmit your voice constantly to a room called "global", everyone who is listening to that room will hear you.

### 4. Add Listener

If you were to run the game now now you would still not hear any voice. This is because you are transmitting but no one is listening!

Add a "Voice Receipt Trigger" component to the Dissonance entity. Set the chat room to "Global" (this should be the same as your Voice Broadcast Trigger room setting).

This means that as soon as the game starts all clients will transmit to the global room, and all clients will also listen to the global room.

## 5. Complete!

That's all you need to get voice chat going between two network clients. There are a number of tutorials you could move onto from here, covering various different topics to do with configuring Dissonance:

 - [Rooms](TODO)
 - [Quality](TODO)
 - [Audio Mixing](TODO)
 - [Network Integrations](TODO)
 - [Positional Audio](TODO)
 - [User Interface](TODO)
 - [Tips And Tricks](TODO)
