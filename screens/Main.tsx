import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export const Main = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleSubmit() {
    if (
      formData.email === 'test@example.com' &&
      formData.password === 'password'
    ) {
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid credentials to login!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg',
      }}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <Icon name="chevron-left" size={30} color="white" />
          <Image
            style={styles.headerImage}
            source={require('../assets/FullLogo.png')}
          />
          <Text style={styles.headerText}>Help</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formFeild}>
            <TextInput
              style={styles.formInput}
              placeholder="Email or phone number"
              placeholderTextColor="grey"
              inputMode="email"
              onChangeText={text => {
                setFormData({...formData, email: text});
              }}
            />
          </View>
          <View style={styles.formFeild}>
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={text => {
                setFormData({...formData, password: text});
              }}
            />
          </View>

          <Pressable style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.formButtonText}>SIGN IN</Text>
          </Pressable>
          <Pressable style={styles.recoverBtn}>
            <Text style={styles.headerText}>Recover Password</Text>
          </Pressable>

          <Text style={styles.guideText}>
            Enter "root" as username and password as password to login!
          </Text>
        </View>
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
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formFeild: {
    width: '100%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 10,
  },
  formInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: 'white',
  },
  formButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#e50914',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  formButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recoverBtn: {
    marginVertical: 30,
    fontWeight: 'bold',
  },
  guideText: {
    color: 'grey',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default Main;
