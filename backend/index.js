const mongoose= require("mongoose")

const dotenv= require("dotenv")

const PORT=process.env.PORT || 3333;

dotenv.config();

const app= require("./app");

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://utogmwael8wyb5ifddjq:9nKuh7LmCH9uCNuoOwz4@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/barquy7iq6rxmao?replicaSet=rs0')
  .then(()=>console.log("Database is connected... "))
  .catch((err)=>{
    console.log(err)
  });


const server=app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
})
