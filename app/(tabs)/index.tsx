import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { tracks } from "../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";
import Player from "../../components/Player";

export default function HomeScreen() {
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
