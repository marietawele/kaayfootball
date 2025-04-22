import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchServiceService } from '../../../service/searchService/search-service.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeconnexionComponent } from '../../../public/deconnexion/deconnexion.component';
declare function initialize(): any;

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  id_entreprise: string = ""
  constructor(public searchService: SearchServiceService, public api: ApiService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.id_entreprise = this.api.current_entreprise.id_entreprise
    setTimeout(() => {
      initialize();
    }, 1500);
  }
  entreprise_change() {
    this.api.current_entreprise = this.api.infos.les_entreprises.filter((one: any) => one.id_entreprise == this.id_entreprise)[0]

    this.api.save_on_local_storage("old_id_entreprise", this.id_entreprise)

    this.api.loading_get_utilisateur = true
    setTimeout(() => {
      this.api.loading_get_utilisateur = false
      this.api.custom_menu()
      setTimeout(() => {
        initialize()
      }, 1500);
    }, 500);
  }
  openModal_deconnexion() {
    let options: any = {
      centered: true,
      scrollable: true,
      size: "sm"//'sm' | 'lg' | 'xl' | string
    }
    const modalRef = this.modalService.open(DeconnexionComponent, { ...options, backdrop: 'static' })
    modalRef.result.then((result: any) => {
      console.log('Modal closed with:', result);
      if (result?.status) {

      } else {

      }
    })
  }

}
