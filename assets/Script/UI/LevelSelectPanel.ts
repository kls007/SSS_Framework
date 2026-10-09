import { _decorator, Component, Node, Prefab, instantiate, Vec3, Sprite, SpriteFrame, UITransform, find, Label, Color, PageView, Button, director, CCFloat, CCInteger } from 'cc';
import { bdlMgr } from '../Manager/BundleManager_S';
import { WordList } from '../Data/WordList';
import CommonFunction from '../Utils/CommonFunction';
import { SSS_AudioManager } from '../Manager/SSS_AudioManager';

const { ccclass, property } = _decorator;

@ccclass('LevelSelectPanel')
export default class LevelSelectPanel extends Component {
    public static Instance: LevelSelectPanel;

    @property(PageView) private pageView: PageView = null!;
    @property(Label) private pageLabel: Label = null!;
    @property(Button) private prevPageBtn: Button = null!;
    @property(Button) private nextPageBtn: Button = null!;

    @property(Prefab) private itemPrefab: Prefab = null!;
    @property(Prefab) private pagePrefab: Prefab = null!;

    @property(CCInteger) private rows: number = 3;
    @property(CCInteger) private cols: number = 2;
    @property(CCFloat) private spacingX: number = 50;
    @property(CCFloat) private spacingY: number = 50;
    @property(CCFloat) private nodeWidth: number = 0;
    @property(CCFloat) private nodeHeight: number = 0;

    private totalPages: number = 5;
    private itemsPerPage: number = 0;

    async onLoad() {
        LevelSelectPanel.Instance = this;
        this.itemsPerPage = this.rows * this.cols;
        this.totalPages = Math.ceil(WordList.length / this.itemsPerPage);

        console.log(`一共多少页 = ${this.totalPages}, 每页数量 = ${this.itemsPerPage}`);

        this.createPages();

        // 监听页面切换事件
        this.pageView.node.on(PageView.EventType.PAGE_TURNING, this.onPageTurning, this);

        // 添加按钮点击事件
        this.prevPageBtn.node.on(Node.EventType.TOUCH_END, this.onPrevPage, this);
        this.nextPageBtn.node.on(Node.EventType.TOUCH_END, this.onNextPage, this);

        // 初始化页码显示和按钮状态

        await new Promise(res => this.scheduleOnce(res, 0.01));

        let level = 1;
        // console.log(`当前关卡 = ${level}`);
        let page = Math.floor((level - 1) / this.itemsPerPage);
        // console.log(`当前页码 = ${page}`);
        this.updatePageDisplay(page);
        this.pageView.scrollToPage(page, 0.0);
    }

    createPages() {
        const content = this.pageView.content;
        content.removeAllChildren();

        for (let pageIndex = 0; pageIndex < this.totalPages; pageIndex++) {
            const pageNode = instantiate(this.pagePrefab);
            // const pageNode = new Node(`Page_${pageIndex}`);
            // pageNode.addComponent(UITransform);
            // const viewTransform = this.pageView.node.getComponent(UITransform);
            // pageNode.getComponent(UITransform)!.setContentSize(viewTransform.width, viewTransform.height);
            content.addChild(pageNode);

            this.createPageItems(pageNode, pageIndex);
        }
    }

    createPageItems(pageNode: Node, pageIndex: number) {
        pageNode.removeAllChildren();

        const totalWidth = this.cols * this.nodeWidth + (this.cols - 1) * this.spacingX;
        const totalHeight = this.rows * this.nodeHeight + (this.rows - 1) * this.spacingY;

        const startX = -totalWidth / 2 + this.nodeWidth / 2;
        const startY = totalHeight / 2 - this.nodeHeight / 2;

        const startIndex = pageIndex * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, WordList.length);

        for (let i = startIndex; i < endIndex; i++) {
            const localIndex = i - startIndex;
            const item = instantiate(this.itemPrefab);
            pageNode.addChild(item);

            const row = Math.floor(localIndex / this.cols);
            const col = localIndex % this.cols;

            const posX = startX + col * (this.nodeWidth + this.spacingX);
            const posY = startY - row * (this.nodeHeight + this.spacingY);

            item.getComponent(UITransform)?.setContentSize(this.nodeWidth, this.nodeHeight);
            item.setPosition(new Vec3(posX, posY, 0));

            let item_data = WordList[i];


            let sp = find(`sp`, item).getComponent(Sprite);

            // Label_1.string = `这是${item_data.t1}`;
            // Label_2.string = `这是${item_data.t2}`;

            let w = 170;
            let h = w / 1.65;

            let is_unlock = this.是否解锁(i + 1);
            // console.log(`是否解锁 = ${i},____ ${is_unlock}`);

            if (is_unlock) {
                // Sprite_1.color = Color.WHITE;
                sp.color = Color.WHITE;
            }
            else {
                // Sprite_1.color = new Color().fromHEX("#0A0A14");
                sp.color = new Color().fromHEX("#0A0A14");
            }

            let level = i + 1
            let value = Math.ceil(level / 20);
            let ab = `L_${value}`

            bdlMgr.getRes<SpriteFrame>(ab, `${item_data.root}/${item_data.sp2}/spriteFrame`, SpriteFrame).then(res => {
                if (sp && sp.spriteFrame) {
                    sp.node.active = true;
                    sp.spriteFrame = res
                    sp.sizeMode = Sprite.SizeMode.TRIMMED;
                    CommonFunction.SetFrame(sp, w, h);
                }
            })

            item.on(Node.EventType.TOUCH_END, () => {
                this.onItemClick(i, item_data);
            }, this);
        }
    }

    是否解锁(level: number) {
        return level <= 1;
    }

    /**
     * 页面切换事件回调
     */
    private onPageTurning(event: Event) {
        const currentPage = this.pageView.getCurrentPageIndex();
        this.updatePageDisplay(currentPage);
    }

    /**
     * 上一页按钮点击
     */
    private onPrevPage() {
        const currentPage = this.pageView.getCurrentPageIndex();
        let targetPage = currentPage - 1;

        if (targetPage < 0) {
            targetPage = this.totalPages - 1;
        }

        this.pageView.scrollToPage(targetPage, 0.3);
    }

    /**
     * 下一页按钮点击
     */
    private onNextPage() {
        const currentPage = this.pageView.getCurrentPageIndex();
        let targetPage = currentPage + 1;

        if (targetPage >= this.totalPages) {
            targetPage = 0;
        }

        this.pageView.scrollToPage(targetPage, 0.3);
    }

    /**
     * 更新页码显示和按钮状态
     */
    private updatePageDisplay(currentPage: number) {
        if (this.pageLabel) {
            this.pageLabel.string = `${currentPage + 1}/${this.totalPages}`;
        }

        // if (this.prevPageBtn) {
        //     this.prevPageBtn.interactable = true;
        // }
        // if (this.nextPageBtn) {
        //     this.nextPageBtn.interactable = true;
        // }
    }

    private onItemClick(index: number, data: any) {
        // console.log(`点击了第${index}项`, data);

        let is_unlock = this.是否解锁(index + 1);
        console.log(`是否解锁 = ${index},____ ${is_unlock}`);

        if (is_unlock) {
            director.loadScene("Game1_Game_Scene");
        }

        SSS_AudioManager.PlayButtonAudio();
    }
}