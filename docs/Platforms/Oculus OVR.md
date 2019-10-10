# Oculus OVR

If you are using the [Oculus OVR SDK](https://assetstore.unity.com/packages/tools/integration/oculus-integration-82022) you must disable the `Ovr Avatar` component from taking exclusive control of the microphone (which prevents Dissonance from using it).

![OVR Local Avatar](../images/OVR Local Avatar.png "OVR Local Avatar")

1. Locate the `LocalAvatar` gameobject
2. Unchecked `Can Own Microphone` in the inspector for the `Ovr Avatar` component