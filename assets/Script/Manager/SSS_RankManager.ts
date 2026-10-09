import { _decorator, AudioClip, Component, director, Input, input, JsonAsset, Node, Prefab, sys, tween, UITransform, v2, v3 } from 'cc';

const { ccclass, property, executionOrder } = _decorator;

export class SSS_RankManager {
    static zoneId_游戏1 = `游戏1`;

    static 上传排行榜数据_游戏1() {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            tt.setImRankData({
                dataType: 0, //成绩为字符串类型
                value: `${1}`, //第x关
                priority: 0, //dataType为数字类型，不需要权重，直接传0
                extra: "extra",
                zoneId: SSS_RankManager.zoneId_游戏1,
                success(res) {
                    console.log(`setImRankData success res-------: ${res}`);
                },
                fail(res) {
                    console.log(`setImRankData fail res-------:: ${res.errMsg}`);
                },
            });
        }
    }

    static 获取排行榜数据_游戏1() {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            //游戏自动生成段位榜
            tt.getImRankList({
                relationType: "default", //好友榜、总榜都展示
                dataType: 0, //只圈选type为枚举类型的数据进行排序
                rankType: "day", //每天凌晨0点更新，只对当天0点到现在写入的数据进行排序 可选值有：day、week、month、all
                suffix: "关", //为空或不填，一般枚举类型不需要填后缀
                rankTitle: "关卡排行榜", //标题
                zoneId: SSS_RankManager.zoneId_游戏1,// 'default',
                success(res) {
                    console.log(`getImRankData success res-------: ${res}`);
                },
                fail(res) {
                    console.log(`getImRankData fail res-------: ${res.errMsg}`);
                },
            });
        }
    }
}

/** 调试 */
window["SSS_RankManager"] = SSS_RankManager;