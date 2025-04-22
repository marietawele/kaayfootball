import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sidbar/sidbar.component';
import { NavbarComponent } from './navbar/navbar.component';

declare function initialize(): any;
@Component({
  selector: 'app-home',
  standalone: true, // Composant autonome
  imports: [RouterModule,NgbDropdownModule, CommonModule, SidbarComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
//   menu:any={
//     titre:"Menu",
//     items:[
//       {libelle:"Abonnement",path:"/home/abonnement"},
// {libelle:"Entreprise",path:"/home/entreprise"},
// {libelle:"Log",path:"/home/log"},
// {libelle:"Privilege",path:"/home/privilege"},
// {libelle:"Reservation",path:"/home/reservation"},
// {libelle:"Terrain",path:"/home/terrain"},
// {libelle:"TypeAbonnement",path:"/home/type_abonnement"},
// {libelle:"TypeReservation",path:"/home/type_reservation"},
// {libelle:"Utilisateur",path:"/home/utilisateur"},
// {libelle:"UtilisateurEntreprise",path:"/home/utilisateur_entreprise"}
//     ]
//   }

constructor(public api: ApiService) {
}
ngOnInit(): void {
  let id_utilisateur = this.api.token.user_connected.id_utilisateur
  console.log("id_utilisateur= ", id_utilisateur)
  this.get_utilisateur({
    "ue.id_utilisateur": id_utilisateur
  })
}
get_utilisateur(params: any) {
  console.log("parms= ", params)
  this.api.loading_get_utilisateur = true;
  this.api.taf_post("utilisateur/get3", params, (reponse: any) => {
    if (reponse.status) {
      this.api.infos = reponse.data
      let old_id_entreprise = (this.api.get_from_local_storage("old_id_entreprise")) || 0
      console.log("old_id_entreprise= ", old_id_entreprise)
      let old_entreprise_existe_index = this.api.infos.les_entreprises.findIndex((one: any) => +one.id_entreprise == +old_id_entreprise)
      console.log("old_entreprise_existe_index= ", old_entreprise_existe_index)
      if (old_entreprise_existe_index == -1) {
        old_entreprise_existe_index = 0
      }
      this.api.current_entreprise = this.api.infos.les_entreprises[old_entreprise_existe_index]
      console.log("this.api.current_entreprise= ", this.api.current_entreprise)
      this.api.save_on_local_storage("id_privilege", this.api.current_entreprise.id_privilege)
      this.api.custom_menu()
      setTimeout(() => {
        initialize()

      }, 1500);
      console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= eeer", reponse);
    } else {
      console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
      this.api.Swal_error("L'opération a echoué")
    }
    this.api.loading_get_utilisateur = false;
  }, (error: any) => {
    this.api.loading_get_utilisateur = false;
  })
}
}
