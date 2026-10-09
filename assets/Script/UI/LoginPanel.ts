import { _decorator, Component, Button, sys, native, director } from 'cc';
import { SSS_Consts } from '../Data/SSS_Consts';
const { ccclass, property } = _decorator;

@ccclass('LoginPanel')
export default class LoginPanel extends Component {
    public static Instance: LoginPanel;
    @property(Button)
    Button_login: Button | null = null;
    // androidClassPath: string = "org/cocos2dx/javascript/S_TapCore"; // 需要修改为AdSdkManager对应的位置
    androidClassPath: string = "com/cocos/game/S_TapCore"; // 需要修改为AdSdkManager对应的位置
    //    // public static onJavaCallLogin(msg) {
    //    //     console.log("onJavaCallLogin----------");
    //    //     console.log(msg);
    //    //     LoginPanel.Instance.Button_login.node.active = false;
    //    // }
    onLoad() {
        LoginPanel.Instance = this;
    }
    async start() {
        this.ShowOn();

        // console.log("LoginPanel-start");


        if (sys.platform === sys.Platform.ANDROID) {
            let callJavaParams: any = {};
            let callJavaParamsStr = JSON.stringify(callJavaParams);
            
            native.reflection.callStaticMethod(this.androidClassPath, "CocosLoginstart", "(Ljava/lang/String;)V", callJavaParamsStr);
        }
        else {
            this.关闭();
            // this.ShowOff();
        }

        // // this.ShowOn();
    }
    IsLogin() {
        console.log("cocos=IsLogin");

        let callJavaParams: any = {};
        let callJavaParamsStr = JSON.stringify(callJavaParams);
        native.reflection.callStaticMethod(this.androidClassPath, "IsLogin", "(Ljava/lang/String;)V", callJavaParamsStr);
    }
    On_Button_login() {
        console.log("cocos=On_Button_login");

        let callJavaParams: any = {};
        let callJavaParamsStr = JSON.stringify(callJavaParams);
        native.reflection.callStaticMethod(this.androidClassPath, "Login", "(Ljava/lang/String;)V", callJavaParamsStr);
    }
    ShowOn() {
        this.node.active = true;
        this.AddListener();
        this.Refresh();
    }
    ShowOff() {
        this.node.active = false;
        this.RemoveListener();
    }

    关闭() {
        this.ShowOff();

        // director.loadScene(SSS_Consts.SceneName.Game1_Game_Scene);
    }

    AddListener() {
        this.Button_login.node.on('click', this.On_Button_login, this);
    }
    RemoveListener() {
        this.Button_login.node.off('click', this.On_Button_login, this);
    }
    Refresh() {

    }
}