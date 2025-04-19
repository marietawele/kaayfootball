
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-log',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-log.component.html',
    styleUrls: ['./edit-log.component.scss']
  })
  export class EditLogComponent {
    reactiveForm_edit_log !: FormGroup;
    submitted: boolean = false
    loading_edit_log: boolean = false
    @Input()
    log_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_log_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_log_form()
        this.update_form(this.log_to_edit)
    }
    // mise à jour du formulaire
    update_form(log_to_edit:any) {
        this.reactiveForm_edit_log = this.formBuilder.group({
            id_utilisateur : [log_to_edit.id_utilisateur],
action : [log_to_edit.action],
ip : [log_to_edit.ip],
updated_at : [log_to_edit.updated_at, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_log .controls; }
    // validation du formulaire
    onSubmit_edit_log() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_log.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_log.invalid) {
            return;
        }
        var log = this.reactiveForm_edit_log.value
        this.edit_log({
        condition:JSON.stringify({id_log:this.log_to_edit.id_log}),
        data:JSON.stringify(log)
        })
    }
    // vider le formulaire
    onReset_edit_log() {
        this.submitted = false;
        this.reactiveForm_edit_log.reset();
    }
    edit_log(log: any) {
        this.loading_edit_log = true;
        this.api.taf_post("log/edit", log, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table log. Réponse= ", reponse);
                //this.onReset_edit_log()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table log a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_log = false;
        }, (error: any) => {
            this.loading_edit_log = false;
        })
    }
    get_details_edit_log_form() {
        this.loading_get_details_edit_log_form = true;
        this.api.taf_post("log/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table log. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table log a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_log_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_log_form = false;
      })
    }
  }
  