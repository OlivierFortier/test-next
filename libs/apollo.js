import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

export const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://tim-nextjs-test.cdn.prismic.io/graphql",
  }),
  cache: new InMemoryCache()
});