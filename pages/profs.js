//j'importe le composant prof afin de pouvoir l'utiliser plusieurs fois dans ma page avec un loop
import Prof from "../components/prof";

//on importe les fonctions qu'on a besoin de react
import { useState, useEffect } from 'react';

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

//j'importe ma fonction pour effectuer des requêtes graphQL par AJAX pour chercher les données du CMS
import requeteGql from "../libs/requetesDonnes"


//mon composant de page react
export default function Profs({ listeProfs }) {

  //je créée l'état initial en lui donnant les props
  const [lesProfs, setLesProfs] = useState(listeProfs)

  // useEffect est appelé après le premier rendu affiché à l'écran
  useEffect(() => {
    
    //ici je fais une autre requête graphql pour mettre à jour le contenu cherché depuis le CMS 
    requeteGql(reqGql).then( (donnees) =>{ setLesProfs(donnees.professeurCollection.items); })

  }, [])


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
const reqGql = `
  {
    professeurCollection {
      items {
        nom
        photo {
          url
        }
        description
        biographie
      }
    }
  }
`;

//pour avoir la génération statique et avoir un maximum de SEO, on doit faire nos requêtes AJAX
//dans une fonction getStaticProps(), sinon ca ne fonctionne pas
export async function getStaticProps(context) {
  //je fais une requête graphql
  const res = await requeteGql(reqGql)
  //je prends les données que je veux dans la requête
  const listeProfs = await res.professeurCollection.items;

  //je retourne ces données , qui seront utilisées en tant que props / paramètre dans le composant plus haut
  return {
    props: {
      listeProfs,
    },
  };
}
