import { _decorator, Component, director } from 'cc';
const { ccclass, property, executionOrder } = _decorator;

@ccclass('SSS_Undead')
export default class SSS_Undead extends Component {
    onLoad() {
        director.addPersistRootNode(this.node);
    }
}

// /** 调试 */
// window["SSS_Undead"] = SSS_Undead;