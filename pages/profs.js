//j'importe le composant prof afin de pouvoir l'utiliser plusieurs fois dans ma page avec un loop
import Prof from "../components/prof";

//on importe les fonctions qu'on a besoin de react
import { useState, useEffect } from 'react';

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

// j'importe des fonctions de apollo, pour utiliser GraphQL, qui est comme un genre de SQL côté client
import { client } from "../libs/apollo";

// j'importe un petit truc qui rend l'utilisation de graphql plus facile
import gql from "graphql-tag";


//mon composant de page react
export default function Profs({ listeProfs }) {

  //je créée l'état initial en lui donnant les props
  const [lesProfs, setLesProfs] = useState(listeProfs)

  // useEffect est appelé après le premier rendu affiché à l'écran
  //ici je fais une autre requête graphql pour mettre à jour le contenu cherché depuis le CMS prismic
  useEffect(() => {
    client.query({
      query: gqlQuery,
      //je mets à jour l'état avec les données de cette requête
    }).then((a) => setLesProfs(a.data.allProfesseurs.edges));
  }, [])


  //avec React , on utilise la méthode .map() pour faire des loops
  // ici , je fais un loop pour chaque professeur dans la requête AJAX.
  // Pour chaque professeur, je crée un composant 'prof',
  // et je lui passe des attributs que j'ai défini dans le fichier de ce composant

  return (
    <div>
      <h1>Voici la liste des professeurs</h1>

      {/* comme j'ai dis plus tot, je fais un loop avec .map(), puisqu'on ne peut pas utiliser de "for" */}

      {lesProfs.map((prof) => {
        return (
          //j'utilise mon composant prof que j'ai importé en haut et je lui passe des props / paramêtres
          <Prof key={prof.node._meta.uid} prof={prof} styles={styles}></Prof>
        );
      })}
    </div>
  );
}

//la requête graphql , s'apparente à une requête SQL.
//on décrit simplement la "forme" dans laquelle on souhaite récupérer nos données du serveur / CMS
const gqlQuery = gql`
  {
    allProfesseurs {
      edges {
        node {
          nom
          description
          photo
          biographie
          _linkType
          _meta {
            uid
          }
        }
      }
    }
  }
`;

//pour avoir la génération statique et avoir un maximum de SEO, on doit faire nos requêtes AJAX
//dans une fonction getStaticProps(), sinon ca ne fonctionne pas
export async function getStaticProps(context) {
  //je fais une requête graphql
  const res = await client.query({
    query: gqlQuery,
  });
  //je prends les données que je veux dans la requête
  const listeProfs = await res.data.allProfesseurs.edges;

  //je retourne ces données , qui seront utilisées en tant que props / paramètre dans le composant plus haut
  return {
    props: {
      listeProfs,
    },
  };
}
