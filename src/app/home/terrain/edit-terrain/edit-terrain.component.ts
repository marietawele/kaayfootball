
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-terrain',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-terrain.component.html',
    styleUrls: ['./edit-terrain.component.scss']
  })
  export class EditTerrainComponent {
    reactiveForm_edit_terrain !: FormGroup;
    submitted: boolean = false
    loading_edit_terrain: boolean = false
    @Input()
    terrain_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_terrain_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_terrain_form()
        this.update_form(this.terrain_to_edit)
    }
    // mise à jour du formulaire
    update_form(terrain_to_edit:any) {
        this.reactiveForm_edit_terrain = this.formBuilder.group({
            id_entreprise : [terrain_to_edit.id_entreprise],
id_utilisateur : [terrain_to_edit.id_utilisateur],
libelle_terrain : [terrain_to_edit.libelle_terrain],
adresse : [terrain_to_edit.adresse],
description : [terrain_to_edit.description],
prix_par_heure : [terrain_to_edit.prix_par_heure],
image : [terrain_to_edit.image],
longueur : [terrain_to_edit.longueur],
largeur : [terrain_to_edit.largeur],
etat : [terrain_to_edit.etat, Validators.required],
updated_at : [terrain_to_edit.updated_at, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_terrain .controls; }
    // validation du formulaire
    onSubmit_edit_terrain() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_terrain.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_terrain.invalid) {
            return;
        }
        var terrain = this.reactiveForm_edit_terrain.value
        this.edit_terrain({
        condition:JSON.stringify({id_terrain:this.terrain_to_edit.id_terrain}),
        data:JSON.stringify(terrain)
        })
    }
    // vider le formulaire
    onReset_edit_terrain() {
        this.submitted = false;
        this.reactiveForm_edit_terrain.reset();
    }
    edit_terrain(terrain: any) {
        this.loading_edit_terrain = true;
        this.api.taf_post("terrain/edit", terrain, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table terrain. Réponse= ", reponse);
                //this.onReset_edit_terrain()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table terrain a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_terrain = false;
        }, (error: any) => {
            this.loading_edit_terrain = false;
        })
    }
    get_details_edit_terrain_form() {
        this.loading_get_details_edit_terrain_form = true;
        this.api.taf_post("terrain/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table terrain. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table terrain a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_terrain_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_terrain_form = false;
      })
    }
  }
  