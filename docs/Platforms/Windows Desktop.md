# Windows (Desktop)

To run Dissonance on a Windows PC requires [Visual Studio 2019 Redist](https://visualstudio.microsoft.com/downloads/#microsoft-visual-c-redistributable-for-visual-studio-2019). It's recommended that you package this with your application and install it as part of your install process.

On systems older than Windows 10, users must also install [this](https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c) Windows Update.

## Steam

If you are distributing your application through [Steam](https://store.steampowered.com/) you can set the redistributable as a dependency. It will be installed when the application is installed. This can be done through the [app panel](partner.steamgames.com): `App Panel > Installation > Redistributables > Visual C++ Redist 2019`.
