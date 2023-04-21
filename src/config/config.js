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
    process.env.urlMongo = `mongodb+srv://sebastianandresaracena:0EGmOSGKjj3ToTKS@cluster0.0jhsnlp.mongodb.net/agent_latam?retryWrites=true&w=majority`;
    process.env.statecron=true;
}