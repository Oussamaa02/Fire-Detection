package ps.fireDetection.ps.services;

import org.springframework.stereotype.Service;
import ps.fireDetection.ps.dtos.SensorDataDto;
import ps.fireDetection.ps.sensor.SensorData;
@Service
public class SensorDataMapper {
    public SensorDataDto toSensorDataDto (SensorData data){
        return new SensorDataDto(
                data.getValue(),
                data.getCondition(),
                data.getTimestamp(),
                data.isAlert()
        );
    }
}
