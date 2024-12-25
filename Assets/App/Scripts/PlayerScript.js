_.log("hello");

let level = 1;
const storageData = _.getPlayerStorageData();
if (storageData !== null) {
    level = storageData.level;
}

_.onReceive((messageType, arg, sender) => {
    if (messageType === "testType") {
        level += 1;
        _.setPlayerStorageData({ level });
        _.log("level: " + level)
    }
});

let jumpButton = _.playerLocalObject("playerLocalUI").findObject("jump").getUnityComponent("Button");
let pinButton = _.playerLocalObject("playerLocalUI").findObject("pin").getUnityComponent("Button");
let pinText = _.playerLocalObject("playerLocalUI").findObject("pin").getUnityComponent("Text");

jumpButton.onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition().add(new Vector3(0, 1, 0));
        _.setPosition(pos);
        _.setGravity(0)
        _.setGravity(-9.81)
    }
});

let coolTime = 0;

pinButton.onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition();
        _.sendTo(_.sourceItemId, "fromPlayer", pos);
    }
});
