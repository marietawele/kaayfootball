import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddLogComponent } from '../add-log/add-log.component';
  import { EditLogComponent } from '../edit-log/edit-log.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-log',
    standalone: true, // Composant autonome
    imports: [AddLogComponent,EditLogComponent], // Dépendances importées
    templateUrl: './list-log.component.html',
    styleUrls: ['./list-log.component.scss']
  })
  export class ListLogComponent {
    loading_get_log = false
    les_logs: any[] = []
    selected_log: any = undefined
    log_to_edit: any = undefined
    loading_delete_log = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_log()
    }
    get_log() {
      this.loading_get_log = true;
      this.api.taf_post("log/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_logs = reponse.data
          console.log("Opération effectuée avec succés sur la table log. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table log a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_log = false;
      }, (error: any) => {
        this.loading_get_log = false;
      })
    }
  
    voir_plus(one_log: any) {
      this.selected_log = one_log
    }
    on_click_edit(one_log: any) {
      this.log_to_edit = one_log
    }
    on_close_modal_edit(){
      this.log_to_edit=undefined
    }
    delete_log (log : any){
      this.loading_delete_log = true;
      this.api.taf_post("log/delete", log,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table log . Réponse = ",reponse)
          this.get_log()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table log  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_log = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_log = false;
      })
    }
    openModal_add_log() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddLogComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_log()
        } else {

        }
      })
    }
    openModal_edit_log(one_log: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditLogComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.log_to_edit = one_log;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_log()
        } else {

        }
      })
    }
  }