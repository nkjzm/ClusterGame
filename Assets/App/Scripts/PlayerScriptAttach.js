
var playerHandle = null;
$.onInteract(player => {
    playerHandle = player;
    $.setPlayerScript(player);
})

$.onReceive((messageType, arg, sender) => {
    if (messageType === "fromPlayer") {
        $.log(arg)

        const worldItemTemplateId = new WorldItemTemplateId("pin");
        const itemHandle = $.createItem(worldItemTemplateId, arg, new Quaternion());
    }
}, { player: true });

$.onUpdate(deltaTime => {
    if (playerHandle !== null) {
        playerHandle.send("onUpdate", deltaTime)
        return;
    }
})