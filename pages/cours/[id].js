import { useRouter } from "next/router";
import { faireRequeteGql } from "../../libs/requetesDonnes";
import { gql } from "graphql-request";

export default function Cour({ cour }) {
  return (
    <div>
      <h1>{cour.nom}</h1>
      <h2>{cour.description}</h2>
    </div>
  );
}

const reqGql = gql`
  query maRequete($idCours: String!) {
    cour(id: $idCours) {
      nom
      description
    }
  }
`;

export async function getStaticProps(context) {

  const lesVariables = { idCours: context.params.id };

  const unCour = await faireRequeteGql(reqGql, lesVariables);

  return {
    props: unCour,
  };
}

export async function getStaticPaths() {
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

  return {
    paths: lesCours.courCollection.items.map((cour) => {
      return {
        params: { id: cour.sys.id }
      };
    }), fallback : true
  };
}
