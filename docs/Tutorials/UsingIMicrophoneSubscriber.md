## Direct Access To Recorded Audio

Dissonance includes a mechanism for directly accessing the stream of recorded audio, this can be used to drive features such as recording the mic input to file or passing it through a Speech-To-Text system.

There are two ways to implement this, direct low-level access through [IMicrophoneSubscriber](../Reference/Audio/IMicrophoneSubscriber.md) and easier access through [BaseMicrophoneSubscriber](../Reference/Audio/BaseMicrophoneSubscriber.md).

Once you have created a script which uses either of these systems you must register it to receive data from Dissonance by calling `FindObjectOfType<DissonanceComms>().SubscribeToRecordedAudio(your_script)` and passing in your script as `your_script`.

### BaseMicrophoneSubscriber

This provides easy access to the microphone audio stream. This script handles capturing and buffering the data, it is delivered in batches on the main thread.

### IMicrophoneSubscriber

This provides direct access to the microphone audio stream as directly as possible. Audio is delivered to the `ReceiveMicrophoneData` method on the background audio processing thread **not** the main thread. Only use this if `BaseMicrophoneProvider` does not meet your use case!