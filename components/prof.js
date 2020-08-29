export default function Prof({
  styles,
  leProf: {
    Nom,
    DescriptionCourte,
    biographie: { Biographie },
  },
}) {
  return (
    <div className={styles.conteneur}>
      <h2>{Nom}</h2>

      <h3>{DescriptionCourte}</h3>

      <p>{Biographie}</p>
    </div>
  );
}
