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

_.playerLocalObject("playerLocalUI").findObject("jump").getUnityComponent("Button").onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition().add(new Vector3(0, 1, 0));
        _.setPosition(pos);
        _.setGravity(0)
        _.setGravity(-9.81)
    }
});

_.playerLocalObject("playerLocalUI").findObject("pin").getUnityComponent("Button").onClick(isDown => {
    if (isDown) {
        const pos = _.getPosition();
        _.sendTo(_.sourceItemId, "fromPlayer", pos);
    }
});