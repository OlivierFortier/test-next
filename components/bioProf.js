//j'importe le composant Link de la librairie
//celui-ci doit-être utilisé à la place des <a> pour faire des liens entre les pages.
//il permet aussi de pré-rendre la page avant même que l'utilisateur clique sur le lien
//cela permet de charger instantanément la page lorsqu'il clique
import Link from "next/link";

//composant très simple , qui ne fais qu'afficher ce qui lui est passé en paramètre / props
export default function BioProf({ bio, cours }) {
  const listeCours = cours.items;

  //je peux mettre les manipulations et les boucles que je fais sur les données dans une variable
  //car cela retourne du JSX, pour ensuite l'utiliser plus bas dans le JSX
  const elm =
    listeCours &&
    listeCours.map((cour) => {
      return (
        <div key={cour.sys.id}>
          <Link href="/cours/[id]" as={`/cours/${cour.sys.id}`}>
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
