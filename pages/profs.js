import Prof from "../components/prof";
import styles from "../styles/Profs.module.css";

export default function Profs({ professeurs }) {
  return (
    <div className={styles.conteneur}>
      <h1>Voici la liste des professeurs</h1>

      {professeurs.map((professeur) => {
        return <Prof key={professeur.id} leProf={professeur} styles={styles} />;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/Professeurs");
  const professeurs = await res.json();

  return {
    props: {
      professeurs,
    },
  };
}
