import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const boxWidth = Dimensions.get('window').width * 0.9;
  const iconSize = 105;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Fire Detector</Text>

      <View style={[styles.box, { width: boxWidth }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Temperature</Text>
          <Text style={styles.value}>25°C</Text>
        </View>
        <Image
          source={require('@/assets/images/temp.png')}
          style={[styles.icon, { width: iconSize, height: iconSize }]}
        />
      </View>

      <View style={[styles.box, { width: boxWidth }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Condition</Text>
          <Text style={styles.value}>Normal</Text>
        </View>
        <Image
          source={require('@/assets/images/fire.png')}
          style={[styles.icon, { width: iconSize, height: iconSize }]}
        />
      </View>

      <View style={[styles.warningBox, { width: boxWidth }]}>
        <Text style={styles.warningText}>FIRE CONDITIONS DETECTED</Text>
        <Image
          source={require('@/assets/images/warning.png')}
          style={[styles.icon, { width: iconSize, height: iconSize }]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FBF0CB', 
    paddingVertical: '30%',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3F4156',
    marginBottom: 30,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,

  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3F4156',
    marginBottom: 5,
  },
  value: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#E2AE24',
  },
  icon: {
    resizeMode: 'contain',
  },
  warningBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
    padding: 20,
    borderRadius: 10,

  },
  warningText: {
    fontSize:24,
    fontWeight: '700',
    color: '#D9534F',
    flex: 1,
  },
});
