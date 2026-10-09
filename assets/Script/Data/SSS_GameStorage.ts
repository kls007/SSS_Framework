// /** 存储类，用于存储需要本地保存的数据 */

import { _decorator, sys } from 'cc';
interface SSS_GameStorageData {
    wxRecommendDate: number;
    tt_侧边栏状态: number;
}

export class SSS_GameStorage {
    static data: SSS_GameStorageData = null;
    static defaultValue: SSS_GameStorageData = null;
    static initData() {
        SSS_GameStorage.InitDefaultData();

        let dataStr = sys.localStorage.getItem(`SSS_GameStorage`);
        if (!dataStr || dataStr === "") {
            SSS_GameStorage.clearData();
        } else {
            SSS_GameStorage.data = JSON.parse(dataStr);
            SSS_GameStorage.saveData();
        }

        SSS_GameStorage.SetEveryData();
    }
    //    // 初始化默认值
    static InitDefaultData() {
        SSS_GameStorage.defaultValue = {
            wxRecommendDate: 0,
            tt_侧边栏状态: 0,
        };
    }
    static SetEveryData() {
        // 递归检查并更新所有属性
        SSS_GameStorage.mergeDataRecursively(SSS_GameStorage.data, SSS_GameStorage.defaultValue);
        SSS_GameStorage.saveData();
    }
    //    // 递归合并数据，确保所有属性都存在
    static mergeDataRecursively(target: any, source: any) {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                // 如果目标对象没有这个属性，直接赋值
                if (!target.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
                // 如果目标对象有这个属性，且源对象的值是对象类型，则递归检查
                else if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
                        SSS_GameStorage.mergeDataRecursively(target[key], source[key]);
                    } else {
                        // 如果目标不是对象类型，用默认值替换
                        target[key] = source[key];
                    }
                }
                // 对于数组类型，如果目标没有这个属性，则使用默认值
                else if (Array.isArray(source[key]) && !target.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    static clearData() {
        SSS_GameStorage.data = { ...SSS_GameStorage.defaultValue };
    }
    static saveData() {
        let dataStr = JSON.stringify(SSS_GameStorage.data);
        sys.localStorage.setItem(`SSS_GameStorage`, dataStr);
    }
}