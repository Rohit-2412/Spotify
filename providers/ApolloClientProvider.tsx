import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren, createContext } from "react";

const client = new ApolloClient({
    uri: "https://hpaan.stepzen.net/api/hardy-fly/__graphql",
    headers: {
        Authorization:
            "apikey hpaan::stepzen.net+1000::b2b979b13c2f4d2cdc7700da39f140fd85b71e939df65b5af80635a6b6d50433",
    },
    cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
