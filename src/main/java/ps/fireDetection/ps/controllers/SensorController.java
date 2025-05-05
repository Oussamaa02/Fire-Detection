package ps.fireDetection.ps.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.fireDetection.ps.dtos.AlertsResponse;
import ps.fireDetection.ps.dtos.SensorDataDto;
import ps.fireDetection.ps.services.SensorDataService;

@RestController
@RequestMapping("/api/sensor")
@RequiredArgsConstructor
public class SensorController {

    private final SensorDataService sensorDataService;

    @GetMapping("/gas")
    public ResponseEntity<SensorDataDto> getLatestGasData() {
        SensorDataDto data = sensorDataService.getLatestGasData();
        if (data == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(data);
    }

    @GetMapping("/fire")
    public ResponseEntity<SensorDataDto> getLatestFireData() {
        SensorDataDto data = sensorDataService.getLatestFireData();
        if (data == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(data);
    }

    @GetMapping("/alerts")
    public ResponseEntity<AlertsResponse> getAlerts() {
        SensorDataDto gasData = sensorDataService.getLatestGasData();
        SensorDataDto fireData = sensorDataService.getLatestFireData();

        AlertsResponse response = new AlertsResponse();
        response.setGasAlert(gasData != null && gasData.isAlert());
        response.setFireAlert(fireData != null && fireData.isAlert());

        return ResponseEntity.ok(response);
    }
}

