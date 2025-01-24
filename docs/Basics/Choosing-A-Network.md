The core Dissonance package does not include any network - instead Dissonance relies on integrations with other network systems to send and receive data. This gives you a lot of flexibility in choosing how you want voice data to be sent over the network. If none of the existing integrations are suitable for you you can also write a custom network integration.

## Free Integrations

Dissonance has support for 10 network systems. All of these packages can be downloaded from the asset store for free and receive support as part of Dissonance.

* [Mirror Networking](https://assetstore.unity.com/packages/slug/143290?aid=1100lJDF)
* [Unity Netcode For GameObjects](https://assetstore.unity.com/packages/slug/206514?aid=1100lJDF)
* [UNet HLAPI](https://assetstore.unity.com/packages/slug/143285?aid=1100lJDF)
* [Dark Rift 2](https://assetstore.unity.com/packages/slug/143293?aid=1100lJDF)
* [Forge Remastered](https://assetstore.unity.com/packages/slug/143286?aid=1100lJDF)
* [Photon Unity networking (2)](https://assetstore.unity.com/packages/slug/143288?aid=1100lJDF)
* [Photon Bolt](https://assetstore.unity.com/packages/slug/143291?aid=1100lJDF)
* [TNet3](https://assetstore.unity.com/packages/tools/integration/dissonance-for-tnet3-154374?aid=1100lJDF)
* [Steamworks.NET (P2P)](https://assetstore.unity.com/packages/slug/143292?aid=1100lJD)
* [WebRTC Network (P2P)](https://assetstore.unity.com/packages/tools/network/webrtc-video-chat-68030?aid=1100lJDF)

There are also community developed and maintained packages.
 * [Fish Networking](https://assetstore.unity.com/packages/tools/network/fish-net-networking-evolved-207815?aid=1100lJDF), available from [GitHub](https://github.com/LambdaTheDev/DissonanceVoiceForFishNet).
 * [PurrNet](https://assetstore.unity.com/packages/tools/network/purrnet-297320?aid=1100lJDF), available from [GitHub](https://github.com/BobsiUnity/PurrNet-VoiceChat).


## My Application Already Has Networking

If you already have a network system set up in your application then simply sending voice through that system is the easiest option. If there is an integration package listed above for your networking system it is recommended to use that.

However, if there is no available integration package then there are two options. The first option is to build your own [custom network integration](../Tutorials/Custom-Networking.md). Dissonance includes base classes which can be extended to create a new network integration relatively easily - all that is required is writing the code to send packets, receive packets and inform Dissonance about session events (leave/join/connect/disconnect etc). This requires that your networking system supports **Unreliable & Unordered** packets (e.g. UDP), TCP is **not** suitable for high quality voice chat.

The second option is to establish another network session just for voice, using one of the existing integrations. Any integration can be used for this.

## My Application Does Not Have Networking

If you do not have any network system already set up in your application then you can choose any supported network integration.

## Which One To Choose?

### Mirror

[Mirror](https://assetstore.unity.com/packages/tools/network/mirror-129321?aid=1100lJDF) is a community built replacement for UNet. **If you are just starting out with Unity networking, this is our recommendation**.

 - [Discord](https://discord.gg/8pmJkfH)
 - Client/Server
 - No CCU limit

### Fish Networking

[Fish Networking](https://assetstore.unity.com/packages/tools/network/fish-net-networking-evolved-207815?aid=1100lJDF) is a free open source, easy to use, feature rich networking library for Unity. Dissonance has support for Fish networking through a community developed integration package, [available here](https://github.com/LambdaTheDev/DissonanceVoiceForFishNet).

 - [Discord](https://discord.gg/fishnetworking)
 - [Documentation](https://fish-networking.gitbook.io/docs/)
 - Client/Server
 - No CCU limit

### PurrNet

[PurrNet](https://assetstore.unity.com/packages/tools/network/purrnet-297320?aid=1100lJDF) is a free open source networking package designed for ease of use, scalability and performance. Dissonance has support for PurrNet through a community developed integration package, [available here](https://github.com/BobsiUnity/PurrNet-VoiceChat).

 - [Discord](https://discord.gg/NP9tP9Qx9R)
 - [Documentation](https://purrnet.gitbook.io/)
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

### Photon Unity Networking 2

[Photon Unity Networking 2](https://assetstore.unity.com/packages/tools/network/pun-2-free-119922?aid=1100lJDF) is the upgrade to the very popular Photon Unity Networking asset. It is a free (up to 20 CCU) networking system available on the asset store.

 - [Forum](https://forum.photonengine.com/)
 - Photon Cloud Hosting
 - CCU Limit (20 free)

### Photon Fusion

[Photon Fusion](https://assetstore.unity.com/packages/tools/network/photon-fusion-267958?aid=1100lJDF) is a new network package from the developer of the very popular Photon Unity Networking asset.

 - [Forum](https://forum.photonengine.com/)
 - Photon Cloud Hosting

### WebRTC Video Chat

[WebRTC Video Chat](https://assetstore.unity.com/packages/tools/network/webrtc-video-chat-68030?aid=1100lJDF) is a p2p networking, voice and video chat application. This integration uses **just the networking** part of the asset to carry Dissonance voice traffic - it does _not_ integrate in a way that allows `WebRTC Voice Chat` and `Dissonance Voice Chat` to understand each other. This can be used to quickly set up a fully p2p chat session requiring only a very lightweight session server (which carries no voice traffic).

 - Full P2P
 - No CCU limit

### UNet HLAPI

UNet is the **deprecated** Unity networking system. It is **not** recommended to use this for new applications.