# Text Chat

Dissonance allows text chat messages to be routed through the comms network to the same players and chat rooms used by the voice comms network. This tutorial will demonstrate the APIs provided to send and receive text chat messages with Dissonance.

## Send a text message to a Chat Room

```
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

// send a text message to the Party chat channel
dissonance.Text.Send("Party", "Who just pulled the boss?")
```

## Send a text message to a player

```
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

// send a text message to a specific player
dissonance.Text.Whisper("hunter", "Did you just pull the boss?")
```

## Receive a text message

Dissonance will only send you text messages if they are directly addressed to you or to a room which you are listening to. To listen to a room you can use a voice receipt trigger [voice receipt trigger](../Reference/Components/Voice-Receipt-Trigger.md), or directly use the Dissonance API from scripts to enter the room.

```
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

//If necessary, enter a room using the scripting API
dissonance.Rooms.Join("Room Name");

dissonance.Text.MessageRecieved += message => {

	//This code will run every time you receive a text message

    var format = "[{0}] {1}: {2}";
    if (message.RecipientType == ChannelType.Player)
        format = "{1} whispers: {2}";
    
    chatLog.Write(string.Format(format, message.Recipient, message.Sender, message.Message));
};
```