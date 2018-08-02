## Licenses

Dissonances uses parts of the WebRTC project for audio preprocessing/postprocessing and the Opus codec for encoding/decoding audio. The distribution requirements for both of these projects are quite simple - you must include copies of the license in your project alongside `Opus.dll` and `AudioPluginDissonance.dll`:

 - [Opus License](https://webrtc.org/license/software/)
 - [WebRTC License](https://webrtc.org/license/software/)

## Runtime Dependnecies

Dissonance uses some Native plugins written in C++ for high performance audio processing. On some platforms these plugins require extra dependencies installed on the end user machine to correctly load.

## Windows (Desktop)

Requires [Visual Studio 2015 v140 Redist](https://www.microsoft.com/en-gb/download/details.aspx?id=48145). It's recommended that you package this with your application and install it as part of your install process.

## Windows (UWP)

Requires [Visual Studio 2017 v141 Redist](https://www.visualstudio.com/downloads/#title-90c66ddff7b7862f11eca8ffc80762c5). It's recommended that you package this with your application and install it as part of your install process.

## Linux

No runtime dependencies.

## MacOS

No runtime dependencies.

## Android

No runtime dependencies.

## iOS

No runtime dependencies.