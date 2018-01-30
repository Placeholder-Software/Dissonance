# VoicePlayerState

This object exposes properties to do with other players in a Dissonance session. There is one of these objects per player (including the local player) in the `Players` property on the DissonanceComms component. You can also get one of these objects for a specific player with the `FindPlayer` method on the DissonanceComms component.

``` cs
//Get your comms component
DissonanceComms comms;

//Get a specific player
VoicePlayerState player = comms.FindPlayer("Player ID");

//Enumerate all players in the session
for (var i = 0; i < comms.Players.Count; i++) {
    VoicePlayerState player = comms.Players[i];
}
```


## Events

### OnStartedSpeaking : Action&lt;VoicePlayerState&gt;

This event is raised every time this player starts speaking. It is passed the state object for this player.

    VoicePlayerState.OnStartedSpeaking += player => {
        Debug.Log("Player " + player.Name + " Started Speaking");
    }

### OnStoppedSpeaking : Action&lt;VoicePlayerState&gt;

This event is raised every time this player stops speaking. It is passed the state object for this player.

    VoicePlayerState.OnStoppedSpeaking += player => {
        Debug.Log("Player " + player.Name + " Stopped Speaking");
    }

### OnEnteredRoom : Action&lt;VoicePlayerState, string&gt;

This event is raised every time this player begins listening to a new room. It is passed the state object for this player and the name of the room.

    VoicePlayerState.OnEnteredRoom += (player, room) => {
        Debug.Log("Player " + player.Name + " began listening to room " + room);
    }

### OnExitedRoom : Action&lt;VoicePlayerState, string&gt;

This event is raised every time this player stops listening to a room. It is passed the state object for this player and the name of the room.

    VoicePlayerState.OnExitedRoom += (player, room) => {
        Debug.Log("Player " + player.Name + " stopped listening to room " + room);
    }

### OnLeftSession : Action&lt;VoicePlayerState&gt;

This event is raised when the player leaves the session. After this the session object will never be used again. Even if the same player rejoins with the same name, they will be assigned a new state object.

    VoicePlayerState.OnLeftSession += player => {
        Debug.Log("Player " + player.Name + " Left Session");
    }

## Read Only Properties

### Name : String

The name of this player. This is the value in the `DissonanceComms:LocalPlayerName` property for that player.

    DissonanceComms comms;
    VoicePlayerState aPlayer;
    if (aPlayer.Name == comms.LocalPlayerName) {
        Debug.Log(aPlayer.Name + " is the local player");
    }

### IsConnected : bool

Get a value indicating if this player is currently in the session.

### IsSpeaking : bool

Get a value indicating if this player is currently speaking

### Amplitude : float

Get the current amplitude of the speech from this player. Value is in the range of 0 to 1. When using this value remember that 1 is the loudest value that can possibly be produced by the audio system - in most circumstances a speech signal will be *very* quiet (0 to 0.05 or less).

### SpeakerPriority : ChannelPriority?

Get the current priority of speech from this speaker. Null if the player is not speaking.

### Rooms : ReadOnlyCollection&lt;string&gt;

Get the list of rooms this player is currently listening to.

### Playback : VoicePlayback

Get the `VoicePlayback` component associated with this player. May be null if Dissonance is still setting up playback for this player, or the player has left the session.

### Tracker : IDissonancePlayer

Get the `IDissonancePlayer` component associated with this player. May be null if Dissonance is still setting up tracking for this player, this player does not have a `IDissonancePlayer` component, or the player has left the session.

## Properties

### Volume : float

Get or set the Volume which speech from the player should be played at. The value is a direct multiplier applied to the audio and should be in the range 0 to 1.

### IsLocallyMuted : bool

Get or set if this player is locally muted and will not produce any audio on the local machine.

## Methods

###  GetSpeakingChannels(channels: List<RemoteChannel>)

Get a snapshot of the channels you are hearing this speaker through. If they are not speaking to you then this will return no results. The `channels` parameter passed in must not be null, the list will be cleared and then filled with the current snapshot.