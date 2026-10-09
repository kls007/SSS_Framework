declare namespace bl {
    type BLReferrerInfo = {
        appId: string       // 来源小程序/小游戏的 appId
        vappId: string      // 来源小程序的 虚拟ID；仅小程序类型返回该字段，小程序可关联Up主信息，虚拟ID对应指定Up主
        extraData: object   // 来源小程序传过来的数据
    }
    type BLLaunchOptions = {
        appId: string       // 来源小程序/小游戏的 appId
        query: object       // 启动小游戏的 query 参数
        envVersion: "" | "dev" | "predev" | "precheck"  // 小游戏所在环境，为空表示线上环境，具体枚举值参见后文
        referrerInfo: BLReferrerInfo                    // 来源信息。从另一个小程序/小游戏进入时返回。否则返回 {}
        scene: string           // 启动小游戏的场景值
    }
    export function getLaunchOptionsSync(): BLLaunchOptions
    export function onShow(callback: (object: { query: any, referrerInfo: { appId: string, vAppId: string, extraData: any }, scene: string }) => void): void
    export function onHide(callback: Function): void
    type BLShortcutOptions = {
        success?: (errMsg: string) => void        // 接口调用成功的回调函数
        complete?: (errMsg: string) => void       // 接口调用结束的回调函数（调用成功、失败都会执行）
        fail?: (errMsg: string) => void           // 接口调用失败的回调函数
    }
    export function addShortcut(options: BLShortcutOptions): void
    export function checkShortcut(options: {
        success?: (object: { errMsg: string, status: { exist: boolean } }) => void
        complete?: () => void
        fail?: (errMsg: string) => void
    }): void
    export function navigateToScene(object: {
        scene?: string  // 需要确认的入口场景（目前仅支持的入参为'sidebar'）
        success?: (errMsg: string) => void
        complete?: () => void
        fail?: (errMsg: string, errCode: number) => void
    }): void
    export function login(object: {
        success?: (result: { errMsg: string, code: string }) => void
        fail?: () => void
        complete?: () => void
    }): void
    export function reportScene(object: {
        sceneId: number     // 场景ID
        costTime?: number   // 此场景的耗时，单位 ms
        dimension?: any     // 自定义维度数据，只支持能够通过JSON.stringify序列化的对象，且序列化后长度不超过1024个字符
        metric?: any        // 自定义指标数据，只支持能够通过JSON.stringify序列化的对象，且序列化后长度不超过1024个字符
        success?: (data: any) => void    // 接口调用成功的回调函数
        fail?: (data: any, errMsg: string) => void       // 接口调用失败的回调函数
        complete?: () => void   // 接口调用结束的回调函数（调用成功、失败都会执行）
    }): void
    // export class BLRewardedVideoAd {
    //     show(): Promise;
    //     onLoad(callback: Function): void;
    //     offLoad(callback: Function): void;
    //     load(): Promise;
    //     onError(callback: ({ errMsg: string, errCode: number }) => void): void;
    //     offError(callback: ({ errMsg: string, errCode: number }) => void): void;
    //     onClose(callback: ({ isEnded: boolean }) => void): void;
    //     offClose(callback: ({ isEnded: boolean }) => void): void;
    //     destroy(): Promise;
    // }
    // export function createRewardedVideoAd(object: { adUnitId: string, multiton?: boolean }): BLRewardedVideoAd
}