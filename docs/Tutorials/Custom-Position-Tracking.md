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
    bool IsTracking { get; }
}
```

Once you have implemented these five properties on your tracker you must register it with Dissonance, To do this simply call `DissonanceComms.GetSingleton().TrackPlayerPosition(this);` after tracking has started. Once this tracker is no longer in use you must unregister your tracker from Dissonance, to do this simply call `DissonanceComms.GetSingleton().StopTracking(this);`.

#### PlayerId

This is the ID of the player which this object represents. For the local player this is the value in the `LocalPlayerName` property on your `DissonanceComms` object. Trackers attached to remote player objects must discover the ID for the players it represents.

Usually this discovery is done by sending the ID across the network, exactly how this works depends on your networking system. Most implementations follow a similar flow:

1. Discover that this instance represents the local player (e.g. `OnStartClient`, `OnStartAuthority` callback)
2. Get `DissonanceComms.GetSingleton().LocalPlayerName` and send it to the server (e.g. `ServerRPC`)
3. Server sends the `LocalPlayerName` to all instances (e.g. `SyncVar`, or `Command`)
4. Instances receive this message and then:
  - set `PlayerId = ID`
  - set `Type = Remote`
  - set `IsTracking = true`
  - call `DissonanceComms.GetSingleton().TrackPlayerPosition(this);`

Care must be taken to ensure that late-joining players receive the message in step #3 correctly. For example using a `buffered RPC` or a `SyncVar`.

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

If you want to represent a slightly different location (e.g. your player is made of multiple objects, one of which represents the head) then you would need to change the implementation of the properties slightly:

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

public void OnEnable()
{
    _head = GetHeadTransform();
}
```

#### Type

This indicates to Dissonance if this object represents the (singular) local player or one of the (multiple) remote players. How you implement this property depends upon your network system. For example:

```csharp
public NetworkPlayerType Type
{
    get { return isLocalPlayer ? NetworkPlayerType.Local : NetworkPlayerType.Remote; }
}
```