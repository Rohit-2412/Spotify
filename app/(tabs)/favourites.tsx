import { FlatList, StyleSheet } from "react-native";

import { tracks } from "../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
    query MyQuery($userId: String!) {
        favoritesByUserid(userid: $userId) {
            track {
                id
                name
                preview_url
                artists {
                    id
                    name
                }
                album {
                    id
                    name
                    images {
                        width
                        height
                        url
                    }
                }
            }
        }
    }
`;

export default function FavouritesScreen() {
    const { data, loading, error } = useQuery(query, {
        variables: { userId: "rohit" },
    });

    const tracks = (data?.favoritesByUserid || []).map((f: any) => f.track);
    return (
        <FlatList
            data={tracks}
            renderItem={({ item }) => <TrackListItem track={item} />}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
