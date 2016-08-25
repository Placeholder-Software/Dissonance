## Tutorial: Getting Started

There is a video version of this tutorial [here](TODO).

In this tutorial you will create a new project, import Dissonance and set up some settings required for Dissonance to work properly.

### 1. Import Dissonance

Import the Dissonance asset into the project. When you do this there will be several directories inside the "Integrations" directory, each integration provides support for other unity assets such as various different networking systems. Import whichever integrations you want to use for your game.

### 2. Enable "unsafe" code

Dissonance uses a C# feature called "unsafe code" to achieve the best performance. To do this simply create a file called "smcs.rsp" in the Assets folder containing a single line of text:

> -unsafe

### 3. Run In Background

Since this is a multiplayer game you're going to need the game to continue running (and processing network packets) even when the game window does not have focus. To do this navigate to Edit -> Project Settings -> Player, the inspector pane will now change to show the player settings, check the box labeled "Run In Background".

## 4. Complete!

That's you we need to get a project set up and ready for Dissonance. To create a simple demo game with voice communication continue with **[Basic VoIP Tutorial](Tutorial---Basic-VoIP)**.