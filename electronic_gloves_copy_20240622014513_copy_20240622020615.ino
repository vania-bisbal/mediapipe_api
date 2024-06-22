int sensorPin = A1;    // Define the pin for sensor input
int sensorValue = 0;   // Variable to store the sensor value

int sensorPin2 = A2;    // Define the SECOND pin for sensor input
int sensorValue2 = 0;   // Variable to store the sensor value

void setup() {
  pinMode(sensorPin,INPUT);
  pinMode(sensorPin2,INPUT);
  Serial.begin(9600);    // Initialize serial communication at 9600 baud rate
}

void loop() {
  sensorValue = analogRead(sensorPin); // Read the digital value from sensorPin
  Serial.print(sensorValue);          // Print the sensor value to the Serial Monitor
  Serial.print(",");
  //digitalWrite(pinD, sensorValue);      // Optionally write this value to pinD (for example, to turn on/off a LED)
  sensorValue2 = analogRead(sensorPin2); // Read the digital value from sensorPin
  Serial.println(sensorValue2);          // Print the sensor value to the Serial Monitor
  delay(200);                           // Wait for 500 milliseconds before next read
}
