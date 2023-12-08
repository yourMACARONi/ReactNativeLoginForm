import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
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
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Enter valid username"),
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

const handleLogin = async (values) => {
  try {
    console.debug(values);

    const url = "url link here";
    const result = await fetchServices.postData(url, values);
    if (result.message != null) {
      showToast(result?.message);
    } else {
      navigation.navigate("Home");
    }
  } catch (e) {
    console.debug(e.toString());
  }
};

const Login = ({ navigation }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await handleLogin(values);
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
                  Username
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
                    placeholder="Enter your username"
                    placeholderTextColor={COLORS.black}
                    label={"username"}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={() => setFieldTouched("username")}
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={{ color: "red" }}> {errors.username}</Text>
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
              onPress={handleLogin}
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
