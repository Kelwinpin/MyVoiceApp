import { Image, StyleSheet, Platform, StatusBar, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/Card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
export { Link } from 'expo-router';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const queryClient = useQueryClient();

  const { data: activityTypes } = useQuery({
    queryKey: ['activityTypes'],
    queryFn: () => axios.get("https://myvoice-production.up.railway.app/activityTypes/").then((res) => res.data).catch((err) => err)
  });

  const { data: activitySubTypes } = useQuery({
    queryKey: ['activitySubTypes'],
    queryFn: () => axios.get(`https://myvoice-production.up.railway.app/activitySubTypes/`).then((res) => res.data).catch((err) => err)
  });

  const filterActivityTypes = (id: number) => {
    if (!activitySubTypes) return [];
    return activitySubTypes.filter((activitySubType: { activityTypeId: number; }) => activitySubType.activityTypeId === id);
  };

  const router = useRouter();

  const navigateToScreen = (id: number) => {
    router.push({
      pathname: '/activity',
      params: { id: id},
    });
  };
  
  return (
    <>
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ThemedView style={styles.titleContainer}>
          <View style={styles.stepContainer}>
            <ScrollView>
              {activityTypes?.map((activityType: { id: number; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <View key={`type-${activityType.id}`}>
                  <ThemedText type="title">{activityType.name}</ThemedText>
                  <View style={styles.separator}></View>
                  <View style={styles.rowContainer}>
                    {filterActivityTypes(activityType.id)?.map((activitySubType: 
                    { id: any; image: any; name: string | number | boolean | 
                      React.ReactElement<any, string | 
                      React.JSXElementConstructor<any>> | 
                      Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
                    }) => (
                      <TouchableOpacity key={`subtype-${activitySubType.id}`} onPress={() => navigateToScreen(activitySubType.id)}>
                        <Card>
                          <Image source={{ uri: activitySubType.image }} style={styles.image} />
                          <ThemedText type="subtitle">{activitySubType.name}</ThemedText>
                        </Card>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
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
    width: 100,
    height: 100,
  },
});
