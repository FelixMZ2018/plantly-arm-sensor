const axios = require("axios");
var temp_sensor = require("node-dht-sensor");
var BH1750 = require("bh1750");
const ADS1115 = require("ads1115");
const i2c = require("i2c-bus");
var rpio = require("rpio");
var light = new BH1750({});
const soil_moisture_wet = 20000;
const soil_moisture_dry = 17000;

const hostname = process.env["HOSTNAME"];
const UUID = process.env['UUID'];
const NrOfSoilSensors = parseInt(process.env['SOILSENSORS']);


class SensorData {
  constructor(sensor_type, data_type, index, data) {
    this.sensor_type = sensor_type;
    this.data_type = data_type;
    this.index = index;
    this.data = data;
  }
}
const battery_level = 100 

// placeholder for battery level

const axiosInstance = axios.create({
  baseURL: hostname,
  timeout: 1000,
});

const sensor_array = [];

rpio.open(11, rpio.OUTPUT, rpio.HIGH);

console.log("hello");
temp_sensor.read(11, 4, function (err, temperature, humidity) {
  if (!err) {
    console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    temp1 = new SensorData("temperature", "digital", 1, temperature);
    humidity1 = new SensorData("humidity", "digital", 1, humidity);
    sensor_array.push(temp1, humidity1);
  }
});

light.readLight(function (err, value) {
  if (err) {
    console.log("light error: " + err);
    throw err;
  } else {
    const light = new SensorData("light", "digital", 1, value);
    sensor_array.push(light);
  }
});

i2c.openPromisified(1).then(async (bus) => {
  const ads1115 = await ADS1115(bus);
  // ads1115.gain = 1
  if (NrOfSoilSensors < 2) {
    let value = await ads1115.measure("0+GND");
    const normalized =
      ((value - soil_moisture_dry) / (soil_moisture_wet - soil_moisture_dry)) *
      1024;
    soil1 = new SensorData("soil_moisture", "analog", 1, normalized);
    sensor_array.push(soil1);
  }
  if (NrOfSoilSensors < 3) {
    let value = await ads1115.measure("1+GND");
    const normalized =
      ((value - soil_moisture_dry) / (soil_moisture_wet - soil_moisture_dry)) *
      1024;
    soil1 = new SensorData("soil_moisture", "analog", 2, normalized);
    sensor_array.push(soil1);
  }
  if (NrOfSoilSensors < 4) {
    let value = await ads1115.measure("2+GND");
    const normalized =
      ((value - soil_moisture_dry) / (soil_moisture_wet - soil_moisture_dry)) *
      1024;
    soil1 = new SensorData("soil_moisture", "analog", 3, normalized);
    sensor_array.push(soil1);
  }
  if (NrOfSoilSensors < 5) {
    let value = await ads1115.measure("3+GND");
    const normalized =
      ((value - soil_moisture_dry) / (soil_moisture_wet - soil_moisture_dry)) *
      1024;
    soil1 = new SensorData("soil_moisture", "analog", 4, normalized);
    sensor_array.push(soil1);
  }

});
rpio.open(11, rpio.OUTPUT, rpio.LOW);

setTimeout(function () {
  console.log(sensor_array.length);
  console.log(sensor_array);


  axiosInstance.post("/api/v1/sensors/data", {
    battery_level: battery_level,
    sensors: sensor_array,
  },{headers:{"Authorization":  `Bearer ${UUID}`}})
}, 2000);
rpio.exit();
