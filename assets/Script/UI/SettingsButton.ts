import { _decorator, Component, Node } from 'cc';
import UI from "../Manager/UI";
import SettingsPanel from "./SettingsPanel";
import { SSS_AudioManager } from '../Manager/SSS_AudioManager';

const { ccclass, property } = _decorator;

@ccclass('SettingsButton')
export default class SettingsButton extends Component {
    public static Instance: SettingsButton;

    @property(Node)
    public Button_settings: Node | null = null;

    onLoad() {
        SettingsButton.Instance = this;
        this.ShowOn();
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
    Refresh() {
    }
    AddListener() {
        this.Button_settings.on(Node.EventType.TOUCH_END, this.On_Button_settings, this);
    }
    RemoveListener() {
        this.Button_settings.off(Node.EventType.TOUCH_END, this.On_Button_settings, this);
    }
    
    async On_Button_settings() {
        SSS_AudioManager.PlayButtonAudio();

        await UI.Instance.CreatePanel(`UI/SettingsPanel`, SettingsPanel);
    }
}