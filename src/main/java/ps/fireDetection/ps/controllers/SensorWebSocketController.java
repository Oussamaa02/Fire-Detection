package ps.fireDetection.ps.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ps.fireDetection.ps.dtos.SensorDataDto;

@Controller
public class SensorWebSocketController {

    @MessageMapping("/sensor.update")
    @SendTo("/topic/sensor.data")
    public SensorDataDto sendSensorUpdate(@Payload  SensorDataDto sensorData) {
        return sensorData;
    }
}
