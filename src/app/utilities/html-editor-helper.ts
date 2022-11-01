import { APP_REGEX } from './regex-objects';

export class HtmlEditorHelper {
    public static convertToHyperLink(text: string): string {
        const protocols = {
            http: 'http:',
            https: 'https:'
        };

        const editorTempContainer = document.createElement('p');
        editorTempContainer.innerHTML = text;
        // list <a> element
        const listAElements = editorTempContainer.querySelectorAll('a');
        // check that have <a> tag or not
        if (!listAElements.length) {
            return text;
        } else {
            listAElements.forEach((aElement: any) => {
                const link: string = aElement.href;
                if (link === '' || link == null) {
                    return;
                }

                // # http, https. That means, protocol can be other protocols, ex: 'mailto:', 'tel:', etc...
                if (aElement.protocol !== protocols.http && aElement.protocol !== protocols.https) {
                    return;
                } else {
                    const baseURI: string = aElement.baseURI.toLowerCase();
                    const origin: string = ((aElement.origin as string) + '/').toLowerCase();
                    if (baseURI !== origin) {
                        // means: User've typed hyperlink with different domain
                        return;
                    } else {
                        // means: User've typed the hyperlink without protocol or had protocol but with same domain
                        // take typed hyperlink from outerHTML
                        const outerHTML = aElement.outerHTML;
                        const splitText = outerHTML.split('href="');
                        const typedHyperLink: string = splitText[1].split('\"')[0];

                        // case 1: typedHyperLink is empty => replace <a> to text
                        if (typedHyperLink === '[object Object]' || typedHyperLink === '') {
                            const paragraphElement = document.createElement('p');
                            paragraphElement.innerHTML = aElement.innerHTML;

                            //
                            const parentAElement = aElement.parentNode;
                            parentAElement.replaceChild(paragraphElement, aElement);
                            return;
                        }
                        // case 2: typedHyperLink doesn't have protocol
                        if (!this.startWithHttpProtocol(typedHyperLink)) {
                            aElement.href = 'http://' + typedHyperLink;
                            return;
                        }
                    }
                }
            });
            return editorTempContainer.innerHTML;
        }
    }

    public static startWithHttpProtocol(link: string): boolean {
        if (!link || !link.trim()) {
            return false;
        }
        link = link.toLowerCase();
        return link.startsWith('http://') || link.startsWith('https://');
    }

    public static includesHttpProtocol(link: string): boolean {
        if (!link || !link.trim()) {
            return false;
        }
        link = link.toLowerCase();
        return link.includes('http://') || link.includes('https://');
    }

    public static isValueEmpty(value: string): boolean {
        return !value || !this.removeElementTags(value).trim();
    }

    public static removeElementTags(value: string) {
        // remove '<>' html tags
        return value.replace(/<(?!img)(?!\/img)[^>]*>/g, '');
    }

    public static getFileExtensionFromBase64(base64String: string): string {
        return '.' + base64String.substring('data:image/'.length, base64String.indexOf(';base64'));
    }

    public static isHtmlContent(value: string): boolean {
        if (!value || !value.trim()) {
            return false;
        }
        // https://regex101.com/r/pE1mT5/1
        const replacedValue: string = value.replace(new RegExp(APP_REGEX.HTML_TAGS), '');
        return replacedValue === '';
    }

    public static convertUrlToAnchorElementString(url: string, content: string = null, isOpenNewTab: boolean = true): string {
        const URL_HTTPS_AND_HTTP_REGEX: RegExp = new RegExp(APP_REGEX.URL_HTTPS_AND_HTTP_VALIDATION);
        if (!URL_HTTPS_AND_HTTP_REGEX.test(url)) {
            return url;
        }
        //
        const urlWithProtocol: string = !!this.startWithHttpProtocol(url) ? url : 'http://' + url;
        content = !!content ? content : url;
        return isOpenNewTab
            ? '<a href="' + urlWithProtocol + '" rel="noopener noreferrer" target="_blank">' + content + '</a>'
            : '<a href="' + urlWithProtocol + '" rel="noopener noreferrer">' + content + '</a>';
    }
}
