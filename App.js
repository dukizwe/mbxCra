import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';
import { store } from './src/store'
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
          const notificationListener = useRef();
          const responseListener = useRef();
          
          useEffect(() => {
                    registerForPushNotificationsAsync().then(async token => {
                              Notifications.setNotificationHandler({
                                        handleNotification: async () => {
                                                  return {
                                                            shouldShowAlert: true,
                                                            shouldPlaySound: true,
                                                            shouldSetBadge: true,
                                                  };
                                        },
                              });
                              await Notifications.cancelAllScheduledNotificationsAsync()
                              const previousSettings = await AsyncStorage.getItem('settings')
                              if(previousSettings) {
                                        const settings = JSON.parse(previousSettings)
                                        if(settings.notification) {
                                                  await Notifications.scheduleNotificationAsync({
                                                            content: {
                                                                      title: 'Complétez le CRA',
                                                                      body: settings.notificationMessage,
                                                                      sticky: true
                                                            },
                                                            trigger: {
                                                                      hour: 17,
                                                                      minute: 0,
                                                                      repeats: true,
                                                            },
                                                  })
                                        }
                              } else {
                                        await Notifications.scheduleNotificationAsync({
                                                  content: {
                                                            title: 'Complétez le CRA',
                                                            body: "C'est déjà 17h, rappelez-vous de compléter ce que vous avez réalisés aujourd'hui",
                                                            sticky: true
                                                  },
                                                  trigger: {
                                                            hour: 17,
                                                            minute: 0,
                                                            repeats: true,
                                                  },
                                        })
                              }
                    });

                    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                              // when the notification is received
                              // console.log('notification');
                    });

                    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
                              // when the notification is clicked
                              // console.log('response');
                    });

                    return () => {
                              Notifications.removeNotificationSubscription(notificationListener.current);
                              Notifications.removeNotificationSubscription(responseListener.current);
                    };
          }, []);
          
          return (
                    <Provider store={store}>
                              <NativeBaseProvider>
                                        <AppContainer />
                              </NativeBaseProvider>
                    </Provider>
          );
}