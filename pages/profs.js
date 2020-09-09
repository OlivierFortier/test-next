//j'importe le composant prof afin de pouvoir l'utiliser plusieurs fois dans ma page avec un loop
// nouveau commentaire
// allo!
import Prof from "../components/prof";

//YO
//ALDOAWJD IDJAW IKDAW
//AWdaokjwdiAHDJHAWD
//AQWDIKHUAWJDHAJWDH

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

//j'importe ma fonction pour faire des requêtes GraphQl par AJAX
import { faireRequeteGql } from "../libs/requetesDonnes";
import { gql } from "graphql-request";

//j'importe le composant head qui me permet de changer dynamiquement les métadonneées de la page
import Head from "next/head";

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
      {/* chaque page devrait avoir un Head avec au moins un title et une description pour le référencement et le SEO 
        idéalement aussi un link qui point à la page tel que plus bas*/}
      <Head>
        <title>Les Profs</title>
        <meta
          name="Description"
          content="La liste des professeurs du TIM."
        ></meta>
        <link rel="canonical" href="https://test-next-steel.vercel.app/profs" />
      </Head>
      <h1 className={styles.nomProf}>Voici la liste des professeurs</h1>

      {/* comme j'ai dis plus tot, je fais un loop avec .map(), puisqu'on ne peut pas utiliser de "for" */}

      {lesProfs.map((prof, index) => {
        return (
          //j'utilise mon composant prof que j'ai importé en haut et je lui passe des props / paramêtres
          <Prof key={index} prof={prof} styles={styles}></Prof>
        );
      })}
      <style jsx>{`
        h1 {
          color: red;
          margin: auto 0;
          display: block;
        }
      `}</style>
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
          fileName
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
