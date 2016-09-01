## Tutorial: Audio Mixing

There is a video version of this tutorial [here](TODO).

Dissonance does not have any special support built in for audio mixing, because unity already has a powerful mixing system built in which dissonance audio is routed through. You can find out more about the unity audio mixing system [here](http://blogs.unity3d.com/2014/07/24/mixing-sweet-beats-in-unity-5-0/). This tutorial offers advice about the best way to use the unity audio pipeline for VoIP.

todo: volume ducking
todo: voice sfc (radio crackle)
todo: SALSA? http://forum.unity3d.com/threads/salsa-with-randomeyes-lip-sync-and-expression-system.242135/page-11#post-2772337
todo: Pause NPC speech when VoIP is received

Because dissonance audio is processed through the unity audio pipeline just like any other sound effect a huge variety of effects can be applied. However, you should use these effects cautiously - players will not appreciate a voip system which distorts or muffles speech so much that it cannot be understood!