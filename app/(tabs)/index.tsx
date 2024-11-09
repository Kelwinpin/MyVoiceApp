import { Image, StyleSheet, Platform, StatusBar, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/Card';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ThemedView style={styles.titleContainer}>
        <View style={styles.stepContainer}>
          <ThemedText type="title">Dia a dia</ThemedText>
          <View style={styles.separator}></View>
          <Card>
            <Image src={"https://i.ibb.co/QPq7SSw/diaadia.webp"} style={styles.image} />
            <ThemedText type="subtitle">
              
            </ThemedText>
          </Card>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
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
