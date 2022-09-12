export class ObjectHelper {
    public static convertToQueryParams(data: Record<string, unknown> | any): string {
        return Object.keys(data).map((key) => {
            const value: any = data[key] == null ? '' : data[key];
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }).join('&');
    }

    public static convertObjectToArray(data: Record<string, unknown> | any): { key: any; value: any }[] {
        return Object.keys(data).map(key => ({ key: key, value: data[key] }));
    }
}
