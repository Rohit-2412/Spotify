import { FlatList, StyleSheet } from "react-native";

import { tracks } from "../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";

export default function FavouritesScreen() {
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
