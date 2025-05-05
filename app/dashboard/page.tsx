"use client"
import React from 'react';
import Sidebar from '@/components/Sidebar';
import StatusCards from '@/components/StatusCards';
import Temp from '@/components/Temp';
import Alert from '@/components/Alert';
import { useEffect,useState } from 'react';
// import { sensorData } from '@/services/sensorDataService';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


export default function Dashboard() {

  const [value,setvalue]=useState("");
  const [condition,setcondition]=useState("");
  // const [timestamp,settimestamp]=useState("");
  const [alerts,setalerts]=useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/sensor.data', (message) => {
        const newData = JSON.parse(message.body);

        setvalue(newData.value);
        setcondition(newData.condition);
        // settimestamp(newData.timestamp);
        if (newData.alert) {
          setalerts(true);
        }
        else {
          setalerts(false);
        }
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);


//   useEffect(()=>{
//       let isMounted = true;
//       const controller = new AbortController();
//       const fetchSensorData = async () => {
//         try{
//         const data = await sensorData();

//         if (isMounted) {
//         setvalue(data.value);
//         setcondition(data.condition);
//         settimestamp(data.timestamp);
//         setalert(data.alert);
//         }
//         }
//         catch(err){
//           console.error("Error fetching sensor data:", err);
//         }
//       }
//       fetchSensorData();
//       return () => {
//         isMounted = false;
//         controller.abort();
//       };
// },[])

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-[#FFF9E6] to-[#F5E6B8]'>
      {/* Sidebar */}
      <Sidebar/>
      
      {/* Main Content */}
      <main className='flex-1 p-8'>
        <StatusCards condition={condition} alert={alerts}/>
        {/* Combined Temperature and Alerts Row */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          {/* Temperature Section */}
          <Temp value={value}/>
          {/* Alerts Section */}
          <Alert condition={condition}/>
        </div>
      </main>
    </div>
  );
}