## Tutorial: Custom Microphone Capture

By default Dissonance uses the `BasicMicrophoneCapture` behaviour to record audio from a microphone using the Unity [Microphone API](https://docs.unity3d.com/ScriptReference/Microphone.html) and feed it into Dissonance. However this script is not ideal for all use cases. You can replace the microphone capture system in Dissonance by creating a new behaviour which implements `IMicrophoneCapture` and adding the script to the same gameObject as the `DissonanceComms` behaviour.

This tutorial will explain how to build a replacement capture system which streams audio from a file. before following the tutorial make sure you've read the [reference docs](../Reference/Audio/IMicrophoneCapture.md) so you understand what the `IMicrophoneCapture` interface means.

## Step 1 : Basic Setup

First you need to create a new script with the IMicrophoneCapture interface on it and drop it onto the same GameObject as the DissonanceComms component.

[Here is an example script](https://gist.github.com/martindevans/266553f7405c393e5a41d4729b67fa1e). If you run the scene with this you should see a single exception printed to the console coming from the `StartCapture` method.

## Step 2 : Start And Stop

Now you need to properly start and stop the script without throwing exceptions.

`StartCapture` should return the format of the audio you will be providing. This **must** be mono (i.e. 1 channel) and any sample rate is acceptable (just use whatever is most convenient for you). If your capture system is not ready you can return null to prevent start-up. If you return a non-null value you **must** set `IsRecording` to `true` and you **should** set `Latency` to an appropriate value. The `Latency` value indicates an estimate of the time between sound physically hitting the microphone to submitting the audio to Dissonance, if you don't know this value leave it set to zero.

`StopCapture` should do whatever you need to stop the underlying capture system. Once this is done you **must** set `IsRecording` to `false`.

`Subscribe` and `Unsubscribe` should simply keep a list of subscribers. You can implement this as a `List<IMicrophoneSubscriber>` where `Subscribe` just calls `Add` and `Unsubscribe` just calls `Remove` and returns the value.

[here is an example script](https://gist.github.com/martindevans/47127ccde8e5b7abeaa4cc0b49d60759). If you run the scene with this you should see exceptions printed to the console every frame coming from the `UpdateSubscribers` method.

## Step 3 : Streaming Silence

Now you need to stream some audio to Dissonance to stop the script throwing exceptions every frame.

When `IsRecording` is `true` (i.e. after `StartCapture` has been called and before `StopCapture` has been called) your capture script **must** provide audio at approximately a realtime rate. Dissonance will try to handle slight "bumps" (e.g. audio arriving slightly early or late) but overall you must supply audio at the correct rate. For example the `BasicMicrophoneCapture` script assumes that the microphone supplies audio at the correct rate, if you're reading from some kind of recording hardware this is probably a good assumption to make. The basic process for the microphone capture (which you may be able to replicate in your custom system) is:

 1. Drain all data from the recording hardware into a buffer
 2. Copy as much data out of the buffer into a preallocated array as possible
 3. Submit preallocated array to subscribers
 4. if there is data left in the buffer, goto 2

For this step we won't interact with any hardware, instead we'll just submit _silence_ to Dissonance at the correct rate.

[here is an example script](https://gist.github.com/martindevans/2ab034c885cf0c038db8fda471336596) which implements UpdateSubscribers by simply submitting _silence_ at the correct rate. If you run this everything should work as expected in Dissonance (no exceptions), but of course you will not hear anything. This works by preallocating an array of 960 `float`, which represents 20ms of audio at 48kHz sample rate. Every time 20ms have elapsed, the buffer is submitted to Dissonance. Note that time is measured using `unscaledDeltaTime`, since audio needs to run at _real_ time rate. 

## Step 4 : File Streaming

Finally we'll add a basic file streaming system, this will read an audio file and play it into Dissonance. For simplicity this will _not_ handle decoding of the audio from any well know format, instead you should transcode the audio into raw samples. You can do this with [ffmpeg](https://ffmpeg.org/):

 > ffmpeg.exe -re -i AudioFile.wav -f f32le -ar 48000 -ac 1 output.raw

[here is an example script](https://gist.github.com/martindevans/ad4df4d1f771538bb7f474756cbb3711) which implements this. The basic process is the same as the silence system:

 1. Count time passed using `unscaledDeltaTime`
 2. When 20ms have passed, read up to 20ms of audio from the file (as bytes)
 3. Copy bytes into float buffer
 4. Submit to all subscribers