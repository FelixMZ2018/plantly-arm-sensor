# Sturdy Pancake Sensor Hub

Sensor Hub to be deployed via Balena.io to gather data for https://github.com/FelixMZ2018/sturdy-pancake-react-server 

SOC: Raspberry Pi Zero W

Currrently supported Hardware

| Component | Sensor |
| ------------- | ------------- |
| DHT 11 | Temperature/Humidity  |
| HD38  | Soil Moisture  |
| BH1750  | Light Level  |

The soil moisture sensors are connected via and ADS1115 with each ADS supporting 4 Sensors with a total of 4 ADS supported via I2C address switching
