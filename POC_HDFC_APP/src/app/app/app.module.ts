import { NgModule} from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        BrowserModule, HttpClientModule,
        TableModule,
        CheckboxModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptor,
              multi: true,
            },
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
