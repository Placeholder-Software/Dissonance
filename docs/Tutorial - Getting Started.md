## Tutorial: Getting Started

There is a video version of this tutotial [here](TODO).

In this tutorial we will get setup with the most basic configuration for voip - all players speak to each other in a single, with no positional audio.

1. Enable "unsafe" code

For Dissonance to compile we first need to [enable the compilation of unsafe code](https://docs.unity3d.com/Manual/PlatformDependentCompilation.html), to do this simply create a file named smcs.rsp (for .Net 2.0 Subset) or gmcs.rsp (for .Net 2.0) with a single line inside:

 > -unsafe

2. Run in background!

2. Add dissonance asset
3. Add a VoiceComm to the scene and configure it
4. Add appropriate networking integration to same entity as VoiceComm
5. Add a channel transmitter for global voice
6. Add echo cancellation effect to master bus
7. Profit???

For more information about configuring dissonance channels, continue with the [channels tutorial](Tutorial---Multiple-Channels).