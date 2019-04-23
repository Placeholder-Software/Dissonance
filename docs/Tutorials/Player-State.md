# Player State

Dissonance offers an easy to use API for finding out information about other players in the session.

## Discovering Players

There are two ways to discover who is in the Dissonance session - events and polling. To get a list of players currently in the session, you can access the `Players` property on the DissonanceComms object:

```csharp
var comms = FindObjectOfType<DissonanceComms>();
foreach (var player in comms.Players)
{
	Debug.Log("Player " + player.Name + " is in the game");
}
```

This will give you a set of [VoicePlayerState](../Reference/Other/VoicePlayerState.md) objects (including one for the local player). These objects will stay valid forever and will be updated with new information as necessary.

Dissonance also exposes some events which will get invoked when certain things happen, for example a new player joining the session.

```csharp
var comms = FindObjectOfType<DissonanceComms>();
comms.OnPlayerJoinedSession += player => {
	Debug.Log("Player " + player.Name + " Joined session");
}

comms.OnPlayerLeftSession += player => {
	Debug.Log("Player " + player.Name + " Left session");
}
```

The `player` objects passed to the event handlers here are [VoicePlayerState](../Reference/Other/VoicePlayerState.md) objects which expose a lot of useful data about the players such as if they are currently talking and a live readout of the amplitue.