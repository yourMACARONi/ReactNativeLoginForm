import { View, Text, Image, TextInput, TouchableOpacity,Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../Constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import Button from "../Buttons/Button";
import { Pressable } from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email')
  .required('Enter valid email address'),
  password: Yup.string()
    .min(8)
    .required("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Must contain minimum 8 characters, atlease one uppercase letter, a number and special chaaracter"
    ),
});

const showToast = (message = "Something went wrong") => {
  ToastAndroid.show(message, 3000);
};

async function test(credentials, navigation) {
  const response =  await fetch('http://192.168.8.162:8000/api/login', {method: 'POST', headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
  }, body: credentials
})   
  


  const data = await response.json()

  console.log(data)

  if(response.status == 200) {

       return (navigation.replace('Home'))
  }

  if(response.status == 404) return Alert.alert(data.message);
}

const Login = ({ navigation }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={ async (values) => {
          console.log(values)
          test(JSON.stringify(values), navigation)
     }}
        validationSchema={SigninSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
          isSubmitting,
        }) => (
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Welcome")}
                  style={{ marginTop: 20 }}
                >
                  <Ionicons name="arrow-undo" size={24} color={COLORS.black} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    marginVertical: 12,
                    marginHorizontal: 90,
                    color: COLORS.black,
                  }}
                >
                  Sign In
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom: 1,
              }}
            >
              <View style={{ marginBottom: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    marginVertical: 8,
                  }}
                >
                  email
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
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.black}
                    label={"email"}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={{ color: "red" }}> {errors.email}</Text>
                )}
              </View>
            </View>

            <View style={{ marginBottom: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Password
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
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={!passwordShown}
                  label={"password"}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
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
              </View>
              {touched.password && errors.password && (
                <Text style={{ color: "red" }}> {errors.password}</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 6,
                marginTop: 10,
              }}
            >
              <Checkbox
                style={{ marginRight: 8 }}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.green : undefined}
              />
              <Text style={{ fontSize: 16 }}>Remember me</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 22,
              }}
            >
              <Text style={{ fontSize: 16, color: COLORS.black }}>
                Forgot Password?
              </Text>
              <Pressable onPress={() => navigation.navigate("Recovery")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.primary,
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  Click Here
                </Text>
              </Pressable>
            </View>

            <Button
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              title="Sign In"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
            />

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginVertical: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Or Sign in with
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Pressed")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require("../assets/facebook.png")}
                    style={{
                      height: 36,
                      width: 36,
                      marginRight: 8,
                    }}
                    resizeMode="contain"
                  />

                  <Text>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log("Pressed")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require("../assets/google.png")}
                    style={{
                      height: 36,
                      width: 36,
                      marginRight: 8,
                    }}
                    resizeMode="contain"
                  />

                  <Text>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log("Pressed")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    height: 52,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginRight: 4,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require("../assets/discord.png")}
                    style={{
                      height: 36,
                      width: 36,
                      marginRight: 8,
                    }}
                    resizeMode="contain"
                  />

                  <Text>Discord</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 22,
                }}
              >
                <Text style={{ fontSize: 16, color: COLORS.black }}>
                  Don't have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.primary,
                      fontWeight: "bold",
                      marginLeft: 6,
                    }}
                  >
                    Register Here
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
