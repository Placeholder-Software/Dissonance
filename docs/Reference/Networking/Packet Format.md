# Packet Format

Dissonance sends 4 types of packets:
 - Client State
 - Player Routing Update
 - Network Stats
 - Voice Data

All packets are prefixed with a single byte which indicates which of these types the packet contains. The definition for the header bytes can be found in `Dissonance.Networking.MessageTypes`.

Packets are built by encoding a sequence of primitive types, code for encoding/decoding the primitives can be found in `Dissonance.Networking.PacketWriter` and `Dissonance.Networking.PacketReader`.

### Client State

The client state message contains the complete state of the client, it is sent whenever it changes. This should only ever be sent by a client and only ever be received by the server.

Packet layout:

```
Header (Byte)
Player Name (String)
Room Count (UInt16)
for each Room
{
    Id (UInt16)
}
```

### Player Routing Update

The player routing update contains a map between player names and player IDs. It is a serialized version of the RoutingTable class  which can be found in `Dissonance.Networking.RoutingTable`.

This should only ever be sent by the server, and only ever be received by clients.

Packet Layout:

```
Header (Byte)
ID Count (UInt16)
for ID
{
    # Index of name in collection is the ID
    # A null name indicates a free ID    
    Name (String)
}
```

### Network Stats

The network stats message contains statistics on the quality of network connections. This should only ever be sent by the server and received by a client.

The packet contains the server round trip time (RTT) from itself to every client. Each individual client can use this to calculate it's approximate RTT to another client by simply adding together the RTT:

```
RTT(A, B) = RTT(A, Server) + RTT(Server, B)
```

Packet layout:

```
Header (Byte)
Connection Count (UInt16)
for each Connection
{
    PlayerId (UInt16)
    RoundTripTime (UInt16)
}
```

### Voice Data

A voice data packet contains a frame of encoded audio. Clients send these to the server which then relays them on to other clients which need to play that audio.

Packet layout:

```
Header (Byte)
Unused (Byte)
Sender Id (UInt16)
Sequence Number (UInt16)
Channel Count (UInt16)
for each channel
{
    Bitfield (Byte) # See below for bitfield details
    Channel Recipient (ushort)
}
Frame Bytes Count (UInt16)
Audio Frame (Byte[])
```