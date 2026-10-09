import { _decorator, Node, Component, director, ProgressBar, Label, SpriteFrame, assetManager, sys } from 'cc';
import SSS_ShuaiFunction from './Utils/SSS_ShuaiFunction';
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export default class LoadingScene extends Component {
    public static Instance: LoadingScene;

    // @property(ProgressBar)
    // ProgressBar_loading: ProgressBar = null;
    // @property(Node)
    // bar: Node = null;

    // @property(Label)
    // Label_progress: Label = null;

    onLoad() {
        LoadingScene.Instance = this;


        director.preloadScene("MainScene", function () {
            director.loadScene("MainScene");
        });

        // LoadingScene.预加载();

        this.Login();

        SSS_ShuaiFunction.抖音推荐直玩获客();
    }

    Login() {
        if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME) {
            tt.login({
                success: (response) => {
                    console.log(`response.code`, response.code);
                }
            })
        }
    }
}