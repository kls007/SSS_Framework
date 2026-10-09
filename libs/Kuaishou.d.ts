declare namespace ks {
    export function login(object: { success?: (res: { code: string }) => void, fail?: Function, complete?: Function }): void;
    class RewardedVideoAd {
        show(): Promise;
        destroy(): void;
        onError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        offError(listener: (res: { errMsg: string, errCode: number }) => void): void;
        onClose(listener: (res: { isEnded: boolean }) => void): void;
        offClose(listener: (res: { isEnded: boolean }) => void): void;
    }
    export function createRewardedVideoAd(object: { adUnitId: string }): RewardedVideoAd;
    export function shareAppMessage(object: { templateId?: string, query?: string, success?: Function, fail?: Function, complete?: Function }): void;
}