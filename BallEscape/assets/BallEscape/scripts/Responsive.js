cc.Class({
  extends: cc.Component,

  properties: {},

  onLoad() {
    this.makeResponsive();
  },

  start() {},

  makeResponsive() {
    // let canvas = this.node.getComponent(cc.Canvas);
    // let deviceResolution = cc.view.getFrameSize();
    // let desiredRatio = canvas.designResolution.width / canvas.designResolution.height;
    // let deviceRatio = deviceResolution.width / deviceResolution.height;
    // if (deviceRatio >= desiredRatio) {
    //   canvas.fitHeight = true;
    //   canvas.fitWidth = false;
    // } else if (deviceRatio < desiredRatio) {
    //   canvas.fitHeight = false;
    //   canvas.fitWidth = true;
    // }

    let tile = cc.winSize.width / cc.winSize.height;
    if (!cc.sys.isNative && !cc.sys.isMobile) {
      //     let x = screen.width;
      //     if(x > 1720)x = 1720;
      //     let y = screen.height;
      //     if(y > 967) y = 967;
      // cc.log(document.body.clientHeight + " mutil la " + cc.Canvas.instance.designResolution.width);
      // if (document.body.clientHeight >= 750) {
      //     cc.Canvas.instance.designResolution = new cc.Size(document.body.clientWidth, document.body.clientHeight);
      // } else {
      //     let mutil = cc.Canvas.instance.designResolution.height / document.body.clientHeight;
      //     cc.Canvas.instance.designResolution = new cc.Size(document.body.clientWidth * mutil, document.body.clientHeight * mutil);
      // }
      // cc.SizeCanvas = cc.Canvas.instance.designResolution;
    }

    cc.log("chieu cao man hinh la " + cc.winSize.height);
    if (tile >= 16 / 9) {
      cc.log("nhau vao fit height");
      cc.Canvas.instance.fitHeight = true;
      cc.Canvas.instance.fitWidth = false;
    } else {
      cc.Canvas.instance.fitHeight = false;
      cc.Canvas.instance.fitWidth = true;
      cc.log("nhau vao fit width");
    }
  },

  // update (dt) {},
});
