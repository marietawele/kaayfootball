
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-utilisateur-entreprise',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-utilisateur-entreprise.component.html',
    styleUrls: ['./edit-utilisateur-entreprise.component.scss']
  })
  export class EditUtilisateurEntrepriseComponent {
    reactiveForm_edit_utilisateur_entreprise !: FormGroup;
    submitted: boolean = false
    loading_edit_utilisateur_entreprise: boolean = false
    @Input()
    utilisateur_entreprise_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_utilisateur_entreprise_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_utilisateur_entreprise_form()
        this.update_form(this.utilisateur_entreprise_to_edit)
    }
    // mise à jour du formulaire
    update_form(utilisateur_entreprise_to_edit:any) {
        this.reactiveForm_edit_utilisateur_entreprise = this.formBuilder.group({
            id_utilisateur : [utilisateur_entreprise_to_edit.id_utilisateur],
id_entreprise : [utilisateur_entreprise_to_edit.id_entreprise],
id_privilege : [utilisateur_entreprise_to_edit.id_privilege],
updated_at : [utilisateur_entreprise_to_edit.updated_at, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_utilisateur_entreprise .controls; }
    // validation du formulaire
    onSubmit_edit_utilisateur_entreprise() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_utilisateur_entreprise.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_utilisateur_entreprise.invalid) {
            return;
        }
        var utilisateur_entreprise = this.reactiveForm_edit_utilisateur_entreprise.value
        this.edit_utilisateur_entreprise({
        condition:JSON.stringify({id_utilisateur_entreprise:this.utilisateur_entreprise_to_edit.id_utilisateur_entreprise}),
        data:JSON.stringify(utilisateur_entreprise)
        })
    }
    // vider le formulaire
    onReset_edit_utilisateur_entreprise() {
        this.submitted = false;
        this.reactiveForm_edit_utilisateur_entreprise.reset();
    }
    edit_utilisateur_entreprise(utilisateur_entreprise: any) {
        this.loading_edit_utilisateur_entreprise = true;
        this.api.taf_post("utilisateur_entreprise/edit", utilisateur_entreprise, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table utilisateur_entreprise. Réponse= ", reponse);
                //this.onReset_edit_utilisateur_entreprise()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table utilisateur_entreprise a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_utilisateur_entreprise = false;
        }, (error: any) => {
            this.loading_edit_utilisateur_entreprise = false;
        })
    }
    get_details_edit_utilisateur_entreprise_form() {
        this.loading_get_details_edit_utilisateur_entreprise_form = true;
        this.api.taf_post("utilisateur_entreprise/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table utilisateur_entreprise. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table utilisateur_entreprise a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_utilisateur_entreprise_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_utilisateur_entreprise_form = false;
      })
    }
  }
  