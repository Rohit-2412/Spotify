import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "../assets/data/tracks";
import { Track } from "../types";
import { usePlayerContext } from "../providers/PlayerProvider";
import { useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

const Player = () => {
    const [sound, setSound] = useState<Sound>();
    const [isPlaying, setIsPlaying] = useState(false);
    const { track } = usePlayerContext();

    useEffect(() => {
        playTrack();
    }, [track]);

    useEffect(() => {
        return sound
            ? () => {
                  console.log("unloading sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    const playTrack = async () => {
        if (sound) {
            await sound.unloadAsync();
        }

        if (!track?.preview_url) {
            return;
        }

        const { sound: newSound } = await Audio.Sound.createAsync({
            uri: track.preview_url,
        });

        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await newSound.playAsync();
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        console.log(status);
        if (!status.isLoaded) return;

        setIsPlaying(status.isPlaying);
    };

    const handlePause = async () => {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    if (!track) {
        return null;
    }
    const image = track?.album.images?.[0];

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && (
                    <Image source={{ uri: image.url }} style={styles.image} />
                )}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track?.name}</Text>
                    <Text style={styles.subtitle}>
                        {track?.artists[0]?.name}
                    </Text>
                </View>

                <Ionicons
                    name={"heart"}
                    size={20}
                    color={"white"}
                    style={{ marginHorizontal: 10 }}
                />
                <Ionicons
                    disabled={!track?.preview_url}
                    name={isPlaying ? "pause" : "play"}
                    size={20}
                    color={track?.preview_url ? "white" : "gray"}
                    onPress={handlePause}
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
