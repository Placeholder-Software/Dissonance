## Tutorial: Getting Started

**There is a video version of this tutorial [here](https://www.youtube.com/watch?v=LK3i_dG9Krs).**

In this tutorial you will create a new project, import Dissonance and set up some settings required for Dissonance to work properly.

### 1. Import Dissonance

Import the Dissonance asset into the project. Once Dissonance has installed and the project has compiled a window will pop up offering to take you to the integrations list - visit this page to see the latest changelog and to download the optional integrations for Dissonance. Each integration provides support for other Unity assets such as various different networking systems - Import whichever integrations you want to use for your game. Ensure you include at least one network integration (unless you plan on writing your own).

### 2. Run In Background

Since this is a multiplayer game you're going to need the game to continue running (and processing network packets) even when the game window does not have focus. To do this navigate to Edit -> Project Settings -> Player, the inspector pane will now change to show the player settings, check the box labeled "Run In Background".

## 3. Complete!

That's all you need to get a project set up and ready for Dissonance. Next, follow the appropriate Quick Start tutorial for the network system you plan to use for your game:

 - [Quick Start - Forge Networking](/Basics/Quick-Start-Forge)
 - [Quick Start - Photon (PUN)](/Basics/Quick-Start-Photon)
 - [Quick Start - Photon Bolt](/Basics/Quick-Start-Photon-Bolt)
 - [Quick Start - Unity Networking HLAPI](/Basics/Quick-Start-UNet-HLAPI)
 - [Quick Start - Dissonance Self Contained Networking](/Basics/Quick-Start-UNet-LLAPI)