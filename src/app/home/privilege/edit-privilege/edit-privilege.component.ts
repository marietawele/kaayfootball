
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-edit-privilege',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule], // Dépendances importées
  templateUrl: './edit-privilege.component.html',
  styleUrls: ['./edit-privilege.component.scss']
})
export class EditPrivilegeComponent {
  reactiveForm_edit_privilege !: FormGroup;
  submitted: boolean = false
  loading_edit_privilege: boolean = false
  @Input()
  privilege_to_edit: any = {}
  form_details: any = {}
  full_menu: any[] = []
  menu: any[] = []
  loading_get_details_edit_privilege_form = false


  actions_extraites: ExtractedAction[] = [];
  action: ExtractedAction[] = [];
  tmp_droits: Action[] = [];
  selectedDroits: { [key: string]: boolean } = {};

  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
    this.full_menu = this.api.full_menu
    this.tmp_droits = JSON.parse(this.privilege_to_edit.les_droits)
    this.get_details_edit_privilege_form()
    this.update_form(this.privilege_to_edit)
    // this.full_menu = JSON.parse(this.privilege_to_edit.les_droits) 
    this.actions_extraites = this.extraireTextEtActions(this.full_menu);
    this.action = this.extraireTextEtActions(this.menu);
    this.verifyEncoche();
    // console.log("FULLL MENUUU", this.full_menu)
 
    // this.actions_extraites=JSON.parse(this.privilege_to_edit.les_droits) 

  }
  resetAll(){
    // console.log('Full menu:', JSON.stringify(this.full_menu, null, 2));
    this.actions_extraites = this.extraireTextEtActions(this.full_menu);
    this.actions_extraites.forEach(item => {
      item.actions.forEach(action => {
        this.selectedDroits[action.id] = false;
      });
    });
  }
  verifyEncoche(){
       this.actions_extraites.forEach(item => {
      item.actions.forEach(i => {
        for (let o = 0; o < this.tmp_droits.length; o++) {
          if (i.id == this.tmp_droits[o].id) {
            // console.log("MEEEEEEE", item.actions[o].id)
            this.selectedDroits[i.id] = true;
          }
        }
      });
    });
  }
  // mise à jour du formulaire
  update_form(privilege_to_edit: any) {
    this.reactiveForm_edit_privilege = this.formBuilder.group({
      libelle: [privilege_to_edit.libelle, Validators.required],
      description: [privilege_to_edit.description],
      les_droits: [privilege_to_edit.les_droits]
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

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_privilege.controls; }
  // validation du formulaire
  onSubmit_edit_privilege() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_privilege.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_privilege.invalid) {
      console.log('Form is invalid:', this.reactiveForm_edit_privilege.errors);
      return;
    }
    const privilege = {
      libelle: this.reactiveForm_edit_privilege.get('libelle')?.value,
      description: this.reactiveForm_edit_privilege.get('description')?.value,
      les_droits: this.tmp_droits
    };
    // var privilege = this.reactiveForm_edit_privilege.value
    this.edit_privilege({
      condition: ({ id_privilege: this.privilege_to_edit.id_privilege }),
      data: (privilege)
    })
  }
  // vider le formulaire
  onReset_edit_privilege() {
    this.submitted = false;
    this.tmp_droits = [];
    Object.keys(this.selectedDroits).forEach(key => {
      this.selectedDroits[key] = false;
    });
    this.reactiveForm_edit_privilege.reset();
  }
  edit_privilege(privilege: any) {
    this.loading_edit_privilege = true;
    this.api.taf_post("privilege/edit", privilege, (reponse: any) => {
      if (reponse.status) {
        this.activeModal.close(reponse)
        console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
        //this.onReset_edit_privilege()
        this.api.Swal_success("Opération éffectuée avec succés")
      } else {
        console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
        this.api.Swal_error("L'opération a echoué")
      }
      this.loading_edit_privilege = false;
    }, (error: any) => {
      this.loading_edit_privilege = false;
    })
  }
  get_details_edit_privilege_form() {
    this.loading_get_details_edit_privilege_form = true;
    this.api.taf_post("privilege/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table privilege. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table privilege a échoué. Réponse= ", reponse);
        this.api.Swal_error("L'opération a echoué")
      }
      this.loading_get_details_edit_privilege_form = false;
    }, (error: any) => {
      this.loading_get_details_edit_privilege_form = false;
    })
  }
}
