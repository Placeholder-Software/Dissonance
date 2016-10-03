# Dissonance Comms

The Dissonance Comms component is the central place to configure Dissonance. There must be an active one within the scene for Dissonance to work.

![Dissonance Comms Inspector](/images/DissonanceComms_Inspector.png "Dissonance Comms Inspector")

## Playback Prefab

This is a prefab for the audio playback system. For every remote player who is in the voice session Dissonance will instantiate this prefab, and use it to play the voice from that player. There is a pre-built prefab included with Dissonance for this purpose.

If you wish to use your own prefab it must include at least the following three components:

 - A dissonance "VoicePlayback" component
 - A dissonance "SamplePlaybackComponent" component
 - A unity AudioSource which is playing the flatline_1.0 audio clip

## Player Name

todo: See discussion in <https://github.com/TomGillen/Dissonance/issues/105>

## Quality

These settings configure the quality of audio used by Dissonance. The Medium settings should sound very good in the majority of situations and it's not recommended to change the quality settings unless you are trying to tackle a specific problem.

### Frame Size

This determines how much voice data is sent in a single network packet. Setting this to a higher value will reduce the amount of network traffic as well as slightly reduce the amount of CPU time used by the opus encoder.

However realtime voice requires low latencies for conversation to flow properly, and so a lower value will significantly improve the perceived quality of the voice by players.

### Audio Quality

This determines the quality setting used by the encoder. A higher quality will sound better but will require more bandwidth and CPU time. Conversely a lower quality will sound worse but will require less bandwidth and CPU time.

## Configure Rooms

Clicking this button opens an inspector where rooms can be created or deleted.