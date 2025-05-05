package ps.fireDetection.ps.services;

import org.springframework.stereotype.Service;
import ps.fireDetection.ps.dtos.SensorDataDto;

import java.util.concurrent.atomic.AtomicReference;

@Service
public class SensorDataService {
    private final AtomicReference<SensorDataDto> latestGasData = new AtomicReference<SensorDataDto>();
    private final AtomicReference<SensorDataDto> latestFireData = new AtomicReference<SensorDataDto>();

      public void updateGasData(SensorDataDto data) {
        latestGasData.set(data);
    }

     public void updateFireData(SensorDataDto data) {
        latestFireData.set(data);
    }

     public SensorDataDto getLatestGasData() {
        return latestGasData.get();
    }

     public SensorDataDto getLatestFireData() {
        return latestFireData.get();
    }
}


