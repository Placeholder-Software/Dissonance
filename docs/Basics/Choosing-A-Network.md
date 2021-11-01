The core Dissonance package does not include any network - instead Dissonance relies on integrations with other network systems to send and receive data. This gives you a lot of flexibility in choosing how you want voice data to be sent over the network. If none of the existing integrations are suitable for you you can also write a custom network integration.

## Free Integrations

Dissonance has support for 10 network systems:

* [Mirror Networking](https://assetstore.unity.com/packages/slug/143290?aid=1100lJDF)
* Unity Netcode For GameObjects (Coming Soon)
* [UNet HLAPI](https://assetstore.unity.com/packages/slug/143285?aid=1100lJDF)
* [Dark Rift 2](https://assetstore.unity.com/packages/slug/143293?aid=1100lJDF)
* [Forge Remastered](https://assetstore.unity.com/packages/slug/143286?aid=1100lJDF)
* [Photon Unity networking (2)](https://assetstore.unity.com/packages/slug/143288?aid=1100lJDF)
* [Photon Bolt](https://assetstore.unity.com/packages/slug/143291?aid=1100lJDF)
* [TNet3](https://assetstore.unity.com/packages/tools/integration/dissonance-for-tnet3-154374?aid=1100lJDF)
* [Steamworks.NET (P2P)](https://assetstore.unity.com/packages/slug/143292?aid=1100lJD)
* [WebRTC Network (P2P)](https://assetstore.unity.com/packages/tools/network/webrtc-video-chat-68030?aid=1100lJDF)

All of these packages can be downloaded from the asset store for free.

## My Application Already Has Networking

If you already have a network system set up in your application then simply sending voice through that system is the easiest option. If there is an integration package listed above for your networking system it is recommended to use that.

However, if there is no available integration package then there are two options. The first option is to build your own [custom network integration](../Tutorials/Custom-Networking.md). Dissonance includes base classes which can be extended to create a new network integration relatively easily - all that is required is writing the code to send packets, receive packets and inform Dissonance about session events (leave/join/connect/disconnect etc). This requires that your networking system supports **Unreliable & Unordered** packets (e.g. UDP), TCP is **not** suitable for high quality voice chat.

The second option is to establish another network session just for voice, using one of the existing integrations. Any integration can be used for this.

## My Application Does Not Have Networking

If you do not have any network system already set up in your application then you can choose any supported network integration.

## Which One To Choose?

### Mirror

[Mirror](https://assetstore.unity.com/packages/tools/network/mirror-129321?aid=1100lJDF) is a community built replacement for UNet. Mirror supports several different network backends, the default (Telepathy) uses TCP which is _not_ suitable for voice chat. Instead you should use Ignorance or LiteNetLibTransport (these are both very easy to install). **If you are just starting out with Unity networking, this is our recommendation**.

 - [Discord](https://discord.gg/8pmJkfH)
 - Client/Server
 - No CCU limit

### Unity Netcode For GameObjects

[Netcode for GameObjects](https://docs-multiplayer.unity3d.com/) is the new multiplayer solution developed by Unity.

 - [Documentation](https://docs-multiplayer.unity3d.com/)
 - Client/Server
 - No CCU limit

### Forge Remastered

[Forge Remastered](https://assetstore.unity.com/packages/tools/network/forge-networking-remastered-38344?aid=1100lJDF) is a free networking system available on the asset store.

 - [Discord](https://discord.gg/5kMT7zN)
 - Client/Server
 - No CCU limit

### Dark Rift 2

[Dark Rift 2](https://assetstore.unity.com/packages/tools/network/darkrift-networking-2-95309?aid=1100lJDF) is a free networking system available on the asset store.

 - [Discord](https://discord.gg/3dxyu3g)
 - Client/Server
 - No CCU limit
 - Standalone server - does not require Unity on the server

### TNet3

[TNet3](https://assetstore.unity.com/packages/tools/network/networking-and-serialization-tools-tnet-3-56798?aid=1100lJDF) is a networking and serialization system available on the asset store.

 - [Discord](https://discord.gg/tasharen)
 - Client/Server
 - No CCU limit

### Photon Bolt

[Photon Bolt](https://assetstore.unity.com/packages/tools/network/photon-bolt-free-127156?aid=1100lJDF) is a free (up to 20 CCU) networking system available on the asset store.

 - [Discord](https://discord.gg/5ySmPdQ)
 - Client/Server
 - CCU Limit (20 free)

### Photon Unity Networking 2

[Photon Unity Networking 2](https://assetstore.unity.com/packages/tools/network/pun-2-free-119922?aid=1100lJDF) is the upgrade to the very popular Photon Unity Networking asset. It is a free (up to 20 CCU) networking system available on the asset store.

 - [Forum](https://forum.photonengine.com/)
 - Photon Cloud Hosting
 - CCU Limit (20 free)

### Steamworks P2P

[Steamworks.Net](https://steamworks.github.io/) is a free low level wrapper around the Steamworks SDK. This integration requires that all users are logged into a [Steam](https://store.steampowered.com/) account. If your game already uses Steam networking this can be a free and low latency way to set up voice. Setting this up to work with Dissonance requires a little extra scripting - first you must set up a network session with `Steamworks.Net`,please refer to the [Getting Started](../Basics/Quick-Start-Steamworks.Net-P2P.md) tutorial for more details.

 - Full P2P
 - No CCU limit
 - Steam Only

### WebRTC Video Chat

[WebRTC Video Chat](https://assetstore.unity.com/packages/tools/network/webrtc-video-chat-68030?aid=1100lJDF) is a p2p networking, voice and video chat application. This integration uses **just the networking** part of the asset to carry Dissonance voice traffic - it does _not_ integrate in a way that allows `WebRTC Voice Chat` and `Dissonance Voice Chat` to understand each other. This can be used to quickly set up a fully p2p chat session requiring only a very lightweight session server (which carries no voice traffic).

 - Full P2P
 - No CCU limit

### UNet HLAPI

UNet is the **deprecated** Unity networking system. It is **not** recommended to use this for new applications.