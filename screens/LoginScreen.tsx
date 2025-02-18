import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={{
        uri: 'https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg',
      }}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require('../assets/FullLogo.png')}
          />
          <View style={styles.headerOptions}>
            <Text style={styles.headerText}>Help</Text>
            <Text style={styles.headerText}>Privacy</Text>
          </View>
        </View>

        <View style={styles.loginMessageContainer}>
          <Text style={styles.loginHeading}>Watch on any device</Text>
          <Text style={styles.loginMessageText}>
            Stream on your phone, tablet, laptop, and TV without paying more.
          </Text>
        </View>

        <Pressable
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  headerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  headerText: {
    color: 'white',
  },
  loginMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginMessageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    width: 300,
  },
  loginButton: {
    backgroundColor: '#D23027',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHeading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    width: 300,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
