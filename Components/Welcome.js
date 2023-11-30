import { View, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import Button from "../Buttons/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={[COLORS.grey, COLORS.black]}
    >
      {/* content */}
      <View
        style={{
          paddingHorizontal: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40, // Updated font size
            fontWeight: "bold", // Updated font weight
            color: COLORS.primary, // Updated text color
            marginBottom: 10, // Added margin bottom for spacing
          }}
        >
          Let's Get
        </Text>
        <Text
          style={{
            fontSize: 40, // Updated font size
            fontWeight: "bold", // Updated font weight
            color: COLORS.primary, // Updated text color
            marginBottom: 20, // Added more margin bottom for spacing
          }}
        >
          Started
        </Text>

        <View>
          <Text
            style={{
              fontSize: 18, // Updated font size
              color: COLORS.white, // Updated text color
              textAlign: "center", // Centered text
              marginBottom: 20, // Added margin bottom for spacing
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        <Button
          title="Join Now"
          onPress={() => navigation.navigate("Register")}
          style={{
            marginTop: 40,
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18, // Updated font size
              color: COLORS.white, // Updated text color
              marginRight: 5, // Added margin right for spacing
            }}
          >
            Already have an Account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 17, // Updated font size
                color: COLORS.green, // Updated text color
                fontWeight: "bold", // Updated font weight
              }}
            >
              Login Here!
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;