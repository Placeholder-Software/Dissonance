# Voice Activation Detector

The Voice Activation Detector (VAD) processes a a frame of audio into a single boolean which indicates if the frame is voice or silence. This can be used to automatically transmit audio when the player is speaking. VAD is an internal part of Dissonance and you are extremely unlikely to directly use the classes associated with the VAD.

## Debugging the VAD

When working with the voice detector you may want to get additional information about it's state and tweak it's configuration. Dissonance includes a behaviour which displays a debugging UI for the VAD called `Vad Debug UI`. Add this behaviour to any component and it will display a UI over the game.

![Vad Debug UI](/images/VadDebugUI.png)

## Configuring the VAD

The VAD can be configured using the `VoiceDetectionConfiguration` on the `DissonanceComms` behaviour. For example:

```
var comms = GetComponent<DissonanceComms>();

//Get the config. This may be null while Dissonance is being initialised
var config = comms.VoiceDetectionConfiguration;

//Set the config. This will always be applied (even if Dissonance is still being initialised)
comms.VoiceDetectionConfiguration = config;
```

The `VoiceDetectionConfiguration` property has the type `VoiceDetection.Configuration` which contains several properties to configure different aspects of how the detector works. If you're not worried about the details of how to configure the system there is a helper method which does most of the work for you:

```
var comms = GetComponent<DissonanceComms>();

//Sensitivity may be any value between 0 and 1
var sensitivity = 0.5;

//Automatically configure the VAD with the sensitivity number
comms.VoiceDetectionConfiguration = VoiceDetection.Configuration(sensitivity);
```

This sensitivity value could be exposed to the end user by a simple slider.

### Advanced Configuration

Instead of using the helper method to create the configuration automatically it is possible to set the values to whatever you wish. Doing this is very fiddly and you should have a good understanding of how the VAD algorithm works before attempting this. There are four parameters to configure (all have sensible default values, so you don't have to configure all four).

```
comms.VoiceDetectionConfiguration = new VoiceDetection.Configuration(

    // Once the signal has been classified as speech there must be this many consecutive frames of silence before it is classified as not speech.
    //This prevents the VAD "flapping" on and off during short pauses in speech.
    deactivationHoldTimeInFrames = 17,
    
    // Sounds which are shorter than this many frames will *not* have the hold time applied.
    // They will instantly classify as not speech if the signal becomes silent. This prevents short
    // sharp sounds (keyboard noise, mouse click) turning on the VAD for a long period.
    transientDurationInFrames = 3,
    
    // How many standard deviations above the mean background noise volume must a frame be to be classified as speech.
    energyDeviationWeight = 2.6,
    
    // delta energy mean if the average difference between speech frames and non speech frames. 
    // How much of this difference must a frame be over the mean background noise to classify as speech.
    deltaEnergyMeanWeight = 0.36,
);
```

## Analysis Algorithm

The current VAD implementation works by analysing the [power](https://en.wikipedia.org/wiki/Audio_power) of the audio signal (approximated as the RMS of the signal) - when the RMS exceeds a threshold value the VAD classifies the frame as voice.

```
bool Analyse(audio_frame)
{
    return RMS(audio_frame) > Threshold
}
```

The challenging part of this algorithm is deciding what threshold value to use. This is solved by measuring some additional parameters of the audio signal.

When a frame is classified as silence the energy of this frame is stored and used to calculate the mean and standard deviation of background frame (BG_Energy and BG_Energy_Dev), this tells us how loud the background noise currently is. When a frame is classified as speech the *difference* between the mean background energy and the speech frame is calculated and used to calculate the mean difference (Delta_Energy), this tells us how loud a frame should be to classify as speech.

These values are used to bias the analysis slightly:

```
bool Analyse(audio_frame)
{
    let rms = RMS(audio_frame);
    let threshold = BG_Energy;
    let bias = BG_Energy_Dev * A + Delta_Energy * B;
    
    return rms - bias > threshold;
}
```

In this example A and B are tweakable values between 0 and 1 which define the sensitivity of the system.

## States

The basic algorithm outlined above can be very "noisy", i.e. rapidly switch between classifying frames as voice and silence as the speaker pauses to draw a breath or between words. Additionally to measure all the additional statistics it's necessary to know a little more about the signal in the recent past (e.g. don't measure the background noise if the speaker *just* stopped speaking). The VAD has multiple states which it moves through to compensate for these things.

![VAD States](/images/VAD_States.png)

#### Startup

This is the intial state the VAD begins in. When in this state a frame will *never* be classified as speech. During this time the parameters of the audio signal are being measured, it is assumed that the quietest frames are silence. Transition to "Silence" after a fixed number of frames (transition 1).

#### Silence

This state indicates that the previous frame was silence. When this state has persisted for over a fixed number of frames the background energy measurement is updated (this means the VAD is adaptive to changing background noise over time). Transition to "Short Speech" if a single frame is over the threshold (transition 2).

#### Short Speech

This indicates that the VAD has been classifying frames as speech for a short period of time. Transition back to "Silence" If any frame is classified as silence (transition 3). Transition to "Long Speech" if this state persists for a fixed number of frames (transition 5).

If there is a short loud noise which is incorrectly classified as speech (e.g. a click of a mouse) this will classify as a single frame of speech and then instantly transition back to silence.

#### Long Speech

This indicates that the VAD has been classifying frames as speech for a long time, while in this state all frames will be classified as speech. Transition to "Silence" if a *consecutive run* of frames as classified as silence (transition 6).

This "sticky" state ensures that the speaker must stop talking for a relatively long period of silence before the signal will be classified as silence.