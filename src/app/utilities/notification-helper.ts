import notify from 'devextreme/ui/notify';
import {confirm, alert} from 'devextreme/ui/dialog';

export class AppNotify {
    static info(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'info', timeShown);
    }

    static warning(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'warning', timeShown);
    }

    static error(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'error', timeShown);
    }

    static success(message?: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        notify(AppNotify.getNotifyOptions(message || SUCCESSFULLY, isHTMLContent), 'success', timeShown);
    }

    static confirm(message: string, title: string): Promise<boolean> {
        return confirm(message, title);
    }

    static alert(message: string, title: string) {
        return alert(message, title);
    }

    private static getNotifyOptions(message: string, isHTMLContent: boolean = false) {
        // https://js.devexpress.com/Documentation/20_2/ApiReference/UI_Components/dxToast/Configuration/#message
        return {
            message: !isHTMLContent ? message : '',
            contentTemplate: isHTMLContent
                ? `<div class="dx-toast-message">${message}</div>`
                : undefined,
            closeOnClick: true
        };
    }

    /**
     * The message format:
     * - "The item has been added"
     * - "2 items have been deleted"
     */
    public static generateSuccessMessage(object: string = 'item', action: string = 'added', multiple: boolean = false): string {
        return `${multiple ? object : 'The ' + object} `
            + `${multiple ? 'have been' : 'has been'} `
            + `${action}.`;
    }
}

export const ERROR = 'An error has occurred!';
export const SUCCESSFULLY = 'Successfully done';
export const SUBMITSUCCESS = 'Submitted successfully!';
export const RESUBMITSUCCESS = 'Resubmitted successfully!';
export const ADDSUCCESS = 'Add successfully!';
export const UPDATESUCCESS = 'Updated successfully!';
export const DELETESUCCESS = 'Deleted successfully';
export const NOAUTHORIZED = 'You are not authorized!';
export const UPDATEUNSUCCESS = 'Error when Updating.';
