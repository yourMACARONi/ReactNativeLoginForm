import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../Constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
      <LinearGradient style = {{
        flex:1
    }}
    colors={[COLORS.secondary, COLORS.primary]}
    >
        <View style={{flex: 1, marginHorizontal: 22}}>

          <View>
          <Text style={{
              fontSize:50,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black
            }} >Sign Up</Text>
            
            <Text style={{
              fontSize:20,
              color: COLORS.black
            }} >Do your Best TODAY!</Text>
          </View>
            <View style={{
              marginBottom:12
            }} >
              <Text style={{
                fontSize:16,
                fontWeight: 400,
                marginVertical: 8,
                marginTop: 50
              }} >Email</Text>

            </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Register