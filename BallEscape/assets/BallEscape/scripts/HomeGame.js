const SoundManager = require("SoundManager").getIns();

cc.Class({
  extends: cc.Component,

  properties: {
    jsonLevelGame: cc.JsonAsset,
    nodePlay: cc.Node,
    btnSetting: cc.Button,
    btnCart: cc.Button,
    nodeHome: cc.Node,
    nodeGameSelect: cc.Node,
    prefabLevel: cc.Prefab,
    nodeContent: cc.Node,
    nodePopupSetting: cc.Node,
    nodePopupCart: cc.Node,
    nodeGuide: cc.Node,
    musicToggle: cc.Toggle,
    soundToggle: cc.Toggle,
  },

  onLoad() {
    if (Global.isCheckMusic) {
      SoundManager.playMusic();
      this.musicToggle.isChecked = true;
      this.soundToggle.isChecked = true;
    } else {
      this.musicToggle.isChecked = false;
      this.soundToggle.isChecked = false;
    }

    Global.HomeGame = this;
    this.selectBall = 0;
    if (!JSON.parse(cc.sys.localStorage.getItem("listGame"))) {
      Global.listGame = this.jsonLevelGame.json.level;
      cc.sys.localStorage.setItem("listGame", JSON.stringify(Global.listGame));
    } else {
      Global.listGame = JSON.parse(cc.sys.localStorage.getItem("listGame"));
    }
    let tweenLoop = cc.tween().to(0.5, { scale: 0.8 }).to(0.5, { scale: 1 });
    cc.tween(this.nodePlay).repeatForever(tweenLoop).start();

    let node = cc.find("layout", this.nodePopupCart);
    node.children[Global.skinBall].children[0].active = true;
  },

  start() {},

  onCickGame() {
    this.onClickSound();
    cc.tween(this.nodeHome)
      .to(0.5, { scale: 0 }, { easing: "sineIn" })
      .call(() => {
        this.nodeHome.active = false;
        this.nodeGameSelect.active = true;
        this.nodeGameSelect.scale = 0;
        cc.tween(this.nodeGameSelect).to(0.5, { scale: 1 }, { easing: "sineOut" }).start();
      })
      .start();
    for (let index = 0; index < Global.listGame.length; index++) {
      let node = cc.instantiate(this.prefabLevel);
      node.getComponent(cc.Button).clickEvents[0].customEventData = index + "";
      node.getComponent(cc.Button).interactable = false;
      node.children[1].active = true;
      if (Global.listGame[index].isFinish) {
        node.children[0].active = true;
        node.children[0].getComponent(cc.Label).string = Global.listGame[index].level;
        node.getComponent(cc.Button).interactable = true;
        node.children[1].active = false;
      }
      this.nodeContent.addChild(node);
    }
  },

  onClickHome() {
    this.onClickSound();
    cc.tween(this.nodeGameSelect)
      .to(0.5, { scale: 0 }, { easing: "sineIn" })
      .call(() => {
        this.nodeHome.active = true;
        this.nodeHome.scale = 0;
        this.nodeGameSelect.active = false;
        cc.tween(this.nodeHome).to(0.5, { scale: 1 }, { easing: "sineOut" }).start();
      })
      .start();
    this.nodeContent.children.forEach((element) => {
      element.destroy();
    });
  },

  onClickCart() {
    this.onClickSound();
    cc.tween(this.nodeHome)
      .to(0.5, { scale: 0 }, { easing: "sineIn" })
      .call(() => {
        this.nodeHome.active = false;
        this.nodePopupCart.active = true;
        this.nodePopupCart.scale = 0;
        cc.tween(this.nodePopupCart).to(0.5, { scale: 1 }, { easing: "sineOut" }).start();
      })
      .start();
    let node = cc.find("layout", this.nodePopupCart);
    for (let index = 0; index < node.childrenCount; index++) {
      const element = node.children[index];
      element.children[0].active = false;
    }
    node.children[Global.skinBall].children[0].active = true;
  },
  onClickGuide(e, d) {
    this.onClickSound();
    switch (d) {
      case "1":
        this.nodeGuide.active = true;
        break;
      case "0":
        this.nodeGuide.active = false;
        break;
      default:
        break;
    }
  },

  onSelectBall(e, d) {
    this.onClickSound();
    let node = cc.find("layout", this.nodePopupCart);
    for (let index = 0; index < node.childrenCount; index++) {
      const element = node.children[index];
      element.children[0].active = false;
    }
    e.target.children[0].active = true;
    this.selectBall = parseInt(d);
  },

  onBack() {
    this.onClickSound();
    cc.tween(this.nodePopupCart)
      .to(0.5, { scale: 0 }, { easing: "sineIn" })
      .call(() => {
        this.nodePopupCart.active = false;
        this.nodeHome.active = true;
        this.nodeHome.scale = 0;
        cc.tween(this.nodeHome).to(0.5, { scale: 1 }, { easing: "sineOut" }).start();
      })
      .start();
  },

  onActiveBall() {
    this.onClickSound();
    cc.tween(this.nodePopupCart)
      .to(0.5, { scale: 0 }, { easing: "sineIn" })
      .call(() => {
        this.nodePopupCart.active = false;
        this.nodeHome.active = true;
        this.nodeHome.scale = 0;
        cc.tween(this.nodeHome).to(0.5, { scale: 1 }, { easing: "sineOut" }).start();
      })
      .start();
    Global.skinBall = this.selectBall;
  },
  onClickSetting(e, d) {
    this.onClickSound();
    switch (d) {
      case "0":
        this.nodePopupSetting.active = false;
        break;
      case "1":
        this.nodePopupSetting.active = true;
        break;
      default:
        break;
    }
  },

  onClickMusic() {
    this.onClickSound();
    if (this.musicToggle.isChecked) {
      Global.isCheckMusic = true;
      SoundManager.playMusic();
    } else {
      Global.isCheckMusic = false;
      SoundManager.stopMusic();
    }
  },

  onClickSound() {
    if (this.soundToggle.isChecked) {
      SoundManager.playClick();
      Global.isCheckSound = true;
    } else {
      Global.isCheckSound = false;
      SoundManager.stopSoundClick();
    }
  },

  onDestroy() {
    Global.HomeGame = null;
  },

  // update (dt) {},
});
