# Voice Proximity Receipt Trigger

The Voice Proximity Receipt Trigger receives voice to an infinite grid of "virtual rooms", creating a proximity chat system by placing nearby players into the same rooms.

![Voice Proximity Receipt Trigger Inspector](../../images/ProximityReceiptTrigger_Inspector.png "Voice Proximity Receipt Trigger Inspector")

## Room

This section controls which room the trigger receives from.

#### Chat Room

It is possible to have several proximity broadcast systems running simultaneously (e.g. one per team), the room name uniquely identifies this room.

#### Range

Set the distance to receive voice, players within this distance will be considered "near" and will be placed into the same room.

!!! hint
    The range must be exactly the same for the broadcast trigger and the receipt trigger!

## Access Tokens

Add [Access Tokens](../../Tutorials/Access-Control-Tokens.md) which are required for this broadcaster to broadcast voice. This trigger will only receive if the DissonanceComms component has one or more of the necessary tokens.

#### Collider Activation

Only receive when the local player is inside a sibling collider volume.