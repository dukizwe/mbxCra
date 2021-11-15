import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
          settingsContent: {
                    paddingTop: 30,
          },
          header: {
                    padding: 15,
                    paddingRight: 5,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
          },
          goBack: {
                    paddingVertical: 10
          },
          headerTitle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 20
          },
          settingItem: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: 15
          },
          settingName: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                    flex: 1,
                    width: '100%',
          },
          settingTitle: {
                    fontSize: 16
          },
          settingDescription: {
                    opacity: 0.7,
          }
})

export default styles