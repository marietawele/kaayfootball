import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddEntrepriseComponent } from '../add-entreprise/add-entreprise.component';
  import { EditEntrepriseComponent } from '../edit-entreprise/edit-entreprise.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchServiceService } from '../../../service/searchService/search-service.service';
  @Component({
    selector: 'app-list-entreprise',
    standalone: true, // Composant autonome
    imports: [AddEntrepriseComponent,EditEntrepriseComponent], // Dépendances importées
    templateUrl: './list-entreprise.component.html',
    styleUrls: ['./list-entreprise.component.scss']
  })
  export class ListEntrepriseComponent {
    loading_get_entreprise = false
    les_entreprises: any[] = []
    selected_entreprise: any = undefined
    entreprise_to_edit: any = undefined
    loading_delete_entreprise = false
    constructor(public api: ApiService,public searchService : SearchServiceService,  private modalService: NgbModal) {

    }
    ngOnInit(): void {
      this.get_entreprise()
    }
    get_entreprise() {
      this.loading_get_entreprise = true;
      this.api.taf_post("entreprise/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_entreprises = reponse.data
          this.searchService.data = this.les_entreprises
        this.searchService.filter_change()
          console.log("Opération effectuée avec succés sur la table entreprise. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_entreprise = false;
      }, (error: any) => {
        this.loading_get_entreprise = false;
      })
    }

    voir_plus(one_entreprise: any) {
      this.selected_entreprise = one_entreprise
    }
    on_click_edit(one_entreprise: any) {
      this.entreprise_to_edit = one_entreprise
    }
    on_close_modal_edit(){
      this.entreprise_to_edit=undefined
    }
    delete_entreprise (entreprise : any){
      this.loading_delete_entreprise = true;
      this.api.taf_post("entreprise/delete", entreprise,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table entreprise . Réponse = ",reponse)
          this.get_entreprise()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table entreprise  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_entreprise = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_entreprise = false;
      })
    }
    openModal_add_entreprise() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddEntrepriseComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_entreprise()
        } else {

        }
      })
    }
    openModal_edit_entreprise(one_entreprise: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditEntrepriseComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.entreprise_to_edit = one_entreprise;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_entreprise()
        } else {

        }
      })
    }
  }
