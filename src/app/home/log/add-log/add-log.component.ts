
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-log',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.scss']
})
export class AddLogComponent {
  reactiveForm_add_log !: FormGroup;
  submitted:boolean=false
  loading_add_log :boolean=false
  form_details: any = {}
  loading_get_details_add_log_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_log_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_log  = this.formBuilder.group({
          id_utilisateur: [""],
action: [""],
ip: [""],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_log .controls; }
  // validation du formulaire
  onSubmit_add_log () {
      this.submitted = true;
      console.log(this.reactiveForm_add_log .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_log .invalid) {
          return;
      }
      var log =this.reactiveForm_add_log .value
      this.add_log (log )
  }
  // vider le formulaire
  onReset_add_log () {
      this.submitted = false;
      this.reactiveForm_add_log .reset();
  }
  add_log(log: any) {
      this.loading_add_log = true;
      this.api.taf_post("log/add", log, (reponse: any) => {
      this.loading_add_log = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table log. Réponse= ", reponse);
          this.onReset_add_log()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table log a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_log = false;
    })
  }
  
  get_details_add_log_form() {
      this.loading_get_details_add_log_form = true;
      this.api.taf_post("log/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table log. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table log a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_log_form = false;
      }, (error: any) => {
      this.loading_get_details_add_log_form = false;
    })
  }
}
