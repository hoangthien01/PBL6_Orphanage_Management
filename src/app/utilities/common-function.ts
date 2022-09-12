import {custom} from 'devextreme/ui/dialog';
import {cloneDeep} from 'lodash-es';
import * as mimeTypes from 'mime';
import {Subscription} from 'rxjs';
import {Key} from 'ts-keycode-enum';
//
import { AppNotify } from '@app/utilities/notification-helper';
import {
    LIST_OF_UNICODE_CHARACTER_REPLACED_BY_SMART_ENCODING,
    MESSAGE_TYPE,
} from '@app/shared/app.constants';
import {DxTagBoxComponent} from 'devextreme-angular';
import {RegexObject} from './regex-objects';
import {DimensionModel} from '@app/shared/models/dimension.model';
import {ImageInLineModel} from '@app/shared/models/image-in-line.model';
// import {ProspectGridFieldModel} from '@app/modules/prospect/models';
import {GridColumnBaseModel, ListItemModel} from '@app/shared/models';


export class CommonFunction {

    private static twilioUnicodeCharactersReplaceBySmartEncoding = LIST_OF_UNICODE_CHARACTER_REPLACED_BY_SMART_ENCODING;

    // ref: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    public static IsKeyCodeMatch(keyEvent, keyNum, keyCode) {
        let code;
        if (keyEvent.key !== undefined) {
            code = keyEvent.key;
        } else if (keyEvent.event.key !== undefined) {
            code = keyEvent.event.key;
        } else if (keyEvent.keyIdentifier !== undefined) {
            code = keyEvent.keyIdentifier;
        } else if (keyEvent.keyCode !== undefined) {
            code = keyEvent.keyCode;
        } else if (keyEvent.event.keyCode !== undefined) {
            code = keyEvent.event.keyCode;
        }

