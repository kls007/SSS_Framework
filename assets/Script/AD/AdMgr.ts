import { _decorator, director, error, randomRangeInt, sys } from 'cc';
import SSS_ShuaiFunction from '../Utils/SSS_ShuaiFunction';
import AdManager from '../Manager/AdManager';
const { ccclass, property } = _decorator;

const isKSGame = typeof window['KSGameGlobal'] != 'undefined';

@ccclass('AdMgr')
export default class AdMgr {
    private static _ins: AdMgr;
    public static get Instance() { return this._ins ?? (this._ins = new AdMgr); }
    private static VideoIdOnTt = '3tjg7isd3n6bllckl6';
    private static VideoIdOnWx = 'adunit-1d8aeeeb413ef95d';
    static VideoIdOnWx_list = [
        'adunit-1d8aeeeb413ef95d',
        'adunit-2cfdf983d15fe297',
        'adunit-219665155f39c8e1',
    ];
    private static InterIdOnWx = '';
    private static GridIdOnWx = '';
    private static VideoIdOnOppo = '';
    private static VideoIdOnVivo = '';
    private static VideoIdOnKs = '';
    private static VideoIdOnMy = '';

    private static InterstitialIdOnTt = 'c910jae92ffb50ig43';
    private static InterstitialIdOnWx = 'adunit-e4ebc534304ed857';
    private static InterstitialIdOnKs = '';

    static customAdIdOnWx_top = 'adunit-8ca2327545618b0f';
    static customAdIdOnWx_bottom = 'adunit-913d4c50328a4eb9';


    static customAdId_bottom_Tt = '2ppor3pg62ea6f680i';
    static customAd_bottom_Tt: any;


    static video_index = -1;
    _videoAd: any;
    static _videoAd_list: any = [];
    _gridAd: any;

    static customAd_top: any;
    static isActive_customAd_top = false;

    static customAd_bottom: any;

    static isActive_customAd_bottom = false;


