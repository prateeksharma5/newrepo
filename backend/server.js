const app =require('./app')
const {connectDatabase}=require('./config/database')
require('dotenv').config({path:'backend/config/config.env'})
connectDatabase();
app.listen(3000,()=>{
    console.log(`Server running on port `)
})