import Link from "next/link";
import useSWR from "swr";
import  {faireRequeteGql}  from "../libs/requetesDonnes";
import {gql} from "graphql-request"
import {graphQLClient} from "../libs/requetesDonnes";

//composant très simple , qui ne fais qu'afficher ce qui lui est passé en paramètre / props
export default function BioProf({ bio, cours }) {

  const listeCours = cours.items

  const elm =
    listeCours &&
    listeCours.map((cour) => {

      return (
        <div key={cour.sys.id}>
          <Link href={`/cours/${cour.sys.id}`} as={`/cours/${cour.sys.id}`}>
            <a>{cour.nom}</a>
          </Link>
        </div>
      );
    });

  return (
    <>
      <p>{bio}</p>
      <ul>{elm}</ul>
    </>
  );
}
