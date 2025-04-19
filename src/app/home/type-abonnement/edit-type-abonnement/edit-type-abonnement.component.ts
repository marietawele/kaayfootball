
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-type-abonnement',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-type-abonnement.component.html',
    styleUrls: ['./edit-type-abonnement.component.scss']
  })
  export class EditTypeAbonnementComponent {
    reactiveForm_edit_type_abonnement !: FormGroup;
    submitted: boolean = false
    loading_edit_type_abonnement: boolean = false
    @Input()
    type_abonnement_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_type_abonnement_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_type_abonnement_form()
        this.update_form(this.type_abonnement_to_edit)
    }
    // mise à jour du formulaire
    update_form(type_abonnement_to_edit:any) {
        this.reactiveForm_edit_type_abonnement = this.formBuilder.group({
            libelle_type_abonnement : [type_abonnement_to_edit.libelle_type_abonnement],
description : [type_abonnement_to_edit.description],
etat : [type_abonnement_to_edit.etat, Validators.required],
updated_at : [type_abonnement_to_edit.updated_at, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_type_abonnement .controls; }
    // validation du formulaire
    onSubmit_edit_type_abonnement() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_type_abonnement.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_type_abonnement.invalid) {
            return;
        }
        var type_abonnement = this.reactiveForm_edit_type_abonnement.value
        this.edit_type_abonnement({
        condition:JSON.stringify({id_type_abonnement:this.type_abonnement_to_edit.id_type_abonnement}),
        data:JSON.stringify(type_abonnement)
        })
    }
    // vider le formulaire
    onReset_edit_type_abonnement() {
        this.submitted = false;
        this.reactiveForm_edit_type_abonnement.reset();
    }
    edit_type_abonnement(type_abonnement: any) {
        this.loading_edit_type_abonnement = true;
        this.api.taf_post("type_abonnement/edit", type_abonnement, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table type_abonnement. Réponse= ", reponse);
                //this.onReset_edit_type_abonnement()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table type_abonnement a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_type_abonnement = false;
        }, (error: any) => {
            this.loading_edit_type_abonnement = false;
        })
    }
    get_details_edit_type_abonnement_form() {
        this.loading_get_details_edit_type_abonnement_form = true;
        this.api.taf_post("type_abonnement/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table type_abonnement. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table type_abonnement a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_type_abonnement_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_type_abonnement_form = false;
      })
    }
  }
  