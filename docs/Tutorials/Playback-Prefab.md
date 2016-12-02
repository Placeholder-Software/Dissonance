# Playback Prefab

The playback prefab is how Dissonance plays the audio signal from each player. A copy of the prefab is instantiated for each player and then moved into the correct position for positional audio to work. Creating your own playback prefab allows you to customise the AudioSource settings used for voice or attach your own script to the prefab. To use a custom prefab drag the prefab into the `Playback Prefab` field on the [Dissonance Comms](Reference/Components/Dissonance-Comms.md) component inspector.

If no prefab is set Dissonance will automatically use a default prefab.

## Prefab Components

The playback prefab *must* include a `VoicePlayback` component (part of Dissonance).

You may also attach an AudioSource (part of Unity) to the prefab, in which case you can adjust some of the settings to change how voice will be played back. However, the following settings will be ignored (overwritten by Dissonance):

 - Loop
 - Pitch
 - Clip
 - Play On Awake
 
## Lifetime

When writing your own scripts to attach to the playback prefab it is important to remember that the lifetime is managed entirely by Dissonance. Prefab instances are recycled to reduce the amount of garbage created. This means that your custom script attached to the prefab must be able to handle being re-assigned from one player to another.

When there are no instances available to use, a new one is created:

 1. Prefab instantiated
 1. Default components added
 1. Activated

When the player for an instance leaves the prefab is recycled:

 1. Deactivated
 1. Stored in a pool of inactive instances

When another player joins an instance is retrieved and re-used:

 1. Retrieved from pool
 1. Activated

To handle this in your custom script is actually quite simple because Unity provides all the necessary methods:

```
VoicePlayback _playback;
string _playerName;

void Start()
{
    //This only every runs once - perform one time setup (e.g. find other components)
    _playback = GetComponent<VoicePlayback>();
}

void OnEnable()
{
    // This runs every time the script is activated - Perform per player setup
    _playerName = _playback.PlayerName;
}

void Update()
{
    // This will run every frame while the script is active
}

void OnDisable()
{
    // This runs every time the script is deactivated - Perform per player teardown
    _playerName = null;
}
```