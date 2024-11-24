import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";
import { Audio } from "expo-av";

interface Activity {
  id: string;
  description: string;
  sound: string;
  image: string;
}

export default function ActivityScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const { data: activities } = useQuery<Activity[]>({
    queryKey: ["activities"],
    queryFn: async () =>
      axios
        .get(`http://myvoice-production.up.railway.app/activities/subType/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error("Erro ao buscar atividades:", err);
          return [];
        }),
  });

  const playAudio = async (audioPath: string) => {
    try {
      if (!audioPath) {
        console.error("Nenhum caminho de áudio fornecido.");
        return;
      }

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audioPath,
      });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Erro ao reproduzir o áudio:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
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
                onPress={() => playAudio(activity.sound)} // Passa o caminho do áudio
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
