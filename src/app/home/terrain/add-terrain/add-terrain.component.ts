import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-terrain',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-terrain.component.html',
  styleUrls: ['./add-terrain.component.scss'],
})
export class AddTerrainComponent {
  reactiveForm_add_terrain!: FormGroup;
  submitted: boolean = false;
  loading_add_terrain: boolean = false;
  form_details: any = {};
  loading_get_details_add_terrain_form = false;
  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.get_details_add_terrain_form();
    this.init_form();
  }
  init_form() {
    this.reactiveForm_add_terrain = this.formBuilder.group({
      libelle_terrain: ['', Validators.required],
      adresse: ['', Validators.required],
      description: [''],
      prix_par_heure: ['', Validators.required],
      image: [''],
      longueur: [''],
      largeur: [''],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any {
    return this.reactiveForm_add_terrain.controls;
  }
  // validation du formulaire
  onSubmit_add_terrain() {
    this.submitted = true;
    console.log(this.reactiveForm_add_terrain.value);
    // stop here if form is invalid
    if (this.reactiveForm_add_terrain.invalid) {
      return;
    }
    var terrain = this.reactiveForm_add_terrain.value;
    terrain.id_entreprise = this.api.current_entreprise.id_entreprise;
    terrain.id_utilisateur = this.api.current_entreprise.id_utilisateur;
    this.add_terrain(terrain);
  }
  // vider le formulaire
  onReset_add_terrain() {
    this.submitted = false;
    this.reactiveForm_add_terrain.reset();
  }
  add_terrain(terrain: any) {
    this.loading_add_terrain = true;
    this.api.taf_post(
      'terrain/add',
      terrain,
      (reponse: any) => {
        this.loading_add_terrain = false;
        if (reponse.status) {
          console.log(
            'Opération effectuée avec succés sur la table terrain. Réponse= ',
            reponse
          );
          this.onReset_add_terrain();
          this.api.Swal_success('Opération éffectuée avec succés');
          this.activeModal.close(reponse);
        } else {
          console.log(
            "L'opération sur la table terrain a échoué. Réponse= ",
            reponse
          );
          this.api.Swal_error("L'opération a echoué");
        }
      },
      (error: any) => {
        this.loading_add_terrain = false;
      }
    );
  }

  get_details_add_terrain_form() {
    this.loading_get_details_add_terrain_form = true;
    this.api.taf_post(
      'terrain/get_form_details',
      {},
      (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data;
          console.log(
            'Opération effectuée avec succés sur la table terrain. Réponse= ',
            reponse
          );
        } else {
          console.log(
            "L'opération sur la table terrain a échoué. Réponse= ",
            reponse
          );
          this.api.Swal_error("L'opération a echoué");
        }
        this.loading_get_details_add_terrain_form = false;
      },
      (error: any) => {
        this.loading_get_details_add_terrain_form = false;
      }
    );
  }
}
