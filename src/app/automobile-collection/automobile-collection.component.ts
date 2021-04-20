import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

interface IServerResponse {
  items: string[];
  total: number;
}


@Component({
  selector: 'app-automobile-collection',
  templateUrl: './automobile-collection.component.html',
  styleUrls: ['./automobile-collection.component.css']
})
export class AutomobileCollectionComponent implements OnInit {
  p: number = 1;
  total!: number | 1000;
  loading: boolean = false;
  pageId: number = 1;
  pager = {
    pages: [{
      length: 100
    }],
    currentPage: this.pageId,
    totalPages: 10
  };
  //pageOfItems = [];
  items = [];
  pageOfItems: Array<any> | undefined;


  id: number = 1;

  query = gql`
  
  query{
    automobiles(
   page: ${this.pageId}
   )
     {
      ageOfVehicle
      carMake
      created
      email
      id
      lastName
      carModel
      firstName
      manufacturedDate
      vinNumber
   
     }
   }
 `



  elements: any = [];
  headElements = ['Id', 'First Name ', 'Last Name', 'Email', 'Car Make', 'Car Model', 'Vin Number', 'Manufactured Date'];

  vehicles: Observable<any> | undefined;
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  searchText: any;
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAutomobiles(1);
    // this.route.queryParams.subscribe(x => this.setPage(x.page || 1));
    // this.vehicles = this.apollo
    //   .watchQuery({
    //     query: this.query,
    //   })
    //   .valueChanges.pipe(
    //     (result: any) => {
    //       console.log(result.subscribe((res: any) => {
    //         console.log('hiiii', res.data.automobiles);
    //         this.elements = res.data.automobiles;


    //       }));
    //       return result;
    //     }
    //   );


  }



  private setPage(pageId: number) {
    this.pageId = pageId;
  }

  onChangePage(pageOfItems: any[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['first', 'last']);
      this.mdbTable.setDataSource(prev);
    }
  }
  previous(previous: any) {
    throw new Error("Method not implemented.");
  }
  @HostListener('input') oninput() {
    this.searchItems();
  }

  updateAutomobile(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteAutomobile(id: number) {
    const deleteQuery = gql`
    mutation{
      delete(id: ${id},automobileInput: {     
      }){
        id   
      }
      }
   `
    console.log(' delete query ', deleteQuery)
    this.apollo
      .mutate({
        mutation: deleteQuery,
      })
      .subscribe(() => {
        console.log("deleted");

        this.gotoList()
      })
  }

  gotoList() {
    this.router.navigate(['/collection']);
  }

  exportAutomobile() {

  }

  getAutomobiles(page: any): Observable<IServerResponse> {

    this.pageId = parseInt(page);
    console.log('current page ', this.pageId)
    const pageQuery = gql`
  
    query{
      automobiles(
     page: ${this.pageId}
     )
       {
        ageOfVehicle
        carMake
        created
        email
        id
        lastName
        carModel
        firstName
        manufacturedDate
        vinNumber
     
       }
     }
   `
    const perPage = 100;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    let automobilesPage: any;

    this.route.queryParams.subscribe(x => this.setPage(x.page || 1));
    this.p = page;
    automobilesPage = this.apollo
      .watchQuery({
        query: pageQuery,
      })
      .valueChanges.pipe(
        (result: any) => {
          console.log(result.subscribe((res: any) => {
            console.log('hiiii', res.data.automobiles);
            this.elements = res.data.automobiles;


          }));


          return result;
        }
      );
    return of({
      items: automobilesPage.nodes,
      total: 1000
    }).pipe(delay(1000));
  }
}


