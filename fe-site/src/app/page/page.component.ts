import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';

import {HttpService} from "../services/http.service";

import {delay, filter} from "rxjs/operators";

import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Observable} from "rxjs";



@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],

})
export class PageComponent implements OnInit {

  weight:number;
  private buttons:number[]=[];
  private massive:string;
  private numbers:number[]=[];
  private result:number =0;
  private left:number[]=[];
  private right:number[]=[];
  private rest:number[]=[];
  private leftSum:number =0;
  private rightSum:number =0;
  modalRef: BsModalRef;
  constructor(private http: HttpService,private modalService: BsModalService) {
this.result=0;
this.buttons=[];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  arraySum(array):number{
  let sum = 0;
  let i = 0;
  for(i; i < array.length; i++){
    sum = sum + Number(array[i]);
    }
  return sum;
  }
  checkSum(){
    this.leftSum = this.arraySum(this.left);
    this.rightSum = this.arraySum(this.right);
  }

  deleteElement(array,tag):any{
    return array.filter(el => el !== tag)

  }


  refreshData(){
    this.result = null;
    this.buttons = [];
    this.rest = [];
    this.right = [];
    this.left = [];
    this.leftSum = 0;
    this.rightSum = 0;
}
  calculateWeight(){

    if (this.buttons != null) {
      //this.numbers = massive.split(',');
      this.http.postData(this.buttons).subscribe(result => {
        this.buttons = result;
        this.http.getLeftAndRight().subscribe(leftandright => {
          this.left = leftandright[0];
          this.right = leftandright[1];
          this.http.getRest().subscribe(rest => {
            this.buttons = rest;
            if (this.rest == null) this.rest = this.buttons
          });

          this.leftSum = this.arraySum(this.left);
          this.rightSum = this.arraySum(this.right);
          this.checkSum();
          this.result = this.result + this.leftSum + this.rightSum;
        })

      });


    }
    else alert("не хватает блинов!");
  }
  addButtonToMid(weight:number){
    if (weight>0&&weight<=20) {
      let a = this.buttons.length;
      if (a == 0) this.buttons[0] = this.weight; else this.buttons[a] = weight;
      if (this.arraySum(this.left)==this.arraySum(this.right)) {
        this.result = this.arraySum(this.left) + this.arraySum(this.right);
      }else {this.result = 0}
    }
    else alert("введите число от 1 до 20");

  }
  addButtonToMidFromLeft(weight:number){
    let a = this.buttons.length;
    if (a ==0) this.buttons[0] = this.weight;else this.buttons[a] = weight;
    let index: number = this.left.indexOf(weight);
    if (index !== -1) {
      this.left.splice(index, 1);
      this.checkSum();
    }
    if (this.arraySum(this.left)==this.arraySum(this.right)) {
      this.result = this.arraySum(this.left) + this.arraySum(this.right);
    }else {this.result = 0}
  }
  addButtonToMidFromRight(weight:number){
    let a = this.buttons.length;
    if (a ==0) this.buttons[0] = this.weight;else this.buttons[a] = weight;
    let index: number = this.right.indexOf(weight);
    if (index !== -1) {
      this.right.splice(index, 1);
      this.checkSum();
    }
    if (this.arraySum(this.left)==this.arraySum(this.right)) {
      this.result = this.arraySum(this.left) + this.arraySum(this.right);
    }else {this.result = 0}
  }
  addButtonToRight(weight:number){
    let a = this.right.length;
    if (a ==0) this.right[0] = this.weight;else this.right[a] = weight;
    let index: number = this.buttons.indexOf(weight);
    if (index !== -1) {
      this.buttons.splice(index, 1);
      this.checkSum();
    }
    if (this.arraySum(this.left)==this.arraySum(this.right)) {
      this.result = this.arraySum(this.left) + this.arraySum(this.right);
    }else {this.result = 0}
  }
  addButtonToLeft(weight:number){

    let a = this.left.length;
    if (a ==0) this.left[0] = this.weight;else this.left[a] = weight;
    let index: number = this.buttons.indexOf(weight);
    if (index !== -1) {
      this.buttons.splice(index, 1);
      this.checkSum();
    }
    if (this.arraySum(this.left)==this.arraySum(this.right)) {
      this.result = this.arraySum(this.left) + this.arraySum(this.right);
    }else {this.result = 0}
  }
  ngOnInit() { }


}
