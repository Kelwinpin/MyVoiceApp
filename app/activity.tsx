import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Audio } from "expo-av";

export default function ActivityScreen() {
  const { id } = useLocalSearchParams();
  const [sound, setSound] = useState(null);

  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () =>
      axios
        .get(`http://192.168.4.2:3000/activities/subType/${id}`)
        .then((res) => res.data)
        .catch((err) => err),
  });

  const playAudio = async () => {
    try {
      const audioPath = 'https://firebasestorage.googleapis.com/v0/b/pocs-c1c24.firebasestorage.app/o/WhatsApp-Ptt-2024-11-18-at-22.33.16.mp3?alt=media&token=ff524051-3380-481e-8b47-b32b00b39e00'
      if (!audioPath) {
        console.error("Nenhum caminho de áudio fornecido.");
        return;
      }

      // Liberar som anterior antes de carregar um novo
      if (sound) {
        await sound.unloadAsync();
      }

      // Carregar e reproduzir o som
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioPath });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Erro ao reproduzir o áudio:", error);
    }
  };

  // Liberar o som ao desmontar o componente
  React.useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ThemedView style={styles.titleContainer}>
        <View style={styles.stepContainer}>
          <ScrollView>
            {activities?.map((activity) => (
              <TouchableOpacity
                key={`activity-${activity.id}`}
                onPress={() => playAudio(activity.audioPath)} // Passa o caminho do áudio
              >
                <Card type="activity">
                  <Image source={{ uri: activity.image }} style={styles.image} />
                  <ThemedText type="subtitle">{activity.description}</ThemedText>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginLeft: 24,
    marginTop: 70,
  },
  separator: {
    height: 4,
    width: "100%",
    backgroundColor: "#09c7e0",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginVertical: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});
