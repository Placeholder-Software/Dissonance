If you need the voice of one person to come from multiple audio sources (e.g. a walkie talkie), you can achieve this with audio cloning.

## Setup

1. Create a [custom playback prefab](Playback-Prefab.md)
2. Attach `AudioCloneSource` to the playback prefab
3. Create a GameObject with an AudioSource, attach `AudioCloneSink` to this GameObject
4. Set the `Source` property of the `AudioCloneSink` to the `AudioCloneSource`

Audio will now be copied from the source (the default Dissonance voice playback) to the sink (your additional AudioSource).

## Scripting Setup

If you need to set this up in code you can do it like this:

```csharp
// Get DissonanceComms
var comms = DissonanceComms.GetSingleton();

// Get the player
var player = comms.FindPlayer("ID of the player to clone");

// Get the GameObject which is being used for voice playback
var playback = ((MonoBehaviour)player.Playback).gameObject;

// Attach source
var src = playback.AddComponent<VoiceCloneSource>();

// Setup a gameobject with an audio source
var go = new GameObject("sink");
go.AddComponent<AudioSource>();
var sink = go.AddComponent<AudioCloneSink>();

// Link them together
sink.Source = src;
```