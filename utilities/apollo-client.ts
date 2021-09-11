import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://jed-server.kuropen.org/graphql",
    cache: new InMemoryCache(),
})

export default client
