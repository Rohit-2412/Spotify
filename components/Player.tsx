import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "../assets/data/tracks";
import { Track } from "../types";
import { usePlayerContext } from "../providers/PlayerProvider";
import { useState } from "react";

const track = tracks[0];

const Player = () => {
    const { track } = usePlayerContext();

    if (!track) {
        return null;
    }

    const image = track.album.images?.[0];

    const [liked, setLiked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && (
                    <Image source={{ uri: image.url }} style={styles.image} />
                )}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>
                        {track.artists[0]?.name}
                    </Text>
                </View>

                <Pressable onPress={() => setLiked(!liked)}>
                    <Ionicons
                        name={liked ? "heart" : "heart-outline"}
                        size={20}
                        color={liked ? "red" : "white"}
                        style={{ marginHorizontal: 10 }}
                    />
                </Pressable>
                <Ionicons
                    disabled={!track?.preview_url}
                    name={"play"}
                    size={20}
                    color={track?.preview_url ? "white" : "gray"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        top: -75,
        height: 80,
        padding: 8,
    },
    player: {
        backgroundColor: "#286660",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        padding: 6,
        paddingRight: 15,
    },
    title: {
        color: "white",
        fontSize: 16,
    },
    subtitle: {
        color: "lightgray",
        fontSize: 12,
    },
    image: {
        height: "100%",
        aspectRatio: 1,
        marginRight: 10,
        borderRadius: 5,
    },
});

export default Player;
