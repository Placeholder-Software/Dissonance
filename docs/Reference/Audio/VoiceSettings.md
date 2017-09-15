# Voice Settings

Voice settings is a central place to control various audio settings Dissonance uses. Voice settings can be accessed through `Window > Dissonance > Quality Settings`.

![Voice Settings Editor](/images/VoiceSettings_Editor.png)

## Persistence

These settings are serialized into an asset file at `Assets/Plugins/Dissonance/Resources/VoiceSettings.asset` and are also saved into [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html). `PlayerPrefs` override the values saved in the asset.

Because the settings are saved into an asset the values you choose will be built into your game and will be the default values used by all players.

Because settings are saved into `PlayerPrefs` you can expose the settings to end users in your UI and the values will be saved on a per user basis.

> If you change these settings all users in a session __must__ have the same `Frame Size` and `Audio Quality` values.

## Frame Size

- Small (20ms)
- Medium (40ms)
- Large (60ms)

This setting determines how much voice data is sent in a single network packet. There is some overhead associated with each individual packet so using larger values will send less packets and thus reduce CPU load and network usage. However, larger values introduce more latency (more delay between speaking and hearing). Latency is a very important aspect of perceived voice quality and lowering this will improve the flow of conversations.

> This setting __must not__ be changed at runtime. It __must__ be the same for all users in a voice session.

## Audio Quality

- Low (~10KB/s)
- Medium (~17KB/s)
- High (~24KB/s)

This setting determines the bitrate the encoder will target - higher values result in higher audio quality but slightly more CPU load and network usage.

> This setting __must not__ be changed at runtime. It __must__ be the same for all users in a voice session.

## Noise Suppression

This setting determines how much noise suppression will be applied to the microphone signal before transmission. Noise in this sense is any sound which is not speech such as computer fans or microphone hiss. Noise suppression will not remove echoes other other voices playing through your speakers.

Noise suppression is not perfect and may sometimes distort speech, higher levels will remove more background noise but also risk more distortion of speech. However, the risk is fairly low - the distortion is quite minor and the noise suppressor is adaptive so it will only apply really high noise suppression when there is a lot of background noise.

> This setting may be changed at runtime. It may differ between users.