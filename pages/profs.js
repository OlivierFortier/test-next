import Prof from "../components/prof";

// on peut auss importer du CSS avec React
import styles from "../styles/Profs.module.css";

export default function Profs({ professeurs }) {

    //avec React , on utilise la méthode .map() pour faire des loops
    // ici , je fais un loop pour chaque professeur dans la requête AJAX.
    // Pour chaque professeur, je crée un composant 'prof', 
    // et je lui passe des attributs que j'ai défini dans le fichier de ce composant
  return (
    <div >
      <h1>Voici la liste des professeurs</h1>

      {professeurs.map((professeur) => {
        return <Prof key={professeur.id} leProf={professeur} styles={styles} />;
      })}
    </div>
  );
}

//pour avoir la génération statique et avoir un maximum de SEO, on doit faire nos requêtes AJAX
//dans une fonction getStaticProps(), sinon ca ne fonctionne pas
//voici un exemple
export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/Professeurs");
  const professeurs = await res.json();

  return {
    props: {
      professeurs,
    },

    revalidate : 1
  };
}
