import { View, Text, Image } from "react-native";
import React from "react";
import { Track } from "../types";
import { StyleSheet } from "react-native";

type TrackListItemProps = {
    track: Track;
};

export default function TrackListItem({ track }: TrackListItemProps) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: track?.album?.images[0]?.url }}
            />
            <View
                style={{
                    flex: 1,
                }}
            >
                <Text style={styles.title}>{track.name}</Text>
                <Text style={styles.subtitle}>{track?.artists[0]?.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 6,
        padding: 6,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        width: "100%",
        paddingHorizontal: 8,
    },
    image: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 6,
    },
    title: {
        fontWeight: "500",
        fontSize: 18,
    },
    subtitle: {
        color: "#666",
    },
});
