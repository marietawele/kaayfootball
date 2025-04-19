import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddTerrainComponent } from '../add-terrain/add-terrain.component';
  import { EditTerrainComponent } from '../edit-terrain/edit-terrain.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-terrain',
    standalone: true, // Composant autonome
    imports: [AddTerrainComponent,EditTerrainComponent], // Dépendances importées
    templateUrl: './list-terrain.component.html',
    styleUrls: ['./list-terrain.component.scss']
  })
  export class ListTerrainComponent {
    loading_get_terrain = false
    les_terrains: any[] = []
    selected_terrain: any = undefined
    terrain_to_edit: any = undefined
    loading_delete_terrain = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_terrain()
    }
    get_terrain() {
      this.loading_get_terrain = true;
      this.api.taf_post("terrain/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_terrains = reponse.data
          console.log("Opération effectuée avec succés sur la table terrain. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table terrain a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_terrain = false;
      }, (error: any) => {
        this.loading_get_terrain = false;
      })
    }
  
    voir_plus(one_terrain: any) {
      this.selected_terrain = one_terrain
    }
    on_click_edit(one_terrain: any) {
      this.terrain_to_edit = one_terrain
    }
    on_close_modal_edit(){
      this.terrain_to_edit=undefined
    }
    delete_terrain (terrain : any){
      this.loading_delete_terrain = true;
      this.api.taf_post("terrain/delete", terrain,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table terrain . Réponse = ",reponse)
          this.get_terrain()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table terrain  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_terrain = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_terrain = false;
      })
    }
    openModal_add_terrain() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddTerrainComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_terrain()
        } else {

        }
      })
    }
    openModal_edit_terrain(one_terrain: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditTerrainComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.terrain_to_edit = one_terrain;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_terrain()
        } else {

        }
      })
    }
  }