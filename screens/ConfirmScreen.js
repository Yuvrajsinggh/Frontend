import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function ConfirmScreen() {
    const navigation = useNavigation();
    const onConfirm = async () => {
        // if (typeof email !== 'string') {
        //   return;
        // }
        // try {
        //   const res = await authenticate({ email, emailToken: code });
        //   await updateAuthToken(res.authToken);
        // } catch (e) {
        //   Alert.alert('Error', "Email code doesn't match");
        // }
        navigation.push('Login')
      };
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style='light' backgroundColor='#000' />
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-evenly">
            {/* Title */}
            <View className="flex items-center pt-[100px]">
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                    Sign In
                </Animated.Text>
            </View>

            {/* form */}
            <View className="flex items-center m-4 space-y-4">
                <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder="Email Code" placeholderTextColor={'gray'} />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="w-full">
                    <TouchableOpacity 
                        className="w-full bg-sky-400 p-3 rounded-xl mb-3" onPress={onConfirm}>
                            <Text className="text-xl font-bold text-white text-center">Confirm</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
  )
}