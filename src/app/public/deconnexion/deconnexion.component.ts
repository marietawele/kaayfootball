import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api/api.service';
import { CommonModule, Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deconnexion',
  imports: [CommonModule],
  templateUrl: './deconnexion.component.html',
  styleUrl: './deconnexion.component.scss'
})
export class DeconnexionComponent {
  constructor(public api: ApiService, private route: Router , public _location : Location,public modalService: NgbActiveModal) {

  }
  async deconnexion() {
    this.api.network = {
      token: undefined,
      status: true,
      message: "Aucun probléme détecté",

    }
    await this.api.delete_from_local_storage('token')
    this.route.navigateByUrl('/public/login')
    this.modalService.close()
  }

 
}
