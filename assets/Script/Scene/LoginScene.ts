import { _decorator, Component, Button } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export default class LoginScene extends Component {
    static Instance: LoginScene;

    protected onLoad() {
        LoginScene.Instance = this;
    }
}