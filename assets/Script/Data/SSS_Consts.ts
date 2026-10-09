export namespace SSS_Consts {
    export const GAME_ID = ""; //游戏名称
    export const GAME_NAME = ""; //英文游戏名称
    export const GAME_VERSION = "1.0.0"; //游戏版本
    export const GAME_PACKAGE_NAME = ""; //游戏包名

    /** 包名 */
    export const enum BundleName {
        SCENE = 'Scene',
        PREFAB = 'Prefab',
        AUDIO = 'Audio',
        ANIMATION = 'Animation',
        SPRITE = 'Sprite',
        SCRIPT = 'Script',
        JSON = 'json',
    }

    /** 场景名 */
    export const enum SceneName {
        // 主场景
        MainScene = 'MainScene',

        // 游戏
        Game1_Game_Scene_Main_Scene = 'Game1_Game_Scene_Main_Scene',
        Game1_Game_Scene_Game_Scene = 'Game1_Game_Scene_Game_Scene',

        SelectLevelScene = 'SelectLevelScene',
    }
}