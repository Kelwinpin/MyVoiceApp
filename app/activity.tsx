import React from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/Card";

export default function ActivityScreen() {
  const { id } = useLocalSearchParams();

  const { data: activities } = useQuery({
    queryKey: ['activities'],
    queryFn: () => axios.get(`http://192.168.4.2:3000/activities/subType/${id}`).then((res) => res.data).catch((err) => err)
  });

  console.log(activities);

  return (
    <ThemedView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <ThemedView style={styles.titleContainer}>
    <View style={styles.stepContainer}>
            <ScrollView>
              {
                activities?.map(activity => {
                  return(
                    <TouchableOpacity key={`activity-${activity.id}`}>
                        <Card type="activity">
                          <Image source={{ uri: activity.image }} style={styles.image} />
                          <ThemedText type="subtitle">{activity.description}</ThemedText>
                        </Card>
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>
          </View>
    </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100%',
    backgroundColor: '#09c7e0',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginVertical: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});