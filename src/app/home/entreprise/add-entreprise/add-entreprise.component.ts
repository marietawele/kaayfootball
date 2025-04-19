
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-entreprise',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent {
  reactiveForm_add_entreprise !: FormGroup;
  submitted:boolean=false
  loading_add_entreprise :boolean=false
  form_details: any = {}
  loading_get_details_add_entreprise_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_entreprise_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_entreprise  = this.formBuilder.group({
          libelle_entreprise: [""],
adresse: [""],
telephone: [""],
email: [""],
image: [""],
site_web: [""],
ninea: [""],
registre_de_commerce: [""],
pays: [""],
updated_at: ["", Validators.required],
etat: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_entreprise .controls; }
  // validation du formulaire
  onSubmit_add_entreprise () {
      this.submitted = true;
      console.log(this.reactiveForm_add_entreprise .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_entreprise .invalid) {
          return;
      }
      var entreprise =this.reactiveForm_add_entreprise .value
      this.add_entreprise (entreprise )
  }
  // vider le formulaire
  onReset_add_entreprise () {
      this.submitted = false;
      this.reactiveForm_add_entreprise .reset();
  }
  add_entreprise(entreprise: any) {
      this.loading_add_entreprise = true;
      this.api.taf_post("entreprise/add", entreprise, (reponse: any) => {
      this.loading_add_entreprise = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table entreprise. Réponse= ", reponse);
          this.onReset_add_entreprise()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_entreprise = false;
    })
  }
  
  get_details_add_entreprise_form() {
      this.loading_get_details_add_entreprise_form = true;
      this.api.taf_post("entreprise/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table entreprise. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table entreprise a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_entreprise_form = false;
      }, (error: any) => {
      this.loading_get_details_add_entreprise_form = false;
    })
  }
}
