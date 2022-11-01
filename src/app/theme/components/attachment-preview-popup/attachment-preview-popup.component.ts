import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
//
import {
    svgIconCloseCircle,
    svgIconDownloadWeight,
    svgIconExternalLink
} from 'src/assets/images/svg-icons.constants';
import { AttachmentHelper, RegexObject, HtmlEditorHelper } from '@app/utilities';
import { AttachmentModel} from '@app/shared/models';
import {BaseService} from '@app/core/services';

@Component({
    selector: 'app-attachment-preview-popup',
    templateUrl: './attachment-preview-popup.component.html',
    styleUrls: ['./attachment-preview-popup.component.scss']
})
export class AttachmentPreviewPopupComponent implements OnInit {
    private _visible: boolean;

    @Input()
    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        this.visibleChange.emit(value);
    }

    @Input() attachment: AttachmentModel = new AttachmentModel();

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    SVG_ICONS = {
        CloseCircle: svgIconCloseCircle.data,
        DownloadWeight: svgIconDownloadWeight.data,
        ExternalLink: svgIconExternalLink.data,
    };

    linkDownload: SafeUrl;
    fileUrl: SafeUrl;

    isDownloading: boolean = false;

    constructor(private sanitizer: DomSanitizer,
                private cdr: ChangeDetectorRef,
                private baseService: BaseService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData() {
        if (this.attachment.isInlineImage) {
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.attachment.url);

            switch(true) {
                case this.attachment.url.startsWith('data:image/'):
                    this.attachment.extension = HtmlEditorHelper.getFileExtensionFromBase64(this.attachment.url);
                    break;
                default:
                    this.attachment.extension = RegexObject.extractFileExtention(this.attachment.url);
                    const urlArr: string[] = this.attachment.url.split('/');
                    this.attachment.name = urlArr[urlArr.length - 1];
                    break;
            }
        } else {
            this.linkDownload = this.sanitizer.bypassSecurityTrustResourceUrl(this.attachment.url);
            // handle for AttachmentModel that doesn't have extension
            if (!this.attachment.extension) {
                this.attachment.extension = RegexObject.extractFileExtention(this.attachment.url);
            }
            //
            if (AttachmentHelper.isImageFile(this.attachment.extension)) {
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.attachment.url);
            } else {
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/viewerng/viewer?url='
                    + encodeURIComponent(this.attachment.url) + '&hl=en&pid=explorer&efh=false&a=v&chrome=false&embedded=true');
            }
        }
    }

    downloadFile() {
        if (this.isDownloading) {
            return;
        }
        //
        this.isDownloading = true;
        //
        this.baseService.downloadAttachment(this.attachment)
            .then()
            .finally(() => {
                this.isDownloading = false;
                //
                this.cdr.markForCheck();
            });
    }

    /**
     * Event handler
     */
    hideAttachmentPopup() {
        this.attachment = new AttachmentModel();
        //
        this.visible = false;
    }

    /**
     * Helper
     */
    isImageFileHandler = (extension: string): boolean => AttachmentHelper.isImageFile(extension);
}
