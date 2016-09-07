# Text Chat

Dissonance allows text chat messages to be routed through the comms network to the same players and chat rooms used by the voice comms network. This tutorial will demonstrate the APIs provided to send and receive text chat messages with Dissonance.

## Send a text message to a Chat Room

```c#
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

// send a text message to the Party chat channel
dissonance.Text.Send("Party", "Who just pulled the boss?")
```

## Send a text message to a player

```c#
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

// send a text message to a specific player
dissonance.Text.Whisper("hunter", "Did you just pull the boss?")
```

## Receive a text message

```c#
// get the DissonanceComms script from the Dissonance game object
var dissonance = GetComponent<DissonanceComms>();

dissonance.Text.MessageRecieved += message => {
    var format = "[{0}] {1}: {2}";
    if (message.RecipientType == ChannelType.Player)
        format = "{1} whispers: {2}";
    
    chatLog.Write(string.Format(format, message.Recipient, message.Sender, message.Message));
};
```