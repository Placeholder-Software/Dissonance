## Assembly Definitions

> Using Assembly Definition Files Requires Dissonance `6.2.5`!

The compilation order of scripts in Unity can be controlled by using [Assembly Definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html), these files allow you to explicitly split code up into smaller parts and specify the dependencies between those parts. Dissonance does not ship with assembly definitions by default, but it is setup so that assembly definitions can be added if required.

After installing Dissonance you need to create 4 assembly definitions. They must have the *exact names* as shown here:

1. `Assets/Plugins/Dissonance/Dissonance.asmdef`

2. `Assets/Plugins/Dissonance/Editor/DissonanceEditor.asmdef`
   - References:
        - `Dissonance.asmdef`

3. `Assets/Dissonance/DissonanceIntegrations.asmdef`
   - References:
        - `Dissonance.asmdef`

In each network integration that you install you must create the final asmdef:

4. `Assets/Dissonance/Integrations/{Integration_Name}/Editor/Dissonance{Integration_Name}Editor`
   - References:
        - `Assets/Plugins/Dissonance/Dissonance.asmdef`
        - `Assets/Plugins/Dissonance/Editor/DissonanceEditor.asmdef`
        - `Assets/Dissonance/DissonanceIntegrations.asmdef`