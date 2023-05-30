export class StringUtils {
    static isEmpty(value: any): boolean {
        // 判断 value 是否为 undefined、null 或空数组
        if (
            value === undefined ||
            value === null ||
            (Array.isArray(value) && value.length === 0)
        ) {
            return true;
        }

        // 判断 value 是否为字符串，并检查是否为空字符串
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }

        return false;
    }
}
