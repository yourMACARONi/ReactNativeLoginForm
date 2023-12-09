import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../Constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import Button from "../Buttons/Button";
import { Pressable } from "react-native";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email')
  .required('Enter valid email address'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Enter valid name'),
  password: Yup.string()
    .min(8)
    .required('Enter your password')
    .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, 
    'Must contain minimum 8 characters, atlease one uppercase letter, a number and special chaaracter'),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref('password')], 'Password do not match')
    .required('Re-Enter your password')

  
});


const showToast = (message = "Something went wrong") => {
  ToastAndroid.show(message, 3000);
};

async function test(credentials, navigation) {
  const response =  await fetch('http://192.168.8.162:8000/api/register', {method: 'POST', headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
  }, body: credentials
})   
  


  const data = await response.json()

  console.log(data)

  if(response.status == 200) {

       Alert.alert("User has been created", data.message)
       return (navigation.replace('Login'))
  }

  if(response.status == 404) return Alert.alert(data.message);
}


const Register = ({navigation}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

<Formik initialValues={{
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
}}
validationSchema={SignupSchema}

onSubmit={ async (values) => {
  console.log(values)
  test(JSON.stringify(values), navigation)
}}
>

{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
      <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View >

<View style={{flexDirection: 'row'}} >

  <TouchableOpacity 
  onPress={() => navigation.navigate("Welcome")}
  style={{marginTop: 20,}} >
<Ionicons name="arrow-undo" size={24} color={COLORS.black}/>

</TouchableOpacity>
   
   
  
  <Text
    style={{
      fontSize: 60,
      fontWeight: "bold",
      marginVertical: 12,
      marginHorizontal: 85,
      color: COLORS.black,
    }}
  >
    Sign Up
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
              Email address
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
               
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {touched.email && errors.email && (
                <Text style={{color:'red'}} > {errors.email}</Text>
              )}
          </View>

          <View
          style={{
            marginBottom: 1
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
              Name
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
                placeholder="Enter your name"
                placeholderTextColor={COLORS.black}
               
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                style={{
                  width: "100%",
                }}
              />
            </View>
            {touched.name && errors.name && (
                <Text style={{color:'red'}} > {errors.name}</Text>
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
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
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
                <Text style={{color:'red'}} > {errors.password}</Text>
              )}
          </View>

          <View style={{ marginBottom: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Re-Enter Password
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
                placeholder="Re-Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!passwordShown}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
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
            {touched.confirmPassword && errors.confirmPassword && (
                <Text style={{color:'red'}} > {errors.confirmPassword}</Text>
              )}
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.green : undefined}
            />
            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button onPress={handleSubmit}
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />


            <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>

          </View>
        </View>
        
     
       )}
       </Formik>
    </SafeAreaView>
  );
};

export default Register;
