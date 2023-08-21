# Android (Including Oculus Quest)

On Android the user must grant permission before the Microphone is accessed. Since Dissonance uses the Unity `Microphone` class the `Record_Audio` permission should have already been added to the [app manifest](https://docs.unity3d.com/Manual/android-manifest.html). When the application is started the user is asked for all of the permissions in the manifest in one dialog.

If `Microphone` permission is not granted when Dissonance is started it will operate in listen-only mode.

The [Runtime Permission System](https://docs.unity3d.com/Manual/android-RequestingPermissions.html) may be be used to request permission from the user again at any time. If permission is granted after Dissonance has already started you should call [DissonanceComms.ResetMicrophoneCapture](../Reference/Components/Dissonance-Comms.md#resetmicrophonecapture) to restart the microphone recording system.