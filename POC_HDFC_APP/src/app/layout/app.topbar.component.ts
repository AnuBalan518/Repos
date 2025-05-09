import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;

    constructor(public layoutService: LayoutService) {}

    firstname: string = '*****';
      role: string = 'Maker';

      ngOnInit() {
        this.firstname = localStorage.getItem('firstname') || '*****';
        this.role = localStorage.getItem('role') || 'Maker';
        this.role = this.role.charAt(0).toUpperCase() + this.role.slice(1).toLowerCase(); // Making 1st character to upper
      }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config().layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = (this.layoutTheme === 'primaryColor'  && !(this.layoutService.config().theme  == "yellow")) ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
        return path + logo;
    }

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }
//     signOut() {
//             this.router.navigate(['/login']);
//         }
}
