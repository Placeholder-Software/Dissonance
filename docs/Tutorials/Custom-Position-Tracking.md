This tutorial will explain how to write a scripts necessary to extend the Dissonance position tracking system to more advanced scenarios. The basics of position tracking are explained in [this tutorial](Position-Tracking.md).

## How Dissonance Tracks Players

Dissonance tracks the position of players through a behaviour which implements the IDissonancePlayer interface. This interface exposes the necessary information for Dissonance to play back voices in the correct locations.

```csharp
public interface IDissonancePlayer
{
    string PlayerId { get; }
    Vector3 Position { get; }
    Quaternion Rotation { get; }
    NetworkPlayerType Type { get; }
}
```

Once you have implemented these four properties on your tracker you must register it with Dissonance, To do this simply call `FindObjectOfType<DissonanceComms>().TrackPlayerPosition(this);` at some point after tracking has started. Once this tracker is no longer in use you must unregister your tracker from Dissonance, to do this simply call `FindObjectOfType<DissonanceComms>().StopTracking(this);`.

#### PlayerId

This is the ID of the player which this object represents. For the local player this is the value in the `LocalPlayerName` property on your `DissonanceComms` object. This value should be synchronised across the network. How this works will depend upon your networking system. For example here is how the HLAPI integration does it:

```csharp
private string _playerId;

// This property implements the PlayerId part of the interface
public string PlayerId { get { return _playerId; } }

// When the network system starts this behaviour, this method runs
public override void OnStartAuthority()
{
    base.OnStartAuthority();

    // Get the local DissonanceComms object 
    var comms = FindObjectOfType<DissonanceComms>();

    // Call set player name, to sync the name across all peers
    SetPlayerName(FindObjectOfType<DissonanceComms>().LocalPlayerName);
    
    // Make sure that if the local name is changed the
    // changed is synced the change across the network
    comms.LocalPlayerNameChanged += SetPlayerName;
}

private void SetPlayerName(string playerName)
{
    CmdSetPlayerName(playerName);
}

// This is a "Command" which means that it is run on *all* peers when run.
// This is does the actual synchronisation of the name across the network.
[Command]
private void CmdSetPlayerName(string playerName)
{
    _playerId = playerName;
}
```

#### Position And Rotation

These properties supply the location information which is used by Dissonance to properly play positional audio. If the behaviour is attached to the object which represents the player position then implementing this is trivial:

```csharp
public Vector3 Position
{
    get { return transform.position; }
}

public Quaternion Rotation
{
    get { return transform.rotation; }
}
```

If you wanted to represent a slightly different location (e.g. your player is made of multiple objects, one of which represents the head) then you would need to change the implementation of the properties slightly:

```csharp
private MonoBehaviour _head;

public Vector3 Position
{
    get { return _head.transform.position; }
}

public Quaternion Rotation
{
    get { return _head.transform.rotation; }
}

// When this behaviour is enabled, find the other object we want to get the position from
public void OnEnable()
{
    _head = GetEntityWhichRepresentsTheHead();
}
```

#### Type

This indicates to Dissonance if this object represents the (singular) local player or one of the (multiple) remote players. How you implement this property depends upon your network system. Using the HLAPI integration as an example again:

```csharp
public NetworkPlayerType Type
{
    get { return isLocalPlayer ? NetworkPlayerType.Local : NetworkPlayerType.Remote; }
}
```

This assumes that the component is attached to a player object. Therefore if it is *not* the local player then it must be a remote player.