## Networking Setup: Forge Networking

Forge Networking is a set of core networking libraries for developing Real-time Multiplayer games and applications. This tutorial will guide you though integrating Dissonance into a project which already uses Forge networking.

The Forge integration automatically configures itself once started, it's only requirement is that it is enabled in a scene after the forge network session is started. The Forge demo scene included with Dissonance demonstrates using the "ForgeQuickStartMenu" scene (included as part of Forge), this scene shows a menu and launches another scene once a network session is created. The subsequent scene includes a "Dissonance" gameObject with a "Dissonance Comms" and "Forge Comms Network" components.

To modify your game existing Forge based game to use Dissonance simply add a Dissonance gameObject with the "Dissonance Comms" and "Dissonance Comms Network" components to the any scene which is loaded after the network session is established.

### Advanced Configuration

todo: https://github.com/TomGillen/Dissonance/issues/111