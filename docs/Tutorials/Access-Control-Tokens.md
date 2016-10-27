# Access Control Tokens

There is a video version of this tutorial [here](TODO).

Access control tokens can be added to both [Broadcast Triggers](/Reference/Components/Voice-Broadcast-Trigger.md) and [Receipt Triggers](/Reference/Components/Voice-Receipt-Trigger.md). The trigger will not function unless the local player has *one of* the required tokens.

## Defining Required Tokens

Tokens can be added and removed through the inspector:

![Receipt Trigger](/images/VoiceReceiptTrigger_Tokens.png)

This receipt trigger will not function unless the local player has one of the two access tokens - 'TopSecretPassword' or 'mysocratesnote'. Tokens can also be managed with scripts:

```
var receiver = FindComponent<VoiceReceiptTrigger>();

receiver.AddToken("correcthorsebatterystaple");             // Add
if (receiver.ContainsToken("correcthorsebatterystaple"))    // Query
    receiver.RemoveToken("correcthorsebatterystaple");      // Remove
```

## Defining Available Tokens

Once triggers have been configured to require tokens before they will work you must add some tokens to the local player. This can be done in the inspector in the same way as for triggers. However, tokens added in the inspector will apply to *all* players so they can only be used as the default tokens everyone starts with.

![Receipt Trigger](/images/DissonanceComms_Tokens.png)

You are more likely to want to manage tokens through scripts. When you create a player and do something which requires restricting it's access to channels (e.g. add it to a team) you should add the appropriate tokens to the local player:

```
var local = FindComponent<DissonanceComms>();

local.AddToken("Green Team");
```