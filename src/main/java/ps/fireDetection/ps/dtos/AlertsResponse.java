package ps.fireDetection.ps.dtos;

import lombok.Data;

@Data
public class AlertsResponse {
    private boolean gasAlert;
    private boolean fireAlert;
}
