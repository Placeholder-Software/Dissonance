# Packet Format

Dissonance sends several types of packets:

 - Client State
 - Player Routing Update
 - Network Stats
 - Voice Data
 - Text Data

All packets are prefixed with a single byte which indicates which of these types the packet contains. The definition for the header bytes can be found in `Dissonance.Networking.MessageTypes`.

Packets are built by encoding a sequence of primitive types, code for encoding/decoding the primitives can be found in `Dissonance.Networking.PacketWriter` and `Dissonance.Networking.PacketReader`.

## Client State

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

## Player Routing Update

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

## Network Stats

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

## Voice Data

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

todo: bitfield

## Text Data

A text data packet contains a single text chat message. Clients send these to the server which then relays them on to the necessary clients.

```
Header (Byte)
Bitfield (Byte) # see below for details
Sender ID (UInt16)
Target ID (UInt16)
Text (String)
```

A text packet can be directed to a player or a room. This is encoded within the bitfield byte by setting the least significant bit to indicate the target:

```
Room = 0
Player = 1

Target = (ChannelType)(Options & 1);
```

The other bits of the bitfield are currently unused.

The Target ID field indicates who should receive this message, it's meaning is dependent upon the target type. If the target type is "Player" then the Target ID is a player ID. If the target type is "Room" then the Target ID is a room ID.

## Primitives (Numbers)

All numbers are encoded in network order (big endian). A Byte is written out directly, all other numbers are built by writing out bytes.

#### UInt16

```
LSB (Byte)
MSB (Byte)
```

#### String

```
(Length In UTF8 encoded bytes) + 1 (UInt16) # A zero value is a special flag for a null string
if (string is not null)
{
    UTF8 Bytes
}
```

#### Byte[]

```
Length (UInt16)
Data    (Raw Bytes)
```