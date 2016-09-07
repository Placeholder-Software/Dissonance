## Global Chat Room

A global chat room is just a single room which all users talk to and listen to. This is a very simple system to create using Dissonance.

![Example of inspector for a single global chat room](/images/GlobalChatRoom_Inspector.png "Example of inspector for a single global chat room")

1. Create a Voice Broadcast Trigger and a Voice Receipt Trigger on the root Dissonance game object
2. Set the room for both of them to "Global".

Both components will activate when the scene loads (on each different computer in the network session) and all players will be in the room.
