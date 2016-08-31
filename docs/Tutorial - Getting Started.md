## Tutorial: Getting Started

There is a video version of this tutorial [here](TODO).

In this tutorial you will create a new project, import Dissonance and set up some settings required for Dissonance to work properly.

### 1. Import Dissonance

Import the Dissonance asset into the project. When you do this there will be several directories inside the "Integrations" directory. Each integration provides support for other Unity assets such as various different networking systems. There are a number of optional parts of Dissonance which you can import to integrate with various other assets (such as Playmaker or Forge Networking). Import whichever integrations you want to use for your game.

The basic tutorials are written assuming you will use UNet networking, so if you want to follow along make sure you install the UNet_LLAPI integration.

### 2. Enable "unsafe" code

Dissonance uses a C# feature called "unsafe code" to achieve the best performance. To do this simply create a file called "smcs.rsp" in the Assets folder containing a single line of text:

> -unsafe

### 3. Run In Background

Since this is a multiplayer game you're going to need the game to continue running (and processing network packets) even when the game window does not have focus. To do this navigate to Edit -> Project Settings -> Player, the inspector pane will now change to show the player settings, check the box labeled "Run In Background".

## 4. Complete!

That's all you need to get a project set up and ready for Dissonance.