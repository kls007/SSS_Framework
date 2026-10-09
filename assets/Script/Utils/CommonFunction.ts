import { _decorator, instantiate, Node, Sprite, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommonFunction')
export default class CommonFunction {
    public static SetFrame(图片, maxWidth = 100, maxHeight = 100) {
        const sprite = 图片.getComponent(Sprite);
        if (!sprite || !sprite.spriteFrame) return;

        // console.log(`sprite`, sprite);

        // 获取原始纹理尺寸
        // const texture = sprite.spriteFrame.getTexture();
        const originalWidth = 图片.node.getComponent(UITransform).width; // texture.width;
        const originalHeight = 图片.node.getComponent(UITransform).height; //texture.height;

        // console.log(`texture`, texture);

        // 计算保持比例的新尺寸
        // const maxWidth = 100;
        // const maxHeight = 100;
        let width = originalWidth;
        let height = originalHeight;

        // console.log(`width-height`, width, height);

        // 如果宽度超过最大宽度
        if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
        }

        // 如果高度仍然超过最大高度
        if (height > maxHeight) {
            const ratio = maxHeight / height;
            height = maxHeight;
            width = width * ratio;
        }

        // 设置节点尺寸
        图片.node.getComponent(UITransform).width = width;
        图片.node.getComponent(UITransform).height = height;
    }
}