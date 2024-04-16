const SoundManager = require("SoundManager").getIns();

cc.Class({
  extends: cc.Component,

  properties: {
    nodeDead: cc.Node,
    nodeUIGame: cc.Node,
    listPrefab: [cc.Prefab],
    nodeFailed: cc.Node,
    nodeNextGame: cc.Node,
    nodeFinishGame: cc.Node,
  },

  onLoad() {
    // const manager = cc.director.getCollisionManager();
    // manager.enabled = true;
    this.enablePhysicsManager = cc.director.getPhysicsManager();
    this.enablePhysicsManager.enabled = true;
    Global.GameManager = this;
    this.listGame = Global.listGame;
    this.gameType = Global.gameType;
    this.objGame = this.listGame[this.gameType];
    this.positionWood = [...this.objGame.positionWood];
    this.listItem = [...this.objGame.item];
    this.rotation = [...this.objGame.rotation];
  },

  start() {
    this.init(this.listItem, this.positionWood, this.rotation);
  },

  init(listItem, positionWood, rotation) {
    for (let index = 0; index < listItem.length; index++) {
      let node = cc.instantiate(this.listPrefab[listItem[index]]);
      node.active = true;
      node.setPosition(cc.v2(positionWood[index][0], positionWood[index][1]));
      node.angle = rotation[index];
      this.nodeUIGame.addChild(node);
    }
  },

  gameOver(position) {
    this.nodeDead.setPosition(position);
    this.nodeDead.active = true;
    this.scheduleOnce(() => {
      this.nodeFailed.active = true;
    });
  },

  onClickMenu() {
    let menu = cc.find("menu", this.node);
    menu.active = true;
    this.scheduleOnce(() => {
      cc.director.pause();
    });
  },

  onClickResume() {
    let menu = cc.find("menu", this.node);
    menu.active = false;
    cc.director.resume();
  },

  onClickBackHome() {
    cc.audioEngine.stopAll();
    // SoundManager.stopAll();
    cc.director.resume();
    cc.director.loadScene("HomeGame");
  },

  onClickPlayAgain() {
    let menu = cc.find("menu", this.node);
    this.nodeUIGame.children.forEach((element) => {
      element.destroy();
    });
    cc.director.resume();
    menu.active = false;
    this.nodeDead.active = false;
    this.nodeFailed.active = false;
    this.nodeNextGame.active = false;
    this.nodeFinishGame.active = false;
    for (let index = 0; index < this.listItem.length; index++) {
      let node = cc.instantiate(this.listPrefab[this.listItem[index]]);
      node.setPosition(cc.v2(this.positionWood[index][0], this.positionWood[index][1]));
      node.angle = this.rotation[index];
      this.nodeUIGame.addChild(node);
    }
  },

  onClickNextGame() {
    let menu = cc.find("menu", this.node);
    this.nodeUIGame.children.forEach((element) => {
      element.destroy();
    });
    menu.active = false;
    this.nodeDead.active = false;
    this.nodeFailed.active = false;
    this.nodeNextGame.active = false;
    this.nodeFinishGame.active = false;
    Global.gameType = Global.gameNext;
    this.objGame = this.listGame[Global.gameNext];
    this.positionWood = [...this.objGame.positionWood];
    this.listItem = [...this.objGame.item];
    this.rotation = [...this.objGame.rotation];
    this.init(this.listItem, this.positionWood, this.rotation);
  },
  finishGame() {
    this.nodeFinishGame.active = true;
    this.nodeFinishGame.scale = 0;
    cc.tween(this.nodeFinishGame).to(0.3, { scale: 1 }, { easing: "sineIn" }).start();
  },
  onDestroy() {
    Global.GameManager = null;
  },

  onDisable: function () {
    // if (this.enablePhysicsManager) {
    //   this.enablePhysicsManager.enabled = false;
    // }
  },
  // update (dt) {},
});
