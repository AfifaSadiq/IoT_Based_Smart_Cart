#include <ESP8266WiFi.h>
#include "HX711.h"
#define BLYNK_TEMPLATE_ID "TMPL3M_2SYtky"
#define BLYNK_TEMPLATE_NAME "CartGo"
#define BLYNK_PRINT Serial
#include <Blynk.h>
#include <BlynkSimpleEsp8266.h>
#include <Wire.h>
#include <ESP8266HTTPClient.h>
#define BLYNK_PRINT Serial

const char *ssid = "TERMINATOR 8436"; // replace with your wifi ssid and wpa2 key
const char *pass = "pikapika";
char auth[] = "EbUcmAU5O55oUll9OTLZEJREe7b5IYkI"; // You should get Auth Token in the Blynk App.
const char *serverUrl = "http://192.168.137.1:3000/sendData";

WiFiClient client;
HTTPClient http;

HX711 scale(D5, D6);

int rbutton = D4; // this button will be used to reset the scale to 0.
float weight;
float calibration_factor = -109525; // for me this vlaue works just perfect 419640

void setup()
{
    Serial.begin(115200);
    pinMode(rbutton, INPUT_PULLUP);
    scale.set_scale();
    scale.tare();                            // Reset the scale to 0
    long zero_factor = scale.read_average(); // Get a baseline reading
    Blynk.begin(auth, ssid, pass);
    Wire.begin(D2, D1);
    WiFi.begin(ssid, pass);
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("Connected to Wi-Fi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}

void sendDataToServer(float weight)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        WiFiClient wifiClient;
        HTTPClient http;

        http.begin(wifiClient, serverUrl);
        http.addHeader("Content-Type", "application/json");

        // Create JSON payload with the data to be sent
        String jsonPayload = "{\"cartId\": \"12345\", \"weight\":" + String(weight) + "}";

        int httpResponseCode = http.POST(jsonPayload);

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        }
        else
        {
            Serial.print("Error on sending POST: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }
}

void loop()

{

    Blynk.run();
    scale.set_scale(calibration_factor); // Adjust to this calibration factor

    weight = scale.get_units(5);

    Blynk.virtualWrite(V3, weight);
    delay(2000);

    Serial.print("Weight: ");
    Serial.print(weight);
    Serial.println(" KG");
    Serial.println();

    sendDataToServer(weight);

    if (digitalRead(rbutton) == LOW)
    {
        scale.set_scale();
        scale.tare(); // Reset the scale to 0
    }
}