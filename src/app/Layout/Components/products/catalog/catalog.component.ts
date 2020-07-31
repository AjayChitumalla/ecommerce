import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent implements OnInit {
  products;
  form:FormGroup;
  constructor(public data:DataService,private route:Router,private fb:FormBuilder,public flashMessage:FlashMessagesService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.data.getProducts().subscribe(d=>{
      this.products=d;
    })
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  nav(){
    this.route.navigate(['/admin/newproduct']);
  }
  showflash(){
    this.flashMessage.show("Products removed successfully",{cssClass:"alert-success",timeout:500})
    window.location.reload();
  }
  edit(id){
    this.route.navigate(['/admin/products/'+id]);
  }
  submitForm(){ 
    if(confirm("Are you sure to remove the products")==true){
    this.data.deleteItems(this.form.value.checkArray).subscribe(d=>{
      this.showflash();
    })
  }
}
}
