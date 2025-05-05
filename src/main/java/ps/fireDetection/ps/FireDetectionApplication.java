package ps.fireDetection.ps;

import org.springframework.beans.factory.annotation.Value;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;

@SpringBootApplication
public class FireDetectionApplication {

	public static void main(String[] args) {
		SpringApplication.run(FireDetectionApplication.class, args);
	}

}
