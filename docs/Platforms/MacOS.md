# MacOS

Running Dissonance on MacOS has no runtime dependencies.

To record audio a MacOS app requires permission from the user. See the Unity documentation [here](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos) on how to request permission.

You will need to include the [NSMicrophoneUsageDescription](https://docs.unity3d.com/Manual/HOWTO-PortToAppleMacStore.html) key in the `info.plist` file.