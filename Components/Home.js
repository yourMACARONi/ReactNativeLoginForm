import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import Button from "../Buttons/Button";

const Home = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.orange, COLORS.primary]}
    >
      <View style={{ flex: 1, alignContent: "center" }}>
        <View>
          <Image source={require("../assets/FQ.png")}></Image>
        </View>
        {/* content */}
       

          <Button
            title="Log Out"
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 70,
              width: "100",
            }}
          />

          
        </View>
      
    </LinearGradient>
  );
};

export default Home;