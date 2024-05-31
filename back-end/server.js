import server from "./index.js";
import { fetchDataAndSeedDatabase } from "./models/Products.js";
import { connectToMongoDB } from "./DataBase/dataBase.js";
server.listen(process.env.PORT,async ()=>{
    connectToMongoDB();
    await fetchDataAndSeedDatabase();
    console.log('Server is up and running');
})