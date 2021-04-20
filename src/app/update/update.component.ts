import { Component, OnInit, Input } from '@angular/core';
import { Automobile } from '../../../Automobile'
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: string = '1';
  formObj: any = {};

  automobile: any = {
    // carMake: 'BMW', created: '2019/09/09', email: 'test@gmail.com',
    // id: '123', carModel: 'FFF', lastName: 'hasini', firstName: 'dayananda', manufacturedDate: '2010/09/08', vinNumber: 'KM89D133M3'
  };


  query = gql`mutation updateAutomobiles($id: Int!,$automobileInput: AutomobileInput!){
    update(id:$id, automobileInput: $automobileInput){
      firstName
    }
  }
 `


  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.automobile = new Automobile();

    this.id = this.route.snapshot.params['id'];
    const getQuery = gql`
    query {
      automobileById(id: ${this.id}){
        firstName
        lastName
        email
        ageOfVehicle
        carMake
        carModel
          
        }
      }
      
    `
    this.apollo
      .watchQuery({
        query: getQuery,
      })
      .valueChanges.pipe(
        (result: any) => {
          console.log(result.subscribe(async (res: any) => {
            console.log('hiiii', res);


            this.automobile = res.data.automobileById;

            console.log('automobile', this.automobile)
            this.formObj = Object.assign({}, this.automobile);
          }));
          return result;
        }
      );

  }



  updateAutomobile() {
    console.log(' hello query', this.formObj)
    delete this.formObj.__typename;
    delete this.formObj.__proto__;
    console.log(' hello query 3', this.formObj)
    this.apollo
      .mutate({
        mutation: this.query,
        variables: {
          automobileInput: this.formObj,
          id: parseInt(this.id),
        }
      })
      .subscribe(() => {
        console.log("updated");
      });;
    this.gotoList()
  }

  gotoList() {
    this.router.navigate(['/collection']);
  }

  onSubmit(@Input() automobile: any) {
    this.updateAutomobile();
  }
}
