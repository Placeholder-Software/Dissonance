# IMicrophoneSubscriber

This interface allows a script to be added into the Dissonance audio recording pipeline, giving you direct access to the audio data.

Once you have implemented the `IMicrophoneSubscriber` on a class you can register an instance of the class to receive data by calling `DissonanceComms.SubscribeToRecordedAudio`. See [this tutorial](../../Tutorials/UsingIMicrophoneSubscriber.md) for more information.

The methods on this interface are automatically called by Dissonance, they **are not called on the main thread**. You must be careful in implementations of this interface to handle 

### Reset

This method is called by Dissonance whenever the audio pipeline is being reset. When this is called you should immediately finish any work you were doing with the audio and prepare for more audio to be delivered soon. For example if you are recording audio to a file you would flush the file writer and close the file handle.

### ReceiveMicrophoneData

This method is called by Dissonance for every frame of recorded audio data. The `buffer` argument contains raw PCM audio data. The `format` argument indicates the format of the data in the buffer, this will only change after `Reset` has been called.

After this method has finished executing you **must not** hold any references to the `buffer` argument. Any data that you want to store for processing later must be copied out of the `buffer`.