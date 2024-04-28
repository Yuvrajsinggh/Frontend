import { View, Text, BackHandler } from 'react-native'
import React, { useEffect } from 'react'

export default function DashboardScreen() {
  useEffect(() => {
    const backAction = () => true;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Dashboard</Text>
      <Text className="text-lg text-gray-500">Coming Soon</Text>
    </View>
  )
}