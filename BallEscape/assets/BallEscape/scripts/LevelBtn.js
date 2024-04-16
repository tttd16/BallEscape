cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    Global.GameLevel = this;
    this.listGame = [...Global.listGame];
  },
  start() {},

  onCickGame(e, d) {
    Global.gameType = parseInt(d);
    cc.director.loadScene("GameManager");
  },
  // update (dt) {},
});
