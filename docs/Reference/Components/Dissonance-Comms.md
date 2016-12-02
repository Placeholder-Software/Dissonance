# Dissonance Comms

The Dissonance Comms component is the central place to configure Dissonance. There must be an active one within the scene for Dissonance to work.

![Dissonance Comms Inspector](/images/DissonanceComms_Inspector.png "Dissonance Comms Inspector")

## Playback Prefab

This is a prefab for the audio playback system. For every remote player who is in the voice session Dissonance will instantiate this prefab, and use it to play the voice from that player. If left blank the default playback prefab included with Dissonance will be used. Read more about the playback prefab and how you can customise it [here](Tutorials/Playback-Prefab.md).
 
## Mute

This will prevent the local player from sending any voice.

## Access Tokens

This is the set of [access tokens](/Tutorials/Access-Control-Tokens.md) which the local player has.

## Voice Settings

Clicking this button opens an inspector where audio settings relating to voice may be changed.

## Configure Rooms

Clicking this button opens an inspector where rooms can be created or deleted.

## Diagnostic Settings

Clicking this button opens an inspector where Dissonance diagnostic settings may be changed (e.g. log levels).

# Scripting

Dissonance Comms is also the central place to access Dissonance from scripts.

### IsMuted : bool

If set to true the local player will not send any voice signal.

### PlayerPriority : ChannelPriority

The [priority](Tutorials/Channel-Priority.md) of the local player, if a channel is opened with no priority set this priority will be used as a default.

### LocalPlayerNameChanged : event Action<string>

This event runs whenever the local player name is changed.

### LocalPlayerName : String

The name of the local player, this will be initialised to a unique ID per player when Dissonance starts.

### IsNetworkInitialised : bool

Indicates if the Dissonance network has been successfully initialised yet.

### Rooms : Rooms

An object which exposes various properties and methods to do with rooms the local player is listening to. See further documentation [here](Reference/Other/Rooms.md).

### PlayerChannels : PlayerChannels

An object which exposes various properties and method to do with players the local player is speaking to. See further documentation [here](Reference/Other/PlayerChannels.md).

### RoomChannels : RoomChannels

An object which exposes various properties and methods to do with room the local player is speaking to. See further documentation [here](Reference/Other/RoomChannels.md).

### Text : TextChat

An object which exposes various properties and methods to do with text chat. See further documentation [here](Reference/Other/TextChat.md).

### Players : ReadOnlyCollection<VoicePlayerState>

A list of `VoicePlayerState` objects, one for each remote player currently in the session. See further documentation on `VoicePlayerState` [here](Reference/Other/VoicePlayerState.md).

### TopPrioritySpeaker : ChannelPriority

The highest [priority](Tutorials/Channel-Priority.md) of all remote players currently speaking in the session.

### Tokens : IEnumerable<string>

The set of [tokens](Tutorials/Access-Control-Tokens.md) which the local player possesses.

### TokenAdded : event Action<string>

An event which runs whenever a token is added to the local player.

### TokenRemoved : event Action<string>

An event which runs whenever a token is removed from the local player.

### SubcribeToVoiceActivation(IVoiceActivationListener)

Subscribes the given listener object to the voice activation detector (VAD) for the local player. When VAD detects speech the `VoiceActivationStart` method will be called. When the VAD stops detecting speech the `VoiceActivationStop` method will be called.

### UnsubscribeFromVoiceActivation(IVoiceActivationListener)

Unsubscribes a previously subscribed listener object from the VAD.

### TrackPlayerPosition(IDissonancePlayer)

Begins [position tracking](Tutorials/Position-Tracking.md) for the player represented by the given object.

### StopTracking(IDissonancePlayer)

Stops [position tracking](Tutorials/Position-Tracking.md) for the player represented by the given object.

### AddToken(string)

Adds a [token](Tutorials/Access-Control-Tokens.md) to the local player.

### RemoveToken(string) : bool

Removes a [token](Tutorials/Access-Control-Tokens.md) from the local player and returns a bool indicating if that token was removed. This will return false if the player never had the token in the first place.

### ContainsToken(string) : bool

Returns a boolean value indicating if the local player has the [token](Tutorials/Access-Control-Tokens.md) with the given name.

### HasAnyToken(TokenSet) : bool

Returns a boolean value indicating if the local player has *any* of the [tokens](Tutorials/Access-Control-Tokens.md) in the given TokenSet.