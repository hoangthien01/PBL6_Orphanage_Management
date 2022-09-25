export class ArrayHelper {
    public static convertToObject(
        array: any[],
        valueExpr: string = 'value',
        displayExpr: string = 'name'
    ): Record<string, any> {
        const result: Record<string, any> = {};
        if (!array || !Array.isArray(array)) {
            return result;
        }
        //
        array.forEach((item) => {
            result[item[displayExpr]] = item[valueExpr];
        });
        return result;
    }

    public static convertToString(array: any[]): string {
        let result:string;
        if (!array || !Array.isArray(array)) {
            return result;
        }
        //
        result = array.toString().replace(new RegExp(',', 'g'), ' ');
        return result;
    }

    public static getUnDuplicatedItemsFromChildrenItems<T>(params: {
        ArrayModel: new () => T;
        parentItems: T[];
        childrenItems: T[];
        valueExpr: string;
    }): T[] {
        if (!params.parentItems || !params.parentItems.length || !params.childrenItems || !params.childrenItems.length) {
            return [];
        }
        //
        const objectOfChildrenItems: Record<string, {isDuplicated: boolean; data: T}> = {};
        params.childrenItems.map((item) => {
            objectOfChildrenItems[item[params.valueExpr]] = {
                isDuplicated: false,
                data: item
            };
        });
        //
        params.parentItems.map((item) => {
            if (!!objectOfChildrenItems[item[params.valueExpr]] && !!objectOfChildrenItems[item[params.valueExpr]]?.data) {
                objectOfChildrenItems[item[params.valueExpr]].isDuplicated = true;
            }
        });
        //
        const unDuplicatedItemsFromChildrenItems: T[] = [];
        Object.keys(objectOfChildrenItems).forEach((key: string) => {
            if (!objectOfChildrenItems[key].isDuplicated) {
                unDuplicatedItemsFromChildrenItems.push(objectOfChildrenItems[key].data);
            }
        });
        return unDuplicatedItemsFromChildrenItems;
    }

    public static getDuplicatedItemsFromChildrenItems<T>(params: {
        itemType: 'object' | 'number' | 'string';
        parentItems: any[];
        childrenItems: any[];
        valueExpr?: string;
    }): any[] {
        if (!params.parentItems || !params.parentItems.length || !params.childrenItems || !params.childrenItems.length) {
            return [];
        }
        //
        const duplicatedItemsFromChildrenItems: any[] = [];
        const objectOfChildrenItems: Record<string, { isDuplicated: boolean; data?: T }> = {};
        //
        switch(params.itemType) {
            case 'object':
                if (!params.valueExpr) {
                    return [];
                }
                params.childrenItems.map((item) => {
                    objectOfChildrenItems[item[params.valueExpr]] = {
                        isDuplicated: false,
                        data: item
                    };
                });
                //
                params.parentItems.map((item) => {
                    if (!!objectOfChildrenItems[item[params.valueExpr]] && !!objectOfChildrenItems[item[params.valueExpr]]?.data) {
                        objectOfChildrenItems[item[params.valueExpr]].isDuplicated = true;
                    }
                });
                //
                Object.keys(objectOfChildrenItems).forEach((key: string) => {
                    if (!!objectOfChildrenItems[key].isDuplicated) {
                        duplicatedItemsFromChildrenItems.push(objectOfChildrenItems[key].data);
                    }
                });
                break;
            case 'string':
            case 'number':
                params.childrenItems.map((item) => {
                    objectOfChildrenItems[item] = {
                        isDuplicated: false,
                    };
                });
                //
                params.parentItems.map((item) => {
                    if (!!objectOfChildrenItems[item]) {
                        objectOfChildrenItems[item].isDuplicated = true;
                    }
                });
                //
                Object.keys(objectOfChildrenItems).forEach((key: string) => {
                    if (!!objectOfChildrenItems[key].isDuplicated) {
                        duplicatedItemsFromChildrenItems.push(key);
                    }
                });
                break;
        }
        //
        return duplicatedItemsFromChildrenItems;
    }
}
