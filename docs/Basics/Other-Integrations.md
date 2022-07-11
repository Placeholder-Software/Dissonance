Dissonance has optional integrations with some non-networking assets to add/improve certain features.

## SALSA Lip Sync

[SALSA Lip Sync](https://assetstore.unity.com/packages/tools/animation/salsa-lipsync-suite-148442?aid=1100lJDF) provides real-time lip synchronisation. The `SalsaDissonanceLink` integration connects the Dissonance audio system to the lip sync system to provide real-time lip synchronisation for other speakers in the VoIP session.

For a download link and more information, see the [full documentation](https://crazyminnowstudio.com/docs/salsa-lip-sync/addons/using-with-dissonance/) on the SALSA docs.

## [FMOD Playback](https://assetstore.unity.com/packages/slug/213415?aid=1100lJDF)

[FMOD](https://assetstore.unity.com/packages/tools/audio/fmod-for-unity-161631?aid=1100lJDF) is a powerful alternative audio system for Unity. The [FMOD Playback](https://assetstore.unity.com/packages/slug/213415?aid=1100lJDF) integration package outputs Dissonance audio into the FMOD audio system. This allows you to mix Dissonance audio in the FMOD mixer and to completely disable the Unity audio system.

!!! important ""
    If you completely disable the Unity audio system you **must** also use the FMOD Recording package.

## [FMOD Recording](https://assetstore.unity.com/packages/slug/213412?aid=1100lJDF)

[FMOD](https://assetstore.unity.com/packages/tools/audio/fmod-for-unity-161631?aid=1100lJDF) is a powerful alternative audio system for Unity. The [FMOD Recording](https://assetstore.unity.com/packages/slug/213412?aid=1100lJDF) integration package provides higher quality and lower latency audio to Dissonance through FMOD.

!!! important ""
    Using this integration does **not** require that you are using FMOD for audio playback. You can install FMOD just for the higher quality audio recording and continue to use the normal Unity audio systems.