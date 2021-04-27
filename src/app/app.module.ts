import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutomobileCollectionComponent } from './automobile-collection/automobile-collection.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DataExportComponent } from './data-export/data-export.component';
import { NotificationComponent } from './notification/notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './search-filter.pipe';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'






@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    AutomobileCollectionComponent,
    UpdateComponent,
    DataExportComponent,
    NotificationComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: "toast-top-right",

      }
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
