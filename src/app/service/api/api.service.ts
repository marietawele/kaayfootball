import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IdbService } from '../idb/idb.service';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/fr';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  local_storage_prefixe = "kaayfootball";
  taf_base_url = "http://localhost/kaayfootball/";

  infos: any = {
    utilisateur: {},
    les_entreprises: []
  }
  current_entreprise: any = {}
  loading_get_utilisateur = false
  menu: any[] = []
  color1 = "#1555A6"
  color2 = "#D92010"

  full_menu: any[] = [
    {
      menu_header: "Objectif",
      items: [
        {
          name: "Contrat",
          path: "/home/contrat",
          icon: "bi bi-document-text",
          children: [],
          les_actions: [
            { menu: "Contrat", ongle: "Contrat", id: "list_contrat", action: "Lister les Contrats" },
            { menu: "Contrat", ongle: "Contrat", id: "edit_contrat", action: "Editer un Contrat" },
            { menu: "Contrat", ongle: "Contrat", id: "add_contrat", action: "Ajouter un Contrat" },
            { menu: "Contrat", ongle: "Contrat", id: "delete_contrat", action: "Supprimer un Contrat" },

          ],
        },
        // {
        //   name: "Tableau de bord",
        //   path: "/home/tableau",
        //   icon: "bi bi-bar-chart",
        //   children: [
        //     {
        //       name: "Stock",
        //       path: "/home/stock",
        //       icon: "bi bi-box-seam",
        //       children: [],
        //       les_actions: [
        //         { menu: "Stock", ongle: "Stock", id: "list_stock", action: "Lister les stocks" },
        //         { menu: "Stock", ongle: "Stock", id: "edit_stock", action: "Editer un stock" },
        //         { menu: "Stock", ongle: "Stock", id: "add_stock", action: "Ajouter un stock" },
        //         { menu: "Stock", ongle: "Stock", id: "delete_stock", action: "Supprimer un stock" },

        //         { menu: "Stock", ongle: "Approvisionnement", id: "list_approvisionnement", action: "Lister les approvisionnements" },
        //         { menu: "Stock", ongle: "Approvisionnement", id: "add_approvisionnement", action: "Ajouter un approvisionnement" },
        //         // { menu: "Stock", ongle: "Approvisionnement", id: "edit_approvisionnement", action: "Modifier un approvisionnement" },
        //         // { menu: "Stock", ongle: "Approvisionnement", id: "delete_approvisionnement", action: "Supprimer un approvisionnement" },

        //         { menu: "Stock", ongle: "Distribution", id: "list_distribution", action: "Lister les distributions" },
        //         { menu: "Stock", ongle: "Distribution", id: "add_distribution", action: "Ajouter une distribution" },
        //         // { menu: "Stock", ongle: "Distribution", id: "edit_distribution", action: "Modifier une distribution" },
        //         // { menu: "Stock", ongle: "Distribution", id: "delete_distribution", action: "Supprimer une distribution" },
        //       ],
        //     },
        //   ],
        //   les_actions: [
        //     { menu: "Tableau de bord", ongle: "Tableau de bord", id: "list_tableau_de_bord", action: "Lister le tableau de bord" },
        //     // { menu: "tableau_de_bord", ongle: "tableau_de_bord", id: "edit_tableau_de_bord", action: "Editer un tableau de bord" },
        //     // { menu: "tableau_de_bord", ongle: "tableau_de_bord", id: "add_tableau_de_bord", action: "Ajouter un tableau de bord" },
        //     // { menu: "tableau_de_bord", ongle: "tableau_de_bord", id: "delete_tableau_de_bord", action: "Supprimer un tableau de bord" },
        //     // { menu: "tableau_de_bord", ongle: "Detail tableau_de_bord", id: "list_detail_tableau_de_bord", action: "Lister les details d'un tableau de bord" },

        //   ],


        // },
      ]
    },
    {
      menu_header: "Commerciale",
      items: [
        {
          name: "Approvisionnement",
          path: "/home/approvisionnement",// A modifier
          icon: "bi bi-box-seam-fill",
          children: [


          ],
          les_actions: [
            { menu: "Approvisionnement", ongle: "Approvisionnement", id: "list_approvisionnement", action: "Lister les approvisionnements" },
            { menu: "Approvisionnement", ongle: "Approvisionnement", id: "add_approvisionnement", action: "Ajouter un approvisionnement" },
          ]
        },
        {
          name: "Produit",
          path: "/home/produit",
          icon: "bi bi-basket",
          children: [],
          les_actions: [
            { menu: "Produit", ongle: "Produit", id: "list_produit", action: "Lister les produits" },
            { menu: "Produit", ongle: "Produit", id: "edit_produit", action: "Editer un produit" },
            { menu: "Produit", ongle: "Produit", id: "add_produit", action: "Ajouter un produit" },
            { menu: "Produit", ongle: "Produit", id: "delete_produit", action: "Supprimer un produit" },

          ],
        },
        {
          name: "Gamme",
          path: "/home/gamme",
          icon: "bi bi-file-post-fill",
          children: [],
          les_actions: [
            { menu: "Gamme", ongle: "Gamme", id: "list_gamme", action: "Lister les gammes" },
            { menu: "Gamme", ongle: "Gamme", id: "edit_gamme", action: "Editer une gamme" },
            { menu: "Gamme", ongle: "Gamme", id: "add_gamme", action: "Ajouter une gamme" },
            { menu: "Gamme", ongle: "Gamme", id: "delete_gamme", action: "Supprimer une gamme" },

          ],
        },
        // {
        //   name: "Materielle Promo",
        //   path: "/home/materielle_promo",
        //   icon: "bi bi-megaphone",
        //   children: [],
        //   les_actions: [
        //     { menu: "Materielle promo", ongle: "Materielle promo", id: "list_materielle_promo", action: "Lister les materielle promos" },
        //     { menu: "Materielle promo", ongle: "Materielle promo", id: "add_materielle_promo", action: "ajouter un materielle promo" },
        //     { menu: "Materielle promo", ongle: "Materielle promo", id: "edit_materielle_promo", action: "Editer un materielle promo" },
        //     { menu: "Materielle promo", ongle: "Materielle promo", id: "delete_materielle_promo", action: "Supprimer un materielle promo" },
        //     { menu: "Materielle promo", ongle: "Type materielle promo", id: "list_type_materielle_promo", action: "Lister les types de materielle promo" },
        //     { menu: "Materielle promo", ongle: "Type materielle promo", id: "add_type_materielle_promo", action: "Ajouter un type de materielle promo" },
        //     { menu: "Materielle promo", ongle: "Type materielle promo", id: "edit_type_materielle_promo", action: "Editer un type de materielle promo" },
        //     { menu: "Materielle promo", ongle: "Type materielle promo", id: "delete_type_materielle_promo", action: "Supprimer un type de materielle promo" },
        //   ],
        // },
        // {
        //   name: "Distribution",
        //   path: "/home/distribution",// A modifier
        //   icon: "bi bi-box-arrow-in-down",
        //   children: [],
        //   les_actions: [
        //     { menu: "Distribution", ongle: "Distribution", id: "list_distribution", action: "Lister les distributions" },
        //     { menu: "Distribution", ongle: "Distribution", id: "add_distribution", action: "Ajouter une distribution" },
        //   ]
        // },
        {
          name: "Vente",
          path: "/home/vente",// A modifier
          icon: "bi bi-cart",
          children: [],
          les_actions: [
            { menu: "Vente", ongle: "Vente", id: "list_vente", action: "Lister les ventes" },
            { menu: "Vente", ongle: "Vente", id: "edit_vente", action: "Editer une vente" },
            { menu: "Vente", ongle: "Vente", id: "add_vente", action: "Ajouter une vente" },
            { menu: "Vente", ongle: "Vente", id: "delete_vente", action: "Supprimer une vente" },

          ],

        },
      ]
    },

    {
      menu_header: "Suivie client",
      items: [
        {
          name: "Client",
          path: "/home/client",// A modifier
          icon: "bi bi-person",
          children: [
            {
              name: "Potentiel",
              path: "/home/potentiel",
              icon: "bi bi-pen",
              children: [],
              les_actions: [
                { menu: "Potentiel", ongle: "Potentiel", id: "list_potentiel", action: "Lister les potentiels" },
                { menu: "Potentiel", ongle: "Potentiel", id: "edit_potentiel", action: "Editer un potentiel" },
                { menu: "Potentiel", ongle: "Potentiel", id: "add_potentiel", action: "Ajouter un potentiel" },
                { menu: "Potentiel", ongle: "Potentiel", id: "delete_potentiel", action: "Supprimer un potentiel" },

                { menu: "Potentiel", ongle: "Client", id: "list_client", action: "Lister les clients" },
                { menu: "Potentiel", ongle: "Client", id: "add_client", action: "Ajouter une client" },
                { menu: "Potentiel", ongle: "Client", id: "delete_client", action: "Supprimer une client" },
                { menu: "Potentiel", ongle: "Client", id: "edit_client", action: "Editer une client" },

                { menu: "Potentiel", ongle: "Type potentiel", id: "list_type_potentiel", action: "Lister les types de potentiel" },
                { menu: "Potentiel", ongle: "Type potentiel", id: "add_type_potentiel", action: "Ajouter une type potentiel" },
                { menu: "Potentiel", ongle: "Type potentiel", id: "delete_type_potentiel", action: "Supprimer un type potentiel" },
                { menu: "Potentiel", ongle: "Type potentiel", id: "edit_type_potentiel", action: "Editer une type potentiel" },
              ],
            },
            // {
            //   name: "Zone Ugv",
            //   path: "/home/zone_ugv",
            //   icon: "bi bi-postage",
            //   children: [],
            //   les_actions: [
            //     { menu: "Zone ugv", ongle: "Zone ugv", id: "list_zone ugv", action: "Lister les zone ugvs" },
            //     { menu: "Zone ugv", ongle: "Zone ugv", id: "edit_zone ugv", action: "Editer une zone ugv" },
            //     { menu: "Zone ugv", ongle: "Zone ugv", id: "add_zone ugv", action: "Ajouter une zone ugv" },
            //     { menu: "Zone ugv", ongle: "Zone ugv", id: "delete_zone ugv", action: "Supprimer une zone ugv" },

            //     { menu: "Zone ugv", ongle: "Zone", id: "list_zone", action: "Lister les zones" },
            //     { menu: "Zone ugv", ongle: "Zone", id: "edit_zone", action: "Editer une zone" },
            //     { menu: "Zone ugv", ongle: "Zone", id: "add_zone", action: "Ajouter une zone" },
            //     { menu: "Zone ugv", ongle: "Zone", id: "delete_zone", action: "Supprimer une zone" },

            //   ],
            // },
          ],
          les_actions: [
            { menu: "Client", ongle: "Client", id: "list_client", action: "Lister les clients" },
            { menu: "Client", ongle: "Client", id: "edit_client", action: "Editer un client" },
            { menu: "Client", ongle: "Client", id: "add_client", action: "Ajouter un client" },
            { menu: "Client", ongle: "Client", id: "delete_client", action: "Supprimer un client" },

            { menu: "Client", ongle: "Structure", id: "list_structure", action: "Lister les structures" },
            { menu: "Client", ongle: "Structure", id: "add_structure", action: "Ajouter une structure" },
            { menu: "Client", ongle: "Structure", id: "delete_structure", action: "Supprimer une structure" },
            { menu: "Client", ongle: "Structure", id: "edit_structure", action: "Editer une structure" },

            { menu: "Client", ongle: "Specialite", id: "list_specialite", action: "Lister les specialités" },
            { menu: "Client", ongle: "Specialite", id: "add_specialite", action: "Ajouter une Specialite" },
            { menu: "Client", ongle: "Specialite", id: "delete_specialite", action: "Supprimer une Specialite" },
            { menu: "Client", ongle: "Specialite", id: "edit_specialite", action: "Editer une Specialite" },
          ],
        },
        {
          name: "Zone Ugv",
          path: "/home/zone_ugv",
          icon: "bi bi-postage",
          children: [],
          les_actions: [
            { menu: "Zone ugv", ongle: "Zone ugv", id: "list_zone ugv", action: "Lister les zone ugvs" },
            { menu: "Zone ugv", ongle: "Zone ugv", id: "edit_zone ugv", action: "Editer une zone ugv" },
            { menu: "Zone ugv", ongle: "Zone ugv", id: "add_zone ugv", action: "Ajouter une zone ugv" },
            { menu: "Zone ugv", ongle: "Zone ugv", id: "delete_zone ugv", action: "Supprimer une zone ugv" },

            { menu: "Zone ugv", ongle: "Zone", id: "list_zone", action: "Lister les zones" },
            { menu: "Zone ugv", ongle: "Zone", id: "edit_zone", action: "Editer une zone" },
            { menu: "Zone ugv", ongle: "Zone", id: "add_zone", action: "Ajouter une zone" },
            { menu: "Zone ugv", ongle: "Zone", id: "delete_zone", action: "Supprimer une zone" },

          ],
        },

      ]
    },
    {
      menu_header: "Suivie délégué",
      items: [
        {
          name: "Objectif",
          path: "/home/objectif",
          icon: "bi bi-people",
          children: [

            // {
            //   name: "Coaching",
            //   path: "/home/coaching",
            //   icon: "bi bi-flag",
            //   children: [],
            //   les_actions: [
            //     { menu: "Objectif", ongle: "Objectif", id: "list_objectif", action: "Lister les objectifs" },
            //     { menu: "Objectif", ongle: "Objectif", id: "add_objectif", action: "ajouter un objectif" },
            //     { menu: "Objectif", ongle: "Objectif", id: "edit_objectif", action: "Editer un objectif" },
            //     { menu: "Objectif", ongle: "Objectif", id: "delete_objectif", action: "Supprimer un objectif" },

            //     { menu: "Objectif", ongle: "Type objectif", id: "list_type_objectif", action: "Lister les types d'objectif" },
            //     { menu: "Objectif", ongle: "Type objectif", id: "add_type_objectif", action: "Ajouter un type d'objectif" },
            //     { menu: "Objectif", ongle: "Type objectif", id: "edit_type_objectif", action: "Editer un type d'objectif" },
            //     { menu: "Objectif", ongle: "Type ojectif", id: "delete_type_objectif", action: "Supprimer un type d'objectif" },
            //   ],
            // },
            // {
            //   name: "Visite",
            //   path: "/home/visite",
            //   icon: "bi bi-calendar-check",
            //   badge: 2, // Pour afficher le nombre de notifications
            //   children: [],
            //   les_actions: [
            //     { menu: "Visite", ongle: "Visite", id: "list_visite", action: "Lister les visites" },
            //     { menu: "Visite", ongle: "Visite", id: "add_visite", action: "Ajouter un visite" },

            //     { menu: "Visite", ongle: "Type visite", id: "list_type_visite", action: "Lister les types de visite" },
            //     { menu: "Visite", ongle: "Type visite", id: "add_type_visite", action: "Ajouter les types de visite" },
            //     { menu: "Visite", ongle: "Type visite", id: "edit_type_visite", action: "Modifier les types de visite" },
            //     { menu: "Visite", ongle: "Type visite", id: "delete_type_visite", action: "Supprimer les types de visite" },

            //     { menu: "Visite", ongle: "Detail visite", id: "detail_visite", action: "Lister les details des visites" },
            //     { menu: "Visite", ongle: "Detail Visite", id: "delete_visite", action: "Supprimer une visite" },
            //     { menu: "Visite", ongle: "Detail Visite", id: "edit_visite", action: "Editer une visite" },
            //   ],
            // },
            // {
            //   name: "Rapport",
            //   path: "/home/rapport",
            //   icon: "bi bi-card-text",
            //   badge: 2, // Pour afficher le nombre de notifications
            //   children: [],
            //   les_actions: [
            //     { menu: "Rapport", ongle: "Rapport", id: "list_rapport", action: "Lister les rapports" },
            //     { menu: "Rapport", ongle: "Rapport", id: "edit_rapport", action: "Editer un rapport" },
            //     { menu: "Rapport", ongle: "Rapport", id: "add_rapport", action: "Ajouter un rapport" },
            //     { menu: "Rapport", ongle: "Rapport", id: "delete_rapport", action: "Supprimer un rapport" },

            //     { menu: "Rapport", ongle: "Detail rapport", id: "list_detail_rapport", action: "Lister les details d'un rapport" },

            //   ],
            // },
            // {
            //   name: "Delegue",
            //   path: "/home/delegue_superviseur",
            //   icon: "bi bi-person-vcard-fill",
            //   badge: 2, // Pour afficher le nombre de notifications
            //   children: [],
            //   les_actions: [
            //     { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "list_superviseur Delegue", action: "Lister les superviseur delegues" },
            //     { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "edit_superviseur Delegue", action: "Editer un superviseur delegue" },
            //     { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "add_superviseur Delegue", action: "Ajouter un superviseur delegue" },
            //     { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "delete_superviseur Delegue", action: "Supprimer un superviseur delegue" },

            //     // { menu: "Superviseur Delegue", ongle: "Detail Superviseur Delegue", id: "list_detail_superviseur Delegue", action: "Lister les details d'un Superviseur delegue" },
            //   ],
            // },
            // {
            //   name: "Performance",
            //   path: "/home/performance",
            //   icon: "bi bi-bar-chart",
            //   children: [],
            //   les_actions: [
            //     { menu: "Performance", ongle: "Performance", id: "list_performance", action: "Lister les performances" },
            //     { menu: "Performance", ongle: "Performance", id: "edit_performance", action: "Editer un performance" },
            //     { menu: "Performance", ongle: "Performance", id: "add_performance", action: "Ajouter un performance" },
            //     { menu: "Performance", ongle: "Performance", id: "delete_performance", action: "Supprimer un performance" },
            //     { menu: "Performance", ongle: "Detail performance", id: "list_detail_performance", action: "Lister les details d'un performance" },

            //   ],
            // },
          ],
          les_actions: [
            { menu: "Coaching", ongle: "Coaching", id: "list_coaching", action: "Lister les coachings" },
            { menu: "Coaching", ongle: "Coaching", id: "add_coaching", action: "ajouter un coaching" },

            { menu: "Coaching", ongle: "Detail coaching", id: "edit_coaching", action: "Editer un coaching" },
            { menu: "Coaching", ongle: "Detail coaching", id: "delete_coaching", action: "Supprimer un coaching" },
            { menu: "Coaching", ongle: "Detail coaching", id: "list_detail_coaching", action: "Lister les details d'un coaching" },
            { menu: "Coaching", ongle: "Detail coaching", id: "evaluer_coaching", action: "Evaluer un coaching" },
          ],
        },
        {
          name: "Coaching",
          path: "/home/coaching",
          icon: "bi bi-flag",
          children: [],
          les_actions: [
            { menu: "Objectif", ongle: "Objectif", id: "list_objectif", action: "Lister les objectifs" },
            { menu: "Objectif", ongle: "Objectif", id: "add_objectif", action: "ajouter un objectif" },
            { menu: "Objectif", ongle: "Objectif", id: "edit_objectif", action: "Editer un objectif" },
            { menu: "Objectif", ongle: "Objectif", id: "delete_objectif", action: "Supprimer un objectif" },

            { menu: "Objectif", ongle: "Type objectif", id: "list_type_objectif", action: "Lister les types d'objectif" },
            { menu: "Objectif", ongle: "Type objectif", id: "add_type_objectif", action: "Ajouter un type d'objectif" },
            { menu: "Objectif", ongle: "Type objectif", id: "edit_type_objectif", action: "Editer un type d'objectif" },
            { menu: "Objectif", ongle: "Type ojectif", id: "delete_type_objectif", action: "Supprimer un type d'objectif" },
          ],
        },
        {
          name: "Visite",
          path: "/home/visite",
          icon: "bi bi-calendar-check",
          badge: 2, // Pour afficher le nombre de notifications
          children: [],
          les_actions: [
            { menu: "Visite", ongle: "Visite", id: "list_visite", action: "Lister les visites" },
            { menu: "Visite", ongle: "Visite", id: "add_visite", action: "Ajouter un visite" },

            { menu: "Visite", ongle: "Type visite", id: "list_type_visite", action: "Lister les types de visite" },
            { menu: "Visite", ongle: "Type visite", id: "add_type_visite", action: "Ajouter les types de visite" },
            { menu: "Visite", ongle: "Type visite", id: "edit_type_visite", action: "Modifier les types de visite" },
            { menu: "Visite", ongle: "Type visite", id: "delete_type_visite", action: "Supprimer les types de visite" },

            { menu: "Visite", ongle: "Detail visite", id: "detail_visite", action: "Lister les details des visites" },
            { menu: "Visite", ongle: "Detail Visite", id: "delete_visite", action: "Supprimer une visite" },
            { menu: "Visite", ongle: "Detail Visite", id: "edit_visite", action: "Editer une visite" },
          ],
        },
        {
          name: "Rapport",
          path: "/home/rapport",
          icon: "bi bi-card-text",
          badge: 2, // Pour afficher le nombre de notifications
          children: [],
          les_actions: [
            { menu: "Rapport", ongle: "Rapport", id: "list_rapport", action: "Lister les rapports" },
            { menu: "Rapport", ongle: "Rapport", id: "edit_rapport", action: "Editer un rapport" },
            { menu: "Rapport", ongle: "Rapport", id: "add_rapport", action: "Ajouter un rapport" },
            { menu: "Rapport", ongle: "Rapport", id: "delete_rapport", action: "Supprimer un rapport" },

            { menu: "Rapport", ongle: "Detail rapport", id: "list_detail_rapport", action: "Lister les details d'un rapport" },

          ],
        },
        {
          name: "Delegue",
          path: "/home/delegue_superviseur",
          icon: "bi bi-person-vcard-fill",
          badge: 2, // Pour afficher le nombre de notifications
          children: [],
          les_actions: [
            { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "list_superviseur Delegue", action: "Lister les superviseur delegues" },
            { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "edit_superviseur Delegue", action: "Editer un superviseur delegue" },
            { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "add_superviseur Delegue", action: "Ajouter un superviseur delegue" },
            { menu: "Superviseur Delegue", ongle: "Superviseur Delegue", id: "delete_superviseur Delegue", action: "Supprimer un superviseur delegue" },

            // { menu: "Superviseur Delegue", ongle: "Detail Superviseur Delegue", id: "list_detail_superviseur Delegue", action: "Lister les details d'un Superviseur delegue" },
          ],
        },
      ]
    },
    {
      menu_header: "Parametrage",
      items: [
        {
          name: "Utilisateur",
          path: "/home/utilisateur",// A modifier
          icon: "bi bi-person",
          children: [],
          les_actions: [
            { menu: "Utilisateur", ongle: "Utilisateur", id: "list_utilisateur", action: "Lister les utilisateurs" },
            { menu: "Utilisateur", ongle: "Utilisateur", id: "edit_utilisateur", action: "Editer un utilisateur" },
            { menu: "Utilisateur", ongle: "Utilisateur", id: "add_utilisateur", action: "Ajouter un utilisateur" },
            { menu: "Utilisateur", ongle: "Utilisateur", id: "delete_utilisateur", action: "Supprimer un utilisateur" },

            { menu: "Utilisateur", ongle: "Entreprise", id: "list_entreprise", action: "Lister les entreprises" },
            { menu: "Utilisateur", ongle: "Entreprise", id: "edit_entreprise", action: "Editer un entreprise" },
            { menu: "Utilisateur", ongle: "Entreprise", id: "add_entreprise", action: "Ajouter un entreprise" },
            { menu: "Utilisateur", ongle: "Entreprise", id: "delete_entreprise", action: "Supprimer un entreprise" },

            { menu: "Utilisateur", ongle: "Etablissement", id: "list_etablissement", action: "Lister les etablissements" },
            { menu: "Utilisateur", ongle: "Etablissement", id: "edit_etablissement", action: "Editer un etablissement" },
            { menu: "Utilisateur", ongle: "Etablissement", id: "add_etablissement", action: "Ajouter un etablissement" },
            { menu: "Utilisateur", ongle: "Etablissement", id: "delete_etablissement", action: "Supprimer un etablissement" },

            { menu: "Utilisateur", ongle: "Privilege", id: "list_privilege", action: "Lister les privileges" },
            { menu: "Utilisateur", ongle: "Privilege", id: "edit_privilege", action: "Editer un privilege" },
            { menu: "Utilisateur", ongle: "Privilege", id: "add_privilege", action: "Ajouter un privilege" },
            { menu: "Utilisateur", ongle: "Privilege", id: "delete_privilege", action: "Supprimer un privilege" },

            { menu: "Privilege", ongle: "Privilege", id: "list_privilege", action: "Lister les privileges" },
            { menu: "Privilege", ongle: "Privilege", id: "edit_privilege", action: "Editer un privilege" },
            { menu: "Privilege", ongle: "Privilege", id: "add_privilege", action: "Ajouter un privilege" },
            { menu: "Privilege", ongle: "Privilege", id: "delete_privilege", action: "Supprimer un privilege" },
          ],
        },
        {
          name: "Entreprise",
          path: "/home/entreprise",// A modifier
          icon: "bi bi-house",
          children: [],
          les_actions: [
            { menu: "Entreprise", ongle: "Entreprise", id: "list_entreprise", action: "Lister les entreprises" },
            { menu: "Entreprise", ongle: "Entreprise", id: "edit_entreprise", action: "Editer un entreprise" },
            { menu: "Entreprise", ongle: "Entreprise", id: "add_entreprise", action: "Ajouter un entreprise" },
            { menu: "Entreprise", ongle: "Entreprise", id: "delete_entreprise", action: "Supprimer un entreprise" },
          ]
        }

      ]
    }
  ]

  network: any = {
    token: undefined,
    status: true,
    message: "Aucun probléme détecté",
  }
  token: any = {
    token_key: null,
    token_decoded: null,
    user_connected: null,
    is_expired: null,
    date_expiration: null
  }

  constructor(private http: HttpClient, private route: Router, private idb: IdbService, public location: Location) { }
  // sauvegardes
  async get_from_local_storage(key: string): Promise<any> {
    try {
      let res: any = await this.idb.get_from_indexedDB(key)
      return res
    } catch (error) {
      console.error("erreur de recuperation", error)
      return null
    }
  }
  async save_on_local_storage(key: string, value: any): Promise<void> {
    await this.idb.save_on_indexedDB(key, value);
  }
  async delete_from_local_storage(key: string) {
    await this.idb.delete_from_indexedDB(key);
  }

  async get_token() {
    //le token n'est pas encore chargé
    if (this.network.token == undefined) {
      this.network.token = await this.get_from_local_storage("token")
      if (this.network.token != undefined && this.network.token != null) {// token existant
        this.update_data_from_token()// mise a jour du token
      }
    } else {// token dèja chargé
      this.update_data_from_token()// mise a jour du token
    }
    return this.network.token
  }
  //les requetes http
  async taf_get(path: string, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + await this.get_token(),
      })
    };

    this.http.get(api_url, httpOptions).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_get_error(error, on_error)
      }
    )
  }
  on_taf_get_error(error: any, on_error: Function) {
    this.network.status = false;
    this.network.message = error
    this.Swal_info("Merci de vérifier votre connexion")
    on_error(error)
  }
  async taf_post(path: string, data_to_send: any, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + await this.get_token(),
      })
    };
    this.http.post(api_url, data_to_send, httpOptions).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_post_error(error, on_error)
      }
    )
  }
  async taf_post_login(path: string, data_to_send: any, on_success: Function, on_error: Function) {
    let api_url = this.taf_base_url + path;

    this.http.post(api_url, data_to_send).subscribe(
      (reponse: any) => {// on success
        on_success(reponse)
      },
      (error: any) => {// on error
        this.on_taf_post_error(error, on_error)
      }
    )
  }
  on_taf_post_error(error: any, on_error: any) {
    this.network.status = false;
    this.network.message = error
    this.Swal_info("Merci de vérifier votre connexion")
    on_error(error)
  }
  async update_data_from_token() {
    let token_key = await this.get_from_local_storage("token")
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token_key);
    const expirationDate = helper.getTokenExpirationDate(token_key);
    const isExpired = helper.isTokenExpired(token_key);

    this.token = {
      token_key: token_key,
      token_decoded: decodedToken,
      user_connected: decodedToken.taf_data,
      is_expired: isExpired,
      date_expiration: expirationDate
    }
    if (this.token.is_expired) {
      this.on_token_expire()
    }
  }
  on_token_expire() {
    this.Swal_info("Votre session s'est expiré! Veuillez vous connecter à nouveau")
    this.delete_from_local_storage("token")
    this.route.navigate(['/public/login'])
  }

  Swal_success(title: any) {
    let succes = Swal.fire({
      title: title,
      icon: "success"
    });
    return succes
  }

  Swal_error(title: any) {
    let error = Swal.fire({
      title: title,
      icon: "error"
    });
    return error
  }
  Swal_info(title: any) {
    let info = Swal.fire({
      title: title,
      icon: "info"
    });
    return info
  }

  format_date(date_string: string) {
    // console.log("date_string",date_string)
    return {
      full: moment(date_string).locale("fr").format("dddd Do MMMM YYYY"),// 27 février 2023
      jma: moment(date_string).locale("fr").format("Do MMMM YYYY"),// jeudi ...
      jma2: moment(date_string).locale("fr").format("DD-MM-YYYY"),// 01-11-2023
      jma3: moment(date_string).locale("fr").format("YYYY-MM-DD"),// 2023-10-21
      jma3_hour: moment(date_string).locale("fr").format("YYYY-MM-DD HH:mm"),// 2023-10-21 14:50
      full_datetime: moment(date_string).locale("fr").format("dddd Do MMMM YYYY à HH:mm"),// 27 février 2023
      full_date: moment(date_string).locale("fr").format("dddd Do MMMM YYYY"),// 27 février 2023
    }
  }
  format_current_date() {
    return {
      full: moment().locale("fr").format("dddd Do MMMM YYYY"),// 27 février 2023
      jma: moment().locale("fr").format("Do MMMM YYYY"),// jeudi ...
      jma2: moment().locale("fr").format("DD-MM-YYYY"),// 01-11-2023
      jma3: moment().locale("fr").format("YYYY-MM-DD"),// 2023-10-21
      jma3_hour: moment().locale("fr").format("YYYY-MM-DD HH:mm"),// 2023-10-21 14:50
      full_datetime: moment().locale("fr").format("dddd Do MMMM YYYY à HH:mm"),// 27 février 2023
      full_date: moment().locale("fr").format("dddd Do MMMM YYYY"),// 27 février 2023
    }
  }

  go_back() {
    this.location.back()
  }
  custom_menu() {
    let droits: any[] = [];

    try {
      droits = typeof this.current_entreprise.les_droits === 'string'
        ? JSON.parse(this.current_entreprise.les_droits)
        : this.current_entreprise.les_droits;
    } catch (error) {
      console.error("Erreur de parsing des droits :", error);
      droits = [];
    }
    console.log("droits", droits)
    this.menu = this.full_menu.map(menuGroup => {
      const filteredItems = menuGroup.items
        .map((item: any) => {
          const hasMenu = droits.some(d => d.ongle?.toLowerCase() === item.name?.toLowerCase());

          if (!hasMenu) return null;

          const filteredActions = item.les_actions?.filter((action: any) =>
            droits.some(d => d.id === action.id)
          ) || [];

          if (filteredActions.length === 0) return null;

          return {
            ...item,
            les_actions: filteredActions
          };
        })
        .filter((item: any) => item !== null);

      if (filteredItems.length === 0) return null;

      return {
        menu_header: menuGroup.menu_header,
        items: filteredItems
      };
    }).filter(group => group !== null);

    console.log("Menu personnalisé avec headers :", this.menu);
  }


  hasMenuAccess(menu: any): boolean {

    if (!this.current_entreprise?.les_droits) {
      return false;
    }

    let droitsArray: any[];

    try {
      droitsArray = JSON.parse(this.current_entreprise.les_droits);
    } catch (error) {
      console.error("Error parsing les_droits:", error);
      return false;
    }

    if (!Array.isArray(droitsArray)) {
      return false;
    }

    return droitsArray.some(droit =>
      droit.menu &&
      droit.menu.toLowerCase().includes(menu.toLowerCase())
    );
  }


  hasOngleAccess(menu: any): boolean {

    if (!this.current_entreprise?.les_droits) {
      return false;
    }

    let droitsArray: any[];

    try {
      droitsArray = JSON.parse(this.current_entreprise.les_droits);
    } catch (error) {
      console.error("Error parsing les_droits:", error);
      return false;
    }

    if (!Array.isArray(droitsArray)) {
      return false;
    }

    return droitsArray.some(droit =>
      droit.ongle &&
      droit.ongle.toLowerCase().includes(menu.toLowerCase())
    );
  }


  hasActionAccess(menu: any): boolean {
    return true

    if (!this.current_entreprise?.les_droits) {
      return false;
    }

    let droitsArray: any[];

    try {
      droitsArray = JSON.parse(this.current_entreprise.les_droits);
    } catch (error) {
      console.error("Error parsing les_droits:", error);
      return false;
    }

    if (!Array.isArray(droitsArray)) {
      return false;
    }

    return droitsArray.some(droit =>
      droit.id &&
      droit.id.toLowerCase().includes(menu.toLowerCase())
    );
  }
}
