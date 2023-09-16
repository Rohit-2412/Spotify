import { FlatList, StyleSheet, TextInput } from "react-native";

import { tracks } from "../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchScreen() {
    const [search, setSearch] = useState("");
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
    container: {},
});
