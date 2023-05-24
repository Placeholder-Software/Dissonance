# BaseMicrophoneSubscriber

This script makes it easier to directly access the recorded audio data. All methods on this script are called on the main thread.

Implement a new script with `BaseMicrophoneSubscriber` as the base class instead of `MonoBehaviour`, once you have done this register an instance of the behaviour to receive data by calling `DissonanceComms.SubscribeToRecordedAudio`.

See also [IMicrophoneSubscriber](IMicrophoneSubscriber.md) which does not have any of the ease-of-use features of this script, providing more direct access.

### ResetAudioStream(WaveFormat waveFormat)

This method is called by Dissonance whenever the audio stream is being reset, or the audio format is changing. The `waveFormat` argument indicates the format of the next data which will be delivered.

When this is called you should immediately finish any work you were doing with the audio and prepare for more audio to be delivered soon. For example if you are recording audio to a file you would flush the file writer and close the file handle.

### ProcessAudio(ArraySegment<float> data)

This method is called by Dissonance for every frame of recorded audio data. The `data` argument contains raw PCM audio data.

After this method has finished executing you **must not** hold any references to the `data` argument. Any data that you want to store for processing later must be copied out of the `data`.