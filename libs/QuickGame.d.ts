declare namespace qg {
    export function login(object: { success?: (res: { data: { token: string } }) => void, fail?: (res: { errCode: number, errMsg: string }) => void, complete?: Function }): void;
    class RewardedVideoAd {
        load(): Promise;
        show(): Promise;
        onLoad(callback: Function): void;
        offLoad(callback: Function): void;
        onError(callback: Function): void;
        offError(callback: Function): void;
        onClose(callback: (res: { isEnded: boolean }) => void): void;
        offClose(callback: (res: { isEnded: boolean }) => void): void;
        destroy();
    }
    export function createRewardedVideoAd(object: { adUnitId: string }): RewardedVideoAd;
}