import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTypeReservationComponent } from '../../type-reservation/add-type-reservation/add-type-reservation.component';
import { AddTypeAbonnementComponent } from '../../type-abonnement/add-type-abonnement/add-type-abonnement.component';
@Component({
  selector: 'app-add-abonnement',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-abonnement.component.html',
  styleUrls: ['./add-abonnement.component.scss'],
})
export class AddAbonnementComponent {
  reactiveForm_add_abonnement!: FormGroup;
  submitted: boolean = false;
  loading_add_abonnement: boolean = false;
  form_details: any = {};
  loading_get_details_add_abonnement_form = false;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.get_details_add_abonnement_form();
    this.init_form();
  }
  init_form() {
    this.reactiveForm_add_abonnement = this.formBuilder.group({
      //           id_entreprise: [""],
      // id_utilisateur: [""],
      id_type_abonnement: ['', Validators.required],
      libelle_abonnement: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      // etat: ["", Validators.required],
      // updated_at: ["", Validators.required],
      reduction: [''],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any {
    return this.reactiveForm_add_abonnement.controls;
  }
  // validation du formulaire
  onSubmit_add_abonnement() {
    this.submitted = true;
    console.log(this.reactiveForm_add_abonnement.value);
    // stop here if form is invalid
    if (this.reactiveForm_add_abonnement.invalid) {
      return;
    }
    var abonnement = this.reactiveForm_add_abonnement.value;
    abonnement.id_entreprise = this.api.current_entreprise.id_entreprise;
    abonnement.id_utilisateur = this.api.current_entreprise.id_utilisateur;
    this.add_abonnement(abonnement);
  }
  // vider le formulaire
  onReset_add_abonnement() {
    this.submitted = false;
    this.reactiveForm_add_abonnement.reset();
  }
  add_abonnement(abonnement: any) {
    this.loading_add_abonnement = true;
    this.api.taf_post(
      'abonnement/add',
      abonnement,
      (reponse: any) => {
        this.loading_add_abonnement = false;
        if (reponse.status) {
          console.log(
            'Opération effectuée avec succés sur la table abonnement. Réponse= ',
            reponse
          );
          this.onReset_add_abonnement();
          this.api.Swal_success('Opération éffectuée avec succés');
          this.activeModal.close(reponse);
        } else {
          console.log(
            "L'opération sur la table abonnement a échoué. Réponse= ",
            reponse
          );
          this.api.Swal_error("L'opération a echoué");
        }
      },
      (error: any) => {
        this.loading_add_abonnement = false;
      }
    );
  }

  get_details_add_abonnement_form() {
    this.loading_get_details_add_abonnement_form = true;
    this.api.taf_post(
      'abonnement/get_form_details',
      {},
      (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data;
          console.log(
            'Opération effectuée avec succés sur la table abonnement. Réponse= ',
            reponse
          );
        } else {
          console.log(
            "L'opération sur la table abonnement a échoué. Réponse= ",
            reponse
          );
          this.api.Swal_error("L'opération a echoué");
        }
        this.loading_get_details_add_abonnement_form = false;
      },
      (error: any) => {
        this.loading_get_details_add_abonnement_form = false;
      }
    );
  }

  //Add reservations
  // openModal_add_type_reservation() {
  //       let options: any = {
  //         centered: true,
  //         scrollable: true,
  //         size: "lg"//'sm' | 'lg' | 'xl' | string
  //       }
  //       const modalRef = this.modalService.open(AddTypeReservationComponent, { ...options, backdrop: 'static' })
  //       modalRef.result.then((result: any) => {
  //         console.log('Modal closed with:', result);
  //         if (result?.status) {
  //           this.get_details_add_abonnement_form();
  //           // this.get_type_reservation()
  //         } else {

  //         }
  //       })
  //     }
  openModal_add_type_abonnement() {
    let options: any = {
      centered: true,
      scrollable: true,
      size: 'lg', //'sm' | 'lg' | 'xl' | string
    };
    const modalRef = this.modalService.open(AddTypeAbonnementComponent, {
      ...options,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      console.log('Modal closed with:', result);
      if (result?.status) {
        this.get_details_add_abonnement_form();
      } else {
      }
    });
  }
}
