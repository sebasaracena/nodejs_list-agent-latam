// read .env file
const dotenv = require('dotenv');
const result = dotenv.config();

// validate conetion to mongodb
if (typeof process.env.AMBIENTE == "dev") {
    process.env.urlMongo = `mongodb://localhost:27017/agent_latam`;
    console.log('renombre el archivo .env.default a .env');
    return
}

else if (process.env.AMBIENTE == "pro"){
    process.env.urlMongo = `mongodb://localhost:27017/agent_latam`;
    process.env.statecron=true;
}