_.log("hello");

let level = 1;
const storageData = _.getPlayerStorageData();
if (storageData !== null) {
    level = storageData.level;
}

_.onReceive((messageType, arg, sender) => {
    switch (messageType) {
        case "testType":
            level += 1;
            _.setPlayerStorageData({ level });
            _.log("level: " + level)
            break;
        case "onUpdate":
            onUpdate(arg);
            break;
    }
});

function onUpdate(deltaTime) {
    _.log("onUpdate: " + deltaTime);
}


let jumpButton = _.playerLocalObject("playerLocalUI").findObject("jump").getUnityComponent("Button");
let pinButton = _.playerLocalObject("playerLocalUI").findObject("pin").getUnityComponent("Button");
let pinText = _.playerLocalObject("playerLocalUI").findObject("pin").getUnityComponent("Text");

jumpButton.onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition().add(new Vector3(0, 1, 0));
        _.setPosition(pos);
    }
});

let coolTime = 0;

pinButton.onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition();
        _.sendTo(_.sourceItemId, "fromPlayer", pos);
    }
});
