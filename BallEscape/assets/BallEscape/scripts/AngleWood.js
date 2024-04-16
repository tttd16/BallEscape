cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {},
  angleWoodXoay(time, r) {
    let action = cc.rotateBy(time, r);
    cc.tween(this.node).repeat(1, action).start();
  },

  angleWoodXoayAngle(time) {
    let action = cc.rotateBy(time, -360);
    cc.tween(this.node).repeat(1, action).start();
  },
  start() {},

  onDestoy() {},
  // update (dt) {},
});
