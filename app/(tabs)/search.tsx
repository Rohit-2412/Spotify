import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput,
} from "react-native";
import TrackListItem from "../../components/TrackListItem";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const query = gql`
    query SearchSong($q: String!) {
        search(q: $q, type: track) {
            tracks {
                items {
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
    }
`;

export default function SearchScreen() {
    const [search, setSearch] = useState("");
    const { data, loading, error } = useQuery(query, {
        variables: { q: search },
    });

    const tracks = data?.search?.tracks?.items || [];
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <FontAwesome name="search" size={20} color={"#666"} />

                <TextInput
                    style={styles.input}
                    placeholder="What do you want to listen?"
                    placeholderTextColor="#aaa"
                    value={search}
                    onChangeText={setSearch}
                />
                <Text
                    style={{ color: "red", fontSize: 16 }}
                    onPress={() => setSearch("")}
                >
                    Cancel
                </Text>
            </View>
            {loading && (
                <View style={styles.container}>
                    <ActivityIndicator />
                    <Text>Loading...</Text>
                </View>
            )}

            {error && (
                <View style={styles.container}>
                    <Text>Failed to fetch the results</Text>
                </View>
            )}
            <FlatList
                data={tracks}
                renderItem={({ item }) => <TrackListItem track={item} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 12,
        paddingVertical: 6,
        borderRadius: 50,
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        marginHorizontal: 12,
        borderRadius: 4,
        color: "#666",
        padding: 12,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
