import {Component, OnInit, ViewChild} from '@angular/core';

import {HttpService} from "./services/http.service";
import {BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  students: any[];
  teachers: any[];
  lessons: any[];
  @ViewChild('studentsTemplate') readonly studentsTemplate;
  constructor(private http: HttpService, private modalService: BsModalService) {

  }
    ngOnInit() {

  }
}
