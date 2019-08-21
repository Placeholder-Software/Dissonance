# IMicrophoneCapture

This interface designates a behaviour as a microphone capture system which feeds audio into Dissonance.

## Default Microphone Capture

When the DissonanceComms component `Start` method is called (just once when the component is first enabled) Dissonance will look for a sibling component which implements the `IMicrophoneCapture` interface. If it does not find a suitable component it will create a `BasicMicrophoneCapture` component which internally uses the Unity [Microphone API](https://docs.unity3d.com/ScriptReference/Microphone.html). To use your custom microphone script simply drop it onto the same gameObject as DissonanceComms.

### bool IsRecording { get; }

This property indicates if the microphone component is currently recording.

While this is true audio **must** be delivered to subscribers at approximately realtime rates. Delivering audio too quickly will cause buffer overflows (these are handled by Dissonance, but audio will be lost). If your capture system does not have audio available when `Update` is called it is ok to not supply audio for one or two calls (as long as a subsequent call delivers enough audio to make up for that dead time). However, if the capture system has truly stopping supply audio you must either return `true` from `Update` (to force a reset) or just return silence (to cover up for the problem).

### TimeSpan Latency { get; }

This property should give the estimated latency of the microphone capture system. This is the total time from audio physically hitting the microphone hardware to the data being passed on to subscribers.

### WaveFormat StartCapture(string mic_name)

Attempt to begin recording. The return value indicates what format the captured data will be. If microphone capture cannot be started for any reason this method should return null. The microphone name is passed through from the UI, how it is interpreted depends upon what kind of audio capture system you are using.

Once this method has returned a non-null value `IsRecording` _must_ be set to `true` until `StopCapture` is called.

### StopCapture()

Immediately stops microphone capture, discarding any data remaining in internal buffers. `IsRecording` _must_ be set to `false` after this is called.

### Subscribe(IMicrophoneSubscriber subscriber)

Subscribes a new object to receive raw microphone data.

### bool Unsubscribe(IMicrophoneSubscriber subscriber)

Attempts to remove a previously subscribed object. Returns whether the object was found (if it was found it is assumed it was successfully removed). 

### bool Update()

Pass buffered data on to the subscribers.

Returns true if the microphone needs to be reset. In this case Stop will immediately be called (and start may be called afterwards).