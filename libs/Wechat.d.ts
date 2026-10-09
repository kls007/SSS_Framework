declare namespace wx {
    export function login(object: { timeout?: number, success?: (res: { code: string }) => void, fail?: Function, complete?: Function }): void;
    class RewardedVideoAd {
        load(): Promise;
        show(): Promise;
        destroy(): void;
        onLoad(listener: Function): void;
        offLoad(listener: Function): void;
        onError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        offError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        onClose(listener: (res: { isEnded: boolean }) => void): void;
        offClose(listener: (res: { isEnded: boolean }) => void): void;
    }
    export function createRewardedVideoAd(object: { adUnitId: string, multiton?: boolean }): RewardedVideoAd;
    export function shareAppMessage(object: { title?: string, imageUrl?: string, query?: string, imageUrlId?: string, toCurrentGroup?: boolean, path?: string }): void;
    class InterstitialAd {
        load(): Promise;
        show(): Promise;
        destroy(): void;
        onLoad(listener: Function): void;
        offLoad(listener: Function): void;
        onError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        offError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        onClose(listener: (res: { isEnded: boolean }) => void): void;
        offClose(listener: (res: { isEnded: boolean }) => void): void;
    }
    export function createInterstitialAd(object: { adUnitId: string }): InterstitialAd;
    class CustomAd {
        style: {
            left: number;
            top: number;
            fixed: boolean;
        };
        show(): Promise;
        hide(): Promise;
        isShow(): boolean;
        destroy(): void;
        onClose(listener: Function): void;
        offClose(listener: Function): void;
        onHide(listener: Function): void;
        offHide(listener: Function): void;
        onLoad(listener: Function): void;
        offLoad(listener: Function): void;
        onError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        offError(listener: (res: { errMsg: string, errCode: number }) => void): void;
    }
    export function createCustomAd(object: {
        adUnitId: string,
        adIntervals?: number,
        style: { left: number, top: number },
    }): CustomAd;
    type SystemInfo = {
        system: string;
        platform: string;
        brand: string;
        model: string;
        version: string;
        appName: 'Toutiao' | 'Douyin' | 'news_article_lite' | 'live_stream' | 'XiGua' | 'PPX' | 'douyin_lite' | 'live_stream_lite' | 'novel_fm' | 'novelapp';
        SDKVersion: string;
        screenWidth: number;
        screenHeight: number;
        windowWidth: number;
        windowHeight: number;
        pixelRatio: number;
        safeArea: {
            left: number,
            right: number,
            top: number,
            bottom: number,
            width: number,
            height: number,
        };
        deviceScore: {
            cpu: number,
            gpu: number,
            memory: number,
            overall: number,
        }
    }
    export function getSystemInfoSync(): SystemInfo;
    export function getAccountInfoSync(): { miniProgram: { appId: string, envVersion: 'develop' | 'trial' | 'release', version: string }, plugin: { appId: string, version: string } };
}