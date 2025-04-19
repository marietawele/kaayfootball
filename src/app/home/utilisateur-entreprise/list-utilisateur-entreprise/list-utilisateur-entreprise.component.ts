import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddUtilisateurEntrepriseComponent } from '../add-utilisateur-entreprise/add-utilisateur-entreprise.component';
  import { EditUtilisateurEntrepriseComponent } from '../edit-utilisateur-entreprise/edit-utilisateur-entreprise.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-utilisateur-entreprise',
    standalone: true, // Composant autonome
    imports: [AddUtilisateurEntrepriseComponent,EditUtilisateurEntrepriseComponent], // Dépendances importées
    templateUrl: './list-utilisateur-entreprise.component.html',
    styleUrls: ['./list-utilisateur-entreprise.component.scss']
  })
  export class ListUtilisateurEntrepriseComponent {
    loading_get_utilisateur_entreprise = false
    les_utilisateur_entreprises: any[] = []
    selected_utilisateur_entreprise: any = undefined
    utilisateur_entreprise_to_edit: any = undefined
    loading_delete_utilisateur_entreprise = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_utilisateur_entreprise()
    }
    get_utilisateur_entreprise() {
      this.loading_get_utilisateur_entreprise = true;
      this.api.taf_post("utilisateur_entreprise/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_utilisateur_entreprises = reponse.data
          console.log("Opération effectuée avec succés sur la table utilisateur_entreprise. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table utilisateur_entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_utilisateur_entreprise = false;
      }, (error: any) => {
        this.loading_get_utilisateur_entreprise = false;
      })
    }
  
    voir_plus(one_utilisateur_entreprise: any) {
      this.selected_utilisateur_entreprise = one_utilisateur_entreprise
    }
    on_click_edit(one_utilisateur_entreprise: any) {
      this.utilisateur_entreprise_to_edit = one_utilisateur_entreprise
    }
    on_close_modal_edit(){
      this.utilisateur_entreprise_to_edit=undefined
    }
    delete_utilisateur_entreprise (utilisateur_entreprise : any){
      this.loading_delete_utilisateur_entreprise = true;
      this.api.taf_post("utilisateur_entreprise/delete", utilisateur_entreprise,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table utilisateur_entreprise . Réponse = ",reponse)
          this.get_utilisateur_entreprise()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table utilisateur_entreprise  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_utilisateur_entreprise = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_utilisateur_entreprise = false;
      })
    }
    openModal_add_utilisateur_entreprise() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddUtilisateurEntrepriseComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_utilisateur_entreprise()
        } else {

        }
      })
    }
    openModal_edit_utilisateur_entreprise(one_utilisateur_entreprise: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditUtilisateurEntrepriseComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.utilisateur_entreprise_to_edit = one_utilisateur_entreprise;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_utilisateur_entreprise()
        } else {

        }
      })
    }
  }