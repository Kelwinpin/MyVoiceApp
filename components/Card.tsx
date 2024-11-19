import React from "react";
import { StyleSheet, View } from "react-native";

export function Card({ children, type = 'subtype' }: { children: React.ReactNode, type?: 'subtype' | 'activity' }) {
  return <View style={ type === 'subtype' ? styles.card : styles.activityCard}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#D0D0D0",
    borderWidth: 1,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#D0D0D0",
    borderWidth: 3,
  },
});