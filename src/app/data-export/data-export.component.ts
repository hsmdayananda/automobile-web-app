import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { gql, Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-data-export',
  templateUrl: './data-export.component.html',
  styleUrls: ['./data-export.component.css']
})

export class DataExportComponent implements OnInit {
  fieldNameSelected!: any;
  operator!: any;
  value!: string;




  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) { }


  ngOnInit(): void {
  }
  selectedFieldName() {
    this.fieldNameSelected
  }
  selectedOperatorName() {
    this.operator
  }

  valueSet() {
    this.value
  }
  submitRequest() {

    const query = gql`
  query automobileExportData($searchCriteriaInput: SearchCriteriaInput!){
    automobilesExportDataFeed(searchCriteriaInput: $searchCriteriaInput){
      firstName
      lastName
    }
  }
 `
    const obj = {
      filterField: this.fieldNameSelected,
      operator: this.operator,
      value: parseInt(this.value)
    }
    console.log(' query filter', obj)
    this.apollo
      .watchQuery({
        query: query,
        variables: {
          searchCriteriaInput: obj
        }
      })
      .valueChanges.pipe(
        (result: any) => {
          console.log(result.subscribe(async (res: any) => {
            console.log('hiiii', res);



          }));
          return result;
        }
      )
  }
}



