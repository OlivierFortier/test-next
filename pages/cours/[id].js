import { faireRequeteGql } from "../../libs/requetesDonnes";
import { gql } from "graphql-request";
import Head from 'next/head'
import {useRouter} from 'next/router'

// le fichier à les [] dans son nom car elle servira à générer des pages automatiquement selon un ID

/* exemple de génération de page automatiquement selon les données */
export default function Cour({ cour }) {

  //je vais chercher les informations sur le routeur (paramètres d'url, etc)
  const router = useRouter()

  const idPage = router.query.id

  return (
    <div>
      {/* Comme j'ai dis précédemment pour chaque page, il faut avoir un Head avec un title et une meta description
        on peut la générer dynamiquement aussi, comme tel */}
      <Head>
        <title>{cour.nom}</title>
        <meta name="Description" content={`cours TIM : ${cour.nom} , ${cour.description}`}></meta>
        <link rel="canonical" href={`https://test-next-steel.vercel.app/cours/${idPage}`}/>
      </Head>
      <h1>{cour.nom}</h1>
      <h2>{cour.description}</h2>
    </div>
  );
}

export async function getStaticProps(context) {

  /*je prépare ma requête graphQL pour avoir le nom et la description d'un cour 
  cette requete contient une variable ,comme les requetes préparées SQL
  cela me permet d'aller chercher seulement le cours dont je veux (selon le id)*/
  const reqGql = gql`
    query maRequete($idCours: String!) {
      cour(id: $idCours) {
        nom
        description
      }
    }
  `;

//je prépare les variables pour la requête que j'ai recu du contexte de getStaticPaths
  const lesVariables = { idCours: context.params.id };

  //j'effectue ma requete pour obtenir le nom et la description du cour voulu
  const unCour = await faireRequeteGql(reqGql, lesVariables);

  //je retourne ce cours en props, qui sera utilisé dans la page
  return {
    props: unCour, 
    //on regénère la page dans le background, pour réagir aux changement de données dans le CMS
    revalidate : 1
  };
}

//la fonction getStaticPaths permet de générer automatiquement des pages selon les données recues
export async function getStaticPaths() {

  //je prépare une requête graphQL pour avoir la liste de tous les cours, leur id, nom et description
  const lesCours = await faireRequeteGql(gql`
    {
      courCollection {
        items {
          sys {
            id
          }
          nom
          description
        }
      }
    }
  `);

    //je génère les pages automatiquement pour chaque cour, selon leur id
  const paths = lesCours.courCollection.items.map( (cour) => `/cours/${cour.sys.id}` );

  return {
    paths,
    //paramètre obligatoire, va afficher automatiquement une page d'erreur si il y a une erreur
    fallback: false,
  };
}
