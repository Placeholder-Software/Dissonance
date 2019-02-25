# iOS

Running Dissonance on iOS has no runtime dependencies.

In the [Player Settings for iOS](https://docs.unity3d.com/Manual/class-PlayerSettingsiOS.html) there are four settings relevant to voice chat:

 - `Microphone Usage Description`: You ***must*** enter the reason for accessing the microphone on the iOS device.
 - `Prepare iOS for Recording`: You ***must*** enable this setting to enable low latency audio recording.

---

 - `Mute Other Audio Sources`: You ***may*** enable this to ensure that background audio does not interfere with voice audio.
 - `Force iOS Speakers when Recording`: You ***may*** enable this to force audio to the speakers even when headphones are plugged in. If this is not enabled _all_ application audio will be played through the call speakers instead of the main speakers as soon as recording starts.