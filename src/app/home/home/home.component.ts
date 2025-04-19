import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true, // Composant autonome
  imports: [RouterModule,NgbDropdownModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Abonnement",path:"/home/abonnement"},
{libelle:"Entreprise",path:"/home/entreprise"},
{libelle:"Log",path:"/home/log"},
{libelle:"Privilege",path:"/home/privilege"},
{libelle:"Reservation",path:"/home/reservation"},
{libelle:"Terrain",path:"/home/terrain"},
{libelle:"TypeAbonnement",path:"/home/type_abonnement"},
{libelle:"TypeReservation",path:"/home/type_reservation"},
{libelle:"Utilisateur",path:"/home/utilisateur"},
{libelle:"UtilisateurEntreprise",path:"/home/utilisateur_entreprise"}
    ]
  }
}
