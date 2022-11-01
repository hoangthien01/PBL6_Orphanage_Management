import {AppNotify} from './notification-helper';
import { AttachmentModel, ListItemModel} from '@app/shared/models';
import { FILE_ATTACHMENT_TYPES, TWILIO_MMS_MEDIA_TYPE_ACCEPTED, MESSAGE_TYPE } from '@app/shared/app.constants';

const MMS_FILES_MAX_SIZE_MB: number = 5; // 5MB
const MMS_NON_IMAGE_SIZE: number = 600 * 1024; // Non-image file must under 600 KB
const MMS_TWILIO_NUMBER_OF_FILE_LIMITATION: number = 10;
const EMAIL_FILES_MAX_SIZE_MB: number = 20; // 20 MB
const AWS_API_GATE_WAY_PAYLOAD_SIZE_LIMIT: number = 10; // 10 MB

export class AttachmentHelper {
    public static isImageFile(extension: string): boolean {
        return extension ? FILE_ATTACHMENT_TYPES.Image.includes(extension.toLowerCase()) : false;
    }

    public static isAudioFile(extension: string): boolean {
        return extension ? FILE_ATTACHMENT_TYPES.Audio.includes(extension.toLowerCase()) : false;
    }

    public static isVideoFile(extension: string): boolean {
        return extension ? FILE_ATTACHMENT_TYPES.Video.includes(extension.toLowerCase()) : false;
    }

    public static isAllFile(extension: string): boolean {
        return extension ? FILE_ATTACHMENT_TYPES.All.includes(extension.toLowerCase()) : false;
    }

    public static addMmsAttachment(event: any, attachments: AttachmentModel[] | File[]): void {
        if (!event || !event.target || !event.target.files || !event.target.files.length) {
            return;
        }

        const file: File = event.target.files[0];

        if (!TWILIO_MMS_MEDIA_TYPE_ACCEPTED.includes(file.type)) {
            if (file.type.includes('image')) {
                AppNotify.warning('The image file type is not supported. Please select jpeg, png or gif.');
            } else {
                AppNotify.warning('The chosen file is not supported. Please choose another one!');
            }
            return;
        }
        //
        if (file.type && !file.type.includes('image') && file.size > MMS_NON_IMAGE_SIZE) {
            AppNotify.warning(`Attachment file size (non-image) limit exceed 600KB.`);
            return;
        }
        //
        if (!!attachments) {
            // Twilio limited number of media is 10 per mms
            if (attachments.length === MMS_TWILIO_NUMBER_OF_FILE_LIMITATION) {
                AppNotify.warning('Total number of attachments limit exceed 10.');
                return;
            }

            this.addFileToAttachmentList(file, attachments, MMS_FILES_MAX_SIZE_MB);
        }
    }

    // Refactor later
    public static addMultipleAttachments(event: any, attachments: AttachmentModel[] | File[], messageType: string = MESSAGE_TYPE.email): void {
        const files: File[] = Array.from(event.target.files);

        files.forEach((file: File) => {
            switch (messageType) {
                case MESSAGE_TYPE.email:
                    AttachmentHelper.addEmailAttachment(file, attachments);
                    break;
                case MESSAGE_TYPE.email:
                    break;
            }
        });
    }

    public static addEmailAttachment(file: File, attachments: AttachmentModel[] | File[]): void {
        if (!file) {
            return;
        }
        //
        if (attachments != null) {
            this.addFileToAttachmentList(file, attachments, EMAIL_FILES_MAX_SIZE_MB);
        }
    }

    public static isAttachmentsExceedApiGatewayPayload(files: File[], ...listArgs: any): boolean {
        const attachments = this.combineMultipleFileListToSingleList(files, listArgs);
        // List is null or empty then no need to check
        if (attachments.length < 1) {
            return false;
        }

        const totalSize = this.getTotalSize(null, attachments);

        // - 1mb backup for other data request
        return totalSize > (AWS_API_GATE_WAY_PAYLOAD_SIZE_LIMIT - 1) * 1024 * 1024;
    }

    public static removeAttachment(removedFile: AttachmentModel | File, attachments: AttachmentModel[] | File[]) {
        const removedFileIndex = attachments.findIndex((attachment) => {
            // stored attachments
            if (!!attachment.url) {
                return attachment.url === (removedFile as AttachmentModel).url;
            } else {
                // added files
                return attachment.name === (removedFile as File).name
                    && attachment.type === (removedFile as File).type
                    && attachment.size === (removedFile as File).size
                    && attachment.lastModified === (removedFile as File).lastModified;
            }
        });
        //
        if (removedFileIndex > -1) {
            attachments.splice(removedFileIndex, 1);
        }
    }

