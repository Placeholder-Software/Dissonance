## Networking Setup: Forge Networking

Forge Networking is a set of core networking libraries for developing Real-time Multiplayer games and applications. This tutorial will guide you though integrating Dissonance into a project which already uses Forge networking.

The Forge integration in Dissonance includes a demo scene which uses Forge networking. You can find this in the Dissonance/Integrations/Forge/Demo folder. The demo scene uses the "ForgeQuickStartMenu" which is part of Forge, this scene shows a UI and creates a network session and then launches the actual demonstration scene which contains the Dissonance components.

The Forge integration automatically configures itself once started, it's only requirement is that it is enabled in a scene after the forge network session is started. To modify your game existing Forge based game to use Dissonance simply add a Dissonance gameObject with the "Dissonance Comms" and "Forge Comms Network" components to the any scene which is loaded after the network session is established.

## Positional Audio

todo: https://github.com/TomGillen/Dissonance/issues/111

## Advanced Configuration

todo: https://github.com/TomGillen/Dissonance/issues/111