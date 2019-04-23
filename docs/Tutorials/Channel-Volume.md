# Channel Volume

The playback volume can be set by the speaker per broadcast channel. This can be used to individually reduce the volume of a speaker. For example fading off voice over a small period of time when someone stops speaking.

## Broadcast Trigger Component

The broadcaster trigger component exposes 2 amplitude settings in the inspector; activation fade and trigger fade.

![Amplitude Fader Controls](../images/VoiceBroadcastTrigger-AmplitudeFaders.png)

`Activation Fade` applies a fade in/out _every time_ speech is started or stopped. For example every time push-to-talk is pressed/released. This setting should be used with care; applying *any* fade-in is inadvisable as it will almost certainly cause the start of what is being said to be cut off.

`Volume Trigger Fade` applies only to broadcast triggers which are using physics based volume triggers. This fade will be applied every time the player enters or exits the trigger area.

Both faders have the same three controls:

The `Channel Volume` slider controls the amplitude which will be reached after the fade in time has passed. This is a direct multiplier applied to the audio, values between 0 to 1 will reduce playback amplitude, values between 1 to 2 will increase playback amplitude. If both faders are in use the values will be _multiplied_ together.

The `Fade In Time` slider controls how long it takes the playback amplitude to increase from zero (silent) to the `Channel Volume` slider value.

The `Fade Out Time` slider controls how long it takes the playback amplitude to decrease from  the `Channel Volume` slider value to zero (silent).

## Script Controlled Volume

If you are [controlling channels directly](Script-Controlled-Speech.md) from your own scripts you can control volume on the channel object.

```csharp
var comms = GetComponent<DissonanceComms>();

//Create a channel with explicit amplitude
var channel = comms.RoomsChannels.Open("Room Name", amplitudeMultiplier: 0.5f);

//At any time while the channel is open change the amplitude
channel.AmplitudeMultiplier = 1.0f;

//Close the channel
channel.Dispose();
```