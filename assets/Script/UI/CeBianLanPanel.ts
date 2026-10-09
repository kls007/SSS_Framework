import { _decorator, Component, Button, Label, sys } from 'cc';
import { SSS_Consts } from '../Data/SSS_Consts';
import { SSS_GameStorage } from '../Data/SSS_GameStorage';
const { ccclass, property } = _decorator

const KeyForSaving = 'sidebar_reward_data'

// /** * 侧边栏*/
@ccclass('CeBianLanPanel')
export default class CeBianLanPanel extends Component {
    public static Instance: CeBianLanPanel;
    @property(Button)
    close: Button | null = null
    @property(Button)
    Button_进入侧边栏: Button | null = null
    @property(Button)
    Button_领取奖励: Button | null = null
    @property(Button)
    Button_已领取奖励: Button | null = null
    rewardData: any

    @property(Label)
    Label_name: Label | null = null
    @property(Label)
    Label_name_icon: Label | null = null

    protected async onLoad() {
        CeBianLanPanel.Instance = this;

        // this.ShowOff();

        //        // this.rewardData = GameDataMgr.Instance.load<RewardData>(KeyForSaving, RewardData) ?? new RewardData()
    }

    ShowOn() {
        this.node.active = true;
        this.AddListener();
        this.Refresh();
    }
    AddListener() {
        this.close.node.on('click', this.on_close, this)
        this.Button_进入侧边栏.node.on('click', this.on_Button_进入侧边栏, this)
        this.Button_领取奖励.node.on('click', this.on_Button_领取奖励, this)
        this.Button_已领取奖励.node.on('click', this.on_Button_已领取奖励, this)
    }
    RemoveListener() {
        this.close.node.off('click', this.on_close, this)
        this.Button_进入侧边栏.node.off('click', this.on_Button_进入侧边栏, this)
        this.Button_领取奖励.node.off('click', this.on_Button_领取奖励, this)
        this.Button_已领取奖励.node.off('click', this.on_Button_已领取奖励, this)
    }
    async Refresh() {
        this.Label_name.string = `${SSS_Consts.GAME_NAME}`;
        this.Label_name_icon.string = `${SSS_Consts.GAME_NAME}`;

        console.log(`SSS_GameStorage.data.侧边栏状态`, SSS_GameStorage.data.tt_侧边栏状态);

        this.Button_进入侧边栏.node.active = SSS_GameStorage.data.tt_侧边栏状态 === 0;
        this.Button_领取奖励.node.active = SSS_GameStorage.data.tt_侧边栏状态 === 1;
        this.Button_已领取奖励.node.active = SSS_GameStorage.data.tt_侧边栏状态 === 2;
    }

    protected start(): void {
        // this.rewardData = + (localStorage.getItem(SSS_GameData.storageKey) ?? '0');
        // this.btnGift.node.active = Date.now() - lastGet > 7 * 24 * 60 * 60 * 1000;  // 一周能领一次

        // const rewarded = 24 * 60 * 60 * 1000 > Date.now() - this.rewardData.lastRewardTime
        // const rewarded = 100 * 1000 > Date.now() - this.rewardData.lastRewardTime
        // const { scene } = tt.getLaunchOptionsSync();
        // this.Button_进入侧边栏.node.active = !rewarded && scene != SSS_GameData.scene_侧边栏;
        // this.Button_领取奖励.node.active = !rewarded && scene == SSS_GameData.scene_侧边栏;
        // this.Button_已领取奖励.node.active = rewarded

        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            tt.onShow(res => {
                console.log("res", res);

                if (res.scene == '021036') {
                    // SSS_GameData.侧边栏状态 = 1;
                    SSS_GameStorage.data.tt_侧边栏状态 = 1;
                    SSS_GameStorage.saveData();

                    this.Refresh();

                    // const storageKey = 'last_get_gift_time';
                    // const lastGet = + (localStorage.getItem(storageKey) ?? '0');
                    // let now = new Date();
                    // let last = new Date(lastGet);

                    // cc.director.emit(`get_gift_cdk`, '非直播');
                    // GameData.getInstance().user.unlockAll = Date.now();
                    // GameData.getInstance().user.unlockDueTime += 24;
                    // GameData.getInstance().SaveData();
                    // cc.director.emit(`ui_unlock_all`);
                    // localStorage.setItem(storageKey, Date.now() + '');
                    // this.popupGift.active = false;
                }
                // }

                // console.log(`rewarded`, rewarded);

                // this.Button_进入侧边栏.node.active = !rewarded && res.scene != SSS_GameData.scene_侧边栏;
                // this.Button_领取奖励.node.active = !rewarded && res.scene == SSS_GameData.scene_侧边栏;
                // this.Button_已领取奖励.node.active = rewarded
            });
        }

