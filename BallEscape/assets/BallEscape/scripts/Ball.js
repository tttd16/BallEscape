const SoundManager = require("SoundManager").getIns();
cc.Class({
  extends: cc.Component,

  properties: {
    jumpForce: 0,
    velocity: 1,
    maxVelocity: 6,
    rigidbody: cc.RigidBody,
    sprFrame: [cc.SpriteFrame],
    physicBall: cc.PhysicsCircleCollider,
  },

  onLoad() {
    this.resetBall();
    this.node.getComponent(cc.Sprite).spriteFrame = this.sprFrame[Global.skinBall];
    this.checkJump = false;
    this.nodeParent = this.node.parent;
  },

  start() {},

  onEvent() {
    this.node.parent.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  },

  offEvent() {
    this.node.parent.parent.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  },

  onTouchStart(touch, event) {
    this.nodeWood = cc.find("wood_small", this.nodeParent);
    if (this.nodeWood.active) {
      this.nodeWood.active = false;
    }
    if (this.isCheck) {
      SoundManager.playTap();
      this.rigidbody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
    }
  },

  onBeginContact: function (contact, selfCollider, otherCollider) {
    this.isCheck = true;
    // this.physicBall.friction = 0;
    if (otherCollider.tag === 1) {
      SoundManager.playMusicBreak();
      this.scheduleOnce(() => {
        SoundManager.playMusicFailedGame();
      });
      Global.GameManager.gameOver(selfCollider.node.position);
      this.scheduleOnce(() => {
        this.node.destroy();
      });
    }
    if (otherCollider.tag === 5) {
      this.onEvent();
    }

    if (otherCollider.tag === 20) {
      otherCollider.node.getComponent("AngleWood").angleWoodXoay(5, -90);
    }

    if (otherCollider.tag === 10) {
      SoundManager.playMusicFCompleteGame();
      if (Global.gameType < Global.listGame.length - 1) {
        Global.gameNext = Global.gameType + 1;
        Global.listGame[Global.gameType + 1].isFinish = true;
        cc.sys.localStorage.setItem("listGame", JSON.stringify(Global.listGame));
        Global.GameManager.nodeNextGame.active = true;
      } else if (Global.gameType == Global.listGame.length - 1) {
        cc.director.pause();
        Global.GameManager.finishGame();
      }
    }
  },

  onEndContact: function (contact, selfCollider, otherCollider) {
    this.isCheck = false;
  },

  resetBall() {
    // this.jumDir = new Vec3(0, 0, 0);
    // this.node.setPosition(this.jumDir);
  },
  onDestoy() {
    this.offEvent();
  },
  // fixUpdate() {

  // }
  update(dt) {
    let vec2 = this.rigidbody.linearVelocity;
    vec2.normalize().mul(Math.min(vec2.mag(), this.maxVelocity));
  },
});
