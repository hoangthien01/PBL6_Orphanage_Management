export class AttachmentModel {
    name: string;
    url?: string;
    size?: number;
    extension?: string;

    // UI only
    type: string;
    isInlineImage?: boolean ; // Image such as inline-image on message, Avatar

    constructor(init?: Partial<AttachmentModel>) {
        Object.assign(this, init);
    }
}

export class S3PreSignedUrlModel {
    fileName: string;
    fileKey: string;
    url: string;
    size: number;

    public constructor(init?: Partial<S3PreSignedUrlModel>) {
        Object.assign(this, init);
    }
}

export class AwsS3FileModel {
    fileName: string;
    fileKey: string;

    public constructor(init?: Partial<AwsS3FileModel>) {
        Object.assign(this, init);
    }
}


export class AddingMultiAttachmentModel {
    files: File[] = [];
    preSignedFiles: AwsS3FileModel[] = [];

    constructor(init?: Partial<AddingMultiAttachmentModel>) {
        Object.assign(this, init);
    }
}

export class AddingSingleAttachmentModel {
    file: File;
    preSignedFile: AwsS3FileModel;

    constructor(init?: Partial<AddingSingleAttachmentModel>) {
        Object.assign(this, init);
    }
}

