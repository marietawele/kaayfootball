
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-abonnement',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-abonnement.component.html',
    styleUrls: ['./edit-abonnement.component.scss']
  })
  export class EditAbonnementComponent {
    reactiveForm_edit_abonnement !: FormGroup;
    submitted: boolean = false
    loading_edit_abonnement: boolean = false
    @Input()
    abonnement_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_abonnement_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_abonnement_form()
        this.update_form(this.abonnement_to_edit)
    }
    // mise à jour du formulaire
    update_form(abonnement_to_edit:any) {
        this.reactiveForm_edit_abonnement = this.formBuilder.group({
            id_entreprise : [abonnement_to_edit.id_entreprise],
id_utilisateur : [abonnement_to_edit.id_utilisateur],
id_type_abonnement : [abonnement_to_edit.id_type_abonnement],
libelle_abonnement : [abonnement_to_edit.libelle_abonnement],
date_debut : [abonnement_to_edit.date_debut],
date_fin : [abonnement_to_edit.date_fin],
etat : [abonnement_to_edit.etat, Validators.required],
updated_at : [abonnement_to_edit.updated_at, Validators.required],
reduction : [abonnement_to_edit.reduction]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_abonnement .controls; }
    // validation du formulaire
    onSubmit_edit_abonnement() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_abonnement.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_abonnement.invalid) {
            return;
        }
        var abonnement = this.reactiveForm_edit_abonnement.value
        this.edit_abonnement({
        condition:JSON.stringify({id_abonnement:this.abonnement_to_edit.id_abonnement}),
        data:JSON.stringify(abonnement)
        })
    }
    // vider le formulaire
    onReset_edit_abonnement() {
        this.submitted = false;
        this.reactiveForm_edit_abonnement.reset();
    }
    edit_abonnement(abonnement: any) {
        this.loading_edit_abonnement = true;
        this.api.taf_post("abonnement/edit", abonnement, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table abonnement. Réponse= ", reponse);
                //this.onReset_edit_abonnement()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table abonnement a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_abonnement = false;
        }, (error: any) => {
            this.loading_edit_abonnement = false;
        })
    }
    get_details_edit_abonnement_form() {
        this.loading_get_details_edit_abonnement_form = true;
        this.api.taf_post("abonnement/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table abonnement. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table abonnement a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_abonnement_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_abonnement_form = false;
      })
    }
  }
  