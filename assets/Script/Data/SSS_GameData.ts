import { _decorator } from 'cc';
import { SSS_Consts } from "./SSS_Consts";

// /**游戏数据 */
export class SSS_GameData {
    static list = [
        { name: `游戏1`, game: `游戏1`, icon: `游戏1`, scene: SSS_Consts.SceneName.XieYinGeng_Game_Scene },
    ]

    static 首次启动时间 = Date.now();
    
    static 微信分享title = "";
    static 微信分享图片地址 = "";

    //    /**首次进入游戏首页 */
    static isFirstEnterMainScene = true;

}

window['SSS_GameData'] = SSS_GameData;