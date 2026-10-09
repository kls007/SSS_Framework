import { _decorator, Node, Component, Button, Sprite, Slider, sys } from 'cc';
import { SSS_AudioManager } from '../Manager/SSS_AudioManager';
import { SSS_Consts } from '../Data/SSS_Consts';
import AdMgr from '../AD/AdMgr';
import SSS_ShuaiFunction from '../Utils/SSS_ShuaiFunction';

const { ccclass, property } = _decorator

/** 设置界面*/
@ccclass('SettingsPanel')
export default class SettingsPanel extends Component {
    @property(Node)
    musicNode: Node = null;
    @property(Node)
    effectNode: Node = null;

    @property(Slider)
    musicSli: Slider = null;
    @property(Sprite)
    musicspr: Sprite = null;

    @property(Slider)
    effectSli: Slider = null;
    @property(Sprite)
    effectspr: Sprite = null;

    @property(Button)
    btnClose: Button = null;

    start() {
        this.btnClose.node.on('click', () => {
            this.ShowOff();

            SSS_AudioManager.PlayButtonAudio();
            // this.btnCloseClick();
        }, this)

        this.musicSli.progress = TempSounds.curMusicV;
        this.effectSli.progress = TempSounds.curEffectV;

        this.musicspr.fillRange = TempSounds.curMusicV;
        this.effectspr.fillRange = TempSounds.curEffectV;

        this.musicSli.node.on(`slide`, this.musicClick, this);
        this.effectSli.node.on(`slide`, this.effectClick, this);
    }

    ShowOn() {
        this.node.active = true;

        SSS_ShuaiFunction.showCustomAd_top_cd();
    }

    ShowOff() {
        this.node.destroy();

        AdMgr.hideCustomAd();
    }

    musicClick(sli: Slider) {
        TempSounds.curMusicV = sli.progress;
        this.musicSli.progress = TempSounds.curMusicV;
        this.musicspr.fillRange = TempSounds.curMusicV;
        SSS_AudioManager.Instance.setBGMVolume(TempSounds.curMusicV);

        TempSounds.saveVolumeData();
    }

    effectClick(sli: Slider) {
        TempSounds.curEffectV = sli.progress;
        this.effectSli.progress = TempSounds.curEffectV;
        this.effectspr.fillRange = TempSounds.curEffectV;
        SSS_AudioManager.Instance.setSFXVolume(TempSounds.curEffectV);

        TempSounds.saveVolumeData();
    }

    btnCloseClick() {
        this.node.destroy();
    }
}

export class TempSounds {
    static curMusicV
    static curEffectV
    static MusicVolumeScale = 0.3;
    //    //初始化调用一次
    static InitMusic() {
        let str2 = sys.localStorage.getItem(`${SSS_Consts.GAME_NAME}`);
        if (str2) {
            let volume = JSON.parse(str2);
            SSS_AudioManager.Instance.setBGMVolume(volume.music);
            SSS_AudioManager.Instance.setSFXVolume(volume.effect);
            TempSounds.curMusicV = volume.music;
            TempSounds.curEffectV = volume.effect;
        } else {
            SSS_AudioManager.Instance.setBGMVolume(TempSounds.MusicVolumeScale);
            SSS_AudioManager.Instance.setSFXVolume(1);

            TempSounds.curMusicV = TempSounds.MusicVolumeScale;
            TempSounds.curEffectV = 1;

            TempSounds.saveVolumeData();
        }
    }
    static saveVolumeData() {
        let volume = {
            music: TempSounds.curMusicV,
            effect: TempSounds.curEffectV,
        }
        sys.localStorage.setItem(`${SSS_Consts.GAME_NAME}`, JSON.stringify(volume));
    }
}