    constructor() {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            this._videoAd = tt.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnTt });
            // this._gridAd = tt.createGridGamePanel({ gridCount: 'one' });
        } else if (isKSGame) {
            this._videoAd = ks.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnKs });
        }
        else if (sys.platform == sys.Platform.WECHAT_GAME) {
            this._videoAd = wx.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnWx });
            this._videoAd.onError((errMsg: string, errCode: number) => error(errMsg));
            // this._gridAd = wx.createCustomAd({
            //     adUnitId: AdMgr.GridIdOnWx,
            //     style: {
            //         left: wx.getSystemInfoSync().screenWidth / 2 - 180 * .8,
            //         top: wx.getSystemInfoSync().screenHeight - 106 * .8,
            //     },
            //     adIntervals: 30
            // });

            AdMgr._videoAd_list = [];
            for (let index = 0; index < AdMgr.VideoIdOnWx_list.length; index++) {
                const videoid = AdMgr.VideoIdOnWx_list[index];
                AdMgr._videoAd_list[index] = wx.createRewardedVideoAd({
                    adUnitId: videoid,
                    multiton: true
                });
            }

            AdMgr.LoadCustomAd_top();
            AdMgr.LoadCustomAd_bottom();
        }
        else if (window['qg'] && sys.platform == sys.Platform.OPPO_MINI_GAME) {
            this._videoAd = qg.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnOppo });
        } else if (window['qg'] && sys.platform == sys.Platform.VIVO_MINI_GAME) {
            this._videoAd = qg.createRewardedVideoAd({ posId: AdMgr.VideoIdOnVivo });
        } else if (sys.platform == sys.Platform.ALIPAY_MINI_GAME) {
            this._videoAd = my.createRewardedAd({ adUnitId: AdMgr.VideoIdOnMy });
        }
    }

    static LoadCustomAd_top() {
        console.log("原生模板广告加载------------");

        if (sys.platform == sys.Platform.WECHAT_GAME) {
            this.hideCustomAd();

            const sysInfo = wx.getSystemInfoSync();

            const adWidth = sysInfo.windowWidth // 375;   // 你设置的广告宽度
            // const adHeight = 80;  // 预估高度（重要，见下文说明）

            if (!AdMgr.customAd_top) {
                AdMgr.customAd_top = wx.createCustomAd({
                    adUnitId: AdMgr.customAdIdOnWx_top,
                    adIntervals: 30, // 自动刷新间隔(≥30秒)
                    style: {
                        left: (sysInfo.windowWidth - adWidth) / 2,
                        top: 0,
                        width: adWidth,
                        fixed: true
                    }
                });

                AdMgr.customAd_top.onLoad(() => {
                    console.log("原生模板广告加载成功");

                });
                AdMgr.customAd_top.onError(err => {
                    console.log(`报错`, err)
                });
            }
        }
    }

    static LoadCustomAd_bottom() {
        console.log("原生模板广告加载------------");

        if (sys.platform == sys.Platform.WECHAT_GAME) {
            this.hideCustomAd();

            const sysInfo = wx.getSystemInfoSync();

            const adWidth = sysInfo.windowWidth // 375;   // 你设置的广告宽度
            // const adHeight = 80;  // 预估高度（重要，见下文说明）

            if (!AdMgr.customAd_bottom) {
                AdMgr.customAd_bottom = wx.createCustomAd({
                    adUnitId: AdMgr.customAdIdOnWx_bottom,
                    adIntervals: 30, // 自动刷新间隔(≥30秒)
                    style: {
                        left: (sysInfo.windowWidth - adWidth) / 2,
                        top: 0,
                        width: adWidth,
                        fixed: true
                    }
                });

                AdMgr.customAd_bottom.onLoad(() => {
                    console.log("原生模板广告加载成功");

                });
                AdMgr.customAd_bottom.onError(err => {
                    console.log(`报错`, err)
                });
            }
        }
    }

    static 延迟关闭_CustomAd_top() {
        setTimeout(() => {
            console.log("5秒后执行一次");
            AdMgr.hideCustomAd();
        }, 8 * 1000);
    }

    static showCustomAd_top() {
        console.log("原生模板广告加载------------");

        if (sys.platform == sys.Platform.WECHAT_GAME) {
            this.hideCustomAd();

            const sysInfo = wx.getSystemInfoSync();

            const adWidth = sysInfo.windowWidth // 375;   // 你设置的广告宽度
            // const adHeight = 80;  // 预估高度（重要，见下文说明）

            if (!AdMgr.customAd_top) {
                AdMgr.customAd_top = wx.createCustomAd({
                    adUnitId: AdMgr.customAdIdOnWx_top,
                    adIntervals: 30, // 自动刷新间隔(≥30秒)
                    style: {
                        left: (sysInfo.windowWidth - adWidth) / 2,
                        top: 0,
                        width: adWidth,
                        fixed: true
                    }
                });

                AdMgr.customAd_top.onLoad(() => {
                    console.log("原生模板广告加载成功");
                    AdMgr.customAd_top.show();

                    AdMgr.延迟关闭_CustomAd_top();
                });
                AdMgr.customAd_top.onError(err => {
                    console.log(`报错`, err)
                });
            }
            else {
                AdMgr.customAd_top.show();

                AdMgr.延迟关闭_CustomAd_top();
            }
        }
    }

    static showCustomAd_bottom() {
        console.log("原生模板广告加载------------");

        if (sys.platform == sys.Platform.WECHAT_GAME) {
            this.hideCustomAd();

            const sysInfo = wx.getSystemInfoSync();

            const adWidth = sysInfo.windowWidth // 375;   // 你设置的广告宽度
            const adHeight = 80;  // 预估高度（重要，见下文说明）

            if (!AdMgr.customAd_bottom) {
                AdMgr.customAd_bottom = wx.createCustomAd({
                    adUnitId: AdMgr.customAdIdOnWx_bottom,
                    adIntervals: 30, // 自动刷新间隔(≥30秒)
                    style: {
                        left: (sysInfo.windowWidth - adWidth) / 2,
                        top: sysInfo.windowHeight - adHeight,
                        width: adWidth,
                        fixed: true
                    }
                });

                AdMgr.customAd_bottom.onLoad(() => {
                    console.log("原生模板广告加载成功");
                    if (this.isActive_customAd_bottom) {  // 👈 只有页面还在才显示
                        AdMgr.customAd_bottom.show();
                    }
                });
                AdMgr.customAd_bottom.onError(err => {
                    console.log(`报错`, err)
                });
            }
            else {
                if (this.isActive_customAd_bottom) {  // 👈 只有页面还在才显示
                    AdMgr.customAd_bottom.show();
                }
            }
        }
        else if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            return;

            // 获取系统信息用于计算底部位置
            const { windowWidth, windowHeight } = tt.getSystemInfoSync();

            // 1. 创建 Banner 实例
            // 注意：抖音 Banner 宽度有限制，竖屏下建议使用默认宽度或计算合适宽度
            this.customAd_bottom_Tt = tt.createBannerAd({
                adUnitId: AdMgr.customAdId_bottom_Tt,
                // 可选：自动刷新间隔（秒），需 >= 30
                adIntervals: 30,
                style: {
                    left: 0, // 左对齐
                    width: windowWidth, // 铺满宽度
                    // top 暂时先写死一个临时值，等获取到真实高度后再重设位置
                    top: 0
                }
            });

            // 2. 监听广告尺寸变化（因为广告加载完成后才知道实际渲染高度）
            this.customAd_bottom_Tt.onResize(res => {
                // res.width, res.height 是广告实际渲染出的宽高
                // 重新计算位置：屏幕高度 - 广告高度 = 底部 Y 坐标
                const bottomTop = windowHeight - res.height;

                // 更新广告位置
                this.customAd_bottom_Tt.style.top = bottomTop;

                console.log(`Banner 已调整至底部，高度：${res.height}`);
            });

            // 3. 监听加载成功
            this.customAd_bottom_Tt.onLoad(() => {
                console.log('Banner 广告加载成功');
                // 必须调用 show 才能显示
                this.customAd_bottom_Tt.show().then(() => {
                    console.log('Banner 已显示');
                }).catch(err => {
                    console.error('Banner 显示失败', err);
                });
            });

            // 4. 监听错误（如无填充、网络错误等）
            this.customAd_bottom_Tt.onError(err => {
                console.error('Banner 广告错误', err);
                // 建议在此处进行错误上报或尝试销毁重拉
            });
        }
    }

    static hideCustomAd() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (AdMgr.customAd_top) {
                AdMgr.customAd_top.hide();
            }
            if (AdMgr.customAd_bottom) {
                AdMgr.customAd_bottom.hide();
            }
        }
    }

    async showVideoAd(): Promise<boolean> {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            // if (localStorage.getItem('gift_ad_free')) {
            //     localStorage.removeItem('gift_ad_free');
            //     return true;
            // }

            // const { query } = tt.getLaunchOptionsSync();
            if (!this._videoAd) this._videoAd = tt.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnTt });
            const videoAd: any = this._videoAd;
            console.log(`videoAd.load()------`)
            await videoAd.load();
            console.log(`videoAd.show()------`)

            await videoAd.show();
            const { isEnded, count } = await new Promise<{ isEnded: boolean, count: boolean }>((resolve) => videoAd.onClose(resolve));
            if (count) {
                const { query } = tt.getLaunchOptionsSync();
            }
            return count;
        } else if (isKSGame) {
            if (!this._videoAd) this._videoAd = ks.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnKs });
            const videoAd = this._videoAd;
            await videoAd.show();
            const { isEnded } = await new Promise<{ isEnded: boolean }>(resolve => videoAd.onClose(resolve));
            return isEnded;
        } else if (sys.platform == sys.Platform.WECHAT_GAME) {
            // if (!this._videoAd) {
            //     this._videoAd = wx.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnWx });
            // }

            AdMgr.video_index++;
            if (AdMgr.video_index > AdMgr.VideoIdOnWx_list.length - 1) {
                AdMgr.video_index = 0;
            }
            if (AdMgr.video_index < 0) {
                AdMgr.video_index = 0;
            }

            const videoid = AdMgr.VideoIdOnWx_list[AdMgr.video_index];
            if (!AdMgr._videoAd_list[AdMgr.video_index]) {
                AdMgr._videoAd_list[AdMgr.video_index] = wx.createRewardedVideoAd({
                    adUnitId: videoid,
                    multiton: true
                });
            }

            const videoAd = AdMgr._videoAd_list[AdMgr.video_index];

            // let videoAd = AdMgr.VideoIdOnWx_list[AdMgr.video_index];
            // if (!videoAd) {
            //     videoAd = wx.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnWx });
            // }

            // if (!videoAd) {
            //     videoAd = wx.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnWx });
            // }

            // let randomIndex = randomRangeInt(0, AdMgr.VideoIdOnWx_list.length);
            // let videoId = AdMgr.VideoIdOnWx_list[randomIndex];
            // this._videoAd = wx.createRewardedVideoAd({ adUnitId: videoId });

            // const videoAd = this._videoAd;

            // console.log(`randomIndex-------`, randomIndex);
            // console.log(`videoId-------`, videoId);
            // console.log(`videoAd-------`, videoAd);

            await videoAd.load();
            await videoAd.show();
            const { isEnded } = await new Promise<{ isEnded: boolean }>(resolve => videoAd.onClose(resolve));
            return isEnded;
        } else if (window['qg'] && sys.platform == sys.Platform.OPPO_MINI_GAME) {
            if (!this._videoAd) this._videoAd = qg.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnOppo });
            const videoAd = this._videoAd;
            await videoAd.load();
            await videoAd.show();
            const { isEnded } = await new Promise<{ isEnded: boolean }>(resolve => videoAd.onClose(resolve));
            return isEnded;
        } else if (window['qg'] && sys.platform == sys.Platform.VIVO_MINI_GAME) {
            if (!this._videoAd) this._videoAd = qg.createRewardedVideoAd({ posId: AdMgr.VideoIdOnVivo });
            const videoAd = this._videoAd;
            await videoAd.load();
            await videoAd.show();
            const { isEnded } = await new Promise<{ isEnded: boolean }>(resolve => videoAd.onClose(resolve));
            return isEnded;
        } else if (sys.platform == sys.Platform.ALIPAY_MINI_GAME) {
            if (!this._videoAd) this._videoAd = my.createRewardedAd({ adUnitId: AdMgr.VideoIdOnMy });
            const viewoAd = this._videoAd;
            viewoAd.onError(res => {
                console.log('错误码', res.error);
                console.log('错误消息', res.errorMessage);
            });
            try {
                await viewoAd.load();
                await viewoAd.show();
            } catch (err) {
                console.error(err);
            }
            const { isEnded } = await new Promise<{ isEnded: boolean }>((resolve, reject) => viewoAd.onClose(resolve));
            return isEnded;
        } else if (sys.isNative && sys.os == sys.OS.IOS) {
            const promise = new Promise<boolean>(res => director.once('event:rewarded_videoAd', () => res(true)));
            // @ts-ignore
            jsb.reflection.callStaticMethod('AdApi', 'ShowRewardVideoAd');
            return await promise;
        } else if (window['h5api']) {
            await new Promise<void>((res, rej) => {
                window['h5api'].playAd(({ code, message }: { code: number, message: string }) => {
                    if (code === 10000) {
                        // 开始播放
                    } else if (code === 10001) {
                        res();
                    } else {
                        rej(new Error('广告异常'));
                    }
                });
            });
            return true;
        } else {
            return true;
        }
    }

    async showMultiVideoAd(rewardMsg: string[], times: number, progressTip: boolean) {
        // if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
        // const sysInfo = tt.getSystemInfoSync();
        // if (sysInfo.platform == 'android' && (sysInfo.appName == 'Douyin' || sysInfo.appName == 'douyin_lite')) {
        // const { query } = tt.getLaunchOptionsSync();
        // let videoAd = this._videoAd;
        // if (videoAd) await videoAd.destroy();
        // videoAd = this._videoAd = tt.createRewardedVideoAd({ adUnitId: AdMgr.VideoIdOnTt, multiton: true, multitonRewardMsg: rewardMsg, multitonRewardTimes: times, progressTip });
        // await videoAd.load();
        // await videoAd.show();
        // const { count } = await new Promise<{ count: number }>(resolve => videoAd.onClose(resolve));
        // videoAd.destroy().then(() => this._videoAd = null);
        // if (count) {
        // const { query } = tt.getLaunchOptionsSync();
        // }
        // return count;
        // } else {
        // return await this.showVideoAd() ? 1 : 0;
        // }
        // } else {
        // return await this.showVideoAd() ? 1 : 0;
        // }
    }
    async showInterAd() {
        // if (sys.platform == sys.Platform.WECHAT_GAME) {
        // const interAd = wx.createInterstitialAd({ adUnitId: AdMgr.InterIdOnWx });
        // await interAd.load();
        // await interAd.show();
        // }
    }
    async showGridAd() {
        // if (!this._gridAd) return;
        // if (sys.platform == sys.Platform.WECHAT_GAME) {
        //     (this._gridAd as wx.CustomAd).show();
        // } else if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
        //     this._gridAd.show();
        // }
    }
    hidGridAd() {
        // if (!this._gridAd) return;
        // if (sys.platform == sys.Platform.WECHAT_GAME) {
        //     (this._gridAd as wx.CustomAd).hide();
        // } else if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
        //     this._gridAd.hide();
        // }
    }

    showInterstitialAd() {
        console.log("showInterstitialAd---");

        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            const interstitialAd = tt.createInterstitialAd({ adUnitId: AdMgr.InterstitialIdOnTt });
            interstitialAd.onError((err) => console.error(err))
            interstitialAd.onClose(() => interstitialAd.destroy())
            interstitialAd.load().then(() => interstitialAd.show());
        } else if (isKSGame) {
            const interstitialAd = ks.createInterstitialAd({ adUnitId: AdMgr.InterstitialIdOnKs });
            interstitialAd.onError((err) => console.error(err))
            interstitialAd.onClose(() => interstitialAd.destroy())
            interstitialAd.show();
        } else if (sys.platform == sys.Platform.WECHAT_GAME) {
            const interstitialAd = wx.createInterstitialAd({ adUnitId: AdMgr.InterstitialIdOnWx });
            interstitialAd.onError((err) => console.error(err))
            interstitialAd.onClose(() => interstitialAd.destroy())
            // interstitialAd.load().then(() => interstitialAd.show());
            interstitialAd.load();

            interstitialAd.onLoad(() => {
                console.log("插屏 广告加载成功");
                interstitialAd.show();
            });
        }
        else {
            // tap(安卓)上是否开启插屏广告
            AdManager.Instance.showInterstitialAd(AdManager.AdsIds.id_interstitial, {});
        }
    }
}