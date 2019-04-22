## Tutorial: Getting Started

In this tutorial you will create a new project, import Dissonance and set up some settings required for Dissonance to work properly.

### 1. Import Dissonance

Import the Dissonance asset into the project. Every time you import a new version of Dissonance a window will pop up offering to take you to the latest changelog, you can launch this window again by navigating to `Windows > Dissonance > Welcome Screen`.

### 2. Download Integrations

On the welcome screen is a list of integrations available for Dissonance. You should install at least one network backend integration - read [these docs](Choosing-A-Network.md) for help on choosing which one to use.

### 3. Run In Background

Since this is a multiplayer game you're going to need the game to continue running (and processing network packets) even when the game window does not have focus. To do this navigate to `Edit -> Project Settings -> Player`, the inspector pane will now change to show the player settings, check the box labeled "Run In Background".

### 4. Per Platform Specific Setup

Some platforms have special setup requirements, make sure to read the documentation for the platforms you want to work with:

 - [Android & Oculus Go](../Platforms/Android & Oculus Go.md)
 - [iOS](../Platforms/iOS.md)
 - [Linux](../Platforms/Linux.md)
 - [MacOS](../Platforms/MacOS.md)
 - [Magic Leap](../Platforms/Magic Leap.md)
 - [Windows (Desktop)](../Platforms/Windows Desktop.md)
 - [Windows (UWP/Hololens)](../Platforms/Windows UWP & Hololens.md)

## 4. Complete!

That's all you need to get a project set up and ready for Dissonance. Next, follow the appropriate Quick Start tutorial for the network system you plan to use for your game:

 - [Quick Start - Forge Remastered](Quick-Start-Forge-Remastered.md)
 - [Quick Start - Photon (PUN)](Quick-Start-Photon.md)
 - [Quick Start - Photon Bolt](Quick-Start-Photon-Bolt.md)
 - [Quick Start - Unity Networking HLAPI](Quick-Start-UNet-HLAPI.md)
 - [Quick Start - Mirror](Quick-Start-Mirror.md)
 - [Quick Start - Dissonance Self Contained Networking (LLAPI based)](Quick-Start-UNet-LLAPI.md)
 - [Quick Start - Dark🗲Rift 2](Quick-Start-DR2.md)
 - [Quick Start - WebRTC Network](Quick-Start-PureP2P.md)
 - [Quick Start - Steamworks.NET](Quick-Start-Steamworks.Net-P2P.md)