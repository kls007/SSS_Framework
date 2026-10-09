import { _decorator, Component, Button, native, sys } from 'cc';
const { ccclass, property } = _decorator;

import LoginPanel from "../UI/LoginPanel";

@ccclass('AdManager')
export default class AdManager extends Component {
    static Instance: AdManager;
    @property(Button)
    Button_reward_horizontal: Button | null = null;
    @property(Button)
    Button_reward_vertical: Button | null = null;
    @property(Button)
    Button_interstitial: Button | null = null;
    @property(Button)
    Button_banner: Button | null = null;
    @property(Button)
    Button_banner_close: Button | null = null;

    androidClassPath: string = "com/cocos/game/AdSdkManager"; // 需要修改为AdSdkManager对应的位置

    public static AdsIds = {
        id_reward_vertical: 1052732,
        id_reward_horizontal: 0,
        id_banner: 0, //1041535
        id_interstitial: 0, //1041534,
    }
    static 是否看完广告 = false;
    onLoad() {
        AdManager.Instance = this;

        //        // this.Button_reward_horizontal.node.on(cc.Node.EventType.TOUCH_START, this.On_Button_reward_horizontal, this);
        //        // this.Button_reward_vertical.node.on(cc.Node.EventType.TOUCH_START, this.On_Button_reward_vertical, this);
        //        // this.Button_interstitial.node.on(cc.Node.EventType.TOUCH_START, this.On_Button_interstitial, this);
        //        // this.Button_banner.node.on(cc.Node.EventType.TOUCH_START, this.On_Button_banner, this);

        //        // this.Button_banner_close.node.on(cc.Node.EventType.TOUCH_START, this.On_Button_banner_close, this);

        //        // cc.director.on("广告看完", this.onVideoComplete, this);
    }
    public static CocosFun() {

    }
    public static onRewardVerify() {
        AdManager.是否看完广告 = true;
    }
    public static onAdClose(msg) {
        console.log(msg);

        if (AdManager.是否看完广告) {
            console.log("关闭广告-广告看完了");
            AdManager.Instance.node.emit("ad_done");
        }
        else {
            console.log("关闭广告-广告没看完");
            AdManager.Instance.node.emit("ad_not_done");
        }
    }
    //    // public static onJavaCallLogin(msg) {
    //    //     console.log(msg);
    //    //     console.log("onJavaCallLogin");
    //    // }
    public static onJavaCallCheckLogin(msg) {
        console.log("onJavaCallCheckLogin-------");

        console.log("onJavaCallCheckLogin", msg);
        if (msg == "true") {
            // console.log("登录回调cocos");
            console.log("true-----------");

            // LoginPanel.Instance.Button_login.node.active = false;
            // LoginPanel.Instance.ShowOff();
            LoginPanel.Instance.关闭();
        }
        else {
            console.log("fasle-------------");

            LoginPanel.Instance.Button_login.node.active = true;
        }
    }
    public static AfterLogin(msg) {
        console.log("AfterLogin-------");

        LoginPanel.Instance.关闭();
        // LoginPanel.Instance.node.active = false;
    }
    On_Button_reward_horizontal() {
        console.log('On_Button_reward_horizontal');
        this.showRewardVideoAd(AdManager.AdsIds.id_reward_horizontal);
    }
    On_Button_reward_vertical() {
        console.log('On_Button_reward_vertical');
        AdManager.是否看完广告 = false;

        this.showRewardVideoAd(AdManager.AdsIds.id_reward_vertical);
    }
    On_Button_interstitial() {
        console.log('On_Button_interstitial');
        this.showInterstitialAd(AdManager.AdsIds.id_interstitial);
    }
    On_Button_banner() {
        console.log('On_Button_banner');
        this.showBannerAd(AdManager.AdsIds.id_banner);
    }
    //    // On_Button_banner_close() {
    //    //     console.log('hideBannerAd');
    //    //     this.hideBannerAd(AdManager.AdsIds.id_banner);
    //    // }

    callJavaFun(adJavaFunName, adCodeId: string, params?: AdVO) {
        if (params == null || params == undefined) {
            // eslint-disable-next-line no-param-reassign
            params = {};
        }

        let callJavaParams: any = {};
        callJavaParams.adJavaFunName = adJavaFunName;
        callJavaParams.adCodeId = adCodeId;
        // callJavaParams.adChanelType = adChanelType;
        if (params.data) {
            for (const key in params.data) {
                if (Object.prototype.hasOwnProperty.call(params.data, key)) {
                    callJavaParams[key] = params.data[key];
                }
            }
        }
        let callJavaParamsStr = JSON.stringify(callJavaParams);


        // let canCallAdCode = this.checkCanCallAdCode(adJavaFunName, callJavaParamsStr);
        // if (!canCallAdCode) {
        //     return;
        // }

        // console.log("callJavaFun------", adJavaFunName, adCodeId, callJavaParamsStr);

        // let callJavaParams: any = {};
        // let callJavaParamsStr = JSON.stringify(callJavaParams);

        console.log("111111111----222--");

        // let res = native.reflection.callStaticMethod(this.androidClassPath, "showAd", "(Ljava/lang/String;)V", callJavaParamsStr);
        // let res = native.reflection.callStaticMethod(this.androidClassPath, "showAd", "(Ljava/lang/String;)V", callJavaParamsStr);

        // let callJavaParams: any = {};
        // let callJavaParamsStr = JSON.stringify(callJavaParams);
        return native.reflection.callStaticMethod(this.androidClassPath, "showAd", "(Ljava/lang/String;)V", callJavaParamsStr);
        // return res;
    }

