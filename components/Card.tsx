import { StyleSheet, TouchableOpacity } from "react-native";

export function Card({ children }: { children: React.ReactNode }) {
  return <TouchableOpacity style={styles.card}>{children}</TouchableOpacity>;
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
});