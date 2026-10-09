declare namespace tt {
    type LoginSuccessResponse = {
        errMsg: string,
        code: string,
        anonymousCode: string,
        isLogin: boolean,
    }
    type LoginOptions = {
        force?: boolean,
        success?: (response: LoginSuccessResponse) => void,
        complete?: Function,
        fail?: ({ errMsg: string }) => void;
    };
    export function login(options: LoginOptions): void;
    type UserInfo = {
        avatarUrl: string,
        nickName: string,
        gender: number,
        city: string,
        province: string,
        country: string,
        language: string,
    }
    type GetUserInfoSuccessResponse = {
        errMsg: string,
        rawData: string,
        userInfo: UserInfo,
    }
    type GetUserInfoOptions = {
        success?: (res: GetUserInfoSuccessResponse) => void,
        complete?: Function,
        fail?: ({ errMsg: string }) => void,
        withCredentials?: boolean,
        withRealNameAuthenticationInfo?: boolean,
    }
    export function getUserInfo(options: GetUserInfoOptions): void;
    enum AuthorScope {
        USER_INFO = 'userInfo',
        USER_LOCATION = 'userLocation',
        RECORD = 'record',
        ALBUM = 'album',
        CAMERA = 'camera',
        SCREEN_RECORD = 'screenRecord',
        CALENDAR = 'calendar',
    }
    type AuthorSuccessResponse = {
        errMsg: string,
        data: any,
    }
    type AuthorizeOptions = {
        scope: string,
        success?: (res: AuthorSuccessResponse) => void,
        fail?: ({ errMsg: string, errNo: string }) => void,
        complete?: Function,
    }
    export function authorize(options: AuthorizeOptions): void;
    type OpenAwemeUserProfileOptions = {
        success?: ({ errMsg: string, hasFollowed: boolean }) => void,
        fail?: ({ errMsg: string, errNo: number }) => void,
        complete?: Function,
    }
    export function openAwemeUserProfile(options: OpenAwemeUserProfileOptions): void;
    type AddShortcutOptions = {
        success?: ({ errMsg: string }) => void,
        fail?: ({ errMsg: string }) => void,
        complete?: Function,
    }
    export function addShortcut(options: AddShortcutOptions): void;
    class GameRecorderManager {
        start(options: { duration?: number }): void;
        pause(): void;
        recordClip(): void;
        clipVideo(): void;
        resume(): void;
        stop(): void;
        onStart(): void;
        onResume(): void;
        onPause(): void;
        onStop(cb: ({ videoPath: string }) => void): void;
        onError(): void;
        onInterruptionBegin(): void;
        onInterruptionEnd(): void;
        getMark(): void;
    }
    export function getGameRecorderManager(): GameRecorderManager;
    type ShareParam = {
        channel?: string;
        templateId?: string;
        desc?: string;
        title?: string;
        imageUrl?: string;
        query?: string;
        extra?: object;
        success?: Function;
        fail?: Function;
        complete?: Function;
    }
    export function shareAppMessage(options: ShareParam): void;
    type CreateRewardedVideoAdOptions = {
        adUnitId: string,
        multiton?: boolean = false,
        multitonRewardMsg?: string[],
        multitonRewardTimes?: number,
        progressTip?: boolean = false,
    }
    class RewardedVideoAd {
        show(): Promise;
        onLoad(callback: Function): void;
        offLoad(callback: Function): void;
        load(): Promise;
        onError(callback: ({ errMsg: string, errCode: number }) => void): void;
        offError(callback: ({ errMsg: string, errCode: number }) => void): void;
        onClose(callback: ({ isEnded: boolean, count: boolean }) => void): void;
        offClose(callback: ({ isEnded: boolean, count: boolean }) => void): void;
        destroy(): Promise;
    }
    export function createRewardedVideoAd(options: CreateRewardedVideoAdOptions): RewardedVideoAd;
    export function canIUse(schema: string): boolean;
    export function checkFollowAwemeState(options: { success?: ({ errMsg: string, hasFollowed: boolean }) => void, fail?: ({ errMsg: string }) => void, complete?: Function }): void;
    export function showToast(options: { title: string, icon?: 'success' | 'loading' | 'none' | 'fail', duration?: number }): void;
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
    export function getLaunchOptionsSync(): { query: any, scene: string, extra: { aid: number, appId: string, mpVersion: string, launch_from: string } };
    export function sendtoTAQ(param: { event_type: string, extra: Object }): void;
    class GridGamePanel {
        size: 'large' | 'medium' | 'small';
        position: { left: number, top: number };
        query: object;
        readonly gridCount: string;
        show(): Promise<void>;
        hide(): void;
        onStateChange(cb: (state: 'show' | 'close' | 'error' | 'click', appName: string, errMsg: string) => void): void;
        offStateChange(cb: (state: 'show' | 'close' | 'error' | 'click', appName: string, errMsg: string) => void): void;
        destroy(): void;
    };
    export function createGridGamePanel(options: { gridCount: 'one' | 'four' | 'nine', size?: 'large' | 'medium' | 'small', position?: { left: number, top: number }, query?: object }): GridGamePanel;
    export function checkScene(options: { scene: string, success?: (isExist: boolean, errMsg: string) => void, complete?: Function, fail?: (errMsg: string, errNo: number) => void }): void;
    export function onShow(callback: (object: { query: object, refererInfo: { appId: string, extraData: object }, scene: string, launch_from: string, location: string }) => void): void;
    export function navigateToScene(options: { scene: string, success?: (errMsg: string) => void, complete?: Function, fail?: (errMsg: string, errNo: number) => void }): void;
    export function restartMiniProgramSync(): void
}