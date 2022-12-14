import { Component, OnDestroy, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { range } from 'rxjs/internal/observable/range';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnDestroy, OnInit {
    @ViewChild('mySlides') mySlides: ElementRef;
    dataSource: string[] = [
        "../../../../../../assets/images/app-common/banner5.jpg",
        "../../../../../../assets/images/app-common/banner6.jpg",
        "../../../../../../assets/images/app-common/banner7.jpg",
        "../../../../../../assets/images/app-common/banner8.jpg",
    ];
    backgroundIndex = 0;
    backgroundImage = this.dataSource[this.backgroundIndex];
    //
    constructor(private renderer: Renderer2) {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.Repeat();
    }

    ngOnDestroy(): void {
    }

    Repeat() {
        setTimeout(() => {
            this.showSlide();
            this.Repeat();
        }, 4000);
    }

    showSlide() {
        this.backgroundIndex++;
        console.log('this.backgroundIndex', this.backgroundIndex);
        if (this.backgroundIndex === this.dataSource.length) this.backgroundIndex = 0;
        this.backgroundImage = this.dataSource[this.backgroundIndex];
    }
}
