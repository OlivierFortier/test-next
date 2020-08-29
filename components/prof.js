import BioProf from './bioProf'

export default function Prof({
  styles,
  leProf: {
    Nom,
    DescriptionCourte,
    biographie,
  },
}) {
  return (
    <div className={styles.conteneur}>
       
      <h2 className={styles.nomProf}>{Nom}</h2>

      <h3>{DescriptionCourte}</h3>

      <BioProf laBio={biographie} key={biographie.id}/>
    </div>
  );
}
