import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import Toast from 'react-native-toast-message'

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSignIn = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://13.127.120.108:7000/api/auth/send-otp/', { email, password });
            if(response.data.message == "OTP sent") {
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Success',
                    text2: 'OTP sent successfully',
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onHide: () => {
                        navigation.push('Confirm', { email: email });
                    }
                });
            }
        } catch (error) {
            if(error.response.status === 400) {
                alert('User with given email does not exist');
            } else if(error.response.status === 401) {
                alert('Password is incorrect, please enter right password');
            } else {
                alert('An error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <KeyboardAvoidingView behavior='height'>
    <View className="bg-white h-full w-full">
        <StatusBar style='light' backgroundColor='#000'/>
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-evenly ">
            {/* Title */}
            <View className="flex items-center pt-[100px]">
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                    Sign In
                </Animated.Text>
            </View>

            {/* form */}
            <View className="flex items-center mx-4 space-y-4 pt-10 pb-10">
                <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder="Email" placeholderTextColor={'gray'} value={email} onChangeText={setEmail}/>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder="password" placeholderTextColor={'gray'} secureTextEntry value={password} onChangeText={setPassword}/>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                    <TouchableOpacity 
                        className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-sky-400'} p-3 rounded-xl mb-3`} onPress={onSignIn} disabled={isLoading}>
                            <Text className="text-xl font-bold text-white text-center">{isLoading ? 'Loading...' : 'Sign In'}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}