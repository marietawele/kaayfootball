
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-utilisateur-entreprise',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-utilisateur-entreprise.component.html',
  styleUrls: ['./add-utilisateur-entreprise.component.scss']
})
export class AddUtilisateurEntrepriseComponent {
  reactiveForm_add_utilisateur_entreprise !: FormGroup;
  submitted:boolean=false
  loading_add_utilisateur_entreprise :boolean=false
  form_details: any = {}
  loading_get_details_add_utilisateur_entreprise_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_utilisateur_entreprise_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_utilisateur_entreprise  = this.formBuilder.group({
          id_utilisateur: [""],
id_entreprise: [""],
id_privilege: [""],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_utilisateur_entreprise .controls; }
  // validation du formulaire
  onSubmit_add_utilisateur_entreprise () {
      this.submitted = true;
      console.log(this.reactiveForm_add_utilisateur_entreprise .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_utilisateur_entreprise .invalid) {
          return;
      }
      var utilisateur_entreprise =this.reactiveForm_add_utilisateur_entreprise .value
      this.add_utilisateur_entreprise (utilisateur_entreprise )
  }
  // vider le formulaire
  onReset_add_utilisateur_entreprise () {
      this.submitted = false;
      this.reactiveForm_add_utilisateur_entreprise .reset();
  }
  add_utilisateur_entreprise(utilisateur_entreprise: any) {
      this.loading_add_utilisateur_entreprise = true;
      this.api.taf_post("utilisateur_entreprise/add", utilisateur_entreprise, (reponse: any) => {
      this.loading_add_utilisateur_entreprise = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur_entreprise. Réponse= ", reponse);
          this.onReset_add_utilisateur_entreprise()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table utilisateur_entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_utilisateur_entreprise = false;
    })
  }
  
  get_details_add_utilisateur_entreprise_form() {
      this.loading_get_details_add_utilisateur_entreprise_form = true;
      this.api.taf_post("utilisateur_entreprise/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table utilisateur_entreprise. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table utilisateur_entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_utilisateur_entreprise_form = false;
      }, (error: any) => {
      this.loading_get_details_add_utilisateur_entreprise_form = false;
    })
  }
}
