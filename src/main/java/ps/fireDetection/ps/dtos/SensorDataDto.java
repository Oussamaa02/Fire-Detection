package ps.fireDetection.ps.dtos;

public record SensorDataDto(
        String value,
        String condition,
        String timestamp,
        boolean alert
) {

    public boolean isAlert() {
        return false;
    }
}
