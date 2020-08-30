import BioProf from "./bioProf";
import { useState } from "react";

                            /* la syntaxe des paramètres de la fonction 
                                est ce qu'on appèle la 'destructuration'
                                ce n'est pas obligatoire, mais ca simplifie souvent 
                                les choses.
                                Il est toutefois possible de le faire quand même
                                avec la bonne vielle syntaxe d'objet avec les '.'
                                comme tel : props.leProf.Nom */             
export default function Prof({ styles, leProf: { Nom, DescriptionCourte, biographie } }) {

    //un 'hook' de React , ca permet de gérer l'état d'un composant.
    // dans ce cas-ci , on gère si le bouton '+' est cliqué ou pas.
    // selon cela, on affiche ou pas la biographie du professeur.
  const [bioOuvert, setBioOuvert] = useState(false);

  //JSX est comme HTML , mais avec quelques différences.
  // on peut insérer du code JS dans le html directement avec les {} et {{}}
  return (
    <div className={styles.conteneur}>
      <h2 className={styles.nomProf}>{Nom}</h2>

      <h3 style={{ border: "12px solid brown" }}>{DescriptionCourte}</h3>

      <button onClick={() => { setBioOuvert(!bioOuvert); }} > + </button>

      { //si bioOuvert est 'true' alors afficher le composant BioProf
      bioOuvert && <BioProf laBio={biographie} key={biographie.id} />
      }
    </div>
  );
}
