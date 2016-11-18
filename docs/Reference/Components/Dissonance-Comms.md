# Dissonance Comms

The Dissonance Comms component is the central place to configure Dissonance. There must be an active one within the scene for Dissonance to work.

![Dissonance Comms Inspector](/images/DissonanceComms_Inspector.png "Dissonance Comms Inspector")

## Playback Prefab

This is a prefab for the audio playback system. For every remote player who is in the voice session Dissonance will instantiate this prefab, and use it to play the voice from that player. If left blank the default playback prefab included with Dissonance will be used.

If you wish to use your own prefab it *must* include a "VoicePlayback" component (part of Dissonance). It may also include an *AudioSource* component (part of unity), you can adjust some of the settings on this AudioSource to suit your needs. Dissonance will overwrite the following settings:

 - Loop
 - Bypass Reverb Zones
 - Pitch
 - Doppler Level
 - Clip
 - Play On Awake
 
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