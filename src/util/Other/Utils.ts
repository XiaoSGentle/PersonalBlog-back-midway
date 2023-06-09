import { SysDict } from '../../entity/SysDict';

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

export function getUUID() {
    const timestamp = new Date().getTime();
    const uuid =
        timestamp.toString() + Math.floor(Math.random() * 10).toString();
    return uuid.substr(-19);
}

export class TimeUtil {
    static GetNowTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}
export class DictUtils {
    static dictToBean(dictList: Array<SysDict>) {
        const result = {};
        dictList.forEach(item => {
            result[item.key] = item.value;
        });
        return result;
    }
}
