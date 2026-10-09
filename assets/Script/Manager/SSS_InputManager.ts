import { _decorator, Component, find, input, Input, EventKeyboard, KeyCode, SpriteFrame, director, RigidBody2D, ERigidBody2DType, v2, randomRangeInt, sys, } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('SSS_InputManager')
export default class SSS_InputManager extends Component {
        static Instance: SSS_InputManager;

        onLoad() {
                SSS_InputManager.Instance = this;
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }

        async onKeyDown(event: EventKeyboard) {
                // if (event.keyCode == KeyCode.ARROW_UP || event.keyCode == KeyCode.KEY_W) {
                //         // console.log(`up`);
                //         // SS_GameManager.Instance.上一关();
                // }
                // if (event.keyCode == KeyCode.ARROW_DOWN || event.keyCode == KeyCode.KEY_S) {
                //         // console.log(`down`);
                //         // SS_GameManager.Instance.下一关();
                // }

                if (event.keyCode == KeyCode.ARROW_LEFT || event.keyCode == KeyCode.KEY_A) {
                        // console.log(`left`);

                }
                if (event.keyCode == KeyCode.ARROW_RIGHT || event.keyCode == KeyCode.KEY_D) {
                        // console.log(`right`);

                }

                // if (event.keyCode == KeyCode.SPACE) {
                //         console.log(`空格`);

                //         let randomIndex = randomRangeInt(0, AdMgr.VideoIdOnWx_list.length);
                //         let videoId = AdMgr.VideoIdOnWx_list[randomIndex];
                //         console.log(`randomIndex`, randomIndex);
                //         console.log(`随机视频id`, videoId);
                // }

                if (event.keyCode == KeyCode.ESCAPE) {
                        sys.localStorage.clear();

                        // SS_UIManager.Instance.CreatePanel(`UI/SettingPanel`, SettingPanel);
                }

                // if (event.keyCode == KeyCode.NUM_1) {
                //         console.log("num1");
                // }
                // if (event.keyCode == KeyCode.NUM_2) {
                //         console.log("num2");
                // }
                // if (event.keyCode == KeyCode.NUM_3) {
                //         // console.log("num3");
                //         // SS_AudioManager.Instance.pause();
                // }
        }
}