import { Image, StyleSheet, Platform, StatusBar, View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/Card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function HomeScreen() {
  const queryClient = useQueryClient()

  const { data: activityTypes } = 
    useQuery(
      {
        queryKey:['activityTypes'],  
        queryFn:() => axios.get("http://192.168.4.2:3000/activityTypes/").then((res) => res.data).catch((err) => err)
      }
    );

  const { data: activitySubTypes } = 
    useQuery(
      {
        queryKey:['activitySubTypes'],  
        queryFn:(id) => axios.get(`http://192.168.4.2:3000/activitySubTypes/`).then((res) => res.data).catch((err) => err)
      }
    );    

  const filterActivityTypes = (id: number) => {
    return activitySubTypes?.filter((activitySubType: any) => activitySubType.activityTypeId === id)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <View style={styles.stepContainer}>
            <ScrollView>{activityTypes?.map((activityType: any) => (
              <View key={`type-${activityType.id}`}>
                <ThemedText type="title">{activityType.name}</ThemedText>
                <View style={styles.separator}></View>
                {filterActivityTypes(activityType.id)?.map((activitySubType: any) => (
                  <Card>
                    <Image src={activitySubType.image} style={styles.image} />
                    <ThemedText type="subtitle">
                      {activitySubType.name}
                    </ThemedText>
                  </Card>
                ))}
              </View>
            ))}</ScrollView>
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  image:{
    width: 200,
    height: 200,
  }
});
