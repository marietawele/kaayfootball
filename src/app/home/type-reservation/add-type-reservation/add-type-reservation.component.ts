
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-type-reservation',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-type-reservation.component.html',
  styleUrls: ['./add-type-reservation.component.scss']
})
export class AddTypeReservationComponent {
  reactiveForm_add_type_reservation !: FormGroup;
  submitted:boolean=false
  loading_add_type_reservation :boolean=false
  form_details: any = {}
  loading_get_details_add_type_reservation_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_type_reservation_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_type_reservation  = this.formBuilder.group({
          libelle_type_reservation: [""],
description: [""],
etat: ["", Validators.required],
updated_at: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_type_reservation .controls; }
  // validation du formulaire
  onSubmit_add_type_reservation () {
      this.submitted = true;
      console.log(this.reactiveForm_add_type_reservation .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_type_reservation .invalid) {
          return;
      }
      var type_reservation =this.reactiveForm_add_type_reservation .value
      this.add_type_reservation (type_reservation )
  }
  // vider le formulaire
  onReset_add_type_reservation () {
      this.submitted = false;
      this.reactiveForm_add_type_reservation .reset();
  }
  add_type_reservation(type_reservation: any) {
      this.loading_add_type_reservation = true;
      this.api.taf_post("type_reservation/add", type_reservation, (reponse: any) => {
      this.loading_add_type_reservation = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table type_reservation. Réponse= ", reponse);
          this.onReset_add_type_reservation()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table type_reservation a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_type_reservation = false;
    })
  }
  
  get_details_add_type_reservation_form() {
      this.loading_get_details_add_type_reservation_form = true;
      this.api.taf_post("type_reservation/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table type_reservation. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table type_reservation a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_type_reservation_form = false;
      }, (error: any) => {
      this.loading_get_details_add_type_reservation_form = false;
    })
  }
}
