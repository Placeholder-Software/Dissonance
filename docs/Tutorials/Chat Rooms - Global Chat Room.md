## Global Chat Room

The simplest configuration for voice communication is a single global chat room which all users send to and receive from.

![Example of inspector for a single global chat room](/images/GlobalChatRoom_Inspector.png "Example of inspector for a single global chat room")

To achieve this simply create a Voice Broadcast Trigger and a Voice Receipt Trigger on the root Dissonance game object, set the room for both of them to "Global". Both components will activate when the scene loads (on each different computer in the network session) and all players will be in the room.