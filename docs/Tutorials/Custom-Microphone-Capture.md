## Tutorial: Custom Microphone Capture

This tutorial will explain how to replace the microphone capture system in Dissonance with your own script. By doing this you will gain complete control over what audio is input to Dissonance.

## Default Microphone Capture

When the DissonanceComms component `Start` method is called (just once when the component is first enabled) Dissonance will look for a sibling component which implements the `IMicrophoneCapture` interface. If it does not find a suitable component it will create a `BasicMicrophoneCapture` component which internally uses the Unity [microphone API](https://docs.unity3d.com/ScriptReference/Microphone.html). To use your custom microphone script simply drop it onto the same gameObject as DissonanceComms.

## IMicrophoneCapture

### bool IsRecording { get; }

This property indicates if the microphone component is currently recording.

### TimeSpan Latency { get; }

This property should give the estimated latency of the microphone capture system. This is the total time from audio physically hitting the microphone hardware to the data being passed on to subscribers.

### WaveFormat StartCapture(string mic_name)

Attempt to begin recording. The return value indicates what format the captured data will be. If microphone capture cannot be started for any reason this method should return null.

The microphone name is passed through from the UI, how it is interpreted depends upon what kind of audio capture system you are using.

### StopCapture()

Immediately stops microphone capture, discarding any data remaining in internal buffers.

### Subscribe(IMicrophoneSubscriber subscriber)

Subscribes a new object to receive raw microphone data.

### bool Unsubscribe(IMicrophoneSubscriber subscriber)

Attempts to remove a previously subscribed object. Returns whether the object was found (if it was found it is assumed it was successfully removed). 

### bool Update()

Pass buffered data on to the subscribers.

Returns true if the microphone needs to be reset. In this case Stop will immediately be called (and start may be called afterwards).