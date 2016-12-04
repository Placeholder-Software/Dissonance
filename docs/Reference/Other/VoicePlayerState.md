# VoicePlayerState

This object exposes properties to do with other players in a Dissonance session. There is one of these objects per remote player exposed in the `Players` property on the DissonanceComms object.

### Name : string

The name of the player.

### IsConnected : bool

A value indicating if this player is currently in the session.

### IsSpeaking : bool

A value indicating if this player is currently speaking

### Amplitude : float

The current amplitude of the speech from this player. Value is in the range of 0 to 1. When using this value remember that 1 is the most ear shatteringly loud value that can possibly be played and so in most circumstances a speech signal will be *very* quiet (0 to 0.05 or less).