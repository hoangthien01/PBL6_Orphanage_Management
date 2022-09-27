declare global {
    // eslint-disable-next-line id-blacklist
    interface String {
        toUTCString: () => string;
        toTitleCase: () => string;
        removeAllSpecialCharacter: () => string;
        toLowerCaseFirstChar: () => string;
        toUpperCaseFirstChar: () => string;

        format(...replacements: any[]): string;
    }
}

/* eslint-disable */
String.prototype.format = function(): string {
    const args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

String.prototype.toUTCString = function (): string {
    // const date = new Date();

    // return date.toUTCString();
    return "abaa";
};

String.prototype.toTitleCase = function (): string {
    return this.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

String.prototype.removeAllSpecialCharacter = function (): string {
    return this.replace(/[^a-zA-Z0-9]/g, '');
};

String.prototype.toLowerCaseFirstChar = function (): string {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.toUpperCaseFirstChar = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


export class StringHelper {
    public static isValueEmpty(text: string): boolean {
        return !text || !text.trim();
    }

    public static isValueChanged(currentValue: string, oldValue: string): boolean {
        if (!!currentValue && !!oldValue) {
            return currentValue.trim() !== oldValue.trim();
        }
        return !(!currentValue && !oldValue);
    }

    public static split_scope_text(text: string) {
      let scope = new Map();
      let ori_data =  text.split(' ');
      ori_data.forEach((item) => {
        if (!item || item == '') {
          return;
        }
        scope.set(item, true)
        // let data = item.split(':');
        // if (scope.has(data[0])) {
        //   scope.get(data[0]).push(data[1]);
        // } else {
        //   scope.set(data[0], new Array(data[1]));
        // }
      })
      return scope;
   }
}

