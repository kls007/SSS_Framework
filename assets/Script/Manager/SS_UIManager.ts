import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SSUIManager')
export default class SS_UIManager extends Component {
    public static Instance: SS_UIManager;

    onLoad() {
        SS_UIManager.Instance = this;

        for (let index = 0; index < this.node.children.length; index++) {
            let child = this.node.children[index];
            let active: boolean = child.active;
            child.active = true;
            child.active = active;
        }
    }
}