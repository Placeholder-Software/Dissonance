In this tutorial you will create a new project, import Dissonance and change some settings required for Dissonance to work properly.

### 1. Import Dissonance

Import the Dissonance asset into the project. This will install two folders into your project: `Assets/Plugins/Dissonance` contains the main source code of Dissonance, `Assets/Dissonance` will contain any integration packages which you install.

### 2. Download Integrations

When you import a new version of Dissonance a window will pop up with a list of available integrations, you can launch this window again by navigating to `Windows > Dissonance > Download Integrations`.

To use Dissonance you **must** install at a network backend integration - without this Dissonance cannot send anything over the network! Refer to [these docs](Choosing-A-Network.md) for help on choosing which one to use. Each integration package includes a demo scene, you should run this demo scene once you have installed the package to verify that Dissonance is properly installed and working in your project.

You may also wish to use some of our other integrations. Refer to [these docs](Other-Integrations) for a list of what's available.

### 3. Run In Background

Multiplayer games need to keep running (and processing network packets) even when the game window does not have focus. To do this navigate to `Edit -> Project Settings -> Player` and enable **Run In Background**.

### 4. Per Platform Specific Setup

Some platforms have special setup requirements, make sure to read the documentation for the platforms you want to work with:

 - [Android & Oculus Go](../Platforms/Android.md)
 - [iOS](../Platforms/iOS.md)
 - [Linux](../Platforms/Linux.md)
 - [MacOS](../Platforms/MacOS.md)
 - [Magic Leap](../Platforms/Magic Leap.md)
 - [Windows (Desktop)](../Platforms/Windows Desktop.md)
 - [Windows (UWP/Hololens)](../Platforms/Windows UWP & Hololens.md)
 - [Oculus OVR](../Platforms/Oculus OVR.md)

## 4. Complete!

That's all you need to get a project set up and ready for Dissonance. Next, follow the appropriate Quick Start tutorial for the network system you plan to use:

 - [Quick Start - Mirror](Quick-Start-Mirror.md)
 - [Quick Start - Forge Remastered](Quick-Start-Forge-Remastered.md)
 - [Quick Start - Photon (PUN2)](Quick-Start-Photon.md)
 - [Quick Start - Photon Bolt](Quick-Start-Photon-Bolt.md)
 - [Quick Start - Unity Netcode For GameObjects](Quick-Start-Unity-NFGO.md)
 - [Quick Start - Unity Networking HLAPI](Quick-Start-UNet-HLAPI.md)
 - [Quick Start - Dark🗲Rift 2](Quick-Start-DR2.md)
 - [Quick Start - WebRTC Network](Quick-Start-PureP2P.md)
 - [Quick Start - Steamworks.NET](Quick-Start-Steamworks.Net-P2P.md)
 - [Quick Start - TNet3](Quick-Start-TNet3.md)