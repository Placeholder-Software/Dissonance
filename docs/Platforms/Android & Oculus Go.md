# Android (Including Oculus Go)

On Android you must request permission to use the microphone, see the Unity documentation for this [here](https://docs.unity3d.com/Manual/android-manifest.html). If you use `Android 6.0` or greater and `API level 23` or greater there is a runtime permissions system which Unity does not support. However there is some excellent documentation by Oculus on how to build a plugin to request permissions [here](https://developer.oculus.com/blog/tech-note-android-plugins-and-permissions/).

### ARM64

Dissonance includes ARM64 binaries compatible with Android, these are only enabled in Unity 2018.1+ (Unity 2017.4 does not support ARM64).