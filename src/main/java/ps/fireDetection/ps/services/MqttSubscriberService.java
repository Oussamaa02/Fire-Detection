package ps.fireDetection.ps.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ps.fireDetection.ps.dtos.SensorDataDto;
import ps.fireDetection.ps.sensor.SensorData;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@Service
@Slf4j
public class MqttSubscriberService {
    private final SimpMessagingTemplate messagingTemplate;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final SensorDataMapper sensorDataMapper;

    private final MqttClient mqttClient;

    private final SensorDataService sensorDataService;

    @Value("${mqtt.topic.gas}")
    private String gasTopic;

    @Value("${mqtt.topic.fire}")
    private String fireTopic;

    public MqttSubscriberService(SimpMessagingTemplate messagingTemplate, SensorDataMapper sensorDataMapper, MqttClient mqttClient, SensorDataService sensorDataService) {
        this.messagingTemplate = messagingTemplate;
        this.sensorDataMapper = sensorDataMapper;
        this.mqttClient = mqttClient;
        this.sensorDataService = sensorDataService;
    }

    @PostConstruct
    public void subscribe() {
        try {
            mqttClient.subscribe(gasTopic, (topic, message) -> processGasMessage(
                    new String(message.getPayload())));

            mqttClient.subscribe(fireTopic, (topic, message) -> processFireMessage(
                    new String(message.getPayload())));

            log.info("Subscribed to MQTT topics: {}, {}", gasTopic, fireTopic);
        } catch (MqttException e) {
            log.error("Error subscribing to MQTT topics", e);
        }
    }

    private void processGasMessage(String payload) {
        try {
            log.info("Received gas sensor data: {}", payload);
            SensorDataDto gasData = parseSensorData(payload);
            // For REST API :
            //sensorDataService.updateGasData(gasData);

            // For WebSocket :
            messagingTemplate.convertAndSend("/topic/sensor.data", gasData);

        } catch (Exception e) {
            log.error("Error processing gas sensor data", e);
        }
    }

    private void processFireMessage(String payload) {
        try {
            log.info("Received fire sensor data: {}", payload);
            SensorDataDto fireData = parseSensorData(payload);
            // For REST API :
            //sensorDataService.updateFireData(fireData);

            // For WebSocket :
            messagingTemplate.convertAndSend("/topic/sensor.data", fireData);
        } catch (Exception e) {
            log.error("Error processing fire sensor data", e);
        }
    }

    private SensorDataDto parseSensorData(String payload) {


        try {
            // Parse JSON into Java object
            SensorData sensorData = objectMapper.readValue(
                    payload,
                    SensorData.class
            );

            // Validate required fields
            if (sensorData.getValue() == null) {
                throw new IllegalArgumentException("Sensor value cannot be null");
            }

            // Set timestamp if not provided
            if (sensorData.getTimestamp() == null || sensorData.getTimestamp().isEmpty()) {
                String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                sensorData.setTimestamp(currentTime);
            }

            return sensorDataMapper.toSensorDataDto(sensorData);

        } catch (Exception e) {
            log.error("Failed to parse sensor data: {}", payload, e);
            // Create a default error response or throw exception
            SensorData errorData = new SensorData();
            errorData.setValue("error");
            errorData.setCondition("parse_error");
            errorData.setAlert(true);
            String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            errorData.setTimestamp(currentTime);
            return sensorDataMapper.toSensorDataDto(errorData);
        }
    }

}