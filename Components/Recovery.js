import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../Constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../Buttons/Button";
import { Recovery } from ".";

const Recover = ({navigation}) => {
    const [passwordShown, setPasswordShown] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View >

        <View style={{flexDirection: 'row'}} >

          <TouchableOpacity 
          onPress={() => navigation.navigate("Login")}
          style={{marginTop: 20,}} >
        <Ionicons name="arrow-undo" size={24} color={COLORS.black}/>

        </TouchableOpacity>
           
           
          
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              marginVertical: 12,
              marginHorizontal: 25,
              color: COLORS.black,
            }}
          >
            Account Recovery
          </Text>
          
        </View>

        </View>
        <Text style={{fontSize:15}} >
            To recover your account, please enter your email address.
          </Text>
        <View
          style={{
            marginBottom: 1,
          }}
        >
          <View style={{ marginBottom: 13 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Recovery Email
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          
           

            {/* <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your new password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!passwordShown}
                style={{
                  width: "100%",
                }}
              />
              <TouchableOpacity
                onPress={() => setPasswordShown(!passwordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {passwordShown == false ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View> */}
          </View>

          <Button
            onPress={() => Alert.alert("Check your email")}
            title="Submit"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          

            
          
        </View>
        
    </SafeAreaView>
  );
};

export default Recover;
