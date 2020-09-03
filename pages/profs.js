import Prof from "../components/prof";

import { useState, useEffect } from 'react';

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

import { client } from "../libs/apollo";

import gql from "graphql-tag";

export default function Profs({ listeProfs }) {
  //avec React , on utilise la méthode .map() pour faire des loops
  // ici , je fais un loop pour chaque professeur dans la requête AJAX.
  // Pour chaque professeur, je crée un composant 'prof',
  // et je lui passe des attributs que j'ai défini dans le fichier de ce composant

  

  const [lesProfs, setLesProfs] = useState(listeProfs)

  useEffect(() => {
    const e = client.query({
      query: gqlQuery,
    }).then((a) => setLesProfs(a.data.allProfesseurs.edges));
  }, [])


  return (
    <div>
      <h1>Voici la liste des professeurs</h1>
      {lesProfs.map((prof) => {
        return (
          <Prof key={prof.node._meta.uid} prof={prof} styles={styles}></Prof>
        );
      })}
    </div>
  );
}

const gqlQuery = gql`
  {
    allProfesseurs {
      edges {
        node {
          _meta {
            uid
          }
          nom
          description
          photo
          _linkType
          biographie
        }
      }
    }
  }
`;

//pour avoir la génération statique et avoir un maximum de SEO, on doit faire nos requêtes AJAX
//dans une fonction getStaticProps(), sinon ca ne fonctionne pas
//voici un exemple
export async function getStaticProps(context) {
  const res = await client.query({
    query: gqlQuery,
  });

  const listeProfs = await res.data.allProfesseurs.edges;

  return {
    props: {
      listeProfs,
    },
  };
}
