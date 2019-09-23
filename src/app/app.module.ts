import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
// AngularMaterial
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeComponent } from './shared/components/home/home.component';
import { RegistryClientComponent } from './shared/components/registry-client/registry-client.component';

//service
import { ClientService } from './core/services/client.service';
@NgModule({
  declarations: [
    HomeComponent,
    RegistryClientComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule

  ],
  providers: [
    ClientService
  ],
  bootstrap: [HomeComponent],
  entryComponents: [
    HomeComponent,
  ]
})

export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(HomeComponent, {
      injector: this.injector
    });
    customElements.define('app-innovation-repository', el);
  }
}
