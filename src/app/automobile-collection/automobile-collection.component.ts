import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AutomobileService } from '../automobile.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

interface Automobiles {
  carMake: string | ''
  created: string | ''
  email: string | ''
  id: number | 0
  lastName: string | ''
  carModel: string | ''
  firstName: string | ''
  manufacturedDate: string | ''
  vinNumber: string | ''
  ageOfVehicle: number | 1;
}


@Component({
  selector: 'app-automobile-collection',
  templateUrl: './automobile-collection.component.html',
  styleUrls: ['./automobile-collection.component.css']
})

export class AutomobileCollectionComponent implements OnInit {
  @Input()
  form!: FormGroup;
  p: number = 1;
  total!: number | 1000;
  loading: boolean = false;
  pageId: number = 1;
  searchTerm: string | undefined;
  private _searchText: string = '';
  //automobilesFiltered: Automobiles[] | undefined;
  searchStr = '';
  title = 'Automobile Listing'
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

  set searchText(value: string) {
    console.log('text ', value)
    this._searchText = value;
    //if (this.searchText.length > 3) {
    this.search()
    // }

  }
  get searchText(): string {
    return this._searchText;
  }
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



  //elements: any = [];
  //elements: any = [];
  //elements: any = [];
  //elements: any = [];
  elements: Automobiles[] = [];
  filteredAutomobiles: any[] = this.elements;
  headElements = ['Id', 'First Name ', 'Last Name', 'Email', 'Car Make', 'Car Model', 'Vin Number', 'Manufactured Date', 'Age of Vehicle'];

  vehicles: Observable<any> | undefined;
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable!: MdbTableDirective;

  //searchText: any;
  constructor(private toastr: ToastrService, private apollo: Apollo, private route: ActivatedRoute, private router: Router,
    private automobileService: AutomobileService) {


  }

  ngOnInit(): void {
    //this.toastr.success('Hello', 'Hey Shona', { positionClass: 'toast-top-right' });
    this.getAutomobiles(1);
    //this.filter = new FormControl('');
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

  search(): void {
    console.log('search str ', this.searchText)
    const searchQuery = gql`
    query{
      automobilesSearch(matchStr: "${this.searchText}")
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
    console.log(' search query ', searchQuery)
    this.apollo
      .watchQuery({
        query: searchQuery,
      })
      .valueChanges.pipe(
        (result: any) => {
          console.log(result.subscribe((res: any) => {
            console.log('hi search ', res.data.automobilesSearch);
            this.elements = res.data.automobilesSearch;
          }));
          return result;
        }
      );

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
  // @HostListener('input') oninput() {
  //   this.searchItems();
  // }

  updateAutomobile(id: number) {
    this.automobileService.automobileFetch(id);
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

        this.toastr.error(" Deleted Record id " + id);
        this.gotoList();
      })
  }

  gotoList() {
    this.router.navigate(['/collection']);
  }

  exportAutomobile() {

  }

  getAutomobiles(page: any) {

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
    this.apollo
      .watchQuery({
        query: pageQuery,
      })
      .valueChanges.pipe(
        (result: any) => {
          console.log(result.subscribe((res: any) => {
            console.log('hiiiimm', res.data.automobiles);
            //this.filteredAutomobiles = this.elements;
            this.elements = res.data.automobiles;
            this.filteredAutomobiles = this.elements;


          }));
          return result;
        }
      );
    // return of({
    //   items: automobilesPage.nodes,
    //   total: 1000
    // }).pipe(delay(1000));
  }


  // getAge(dateString: string) {
  //   var today = new Date();
  //   var birthDate = new Date(dateString);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   console.log(' hello ', age)
  //   return age;
  // }
}


