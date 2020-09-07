//j'importe le composant prof afin de pouvoir l'utiliser plusieurs fois dans ma page avec un loop
import Prof from "../components/prof";

//on importe les fonctions qu'on a besoin de react
import { useState, useEffect } from 'react';

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

//j'importe le hook useSWR qui permet d'optimiser nos requetes AJAX
import useSWR from "swr"

//j'importe ma fonction pour faire des requêtes GraphQl par AJAX
import {faireRequeteGql} from "../libs/requetesDonnes"
import { gql } from "graphql-request";


//mon composant de page react
export default function Profs({ listeProfs }) {

  //j'utilise le "hook" useSWR (ne fais pas directement partie de React)
  //afin de soumettre une requete GraphQl par AJAX.
  //ce hook va automatiquement télécharger les données les plus a jour par AJAX , et les mettre dans le cache
  //en gros , c'est super efficace et ca nous facilite grandement la vie.
  //pas obligé de comprendre les détails.
  const {data : reponse} = useSWR(requeteGql, faireRequeteGql, {initialData: listeProfs})

  //je fouille dans le json obtenu par AJAX afin d'obtenir les données
  //dont j'ai besoin pour utilisation facile
  const lesProfs = reponse.professeurCollection.items

  //avec React , on utilise la méthode .map() pour faire des loops
  // ici , je fais un loop pour chaque professeur dans la requête AJAX.
  // Pour chaque professeur, je crée un composant 'prof',
  // et je lui passe des attributs que j'ai défini dans le fichier de ce composant

  return (
    <div>
      <h1>Voici la liste des professeurs</h1>

      {/* comme j'ai dis plus tot, je fais un loop avec .map(), puisqu'on ne peut pas utiliser de "for" */}

      {lesProfs.map((prof, index) => {
        return (
          //j'utilise mon composant prof que j'ai importé en haut et je lui passe des props / paramêtres
          <Prof key={index} prof={prof} styles={styles}></Prof>
        );
      })}
    </div>
  );
}

//la requête graphql , s'apparente à une requête SQL.
//on décrit simplement la "forme" dans laquelle on souhaite récupérer nos données du serveur / CMS, sous forme de string
const requeteGql = gql`
  {
  professeurCollection {
    items {
      nom
      description
      biographie
      photo {
        url
      }
      linkedFrom {
        courCollection {
          items {
            sys {
              id
            }
            nom
          }
        }
      }
    }
  }
}
`;

//pour avoir la génération statique et avoir un maximum de SEO, on doit faire nos requêtes AJAX
//dans une fonction getStaticProps(), sinon ca ne fonctionne pas
export async function getStaticProps(context) {

  //je fais une requete GraphQL , qui utilise la méthode AJAX, pour aller chercher des données dans le CMS contentful
  const listeProfs = await faireRequeteGql(requeteGql)

  //je retourne ces données , qui seront utilisées en tant que props / paramètre dans le composant plus haut
  return {
    props: {
      listeProfs,
    },
  };
}
