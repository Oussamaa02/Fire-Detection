package ps.fireDetection.ps.sensor;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SensorData {
    @JsonProperty("value") // Explicit JSON mapping
    private String value;

    @JsonProperty("condition")
    private String condition;

    @JsonProperty("timestamp")
    private String timestamp;

    @JsonProperty("alert")
    private boolean alert;

    // Add validation
    public boolean isValid() {
        return value != null && !value.isEmpty();
    }
}