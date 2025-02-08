import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <WebView
        source={{
          html: `<html><body><img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fb762791877129.5e3cb3903fb67.gif" onload="setTimeout(() => window.ReactNativeWebView.postMessage('done'), 3000)" /></body></html>`,
        }}
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 3,
  },
  splashImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
});

export default SplashScreen;
