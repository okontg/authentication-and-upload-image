const mongoose = require('mongoose');

const CONNECT_TO_DB = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongose connected successfully!')
  }
  catch(err){
    console.log('failed to connect to mongoose', err);
    process.exit(1)
  }
}

module.exports = CONNECT_TO_DB;