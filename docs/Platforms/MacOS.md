# MacOS

Running Dissonance on MacOS has no runtime dependencies.

# Permission

To record audio a MacOS app requires permission from the user. See the Unity docs [here](https://docs.unity3d.com/ScriptReference/Application.RequestUserAuthorization.html) and the Apple docs [here](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos) on how to request permission.

# Notarization

All applications running on MacOS Catalina 10.15 require "notarization". See this Apple docs [here](https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution) and a tutorial on permissions and notarization [here](https://gist.github.com/dpid/270bdb6c1011fe07211edf431b2d0fe4).

To access the microphone you will need to add two keys to the entitlements file:
 - com.apple.security.device.audio-input
 - com.apple.security.device.microphone

You may need to add other keys to enable access to networking.