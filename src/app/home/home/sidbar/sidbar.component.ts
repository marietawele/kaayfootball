import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare function initialize(): any;

@Component({
  selector: 'app-sidbar',
  imports: [RouterModule , CommonModule],
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.scss'
})
export class SidbarComponent implements OnInit {
  constructor(public api : ApiService, private modalService: NgbModal,) {

   }
  ngOnInit(): void {
    setTimeout(() => {
      initialize();
    }, 1500);
  }
}