    callAdFun(adJavaFunName, adCodeId: string, params?: AdVO) {
        console.log("callAdFun------------");

        if (params) {
            if (params.onAdCloseCB) {
                // AdSdkManager.onAdCloseCB = params.onAdCloseCB;
            }
            if (params.onAdErrorCB) {
                // AdSdkManager.onAdErrorCB = params.onAdErrorCB;
            }
        }

        // //网页版直接成功
        // if (cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
        //     AdSdkManager.onAdCloseCB(AD_RES_STATUS.Success);
        //     // AdSdkManager.onAdErrorCB(adChanelType, 1, "", "");
        //     return;
        // }

        this.callJavaFun(adJavaFunName, adCodeId, params);
    }
    //    /** * 显示激励视频广告 */
    showRewardVideoAd(adCodeId, params?: AdVO, _callback_done = null, _callback_error = null): void {
        console.log("cc.sys.isNative------------", sys.isNative);

        if (sys.isNative) {
            this.callAdFun("showRewardVideoAd", adCodeId, params);

            AdManager.Instance.node.targetOff(this);
            AdManager.Instance.node.once("ad_done", () => {
                _callback_done && _callback_done();
            }, this)
            AdManager.Instance.node.once("ad_not_done", () => {
                _callback_error && _callback_error();
            }, this)
        }
        else if (window['h5api']) {
            console.log('h5api');

        }
        else {
            // console.log('else');
            _callback_done && _callback_done();
        }
    }
    //    /** * 显示插屏广告 */
    showInterstitialAd(adCodeId, params?: AdVO): void {
        console.log("showInterstitialAd----------");

        if (sys.isNative) {
            this.callAdFun("showInterstitialAd", adCodeId, params);
        }
        else if (window['h5api']) {
            console.log('h5api');
        }
        else {
            // console.log('else');
        }
    }
    //    /** * 显示banner广告 */
    showBannerAd(adCodeId, params?: AdVO) {
        if (sys.isNative) {
            this.callAdFun("showBannerAd", adCodeId, params);
        }
    }
    hideBannerAd(adCodeId, params?: AdVO) {
        this.callAdFun("hideBannerAd", adCodeId, params);
    }
    static onAdCloseCB: onAdCloseCallBackFunc;
    static onAdErrorCB: onAdErrorCallBackFunc;

    //    // async showVideoAd() {
    //    //     // const videoAd = tt.createRewardedVideoAd({
    //    //     //     adUnitId: "xxxxxxxxxxx",
    //    //     //     multiton: true,
    //    //     //     multitonRewardMsg: ['更多奖励1', '更多奖励2', '更多奖励3'],
    //    //     //     multitonRewardTimes: 3,
    //    //     //     progressTip: false,
    //    //     // });
    //    //     // videoAd.show().then(() => {
    //    //     //     console.log("视频广告展示");
    //    //     // });
    //    //     // DataFinderHelp.Instance.event('open_ad')
    //    //     // if (window['tt']) {
    //    //     //     const { query } = tt.getLaunchOptionsSync();
    //    //     //     if (!this._videoAd) this._videoAd = tt.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnTt });
    //    //     //     const videoAd: any = this._videoAd;
    //    //     //     const onerror = () => {
    //    //     //         UIMgr.Instance.showToast('拉取广告失败')
    //    //     //     }
    //    //     //     videoAd.onError(onerror)
    //    //     //     UIMgr.Instance.showLoadingToast('广告加载中……')
    //    //     //     // await videoAd.load();
    //    //     //     await videoAd.show();
    //    //     //     UIMgr.Instance.hideLoadingToast()
    //    //     //     videoAd.offError(onerror)
    //    //     //     videoAd.load()
    //    //     //     const { isEnded, count } = await new Promise<{ isEnded: boolean, count: boolean }>((resolve) => videoAd.onClose(resolve));
    //    //     //     if (!!count) {
    //    //     //         DataFinderHelp.Instance.event('viewed_ad')
    //    //     //     } else {
    //    //     //         DataFinderHelp.Instance.event('cancel_ad')
    //    //     //     }
    //    //     //     return count;
    //    //     // }
    //    // }
}

export interface AdVO {
    onAdCloseCB?: onAdCloseCallBackFunc;
    onAdErrorCB?: onAdErrorCallBackFunc;
    data?: Object;
}
export type onAdCloseCallBackFunc = (code: AD_RES_STATUS, data?: any) => void;
export type onAdErrorCallBackFunc = (adChanelType: number, errorCode: number, adCallFunName: string, errorMsg: string) => void;
export const enum AD_RES_STATUS {
    Failed = 0,
    Suss = 1,
}
export interface AdFunVO {
    adJavaFunName?: string;
    adCodeId?: string;
    adChanelType?: number;
}

/** 调试 */
window["AdManager"] = AdManager;