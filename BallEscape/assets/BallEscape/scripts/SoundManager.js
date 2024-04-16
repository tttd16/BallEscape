let objAudioClip = {};

const SoundManager = cc.Class({
  extends: cc.Component,

  properties: {},
  statics: {
    getIns() {
      if (!this.self) {
        this.self = new SoundManager();
      }
      return this.self;
    },
  },

  start() {},

  playClick() {
    cc.resources.load("sound/Click", cc.AudioClip, (err, clip) => {
      if (err) return;
      objAudioClip["SoundClick"] = cc.audioEngine.play(clip, false, 1);
    });
  },

  stopSoundClick() {
    if (objAudioClip["SoundClick"] !== null) {
      cc.audioEngine.stop(objAudioClip["SoundClick"]);
    }
  },

  playMusic() {
    cc.resources.load("sound/bg_sound", cc.AudioClip, (err, clip) => {
      if (err) return;
      if (objAudioClip["SoundBg"] !== null) {
        cc.audioEngine.stop(objAudioClip["SoundBg"]);
      }
      objAudioClip["SoundBg"] = cc.audioEngine.play(clip, true, 1);
    });
  },
  stopMusic() {
    if (objAudioClip["SoundBg"] !== null) {
      cc.audioEngine.stop(objAudioClip["SoundBg"]);
    }
  },
  playTap() {
    cc.resources.load("sound/TapJump", cc.AudioClip, (err, clip) => {
      if (err) return;
      //   if (objAudioClip["SoundTapJump"] !== null) {
      //     cc.audioEngine.stop(objAudioClip["SoundTapJump"]);
      //   }
      objAudioClip["SoundTapJump"] = cc.audioEngine.play(clip, false, 1);
    });
  },

  playMusicBreak() {
    cc.resources.load("sound/Break", cc.AudioClip, (err, clip) => {
      if (err) return;
      objAudioClip["SoundBreak"] = cc.audioEngine.play(clip, false, 1);
    });
  },

  playMusicFailedGame() {
    cc.resources.load("sound/failSound", cc.AudioClip, (err, clip) => {
      if (err) return;
      objAudioClip["SoundFailSound"] = cc.audioEngine.play(clip, false, 1);
    });
  },
  playMusicFCompleteGame() {
    cc.resources.load("sound/CompleteLevelSound", cc.AudioClip, (err, clip) => {
      if (err) return;
      objAudioClip["SoundCompleteLevelSound"] = cc.audioEngine.play(clip, false, 1);
    });
  },

  stopAll() {
    cc.audioEngine.stopAll();
    objAudioClip = {};
  },
  // update (dt) {},
});

export default SoundManager;