        return code === keyCode || code === keyNum;
    }

    public static confirmDialogPromise(titleStr: string, messageStr: string, nameYes = 'YES', nameNo = 'No', visibleNoBtn = true, isShowLoading = false, width = 'auto'): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const messageHtml = `<div style='width: ${width}'>${messageStr}<div/>`;
            //
            const confirmDialog = custom({
                title: titleStr,
                messageHtml: messageHtml,
                buttons: [{
                    text: nameYes,
                    height: 40,
                    stylingMode: 'contained',
                    type: 'default',
                    onClick: () => {
                        if (isShowLoading) {
                            confirmDialog.hide();
                        }
                        resolve(true);
                    }
                }, {
                    text: nameNo,
                    visible: visibleNoBtn,
                    height: 40,
                    stylingMode: 'contained',
                    onClick: () => {
                        confirmDialog.hide();
                        resolve(false);
                    }
                }]
            });
            //
            confirmDialog.show();
            //
            const dialogElementWrapper = document.getElementsByClassName('dx-overlay-wrapper dx-dialog dx-popup-wrapper dx-dialog-wrapper ' +
                'dx-dialog-root dx-overlay-modal dx-overlay-shader');
            if (dialogElementWrapper !== undefined && dialogElementWrapper[0]) {
                dialogElementWrapper[0].classList.add('custom-confirm-dialog');
            }

            if (!visibleNoBtn) {
                const buttons = document.querySelectorAll('.custom-confirm-dialog .dx-toolbar .dx-toolbar-center .dx-toolbar-button');
                if (buttons.length > 0) {
                    buttons[buttons.length - 1].remove();
                }
            }

            const toolbars = document.querySelectorAll('.custom-confirm-dialog .dx-popup-title .dx-toolbar-after');
            toolbars.forEach((tool) => {
                tool.addEventListener('click', () => {
                    confirmDialog.hide();
                    resolve(false);
                });
            });

            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' || event.keyCode === 27) {
                    confirmDialog.hide();
                }
            });
        });
    }

    public static confirmDeleteDialogPromise(titleStr: string, messageStr: string, nameDelete = 'DELETE', nameCancel = 'Cancel', visibleNoBtn = true): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const confirmDialog = custom({
                title: titleStr,
                message: messageStr,
                buttons: [{
                    text: nameDelete,
                    height: 40,
                    width: 110,
                    stylingMode: 'contained',
                    type: 'danger',
                    onClick: () => {
                        resolve(true);
                    }
                }, {
                    text: nameCancel,
                    visible: visibleNoBtn,
                    height: 40,
                    width: 110,
                    type: 'default',
                    stylingMode: 'outlined',
                    onClick: () => {
                        confirmDialog.hide();
                        resolve(false);
                    }
                }]
            });
            //
            confirmDialog.show();
            //
            const dialogElement = document.getElementsByClassName('dx-overlay-wrapper dx-dialog dx-popup-wrapper dx-dialog-wrapper ' +
                'dx-dialog-root dx-overlay-modal dx-overlay-shader');
            if (dialogElement !== undefined && dialogElement[0]) {
                dialogElement[0].classList.add('custom-delete-confirm-dialog');
            }

            if (!visibleNoBtn) {
                const buttons = document.querySelectorAll('.custom-delete-confirm-dialog .dx-toolbar .dx-toolbar-center .dx-toolbar-button');
                if (buttons.length > 0) {
                    buttons[buttons.length - 1].remove();
                }
            }

            const toolbars = document.querySelectorAll('.custom-delete-confirm-dialog .dx-popup-title .dx-toolbar-after');
            toolbars.forEach((tool) => {
                tool.addEventListener('click', () => {
                    confirmDialog.hide();
                    resolve(false);
                });
            });

            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' || event.keyCode === 27) {
                    confirmDialog.hide();
                }
            });
        });
    }

    public static cloneDeepObject(target: any): any {
        return cloneDeep(target);
    }

    public static unsubscribe(subscriptions: Subscription[]) {
        subscriptions.forEach(subscription => {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
    }

    public static getGUID(): string {
        return 'xx7xx'.replace(/[xy]/g, (c) => {
            const r = Math.floor(Math.random() * 10000 || 0);
            const v = c === 'x' ? r : (r && 0x3 || 0x8);
            return v.toString(16);
        });
    }

    public static convertSecondsToTime(seconds: number): string {
        return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
    }
    public static convertTimeSeconds(seconds: number): string{
        return ('0' + Math.floor(seconds % 60)).slice(-2);
    }

    public static copyToClipBoard(value: string, notifyMessage: string = 'Copied to clipboard.'): void {
        if (value == null) {
            return;
        }
        // Create new element and assign selected text to it
        const textArea = document.createElement('textarea');
        textArea.value = value;
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();
        // Execute copy
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                document.body.removeChild(textArea);
                AppNotify.info(notifyMessage);
            }
        } catch (err) {
            document.body.removeChild(textArea);
        }
        // Remove element and copy listener event.
    }

    public static subtractArray(firstArray, secondArray) {
        return firstArray.filter(item => {
            return secondArray.indexOf(item) === -1;
        });
    }

    public static convertMinsToHrsMins(value: number) {
        let hours: string | number = Math.floor(value / 60);
        let min: string | number = value % 60;
        hours = hours < 10 ? '0' + hours : hours;
        if (Number(hours) > 0) {
            min = min < 10 ? '0' + min : min;
        }
        return hours > 0 ? `${hours}:${min}` : min;
    }

    public static convertMinsToTimeAmPm(value) {
        let hours: string | number = Math.floor(value / 60);
        let minutes: string | number = value % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' will be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;
    }
    // TODO: [Refactor] Use StringHelper instead
    public static isStringBlank(value: string): boolean {
        return !value || /^\s*$/.test(value);
    }
    // TODO: [Refactor] Move to DateHelper Instead
    public static isIn10Days(createdDate): boolean {
        return (Date.now() - new Date(createdDate).getTime()) < 864000000;
    }

    public static getColumnIndices(gridInstance: any) {
        // const gridOrder = new ProspectGridFieldModel();
        const gridOrder = null;
        const colCount = gridInstance.columnCount();

        for (let i = 0; i < colCount - 1; i++) {
            const visibleIndex = gridInstance.columnOption(i, 'visibleIndex');
            const isVisible = gridInstance.columnOption(i, 'visible');
            const width = gridInstance.columnOption(i, 'width');
            if (visibleIndex !== undefined) {
                const columnName = gridInstance.columnOption(i, 'name');
                if (gridOrder[columnName]) {
                    gridOrder[gridInstance.columnOption(i, 'name')].orderIndex = visibleIndex;
                    gridOrder[gridInstance.columnOption(i, 'name')].isVisible = isVisible;
                    gridOrder[gridInstance.columnOption(i, 'name')].width = width;
                } else {
                    gridOrder[gridInstance.columnOption(i, 'name')] = new GridColumnBaseModel({
                        isVisible: isVisible,
                        width: width,
                        orderIndex: visibleIndex
                    });
                }
            }
        }

        return gridOrder;
    }

    // TODO: [Refactor] Move to DateHelper Instead
    // Format base date time
    public static formatBaseDateTime(input: any): string {
        if (!input) {
            return undefined;
        }
        //
        let output = '';
        const date = new Date(input);
        if (date instanceof Date) {
            output = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

        return output;
    }

    public static getMessageType(type) {
        if (type === MESSAGE_TYPE.sms || type === MESSAGE_TYPE.sms) {
            return 'SMS';
        }

        if (type === MESSAGE_TYPE.mms || type === MESSAGE_TYPE.mms) {
            return 'MMS';
        }

        if (type === MESSAGE_TYPE.email || type === MESSAGE_TYPE.email) {
            return 'Email';
        }

        if (type === MESSAGE_TYPE.voiceMail || type === MESSAGE_TYPE.voiceMail) {
            return 'Voicemail';
        }

        if (type === MESSAGE_TYPE.outgoingCall || type === MESSAGE_TYPE.outgoingCall || type === MESSAGE_TYPE.incomingCall || type === MESSAGE_TYPE.incomingCall) {
            return 'Call';
        }

        if (type === MESSAGE_TYPE.facebook || type === MESSAGE_TYPE.facebook) {
            return 'Facebook';
        }

        if (type === MESSAGE_TYPE.liveChat || type === MESSAGE_TYPE.liveChat) {
            return 'Live Chat';
        }
    }

    public static goToPrivacyPolicy() {
        window.open('https://woosender.com/privacy-policy', '_blank');
    }

    public static goToTermOfService() {
        window.open('https://woosender.com/terms-and-services', '_blank');
    }

    public static allowUpdateDimensions(gridInstance) {
        return !!gridInstance.$element().children().get(0);
    }

    public static executeUpdateDimensions(gridInstance) {
        const executeDimensionInterval = setInterval(() => {
            if (this.allowUpdateDimensions(gridInstance)) {
                clearInterval(executeDimensionInterval);
                gridInstance.updateDimensions();
            }
        }, 10);
    }

    public static onStanderListArrowUpPressed(instance): any {
        const searchedItems = instance.option('items');
        const selectedItems = instance.option('selectedItems');
        const currentItemIndex = searchedItems.indexOf(selectedItems[0]);
        let itemIndexAvailable = -1;
        if (currentItemIndex > 0) {
            itemIndexAvailable = this.getItemIndexAvailable(searchedItems, currentItemIndex - 1, false);
        } else {
            const lastItemIndex = searchedItems.length - 1;
            itemIndexAvailable = this.getItemIndexAvailable(searchedItems, lastItemIndex, false);
        }

        if (itemIndexAvailable !== -1) {
            instance.selectItem(itemIndexAvailable);
            instance.scrollToItem(itemIndexAvailable);
            return searchedItems[itemIndexAvailable];
        }

        return undefined;
    }

    public static onStanderListArrowDownPressed(instance): any {
        const searchedItems = instance.option('items');
        const selectedItems = instance.option('selectedItems');
        const currentItemIndex = searchedItems.indexOf(selectedItems[0]);

        let nextItemIndexAvailable = -1;
        if (selectedItems.length === 0 || currentItemIndex >= searchedItems.length - 1) {
            nextItemIndexAvailable = this.getItemIndexAvailable(searchedItems, 0, true);
        } else {
            nextItemIndexAvailable = this.getItemIndexAvailable(searchedItems, currentItemIndex + 1, true);
        }

        if (nextItemIndexAvailable !== -1) {
            instance.selectItem(nextItemIndexAvailable);
            instance.scrollToItem(nextItemIndexAvailable);
            return searchedItems[nextItemIndexAvailable];
        }

        return undefined;
    }

    public static highlightDuplicateTag(tagContent: string, tagList: DxTagBoxComponent) {
        const tagElements = Array.from(tagList.instance.element().getElementsByClassName('tag-item-wrap'));
        let duplicateTagElement;

        for (const tagElement of tagElements) {
            const textContent = (tagElement as any).querySelector('.tag-item').textContent || '';
            if (textContent.trim().toLowerCase() === tagContent.trim().toLowerCase()) {
                duplicateTagElement = tagElement;
                break;
            }
        }

        if (!duplicateTagElement) {
            return;
        }

        duplicateTagElement.classList.add('tag-highlight');
        setTimeout(() => {
            duplicateTagElement.classList.remove('tag-highlight');
        }, 2000);
    }

    public static getImageSize(imgSrc): DimensionModel {
        const imgTag = document.createElement('img');
        imgTag.src = imgSrc;

        const result = new DimensionModel({
            width: imgTag.width,
            height: imgTag.height
        });

        return result;
    }

    public static previewImage(currentImage: HTMLImageElement): any {
        // Create Image element
        const ratio = 4 / 5;
        const maxHeight = window.innerHeight * ratio;
        const maxWidth = window.innerWidth * ratio;
        const imageElement = document.createElement('img');
        imageElement.setAttribute('id', 'global-image');
        imageElement.src = currentImage.src;
        imageElement.style.maxWidth = maxWidth + 'px';
        imageElement.style.maxHeight = maxHeight + 'px';

        // Create close button element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('d', 'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z');

        svg.setAttribute('style', 'width:24px; height:24px;');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.appendChild(path);

        const divContent = document.createElement('div');
        divContent.appendChild(imageElement);
        divContent.setAttribute('class', 'divContent');
        divContent.appendChild(svg);

        // Create div container element
        const divElement = document.createElement('div');
        divElement.setAttribute('class', 'global-image-container');
        divElement.appendChild(divContent);

        // Ability to close image preview when click outside of the image.
        divElement.onclick = (e) => {
            // @ts-ignore
            if (e.srcElement.tagName === 'IMG') {
                return;
            }

            document.body.removeChild(divElement);
        };

        document.body.appendChild(divElement);

        return divElement;
    }

    public static getParentElement(ele: HTMLElement, classToCheck: string) {
        const checkingEle = ele.parentElement;

        if (!checkingEle) {
            return null;
        }

        if (checkingEle.classList.contains(classToCheck)) {
            return checkingEle;
        }

        return this.getParentElement(checkingEle, classToCheck);
    }

    public static getTranslate(direction, ele) {
        const style = window.getComputedStyle(ele);
        const matrix = new WebKitCSSMatrix(style.transform);

        if (direction === 'X') {
            return matrix.m41;
        }

        return 0;
    }

    public static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public static base64ToFile(base64Url, fileName) {
        const arr = base64Url.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const ext = mimeTypes.getExtension(mime);
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        if (fileName == null) {
            fileName = new Date().getTime() + '.' + ext;
        }

        return new File([u8arr], fileName, {type: mime});
    }

    public static checkFileIsImage(fileName: string) {
        const ext = RegexObject.extractFileExtention(fileName);
        const imageExtensions = ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'];

        return imageExtensions.includes(ext.toLowerCase());
    }

    public static getEmailImageInline(htmlContent): ImageInLineModel {
        const result = new ImageInLineModel();
        const base64Images = RegexObject.extractBase64Image(htmlContent);
        if (base64Images) {
            base64Images.forEach(base64Image => {
                const file = CommonFunction.base64ToFile(base64Image, null);

                htmlContent = RegexObject.replaceBase64ToCid(htmlContent, base64Image, file.name);
                result.localImageInlines.push(new ListItemModel({
                    key: file.name,
                    value: base64Image,
                }));

                result.imageInLines.push(file);
            });
        }

        result.htmlContent = htmlContent;

        return result;
    }

    public static dxLookupScrollToSelectedItem(event) {
        const instance = event.component._$list.dxScrollView('instance');
        const itemInterval = setInterval(() => {
            const selectedItem: Element = instance.element().querySelector('.dx-list-item-selected');
            if (selectedItem) {
                instance.scrollToElement(selectedItem);
                //
                clearInterval(itemInterval);
            }
        }, 100);
    }

    static setMultipleTagDisplay(args, totalCount) {
        const selectedItemsLength = args.selectedItems.length;
        if (selectedItemsLength < totalCount) {
            args.cancel = true;
        } else {
            args.text = 'All (' + totalCount + ')';
        }
    }

    public static getFileExtension(fileName: string, isIncludeDotPrefix: boolean) {
        if (isIncludeDotPrefix) {
            return '.' + fileName.split('.').pop();
        }
        return fileName.split('.').pop();
    }

    public static permitSearchingOnlyNumber(keyCode: number, key: string): boolean {
        const permitKeys = [Key.Backspace, Key.Tab, Key.Enter];

        // permit number or permit keys
        if (permitKeys.includes(keyCode) || RegexObject.checkOnlyNumbers(key)) {
            return true;
        }
    }

    public static async convertToFile(url: string, name: string) {
        return await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], name, {type: blobFile.type}));
    }

    private static getItemIndexAvailable(searchResult, itemIndex: number, isNext: boolean): number {
        if (itemIndex === -1) {
            return searchResult.length - 1;
        }

        for (let i = itemIndex; i < searchResult.length; isNext ? i++ : i--) {
            if (i === -1) {
                i = searchResult.length - 1;
            }

            if (i === searchResult.length) {
                i = 0;
            }

            if (searchResult[i].isJoined) {
                const indexAvailable = this.getItemIndexAvailable(searchResult, isNext ? i + 1 : i - 1, isNext);
                if (indexAvailable === -1) {
                    return -1;
                }
            } else {
                return i;
            }
        }

        return -1;
    }
}