    public static getSeparatedGroupAttachments(attachments: AttachmentModel[] | File[]): { attachmentUrls: AttachmentModel[]; files: File[] } {
        const attachmentUrls: AttachmentModel[] = [];
        const files: File[] = [];
        //
        attachments.forEach((attachment) => {
            if (!!attachment.url) {
                attachmentUrls.push(attachment);
            } else {
                files.push(attachment);
            }
        });
        //
        return {attachmentUrls: attachmentUrls, files: files};
    }

    public static mapToAttachmentUrlModel(attachmentUrls: ListItemModel<string, string>[]): AttachmentModel[] {
        if (!attachmentUrls || !attachmentUrls.length) {
            return [];
        }
        //
        return attachmentUrls.map((attachment) => {
            return new AttachmentModel({
                name: attachment.key,
                url: attachment.value
            });
        });
    }

    public static mapToAttachmentModel<T>(
        attachments: T[],
        AttachmentPlaceholderModel: new () => T,
        nameExpr: string = 'key',
        urlExpr: string = 'value',
        attachmentSizes: number[] = []
    ): AttachmentModel[] {
        if (!attachments || !attachments.length) {
            return [];
        }
        //
        return attachments.map((attachment: T, index: number) => {
            return new AttachmentModel({
                name: attachment[nameExpr],
                url: attachment[urlExpr],
                size: !!attachmentSizes && !!attachmentSizes.length
                    ? attachmentSizes[index]
                    : null,
            });
        });
    }

    public static mapToListItemModels<T>(params: { attachmentUrls: T[]; nameExpr?: string; urlExpr?: string  }): ListItemModel<string, string>[] {
        if (!params.attachmentUrls || !params.attachmentUrls.length) {
            return [];
        }
        // name, url from AttachmentModel
        return params.attachmentUrls.map((attachment) => {
            return new ListItemModel({
                key: attachment[!!params.nameExpr ? params.nameExpr : 'name'],
                value: attachment[!!params.urlExpr ? params.urlExpr : 'url'],
            });
        });
    }

    private static combineMultipleFileListToSingleList(listOfFiles: File[], ...args: any): File[] {
        let addingAttachments = listOfFiles ?? [];
        // Handle for extra list
        const otherFileLists = args[0];
        if (otherFileLists.length > 0) {
            otherFileLists.forEach(files => {
                if (files?.length > 0) {
                    addingAttachments = addingAttachments.concat(files);
                }
            });
        }

        return addingAttachments;
    }

    private static addFileToAttachmentList(file: File, attachments: AttachmentModel[] | File[], maxSizeInMb: number): void {
        const maxSizeInByte: number = maxSizeInMb * 1024 * 1024;
        //
        // # VALIDATE FILES SIZE
        // 1. Validate adding files
        if (this.getTotalSize(file, attachments) > maxSizeInByte) {
            AppNotify.warning(`Total file size cannot exceed ${maxSizeInMb}MB.`);

            return;
        }

        // 2. Validate all of attachments including stored file
        // Hide Temporarily, the validating of all attachments size will be executed from BE
        /*
        if (this.getTotalSize(file, attachments) > maxSizeInByte) {
            AppNotify.warning(`Total file size cannot exceed ${maxSizeInMb}MB.`);
            return;
        }*/

        // @ts-ignore
        attachments.push(file);
    }

    private static getTotalSize(file: File, attachments: AttachmentModel[] | File[]) {
        let size: number = file?.size || 0;
        //
        if (attachments.length > 0) {
            attachments.forEach((attachment: AttachmentModel | File) => {
                if (attachment.size) {
                    size += attachment.size;
                }
            });
        }
        return size;
    }

    public static getRemovedS3Urls(prevAttachments: AttachmentModel[], newAttachments: AttachmentModel[]): string[] {
        const prevUrlsObject: Record<string, boolean>= {};
        prevAttachments.map((_) => {
            prevUrlsObject[_.url] = true;
        });
        //
        const newUrlsObject: Record<string, boolean> = {};
        //
        newAttachments.map((_) => {
            newUrlsObject[_.url] = true;
        });
        const removedS3Url: string[] = [];
        Object.keys(prevUrlsObject).forEach((prevUrl) => {
            if (!newUrlsObject[prevUrl]) {
                removedS3Url.push(prevUrl);
            }
        });
        return removedS3Url;
    }
}
