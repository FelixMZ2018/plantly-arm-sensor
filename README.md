# Sturdy Pancake Sensor Hub
Sensor Hub to be deployed via Balena.io to gather data for https://github.com/FelixMZ2018/sturdy-pancake-react-server 

## Version 3

- Same as version 2 but with a ESP32 based SOC for extra GPIO pins

## Version 2

Design Goal
- Custom designed PCB
- Support for Raspberry Pi Zero and NodeMCU SOC on the same board
- Support for resistive and capacitive soil moisture sensors
- Interface ready for resisitve probes without the need for additional A/D converters
- 3.3V / 5V Selection via jumper
- 8/16 Soil moisture sensors
- 1 Temperature/Humidity (DHT11)
- 1 Light Sensor (BH-1750 via (I2C Interface))
- A/D conversion and channel switching via 2 x MCP-3008 (SPI)
- All components are available as pass through for easy assembly
- Gerber files are available for download once tested


## Version 1 

SOC: Raspberry Pi Zero W

Currrently supported Hardware

| Component | Sensor |
| ------------- | ------------- |
| DHT 11 | Temperature/Humidity  |
| HD38  | Soil Moisture  |
| BH1750  | Light Level  |

The soil moisture sensors are connected via and ADS1115 with each ADS supporting 4 Sensors with a total of 4 ADS supported via I2C address switching

