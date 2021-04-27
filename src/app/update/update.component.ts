import { Component, OnInit, Input } from '@angular/core';
import { Automobile } from '../../../Automobile'
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';
import { AutomobileService } from '../automobile.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: string = '1';
  formObj: any = {};

  automobile: any = {};


  query = gql`mutation updateAutomobiles($id: Int!,$automobileInput: AutomobileInput!){
    update(id:$id, automobileInput: $automobileInput){
      firstName
    }
  }
 `


  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo
    , private automobileServie: AutomobileService) { }

  ngOnInit(): void {
    this.automobile = new Automobile();
    this.automobileServie.automobileUnit().subscribe((data) => {
      data.subscribe((res: any) => {

        this.automobile = res.data.automobileById;
        this.formObj = Object.assign({}, this.automobile);
      });
    });

    this.id = this.route.snapshot.params['id'];

  }

  ngOnChanges() {
  }


  updateAutomobile() {
    delete this.formObj.__typename;
    delete this.formObj.id;
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
