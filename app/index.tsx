import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Client } from 'paho-mqtt';


const Home = () => {
  const boxWidth = Dimensions.get('window').width * 0.9;
  const iconSize = 105;
  const [gasValue, setGasValue] = useState<number>(0);
  const [condition, setCondition] = useState<string>('Normal');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    // Create a Paho MQTT client
    const client = new Client(
      '43180b33bfd6466fa52d432b8081ed0b.s1.eu.hivemq.cloud', // Broker address
      Number(8884), // Port number
      'react-native-client-' + Math.random().toString(16).substr(2, 8) // Client ID
    );

    // Set connection options
    client.onConnectionLost = (responseObject: { errorCode: number; errorMessage: string }) => {
      console.error('Connection lost:', responseObject.errorMessage);
    };


    client.onMessageArrived = (message: any) => {
      console.log('Received message:', message.payloadString); // Debug log
    
      // Correct regex to capture the full number after "MQ5 Sensor Value:"
      const match = message.payloadString.match(/MQ5 Sensor Value:\s*(\d+)/); // Look for "MQ5 Sensor Value: <number>"
      const value = match ? parseInt(match[1], 10) : NaN;
    
      console.log('Parsed value:', value); // Debug log
    
      if (!isNaN(value)) {
        setGasValue(value);
    
        if (value > 1000) {
          setCondition('Fire');
          setShowWarning(true);
        } else if (value >= 100 && value <= 1000) {
          setCondition('Hot');
          setShowWarning(false);
        } else {
          setCondition('Normal');
          setShowWarning(false);
        }
      } else {
        console.error('Failed to parse gas value:', message.payloadString);
      }
    };

    

    // Connect to the broker
    client.connect({
      onSuccess: () => {
        console.log('Connected to MQTT broker');
        client.subscribe('sensor/mq5');
      },
      useSSL: true,
      userName: 'projetSemestriel',
      password: 'Projetsemestriel1',
    });

    // Cleanup on component unmount
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);


  const getConditionColor = () => {
    switch (condition) {
      case 'Normal':
        return '#37A2E4'; // Current color
      case 'Hot':
        return '#E2AE24'; // Dark orange
      case 'Fire':
        return '#D9534F'; // Red
      default:
        return '#37A2E4'; // Default to 'Normal' color
    }
  };

  const getConditionIcon = () => {
    const iconMap: { [key: string]: any } = {
      Normal: require('@/assets/images/normal.png'),
      Hot: require('@/assets/images/hot.png'),
      Fire: require('@/assets/images/fire.png'),
    };
  
    return iconMap[condition] || iconMap['Normal']; 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Fire Detector</Text>

      <View style={[styles.box, { width: boxWidth }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Niveau de Gaz</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.value, { color: '#E2AE24' }]}>{gasValue}</Text>
          <Text style={{fontSize: 35,fontWeight: 'bold',color: '#E2AE24'}}> ppm</Text>
          </View>

        </View>
        <Image
          source={require('@/assets/images/gas.png')}
          style={[styles.icon, { width: iconSize, height: iconSize }]}
        />
      </View>

      <View style={[styles.box, { width: boxWidth }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Condition</Text>
          <Text style={[styles.value, { color: getConditionColor() }]}>{condition}</Text>
        </View>
        <Image
        source={getConditionIcon()}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
        />
      </View>

      <View style={[styles.warningBox, { width: boxWidth }]}>
      {showWarning && (
  <View style={styles.warningBox}>
    <Text style={styles.warningText}>FIRE CONDITIONS DETECTED</Text>
    <Image
      source={require('@/assets/images/warning.png')}
      style={[styles.icon, { width: iconSize, height: iconSize }]}
    />
  </View>
)}

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