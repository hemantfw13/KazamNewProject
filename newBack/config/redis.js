const redis = require('redis');

const REDIS_URI =  process.env.REDIS_URI; 

const redisClient = redis.createClient({
    url: REDIS_URI,
    socket: {
        reconnectStrategy: 5, 
    },
});

redisClient.on('connect', () => {
    console.log(" Connected to Redis");
});

redisClient.on('error', (err) => {
    console.error(` Redis Connection Error: ${err.message}`);
    console.error(` Possible Issue: Wrong hostname, network issue, or Redis server down`);
});

(async () => {
    try {
        await redisClient.connect();
        console.log("🔗 Redis connection established!");
    } catch (err) {
        console.error(" Redis Connection Failed:", err.message);
    }
})();

module.exports = redisClient;
