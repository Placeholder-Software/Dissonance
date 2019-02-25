# Magic Leap

Dissonance includes support for LuminOS on Magic leap devices. To enable this you must change the import settings of `Assets\Plugins\Dissonance\Plugins\Magic Leap\libAudioPluginDissonance.so` and `Assets\Plugins\Dissonance\Plugins\Android\libs\ARM64\libopus.so` to be included in Magic Leap builds.

*Acoustic Echo Cancellation* (AEC) and *Noise Suppression* (NS) are built into the magic leap device. To prevent interference the Dissonance AEC and NS systems are disabled when deployed to a Magic Leap headset, any configuration settings in Dissonance for these two systems will be ignored.