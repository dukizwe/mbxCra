import moment from "moment"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

/**
 * fetch data from api wiht default options
 * @param {string} url - the url to fetch to
 * @param {object} options - additional options
 * @returns {Promise}
 */
export const fetchApi = async (url, options = {}) => {
          // const user = JSON.parse(localStorage.getItem('user'))
          const user = null
          const isProduction = false
          const domain = isProduction ? 'http://app.mediabox.bi:3140' : 'http://192.168.43.235:8080'
          if (user) options = { ...options, headers: { ...options.headers, authorization: `bearer ${user.token}` } }
          const response = await fetch(domain+url, {
                    ...options
          })
          if (response.ok) {
                    return response.json()
          } else {
                    throw await response.json()
          }
}

export const randomInt = (min, max, exclude) => {
          let number = Math.round(Math.random() * (max - min) + min)
          while(number == exclude) {
                    number = Math.round(Math.random() * (max - min) + min)
          }
          return number
}

export const MyFromNow = (fromDate) => {
          const date = new Date(fromDate)
/*           console.log(date.getDate(), (new Date()).getDate())
          if(date.getDate()+1 < (new Date()).getDate()) {
                    // return moment(date).format("MMM Do YY");
          } */
          return moment(date).format("Do MMM YY");
}

export async function registerForPushNotificationsAsync() {
          let token;
          if (Constants.isDevice) {
                    const { status: existingStatus } = await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                              const { status } = await Notifications.requestPermissionsAsync();
                              finalStatus = status;
                    }
                    if (finalStatus !== 'granted') {
                              alert('Failed to get push token for push notification!');
                              return;
                    }
                    token = (await Notifications.getExpoPushTokenAsync()).data;
                    console.log(token);
          } else {
                    alert('Must use physical device for Push Notifications');
          }

          if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                              name: 'default',
                              importance: Notifications.AndroidImportance.MAX,
                              vibrationPattern: [0, 250, 250, 250],
                              lightColor: '#FF231F7C',
                    });
          }

          return token;
}