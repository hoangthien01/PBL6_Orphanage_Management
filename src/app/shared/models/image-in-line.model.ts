import {ListItemModel} from './list-item.model';

export class ImageInLineModel {
    htmlContent: string;
    imageInLines: File[] = [];
    localImageInlines: ListItemModel<string, string>[] = [];
}
