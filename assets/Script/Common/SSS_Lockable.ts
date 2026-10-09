/** 防误触重复点击脚本*/
export function SSS_Lockable(time: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        let locked = false;
        descriptor.value = function (...args) {
            if (locked) {
                return;
            }
            locked = true;
            setTimeout(() => {
                locked = false;
            }, time);
            method.apply(this, args);
        }
        return descriptor;
    }
}