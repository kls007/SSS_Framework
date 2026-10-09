import { _decorator, AudioClip, Component, director, log, Node, sys } from 'cc';
import { SSS_Consts } from "../Data/SSS_Consts";
import { SSS_GameData } from "../Data/SSS_GameData";
import { bdlMgr } from "../Manager/BundleManager_S";
import UI from "../Manager/UI";
import { SSS_AudioManager } from '../Manager/SSS_AudioManager';
import { TempSounds } from '../UI/SettingsPanel';
import SSS_ShuaiFunction from '../Utils/SSS_ShuaiFunction';
import { SSS_GameStorage } from '../Data/SSS_GameStorage';
import AdMgr from '../AD/AdMgr';

const { ccclass, property, executionOrder } = _decorator;

// // 慢一点执行
@ccclass('MainScene')
@executionOrder(101)
export default class MainScene extends Component {
        static Instance: MainScene;

        @property(Node)
        public UI: Node | null = null;

        ClubButton = null;

        async onLoad() {
                MainScene.Instance = this;

                
                SSS_GameStorage.initData();

                TempSounds.InitMusic()

                UI.Instance.ResetUINode();

                if (SSS_GameData.isFirstEnterMainScene) {
                        let bgm = `bgm/模型可爱狗狗`;

                        bdlMgr.getRes<AudioClip>(SSS_Consts.BundleName.AUDIO, bgm, AudioClip).then(res => {
                                SSS_AudioManager.Instance.playBGM(res, true);
                        });

                }

                SSS_GameData.isFirstEnterMainScene = false;


                SSS_ShuaiFunction.WX_Share();
                this.WXGameClub_create();

                this.WXGameClub_show();

                // SSS_ShuaiFunction.ShowWXRecommend();
                SSS_ShuaiFunction.loadRecommend();

                AdMgr.hideCustomAd();

                // AdMgr.LoadCustomAd_top();

                // SSS_ShuaiFunction.抖音推荐直玩获客();
        }

        ShowOn() {
                this.node.active = true;
        }
        ShowOff() {
                this.node.active = false;
        }

        onDisable() {
                console.log(`onDisable---------`)
                this.WXGameClub_hide();
        }

        // 微信游戏圈
        WXGameClub_create() {
                if (sys.platform == sys.Platform.WECHAT_GAME) {
                        this.ClubButton = wx.createGameClubButton({
                                icon: 'green',
                                type: "image",
                                text: "游戏圈",
                                style: {
                                        left: 20,
                                        top: 20,
                                        width: 40,
                                        height: 40
                                },
                                // openlink: 'Lv-XO1OgAuqztP4pRyKfZnY2aJKe9aE1'
                        })
                }
        }

        // 微信游戏圈按钮显示
        WXGameClub_show() {
                if (sys.platform == sys.Platform.WECHAT_GAME) {
                        if (this.ClubButton) {
                                this.ClubButton.show();
                        }
                }
        }

        // 微信游戏圈按钮隐藏
        WXGameClub_hide() {
                if (sys.platform == sys.Platform.WECHAT_GAME) {
                        if (this.ClubButton) {
                                this.ClubButton.hide();
                        }
                }
        }
}