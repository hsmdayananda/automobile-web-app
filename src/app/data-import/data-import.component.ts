
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutomobileService } from '../automobile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {
  form: FormGroup | any;
  error: string | any;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };
  private file: File | undefined;

  constructor(private formBuilder: FormBuilder, private automobileService: AutomobileService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('avatar').setValue(file);
  //   }
  // }

  onSubmit() {
    console.log(' response ', this.uploadResponse.status)
    let formData = new FormData();
    formData.append("file", this.file!, this.file!.name!);
    this.automobileService.upload(formData
    );
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/collection']);
    //  this.router.navigate(['/collection']);
  }
  onFileChange(fileChangeEvent: Event) {
    console.log(" event data ", fileChangeEvent)
    const target = fileChangeEvent.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files[0]);
    this.file = files[0];
  }



}
