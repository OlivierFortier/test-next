//on importe les composants dont nous avons besoin
import BioProf from "./bioProf";
//on importe les fonctions dont nous avons besoin
import { useState } from "react";

/* la syntaxe des paramètres de la fonction 
est ce qu'on appèle la 'destructuration'
ce n'est pas obligatoire, mais ca simplifie souvent 
les choses.
Il est toutefois possible de le faire quand même
avec la bonne vielle syntaxe d'objet avec les '.'
comme tel : props.leProf.Nom */
export default function Prof({ styles, prof }) {

  //un 'hook' de React , ca permet de gérer l'état d'un composant.
  // dans ce cas-ci , on gère si le bouton '+' est cliqué ou pas.
  // selon cela, on affiche ou pas la biographie du professeur.
  const [bioOuvert, setBioOuvert] = useState(false);

  //JSX est comme HTML , mais avec quelques différences.
  // on peut insérer du code JS dans le html directement avec les {} et {{}}
  return (
    <div className={styles.conteneur}>
      <h2 className={styles.nomProf}>{prof.node.nom[0].text}</h2>

      {/* si il y a une photo, alors afficher l'image */}
      {prof.node.photo.url && <img src={prof.node.photo.url}></img>}

      <h3 style={{ border: "12px solid brown" }}>{prof.node.description}</h3>

      {/* avec React , quand on veut ajouter une fonction a un bouton,
      on doit mettre la fonction a l'intérieur d'une fonction.
      c'est pour ca que les fonctions flechées : 
      () => {}
      sonts utiles ! */}
      <button onClick={() => { setBioOuvert(!bioOuvert); }} >{ bioOuvert ? '-' : '+' }</button>

      {
        //si bioOuvert est 'true' alors afficher le composant BioProf
        bioOuvert && <p style={{margin: '0 25%'}} >{prof.node.biographie[0].text}</p>
      }
    </div>
  );
}
