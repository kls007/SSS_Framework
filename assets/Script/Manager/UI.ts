import { _decorator, Component, Canvas, Node, find, instantiate, Prefab } from 'cc';
import { SSS_Consts } from "../Data/SSS_Consts";
import { bdlMgr } from "./BundleManager_S";

const { ccclass, property } = _decorator;

@ccclass('UI')
export default class UI extends Component {
        static Instance: UI;
        @property(Canvas)
        canvas: Canvas | null = null;
        @property(Node)
        ui: Node | null = null;
        onLoad() {
                UI.Instance = this;
        }
        ResetUINode() {
                UI.Instance.ui = find("Canvas/UI");
        }
        async CreatePanel(_panelName: string, _params: any, msg = null) {
                const Prefab_Grid = await bdlMgr.getRes<Prefab>(SSS_Consts.BundleName.PREFAB, _panelName, Prefab);
                const node: Node = instantiate(Prefab_Grid);
                // console.log("node", node);
                const panel = node.getComponent(_params);
                // console.log("this.ui", this.ui);

                // if (!this.ui) {
                this.ui = find("Canvas/UI");
                // }

                // console.log("this.ui", this.ui);
                // console.log("this.ui.name", this.ui.name);

                this.ui.addChild(node);
                panel?.ShowOn(msg);
                return panel;
        }

        async CreatePanel_sub(_bundleName, _panelName: string, _params: any, msg = null) {
                const Prefab_Grid = await bdlMgr.getRes<Prefab>(_bundleName, _panelName, Prefab);
                const node: Node = instantiate(Prefab_Grid);
                // console.log("node--------", node);
                const panel = node.getComponent(_params);

                // console.log("this.ui", this.ui);

                // if (!this.ui) {
                this.ui = find("Canvas/UI");
                // }
                // console.log("Canvas/UI", find("Canvas/UI"));

                // console.log("this.ui", this.ui);
                // console.log("this.ui.name", this.ui.name);

                this.ui.addChild(node);
                panel?.ShowOn(msg);
                return panel;
        }
}

// /** 调试 */
window["UI"] = UI;