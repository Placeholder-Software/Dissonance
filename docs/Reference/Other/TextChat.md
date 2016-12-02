# TextChat

This object exposes properties and method to do with text chat within a Dissonance session.

### Send(string, string)

Send a message to the given room.

### Whisper(string, string)

Send a message to the given player.

### MessageReceived : event Action<TextMessage>

An event which indicates a text message was received from another player. The `TextMessage` object contains information about who send the message, how they sent it and what the message is.