# Voice Settings

Voice settings is a central place to control various audio settings Dissonance uses. Voice settings can be accessed by clicking the "Voice Settings" button on a Dissonance Comms script.

![Voice Settings Editor](/images/VoiceSettings_Editor.png)

### Frame Size

This determines how much voice data is sent in a single network packet. There is a small amount of overhead to each packet so setting this to a higher value will reduce the overall network traffic as well as slightly reduce the amount of CPU time used by the encoder. However larger values introduce more latency (more delay between speaking and hearing) and so a lower value will significantly improve the perceived quality of the voice by players.

This setting cannot be changed at runtime.

## Audio Quality

This determines the quality level used by the encoder. Lower levels will consume less bandwidth but will sound bad, higher levels will consume more bandwidth but sound significantly better. The medium setting should sound very good in the majority of situations and it's not recommended to change the quality settings unless you are trying to tackle a specific problem.

This setting cannot be changed at runtime.

## De-Noise

This controls the de-noise filter which is applied to the microphone signal before transmission. The de-noise filter attenuates background noise, whilst attempting to leave the voice unchanged. Higher levels will reduce background noise more but, because the filter is not perfect, will also lose more voice.

This setting can be changed at runtime.

## Automatic Gain Control

Automatic Gain Control attempts to control the volume of a signal so it doesn't change too much. If all players use the same AGC settings all voices will be approximately the same volume even though the recording environments may be very different. This is very important for a pleasant conversation between a group of players.

### Target

This is the target volume of the AGC, specified as a value between 0 and 100. If you are finding that *all* players are too quiet, adjust this value up.

### Max Gain (dB)

This is the maximum amplification which can be applied to a signal by the AGC. If you have adjusted the target upwards and are finding that players are still too quiet even after a long period of continuous speech try adjusting this value up.

It is important not to set this value too high because the AGC is *always* running when the player is indicating speech (e.g. by holding Push-To-Talk), if you set the gain too high the AGC will amplify the background noise up to huge levels, and the next thing the player says will be extremely loud!

## Gain Increment (dB/s)

This is how quickly the gain is adjusted upwards. If you have significantly adjusted the max gain you will need adjust this value too. A good rule of thumb is that it should take roughly 3 seconds to increment to max gain.

## Gain Decrement (dB/s)

This is how quickly the gain is adjusted downwards. If you have significantly adjusted the max gain you will need adjust this value too. A good rule of thumb is that it should take just under 1 second to go from max gain to nothing.