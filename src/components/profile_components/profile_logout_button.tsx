import React from "react";
import { Pressable, Text, StyleSheet, View, Animated} from "react-native";

export default function ProfileLogoutButton() {
  const handleLogout = () => {
    console.log("Logout pressed");
  };

    const scale = React.useRef(new Animated.Value(1)).current;
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.93,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
    <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleLogout}
        style={{
            backgroundColor: "#66C37A",
            paddingVertical: 15,
            paddingHorizontal: 32,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 25,
            alignSelf: "center",
            width: "85%",
        }}
    >
      <Text style={styles.text}>Logout</Text>
    </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#007AFF", // solid visible color

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
   container: {    
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "#007AFF", // solid visible color
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});

