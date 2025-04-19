import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddTypeAbonnementComponent } from '../add-type-abonnement/add-type-abonnement.component';
  import { EditTypeAbonnementComponent } from '../edit-type-abonnement/edit-type-abonnement.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-type-abonnement',
    standalone: true, // Composant autonome
    imports: [AddTypeAbonnementComponent,EditTypeAbonnementComponent], // Dépendances importées
    templateUrl: './list-type-abonnement.component.html',
    styleUrls: ['./list-type-abonnement.component.scss']
  })
  export class ListTypeAbonnementComponent {
    loading_get_type_abonnement = false
    les_type_abonnements: any[] = []
    selected_type_abonnement: any = undefined
    type_abonnement_to_edit: any = undefined
    loading_delete_type_abonnement = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_type_abonnement()
    }
    get_type_abonnement() {
      this.loading_get_type_abonnement = true;
      this.api.taf_post("type_abonnement/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_type_abonnements = reponse.data
          console.log("Opération effectuée avec succés sur la table type_abonnement. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table type_abonnement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_type_abonnement = false;
      }, (error: any) => {
        this.loading_get_type_abonnement = false;
      })
    }
  
    voir_plus(one_type_abonnement: any) {
      this.selected_type_abonnement = one_type_abonnement
    }
    on_click_edit(one_type_abonnement: any) {
      this.type_abonnement_to_edit = one_type_abonnement
    }
    on_close_modal_edit(){
      this.type_abonnement_to_edit=undefined
    }
    delete_type_abonnement (type_abonnement : any){
      this.loading_delete_type_abonnement = true;
      this.api.taf_post("type_abonnement/delete", type_abonnement,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table type_abonnement . Réponse = ",reponse)
          this.get_type_abonnement()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table type_abonnement  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_type_abonnement = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_type_abonnement = false;
      })
    }
    openModal_add_type_abonnement() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddTypeAbonnementComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_type_abonnement()
        } else {

        }
      })
    }
    openModal_edit_type_abonnement(one_type_abonnement: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditTypeAbonnementComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.type_abonnement_to_edit = one_type_abonnement;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_type_abonnement()
        } else {

        }
      })
    }
  }