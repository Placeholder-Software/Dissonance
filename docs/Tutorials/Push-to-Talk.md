!!! Video Tutorial
    See [this video](https://www.youtube.com/watch?v=Kz7qM6XditI) about push to talk activation.

When a broadcast trigger is in Push-To-Talk (PTT) mode voice will only be transmitted while the "talk" button is pressed.

To set a broadcast trigger to use PTT simply change the "Activation Mode" to "Push To Talk" and choose which input axis must be pressed for voice to be transmitted. See the [Unity documentation](https://docs.unity3d.com/Manual/class-InputManager.html) for how to define a new input axis.

![A Voice Broadcast Trigger with Push To Talk](../images/VoiceBroadcastTrigger_PTT.png)

## UI Button

Instead of using an input axis you may want to trigger push-to-talk from a UI button.

1. Set the `Activation Mode` to `Open`. This constantly transmits voice.
2. Set `Mute` to `true`. This prevents any voice from being transmitted.
3. Configure your UI button to trigger the `ToggleMute` method. This inverts the `Mute` setting each time it is called.

With this setup clicking the UI button once will unmute the trigger and speech will be transmitted, clicking the button again will mute the trigger and stop speech from being transmitted.