# Network Integrations

The core Dissonance package does not do any networking itself - instead it relies on integrations with other network systems to send and receive data. This gives you a lot of flexibility in choosing how you want voice data to be sent between computers. If none of the existing integrations are suitable for you you can even write a custom network integration.

The easiest setup is simply to send voice data through whatever networking system you are already using. However this isn't required - for example if you have a game using TCP for it's networking (which is unsuitable for voice comms) you could keep the game over that network and establish a second session just for voice chat. See the `Standalone Networking` section for more details on this.

## Basic Integrations

These integrations simply send data though a network session which you first setup - Dissonance starts itself when it detects that a network session has been started and stops itself when the network session is stopped. These are the simplest network integrations to use, if your application is already using one of these backends you just need to drop some components into the scene and you immediately have a functional Dissonance voice chat session.

 - [UNet HLAPI](https://assetstore.unity.com/packages/slug/143285?aid=1100lJDF)
 - [Mirror Networking](https://assetstore.unity.com/packages/slug/143290?aid=1100lJDF)
 - [Forge Remastered](https://assetstore.unity.com/packages/slug/143286?aid=1100lJDF)
 - [Photon Bolt](https://assetstore.unity.com/packages/slug/143291?aid=1100lJDF)
 - [Photon Unity Networking (Classic)](https://assetstore.unity.com/packages/slug/143287?aid=1100lJDF)
 - [Photon Unity networking (2)](https://assetstore.unity.com/packages/slug/143288?aid=1100lJDF)
 - [Dark Rift 2](https://assetstore.unity.com/packages/slug/143293?aid=1100lJDF)
 - TNet3 (Coming Soon!)

#### Steamworks.NET P2P
The Steamworks integration hosts a voice chat session using [Steamworks.NET](https://steamworks.github.io/) peer to peer networking, **it requires all users to be logged into a [Steam](https://store.steampowered.com/) account**. This can be a useful integration to use if your game already uses steamworks for game networking, or if your primary game networking is not suitable for voice.

Before starting Dissonance you must first have established peer to peer connectivity between all peers using Steamworks.NET, refer to the [Steamworks documentation](https://partner.steamgames.com/doc/api/ISteamNetworking) for further details on this. This is separated from the others in this section because you will need to have done some scripting to setup the session and will need to inform Dissonance of certain networking events (e.g. start/stop/join/leave session).

---

## Standalone Networking

These integrations host a voice chat session separately from any other networking system you may be using. These are _slightly_ more complicated to setup but they have the advantage that voice data is not mixed with other application data. You may want to use these integrations if your application does not have any other networking, or if your application network usage is metered and you don't want to pay the costs of voice traffic.

#### UNet LLAPI
> This integration hosts a voice chat session using the UNet low level networking API (LLAPI), to start a session you need to supply the port/IP address of the host computer to all clients. All voice packets are sent via the server. There is no NAT negotiation included in LLAPI so you may need to use a third party asset or host the server on a computer with no NAT.

#### WebRTC Network
> This integration hosts a voice chat session using [WebRTC Network](https://assetstore.unity.com/packages/tools/network/webrtc-video-chat-68030?aid=1100lJDF), to start a session you need to supply a unique session ID string to all clients. This includes NAT negotiation and all packets are sent peer to peer to reduce the amount of bandwidth used by the server. There is [a demo project](https://github.com/Placeholder-Software/Dissonance-Demo) using Dissonance and this integration to build a standalone peer to peer chat application.

## Custom Networking

If none of these options work for you it's possible to write a custom network backend for Dissonance - any system which can send _unreliable_ packets (e.g. UDP) can carry voice data. There is detailed documentation on exactly how to do this [here](../Tutorials/Custom-Networking.md).