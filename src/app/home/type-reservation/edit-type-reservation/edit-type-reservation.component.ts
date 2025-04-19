
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-type-reservation',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-type-reservation.component.html',
    styleUrls: ['./edit-type-reservation.component.scss']
  })
  export class EditTypeReservationComponent {
    reactiveForm_edit_type_reservation !: FormGroup;
    submitted: boolean = false
    loading_edit_type_reservation: boolean = false
    @Input()
    type_reservation_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_type_reservation_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_type_reservation_form()
        this.update_form(this.type_reservation_to_edit)
    }
    // mise à jour du formulaire
    update_form(type_reservation_to_edit:any) {
        this.reactiveForm_edit_type_reservation = this.formBuilder.group({
            libelle_type_reservation : [type_reservation_to_edit.libelle_type_reservation],
description : [type_reservation_to_edit.description],
etat : [type_reservation_to_edit.etat, Validators.required],
updated_at : [type_reservation_to_edit.updated_at, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_type_reservation .controls; }
    // validation du formulaire
    onSubmit_edit_type_reservation() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_type_reservation.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_type_reservation.invalid) {
            return;
        }
        var type_reservation = this.reactiveForm_edit_type_reservation.value
        this.edit_type_reservation({
        condition:JSON.stringify({id_type_reservation:this.type_reservation_to_edit.id_type_reservation}),
        data:JSON.stringify(type_reservation)
        })
    }
    // vider le formulaire
    onReset_edit_type_reservation() {
        this.submitted = false;
        this.reactiveForm_edit_type_reservation.reset();
    }
    edit_type_reservation(type_reservation: any) {
        this.loading_edit_type_reservation = true;
        this.api.taf_post("type_reservation/edit", type_reservation, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table type_reservation. Réponse= ", reponse);
                //this.onReset_edit_type_reservation()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table type_reservation a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_type_reservation = false;
        }, (error: any) => {
            this.loading_edit_type_reservation = false;
        })
    }
    get_details_edit_type_reservation_form() {
        this.loading_get_details_edit_type_reservation_form = true;
        this.api.taf_post("type_reservation/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table type_reservation. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table type_reservation a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_type_reservation_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_type_reservation_form = false;
      })
    }
  }
  