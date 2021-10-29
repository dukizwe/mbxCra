import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState }  from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import UserNavigator from './routes/UserNavigator'
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { setUserAction } from "./store/actions/userActions";
import { userSelector } from "./store/selectors/userSelector";

const Stack = createNativeStackNavigator()

export default function AppContainer() {
          const dispatch = useDispatch()
          const [userLoading, setUserLoading] = useState(true)
          useEffect(() => {
                    (async function() {
                              const user = await AsyncStorage.getItem('user')
                              // await AsyncStorage.removeItem('user')
                              dispatch(setUserAction(JSON.parse(user)))
                              setUserLoading(false)
                    })()
          }, [dispatch])
          const user = useSelector(userSelector)
          return (
                    userLoading ? <ActivityIndicator color="#007BFF" animating={userLoading} /> :
                    <NavigationContainer>
                              {user ?
                                        <UserNavigator />
                              :
                              <>
                              <Stack.Navigator>
                                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}}/>
                                        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '', headerShadowVisible: false, headerStyle: {backgroundColor: '#F2F5FE'}}} />
                              </Stack.Navigator>
                              </>}
                    </NavigationContainer>
          )
}