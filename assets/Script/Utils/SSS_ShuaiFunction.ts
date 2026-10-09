import { _decorator, instantiate, Node, sys, UITransform, v3, view } from 'cc';
import AdMgr from '../AD/AdMgr';
import AdManager from '../Manager/AdManager';
import { SSS_GameStorage } from '../Data/SSS_GameStorage';
import { SSS_GameData } from '../Data/SSS_GameData';

// // /** 事件 */
// export const SS_GameEventData = {
//     广告结束: "广告结束",
// };

export default class SSS_ShuaiFunction {
    static 插屏广告时间间隔 = 2.5 * 60 * 1000; // 3分钟
    static 上次插屏广告时间 = Date.now(); // 首次不弹，OK

    static 原生模板广告时间间隔 = 31 * 1000; // 40秒
    static 上次原生模板广告时间 = Date.now(); // 首次不弹，OK


    // 微信分享好友，分享朋友圈-系统-右上角三个点点开
    static WX_Share() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            // 微信分享好友，分享朋友圈
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })

            wx.onShareAppMessage(function () {
                return {
                    title: SSS_GameData.微信分享title,
                    imageUrl: SSS_GameData.微信分享图片地址,
                };
            });
        }
    }

    // 抖音分享
    static TT_Share() {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {

        }
    }

    static 抖音推荐直玩获客() {
        console.log("抖音推荐直玩获客---------------");

        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            // 判断启动渠道为推荐流直玩场景
            if (tt.getLaunchOptionsSync().scene.endsWith('3041')) {
                // 游戏侧上报预启动数据

                console.log("✅ 成功识别：推荐流直玩进入");

                tt.reportScene({
                    sceneId: 7001,
                    success(res) {
                        console.log("7001-success", res);
                    },
                    fail(res) {
                        console.log("7001-fail", res);
                    },
                })
            }
        }
    }

    static Share() {
        if (sys.platform === sys.Platform.WECHAT_GAME) {
            wx.shareAppMessage({});
        }
    }

    static showInterstitialAd_cd() {
        const now = Date.now();
        const diff = now - this.上次插屏广告时间;

        console.log("diff =", diff);

        // 到时间才弹
        if (diff >= this.插屏广告时间间隔) {
            console.log("插屏弹出成功");
            this.上次插屏广告时间 = now;
            AdMgr.Instance.showInterstitialAd();
            return true;
        }

        const 剩余时间 = (this.插屏广告时间间隔 - diff) / 1000;
        console.log("插屏弹出失败，剩余时间 =", `${剩余时间}s`);

        return false;
    }

    static showCustomAd_top_cd() {
        const now = Date.now();
        const diff = now - SSS_ShuaiFunction.上次原生模板广告时间;

        console.log("diff =", diff);

        // 到时间才弹
        if (diff >= SSS_ShuaiFunction.原生模板广告时间间隔) {
            console.log("顶部原生模板广告弹出成功");
            SSS_ShuaiFunction.上次原生模板广告时间 = now;

            AdMgr.showCustomAd_top();

            return true;
        }

        const 剩余时间 = (SSS_ShuaiFunction.原生模板广告时间间隔 - diff) / 1000;
        console.log("顶部原生模板广告弹出失败，剩余时间 =", `${剩余时间}s`);

        return false;
    }

    // 底部banner
    static showCustomAd_bottom_cd() {
        const now = Date.now();
        const diff = now - SSS_ShuaiFunction.上次原生模板广告时间;

        console.log("diff =", diff);

        // 到时间才弹
        // if (diff >= SSS_ShuaiFunction.原生模板广告时间间隔) {
        console.log("底部banner弹出成功");
        SSS_ShuaiFunction.上次原生模板广告时间 = now;

        AdMgr.showCustomAd_bottom();

        return true;
        // }

        const 剩余时间 = (SSS_ShuaiFunction.原生模板广告时间间隔 - diff) / 1000;
        console.log("底部banner弹出失败，剩余时间 =", `${剩余时间}s`);

        return false;
    }

    /**
     *  推荐组件参考代码
     *  核心由 pageManager实例 + openlink值 决定活动，开发者可根据下方代码自行适配
     */
    static recommendPageManager;
    /**
     *  游戏内提前加载推荐组件数据
     */
    static async loadRecommend() {
        if (sys.platform === sys.Platform.WECHAT_GAME) {
            if (!wx.createPageManager) {
                throw '当前基础库版本暂不支持。';
            }
            this.recommendPageManager = wx.createPageManager();
            await this.recommendPageManager.load({
                openlink: 'TWFRCqV5WeM2AkMXhKwJ03MhfPOieJfAsvXKUbWvQFQtLyyA5etMPabBehga950uzfZcH3Vi3QeEh41xRGEVFw', // 推荐组件OPENLINK常量，直接复制即可，无需理解含义
            });
        }
    }

    /**
     *  拉起推荐组件
    */
    static async showRecommend() {
        if (sys.platform === sys.Platform.WECHAT_GAME) {
            // if (!this.recommendPageManager) {
            await this.loadRecommend();
            // }
            return await this.recommendPageManager.show();
        }
    }

    /** 处理是否展示微信系统推荐-胜利界面每天只显示一次微信推荐*/
    static async ShowWXRecommend() {
        console.log(`微信推荐-----------`);

        if (sys.platform !== sys.Platform.WECHAT_GAME) {
            return
        }


        const date = Date.now();

        let d1 = date - SSS_GameData.首次启动时间;

        console.log(`date----`, date);
        console.log(`SSS_GameData.首次启动时间----`, SSS_GameData.首次启动时间);

        console.log(`d1----`, d1);
        if (d1 < 5 * 60 * 1000) {
            return
        }

        if (SSS_ShuaiFunction.IsOneDayPassed(SSS_GameStorage.data.wxRecommendDate, date)) {
            console.log(`弹出微信推荐`)
            SSS_GameStorage.data.wxRecommendDate = date;
            SSS_GameStorage.saveData();

            this.showRecommend();
        }
        else {
            console.log(`不弹微信推荐`)
        }
    }

    static async AD_callback(_callback: Function, params: any = null) {
        // await SS_UIManager.Instance.CreatePanel(`UI/WaitingPanel`, WaitingPanel);

        if (sys.platform == sys.Platform.WECHAT_GAME || sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            console.log("拉取广告");

            const isEnded = await AdMgr.Instance.showVideoAd();
            if (isEnded) {
                if (_callback) {
                    if (_callback) {
                        _callback();
                    }
                }
            }
            else {
            }
        }
        // 安卓
        else {
            AdManager.是否看完广告 = false;
            AdManager.Instance.showRewardVideoAd(AdManager.AdsIds.id_reward_vertical, {},
                () => {
                    console.log("广告看完了！");

                    // director.emit(SS_GameEventData.广告结束);

                    if (_callback) {
                        _callback();
                    }
                },
                () => {
                    // director.emit(SS_GameEventData.广告结束);

                    console.log("复活失败！");
                },
            );
        }
    }

    //    //设置所有子物体可见或者不可见
    public static SetAllChildrenAtive(parent: Node, active: boolean) {
        for (var i = 0; i <= parent.children.length - 1; i++) {
            var child: Node = parent.children[i];
            child.active = active;
        }
    }
    public static GetFreeChild(parent: Node): Node {
        var c: Node = null;
        for (var i = 0; i <= parent.children.length - 1; i++) {
            var child = parent.children[i];
            if (child.active == false) {
                c = child;
                break;
            }
        }

        if (c == null) {
            var node: Node = instantiate(parent.children[0]);
            node.parent = parent;
            node.setPosition(0, 0);
            c = node;
        }

        return c;
    }

    /** 有过了一天吗 */
    static IsOneDayPassed(oldDate: number, newDate: number) {
        const now = new Date();
        const midnight1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        let midnight2 = midnight1.getTime();
        console.log(`当前的午夜时间${midnight2}`);
        let diff = Math.abs((newDate - oldDate) / 1000 / 60 / 60 / 24);
        return diff > 1;
    }
}