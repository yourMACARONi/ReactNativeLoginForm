import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import Button from "../Buttons/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.orange, COLORS.primary]}
    >
      <View style={{ flex: 1, alignContent: "center" }}>
        <View>
          <Image source={require("../assets/Logo.jpg")}></Image>
        </View>
        {/* content */}
        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 240,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.black,
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 800,
              color: COLORS.black,
            }}
          >
            Started
          </Text>

          <View>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                textAlign: "justify",
                top: 10,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 70,
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
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Already have an Account?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login Here!
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
