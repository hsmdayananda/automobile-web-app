import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponentComponent } from './master-component/master-component.component';
import { DataImportComponent } from './data-import/data-import.component';
import { AutomobileCollectionComponent } from './automobile-collection/automobile-collection.component';
import { DataExportComponent } from './data-export/data-export.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'export', component: DataExportComponent },
  { path: 'import', component: DataImportComponent },
  { path: 'collection', component: AutomobileCollectionComponent },
  { path: 'home', component: MasterComponentComponent },
  { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [DataImportComponent, AutomobileCollectionComponent, MasterComponentComponent]
