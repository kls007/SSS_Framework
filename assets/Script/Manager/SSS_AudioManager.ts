import { Node, _decorator, Component, AudioSource, resources, AudioClip } from 'cc';
import { SSS_Consts } from '../Data/SSS_Consts';
import { bdlMgr } from './BundleManager_S';
import { TempSounds } from '../UI/SettingsPanel';

const { ccclass, property } = _decorator;

@ccclass('SSS_AudioManager')
export class SSS_AudioManager extends Component {
    public static Instance: SSS_AudioManager;

    @property(AudioSource)
    bgmSource: AudioSource = null!;

    @property(AudioSource)
    sfxSource: AudioSource = null!;

    onLoad() {
        SSS_AudioManager.Instance = this;

        this.node.addComponent(AudioSource);
    }

    /**
     * 播放背景音乐
     * @param clipName 音乐文件名
     * @param loop 是否循环播放
     */
    public playBGM(clip: AudioClip, loop: boolean = true) {
        this.bgmSource.clip = clip;
        this.bgmSource.loop = loop;
        this.bgmSource.play();
        // });
    }

    /**
     * 停止背景音乐
     */
    public stopBGM() {
        this.bgmSource.stop();
    }

    /**
     * 播放音效
     * @param clip 音效片段
     * @param loop 是否循环播放
     */
    public playSFX(clip: AudioClip, loop: boolean = false) {
        if (loop) {
            this.sfxSource.clip = clip;
            this.sfxSource.loop = true;
            this.sfxSource.play();
        } else {
            this.sfxSource.playOneShot(clip);
        }
    }

    // 播放音效并返回 AudioSource 用于更精细的控制
    playSoundWithControl(clip: AudioClip, duration: number, parentNode: Node, loop: boolean = false): AudioSource {
        const tempNode = new Node('ControlledAudio');
        parentNode.addChild(tempNode);

        const audioSource = tempNode.addComponent(AudioSource);
        audioSource.volume = TempSounds.curEffectV; //音量

        audioSource.clip = clip;
        audioSource.loop = loop;
        audioSource.play();

        this.scheduleOnce(() => {
            if (audioSource.playing) {
                audioSource.stop();
            }
            tempNode.destroy();
        }, duration);

        return audioSource;
    }

    /**
     * 停止音效
     */
    public stopSFX() {
        this.sfxSource.stop();
    }

    /**
     * 设置背景音乐音量
     * @param volume 音量值 (0.0 - 1.0)
     */
    public setBGMVolume(volume: number) {
        this.bgmSource.volume = volume;
    }

    /**
     * 设置音效音量
     * @param volume 音量值 (0.0 - 1.0)
     */
    public setSFXVolume(volume: number) {
        this.sfxSource.volume = volume;
    }

    public static PlayButtonAudio() {
        bdlMgr.getRes<AudioClip>(SSS_Consts.BundleName.AUDIO, `audio/按钮音效`, AudioClip).then(res => {
            if (res) {
                SSS_AudioManager.Instance.playSFX(res, false);
            }
        });
    }
}