        // tt.checkScene({
        //     scene: "sidebar",
        //     success: (res) => {
        //         console.log("check scene success: ", res.isExist);
        //         //成功回调逻辑
        //     },
        //     fail: (res) => {
        //         console.log("check scene fail:", res);
        //         //失败回调逻辑
        //     }
        // });
    }

    on_close() {
        this.ShowOff()
    }
    ShowOff() {
        this.node.active = false;
        this.RemoveListener();
    }
    async on_Button_进入侧边栏() {
        // tt.navigateToScene({ scene: 'sidebar' })

        console.log(`on_Button_进入侧边栏`)

        tt.navigateToScene({
            scene: "sidebar",
            success: (res) => {
                console.log("navigate to scene success");
                // 跳转成功回调逻辑
            },
            fail: (res) => {
                console.log("navigate to scene fail: ", res);
                // 跳转失败回调逻辑
            },
        });
    }

    // storageKey = 'last_get_gift_time_2';
    async on_Button_领取奖励() {
        // SSS_GameStorage.data.free_ad++;
        // SSS_GameStorage.saveData();



        console.log("on_Button_领取奖励");


        // GameStorage.data.free_ad++;
        // GameStorage.saveData();

        // localStorage.setItem(SSS_GameData.storageKey, Date.now() + '');

        SSS_GameStorage.data.tt_侧边栏状态 = 2;
        SSS_GameStorage.saveData();

        this.Refresh();

        // this.Button_进入侧边栏.node.active = false;
        // this.Button_领取奖励.node.active = false;
        // this.Button_已领取奖励.node.active = true;

        // PlayerStats.Instance.currencyAdd(50000)
        // this.rewardData.lastRewardTime = Date.now()
        // GameDataMgr.Instance.save<RewardData>(KeyForSaving, this.rewardData)

        // PlayerStats.Instance.currencyAdd(50000)
        // this.rewardData.lastRewardTime = Date.now()
        // GameDataMgr.Instance.save<RewardData>(KeyForSaving, this.rewardData)
    }
    async on_Button_已领取奖励() {
        this.Refresh();
        this.ShowOff();
    }


    // // 侧边栏礼包相关逻辑
    // gift(platform, platformId) {
    //     // const storageKey = 'last_get_gift_time';
    //     // const lastGet = + (localStorage.getItem(storageKey) ?? '0');
    //     // this.btnGift.active = Date.now() - lastGet > 7 * 24 * 60 * 60 * 1000;  // 一周能领一次

    //     // if (!this.btnGift.active) return;
    //     // cc.tween(this.btnGift).to(.2, { angle: -10 }).to(.4, { angle: 10 }).to(.2, { angle: 0 }).union().repeatForever().start();
    //     // const { scene } = platform.getLaunchOptionsSync();
    //     // this.btnNavToScene.node.active = scene != '021036';
    //     // this.btnGetGift.node.active = scene == '021036';

    //     // platform.onShow(res => {
    //     //     if (this.btnNavToScene)
    //     //         this.btnNavToScene.node.active = res.scene != '021036';
    //     //     if (this.btnGetGift)
    //     //         this.btnGetGift.node.active = res.scene == '021036';
    //     //     if (res.scene == '021036') {
    //     //         const storageKey = 'last_get_gift_time';
    //     //         const lastGet = + (localStorage.getItem(storageKey) ?? '0');
    //     //         let now = new Date();
    //     //         let last = new Date(lastGet);
    //     //         if (platformId == 'bl' && now.getMonth() + now.getDay() != last.getMonth() + last.getDay()) {
    //     //             cc.director.emit(`get_gift_cdk`, '非直播');
    //     //             GameData.getInstance().user.unlockAll = Date.now();
    //     //             GameData.getInstance().user.unlockDueTime += 24;
    //     //             GameData.getInstance().SaveData();
    //     //             cc.director.emit(`ui_unlock_all`);
    //     //             localStorage.setItem(storageKey, Date.now() + '');
    //     //             this.popupGift.active = false;
    //     //         }
    //     //     } 
    //     //     // else if (res.scene == '10002') {
    //     //     //     const storageKey = 'last_get_gift_time_shortcut';
    //     //     //     const lastGet = + (localStorage.getItem(storageKey) ?? '0');
    //     //     //     let now = new Date();
    //     //     //     let last = new Date(lastGet);
    //     //     //     if (platformId == 'bl' && now.getMonth() + now.getDay() != last.getMonth() + last.getDay()) {
    //     //     //         cc.director.emit(`get_gift_cdk`, '非直播');
    //     //     //         GameData.getInstance().user.unlockAll = Date.now();
    //     //     //         GameData.getInstance().user.unlockDueTime += 24;
    //     //     //         GameData.getInstance().SaveData();
    //     //     //         cc.director.emit(`ui_unlock_all`);
    //     //     //         localStorage.setItem(storageKey, Date.now() + '');
    //     //     //     }
    //     //     // }
    //     // }, this);
    // }
}