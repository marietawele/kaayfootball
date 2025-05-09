
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-type-abonnement',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-type-abonnement.component.html',
  styleUrls: ['./add-type-abonnement.component.scss']
})
export class AddTypeAbonnementComponent {
  reactiveForm_add_type_abonnement !: FormGroup;
  submitted:boolean=false
  loading_add_type_abonnement :boolean=false
  form_details: any = {}
  loading_get_details_add_type_abonnement_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_type_abonnement_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_type_abonnement  = this.formBuilder.group({
          libelle_type_abonnement: ["", Validators.required],
          description: [""],

      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_type_abonnement .controls; }
  // validation du formulaire
  onSubmit_add_type_abonnement () {
      this.submitted = true;
      console.log(this.reactiveForm_add_type_abonnement .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_type_abonnement .invalid) {
          return;
      }
      var type_abonnement =this.reactiveForm_add_type_abonnement .value
      this.add_type_abonnement (type_abonnement )
  }
  // vider le formulaire
  onReset_add_type_abonnement () {
      this.submitted = false;
      this.reactiveForm_add_type_abonnement .reset();
  }
  add_type_abonnement(type_abonnement: any) {
      this.loading_add_type_abonnement = true;
      this.api.taf_post("type_abonnement/add", type_abonnement, (reponse: any) => {
      this.loading_add_type_abonnement = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table type_abonnement. Réponse= ", reponse);
          this.onReset_add_type_abonnement()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table type_abonnement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_type_abonnement = false;
    })
  }

  get_details_add_type_abonnement_form() {
      this.loading_get_details_add_type_abonnement_form = true;
      this.api.taf_post("type_abonnement/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table type_abonnement. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table type_abonnement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_type_abonnement_form = false;
      }, (error: any) => {
      this.loading_get_details_add_type_abonnement_form = false;
    })
  }
}
