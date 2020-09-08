//j'importe le composant prof afin de pouvoir l'utiliser plusieurs fois dans ma page avec un loop
import Prof from "../components/prof";

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

//j'importe ma fonction pour faire des requêtes GraphQl par AJAX
import { faireRequeteGql } from "../libs/requetesDonnes";
import { gql } from "graphql-request";

//mon composant de page react
export default function Profs({ listeProfs }) {
  //je prends les données dont j'ai besoin depuis les props
  const lesProfs = listeProfs.professeurCollection.items;

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
  const listeProfs = await faireRequeteGql(requeteGql);

  //je retourne ces données , qui seront utilisées en tant que props / paramètre dans le composant plus haut
  return {
    props: {
      listeProfs,
    },
    //avec l'option revalidate, même si la page est complètement statique , on peut la regénérer dans le background
    //quand on change des données sur le CMS, sans avoir a refaire un "build"
    revalidate: 1,
  };
}
