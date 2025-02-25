const mqtt = require("mqtt");
const axios = require("axios");

const MQTT_BROKER = process.env.MQTT_BROKER;
const MQTT_TOPIC = "/add";
const HTTP_API_URL = "http://localhost:5000/api/tasks/fetchAllTasks";

const client = mqtt.connect(MQTT_BROKER, {
    username: process.env.MQTT_BROKER_username,
    password: process.env.MQTT_BROKER_pass,
    connectTimeout: 5000,
});

client.on("connect", () => {
    console.log(" Connected to MQTT Broker");
    client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
            console.error(" Subscription Error:", err);
        } else {
            console.log(` Subscribed to ${MQTT_TOPIC}`);
        }
    });
});

client.on("error", (err) => {
    console.error(" MQTT Connection Error:", err);
});

const publishTask = (task) => {
    client.publish(MQTT_TOPIC, task, { qos: 1 }, (error) => {
        if (error) {
            console.error(" Error publishing task:", error);
        } else {
            console.log(" Task published:", task);
        }
    });
};

const fetchTasks = async () => {
    try {
        const response = await axios.get(HTTP_API_URL);
        return response.data || [];
    } catch (error) {
        console.error(" Error fetching tasks:", error);
        return [];
    }
};

module.exports = { client, publishTask, fetchTasks };
