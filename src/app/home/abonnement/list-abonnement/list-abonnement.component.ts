import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddAbonnementComponent } from '../add-abonnement/add-abonnement.component';
  import { EditAbonnementComponent } from '../edit-abonnement/edit-abonnement.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-abonnement',
    standalone: true, // Composant autonome
    imports: [AddAbonnementComponent,EditAbonnementComponent], // Dépendances importées
    templateUrl: './list-abonnement.component.html',
    styleUrls: ['./list-abonnement.component.scss']
  })
  export class ListAbonnementComponent {
    loading_get_abonnement = false
    les_abonnements: any[] = []
    selected_abonnement: any = undefined
    abonnement_to_edit: any = undefined
    loading_delete_abonnement = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_abonnement()
    }
    get_abonnement() {
      this.loading_get_abonnement = true;
      this.api.taf_post("abonnement/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_abonnements = reponse.data
          console.log("Opération effectuée avec succés sur la table abonnement. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table abonnement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_abonnement = false;
      }, (error: any) => {
        this.loading_get_abonnement = false;
      })
    }
  
    voir_plus(one_abonnement: any) {
      this.selected_abonnement = one_abonnement
    }
    on_click_edit(one_abonnement: any) {
      this.abonnement_to_edit = one_abonnement
    }
    on_close_modal_edit(){
      this.abonnement_to_edit=undefined
    }
    delete_abonnement (abonnement : any){
      this.loading_delete_abonnement = true;
      this.api.taf_post("abonnement/delete", abonnement,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table abonnement . Réponse = ",reponse)
          this.get_abonnement()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table abonnement  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_abonnement = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_abonnement = false;
      })
    }
    openModal_add_abonnement() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddAbonnementComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_abonnement()
        } else {

        }
      })
    }
    openModal_edit_abonnement(one_abonnement: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditAbonnementComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.abonnement_to_edit = one_abonnement;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_abonnement()
        } else {

        }
      })
    }
  }