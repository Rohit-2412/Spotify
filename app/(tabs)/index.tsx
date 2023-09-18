import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import TrackListItem from "../../components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
    query getRecommendations($genres: String!) {
        recommendations(seed_genres: $genres) {
            tracks {
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
export default function HomeScreen() {
    const { data, loading, error } = useQuery(query, {
        variables: { genres: "indian" },
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.container}>
                <Text>Failed to fetch the recommendations</Text>
            </View>
        );
    }
    const tracks = data?.recommendations?.tracks || [];
    return (
        <>
            <FlatList
                data={tracks}
                renderItem={({ item }) => <TrackListItem track={item} />}
                showsVerticalScrollIndicator={false}
            />
        </>
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
