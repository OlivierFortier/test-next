
//fonction qui fait une requête GraphQL par AJAX et retourne des données
export default async function requeteGql(requete) {
  const token = "I3Phe-I4S1HJrCzZvxLU4yLGXlzKM1YRlYFJn7_lsY8";

  //j'utilise la méthode Fetch de Javascript , qui est nouvelle et remplace l'objet XHR qu'on a vu dans prog web 3
  //et qui est beaucoup plus simple
  const donnees = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN}`,
      },
      body: JSON.stringify({
        query: requete,
      }),
    }
  );

  const json = await donnees.json();

  return json.data;
}
