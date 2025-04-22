import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

interface Action {
  id: string;
  action: string;
  menu?: string;
  ongle?: string;
}

interface ExtractedAction {
  text: string;
  actions: Action[];
}

@Component({
  selector: 'app-add-privilege',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.scss'],
})
export class AddPrivilegeComponent implements OnInit {
  reactiveForm_add_privilege!: FormGroup;
  submitted = false;
  loading_add_privilege = false;
  form_details: any = {};
  full_menu: any[] = []
  loading_get_details_add_privilege_form = false;

  actions_extraites: ExtractedAction[] = [];
  tmp_droits: Action[] = [];
  selectedDroits: { [key: string]: boolean } = {};

  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.full_menu = this.api.full_menu
    this.init_form();
    this.get_details_add_privilege_form();

    this.resetAll()
  }

  init_form() {
    this.reactiveForm_add_privilege = this.formBuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      les_droits: ['']
    });
  }

  resetAll() {
    // console.log('Full menu:', JSON.stringify(this.full_menu, null, 2));
    this.actions_extraites = this.extraireTextEtActions(this.full_menu);
    this.actions_extraites.forEach(item => {
      item.actions.forEach(action => {
        this.selectedDroits[action.id] = false;
      });
    });
  }
  extraireTextEtActions(full_menu: any[]): ExtractedAction[] {
    const result: ExtractedAction[] = [];
    if (!full_menu || !Array.isArray(full_menu)) {
      console.error('full_menu is not properly initialized');
      return result;
    }
    full_menu.forEach((section: any) => {
      if (section?.items) {
        section.items.forEach((item: any) => {
          result.push({
            text: item.name || '',
            actions: item.les_actions?.map((action: any) => ({
              id: action.id,
              action: action.action,
              menu: section.menu_header || action.menu, // Use menu_header or action.menu if present
              ongle: item.text || action.ongle           // Use item.text or action.ongle if present
            })) || []
          });
        });
      }
    });
    return result;
  }

  toggleDroit(action: Action) {
    if (this.selectedDroits[action.id]) {
      if (!this.tmp_droits.some(d => d.id === action.id)) {
        this.tmp_droits = [...this.tmp_droits, action]; // Action includes menu and ongle
      }
    } else {
      this.tmp_droits = this.tmp_droits.filter(d => d.id !== action.id);
    }
    console.log('tmp_droits after toggle:', this.tmp_droits);
  }

  retirerDroit(index: number) {
    const droit = this.tmp_droits[index];
    this.tmp_droits = this.tmp_droits.filter((_, i) => i !== index);
    this.selectedDroits[droit.id] = false;
    console.log('tmp_droits after removal:', this.tmp_droits);
  }

  get f() {
    return this.reactiveForm_add_privilege.controls;
  }

  onSubmit_add_privilege() {
    this.submitted = true;

    if (this.reactiveForm_add_privilege.invalid) {
      console.log('Form is invalid:', this.reactiveForm_add_privilege.errors);
      return;
    }
    const privilege = {
      libelle: this.reactiveForm_add_privilege.get('libelle')?.value,
      description: this.reactiveForm_add_privilege.get('description')?.value,
      les_droits: this.tmp_droits
    };

    console.log('Data to send:', privilege);
    this.add_privilege(privilege);
  }

  onReset_add_privilege() {
    this.submitted = false;
    this.tmp_droits = [];
    Object.keys(this.selectedDroits).forEach(key => {
      this.selectedDroits[key] = false;
    });
    this.reactiveForm_add_privilege.reset();
  }

  add_privilege(privilege: any) {
    this.loading_add_privilege = true;
    this.api.taf_post(
      'privilege/add',
      privilege,
      (reponse: any) => {
        console.log('API Response:', reponse);
        if (reponse.status) {
          this.onReset_add_privilege();
          this.api.Swal_success('Privilege ajouté avec succès');
          this.activeModal.close({
            status: true,
            utilisateur: reponse.data,
          });
        } else {
          this.api.Swal_error("L'opération a échoué");
        }
        this.loading_add_privilege = false;
      },
      (error: any) => {
        console.error('API Error:', error);
        this.api.Swal_error("Erreur lors de l'ajout");
        this.loading_add_privilege = false;
      }
    );
  }

  get_details_add_privilege_form() {
    this.loading_get_details_add_privilege_form = true;
    this.api.taf_post(
      'privilege/get_form_details',
      {},
      (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data;
        }
        this.loading_get_details_add_privilege_form = false;
      },
      () => {
        this.loading_get_details_add_privilege_form = false;
      }
    );
  }
}