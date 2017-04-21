# Voice Activation Detector

The Voice Activation Detector (VAD) processes a a frame of audio into a single boolean which indicates if the frame is voice or silence. This can be used to automatically transmit audio when the player is speaking. Dissonance uses a VAD derived from the [chromium webRTC project](https://chromium.googlesource.com/external/webrtc).