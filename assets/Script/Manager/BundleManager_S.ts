import { Asset, AssetManager, assetManager, director, SceneAsset } from "cc";
import { SSS_Consts } from "../Data/SSS_Consts";


/** 资源包管理器 */
class BundleManager_S {
    /** 获取资源包
     * @param bdlName 包名
     */
    async getBundle(bdlName: SSS_Consts.BundleName): Promise<AssetManager.Bundle> {
        const bundle: AssetManager.Bundle = assetManager.getBundle(bdlName);
        if (bundle) return bundle;
        return await this.loadBundle(bdlName);
    }


    /** 加载资源包
     * @param name 资源包的名称
     */
    loadBundle(bdlName: SSS_Consts.BundleName): Promise<AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            assetManager.loadBundle(bdlName, (err, bundle) => {
                if (err) {
                    console.error('资源包加载失败', err);
                    reject(`资源包${bdlName}加载失败`);
                }
                else {
                    // console.log(`资源包${bdlName}加载成功`);
                    resolve(bundle);
                }
            });
        });
    }

    /** 移除资源包（并不会移除包内资源）
     * @param bdlName 包名
     */
    removeBundle(bdlName: SSS_Consts.BundleName) {
        const bundle = assetManager.getBundle(bdlName);
        if (bundle) assetManager.removeBundle(bundle);
    }

    /** 释放包中所有资源（并不会移除包）
     * @param bdlName 包名
     */
    releaseAll(bdlName: SSS_Consts.BundleName) {
        const bundle = assetManager.getBundle(bdlName);
        if (bundle) bundle.releaseAll();
    }

    /** 获取资源
     * @param bdlName 包名
     * @param path 资源路径
     * @param type 资源类型
     */
    // getRes<T extends cc.Asset>(bdlName: SSS_Consts.BundleName, path: string, type?: typeof cc.Asset): Promise<T> {
    getRes<T extends Asset>(bdlName: any, path: string, type?: typeof Asset): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const bundle = await this.getBundle(bdlName);
            const res = bundle.get<T>(path, type);
            if (res) return resolve(res);
            new Promise<T>((resolve, reject) => {
                bundle.load<T>(path, type, (err, ass) => {
                    if (err) {
                        console.error('加载资源失败', err);
                        reject('加载资源失败');
                    }
                    else {
                        resolve(ass);
                    }
                })
            }).then((value) => {
                resolve(value);
            }).catch((err) => {
                console.error('获取资源失败', err);
                reject('获取资源失败');
            });
        });
    }

    /** 获取文件夹中所有资源
     * @param bdlName 包名
     * @param dirPath 文件夹路径
     * @param type 资源类型
     */
    getDir<T extends Asset>(bdlName: SSS_Consts.BundleName, dirPath: string, T?: typeof Asset) {
        return new Promise<T[]>(async (resolve, reject) => {
            const bundle = await this.getBundle(bdlName);
            await new Promise<T[]>((resolve, reject) => {
                bundle.loadDir<T>(dirPath, T, (err, ass) => {
                    if (err) {
                        console.error('加载资源失败');
                        reject('加载资源失败');
                    }
                    else {
                        resolve(ass);
                    }
                });
            }).then((value) => {
                resolve(value);
            }).catch(() => {
                console.error('获取资源失败');
                reject('获取资源失败');
            });
        });
    }

    /** 预加载场景
     * @param bdlName 包名
     * @param sceneName 场景名
     * @param onProgress 加载进度更改时调用的回调
     * @param onComplete 场景预加载完成后调用的回调
     */
    async preloadScene(bdlName: SSS_Consts.BundleName, sceneName: SSS_Consts.SceneName, onProgress?: (finish?: number, total?: number, item?: AssetManager.RequestItem) => void, onComplete?: (error: Error) => void) {
        const bundle = await this.getBundle(bdlName)
        bundle.preloadScene(sceneName, (finish, total, item) => {
            if (onProgress) onProgress(finish, total, item);
        }, (error) => {
            if (error) console.error('预加载场景失败', error);
            if (onComplete) onComplete(error);
        });
    }

    /** 加载场景
     * @param bdlName 包名
     * @param sceneName 场景名
     * @param onProgress 加载进度更改时调用的回调
     * @param onComplete 场景加载完成后调用的回调
     */
    loadScene(bdlName: SSS_Consts.BundleName, sceneName: SSS_Consts.SceneName, onProgress?: (finish?: number, total?: number, item?: AssetManager.RequestItem) => void, onComplete?: (error: Error, sceneAsset: SceneAsset) => void): Promise<SceneAsset> {
        return new Promise(async (resolve, reject) => {
            const bundle = await this.getBundle(bdlName);
            bundle.loadScene(sceneName, (finish, total, item) => {
                if (onProgress) onProgress(finish, total, item);
            }, (error, sceneAsset) => {
                if (onComplete) onComplete(error, sceneAsset);
                if (error) {
                    console.error('场景加载失败', error);
                    return reject(error);
                }
                resolve(sceneAsset);
            });
        });
    }

    /** 运行场景
     * @param sceneAsset 需要运行的场景
     */
    runScene(sceneAsset: SceneAsset) {
        director.runScene(sceneAsset);
    }
}

/** 资源包管理器 */
export const bdlMgr = new BundleManager_S();