import transactionRepository from "./transaction.repository.js";
import axios from "axios";
export default class transactionController{
    constructor(){
        this.transactionRepository = new transactionRepository();
    }

    getTransaction = async (req, res)=>{
        try{
            
            const searchTerm = req.query.searchTerm || '';
            const page = req.query.page || 1;
            const month = req.query.month || 3;
            
            const response = await this.transactionRepository.listTransaction(month, searchTerm, page, );
            res.status(201).json({status:'Success', msg:response})
        }
        catch(err){
            console.log('Some error occured');
            res.status(400).json('Some problem occured in getTrasaction');
        }
    }

    getTotalStats = async(req, res)=>{
        try{
            // Get months fromt the query
            const month = req.query.month || 3;
            const response = await this.transactionRepository.getStatistics(month);
            res.status(200).json({status:"Success", msg: response});
        }
        catch(err){
            res.status(400).send('Some error Occured')
        }
    }

    getBarGraphStats = async(req, res)=>{
        try{
            // Get months fromt the query
            const month = req.query.month || 3;
            const response = await this.transactionRepository.barChartMonthStats(month);
            console.log(response);
            res.status(200).json({status:"Success", msg:response});
        }catch(err){
            console.log('Error in controller');
            res.status(400).send('Some error Occurred');
        }
    }

    getPieChartStats = async(req, res)=>{
        try{
            // Get months fromt the query
            const month = req.query.month || 3;
            // Make a call on repository
            const response = await this.transactionRepository.pieChartForSelectedMonth(month);
            
            console.log(response);
            res.status(200).json({status:"Success", msg:response});
        }catch(err){
            console.log('Error in controller');
            res.status(400).send('Some error Occurred');
        }
    }

    getAllTypeStats = async(req, res)=>{
        try{
            
            const month = req.query.month || 3;
            // Mock URLs for the three APIs
            

            const api1Url = `http://localhost:3000/transaction/getStatistics?month=${month}`;
            const api2Url = `http://localhost:3000/transaction/getBarGraphStats?month=${month}`;
            const api3Url = `http://localhost:3000/transaction/getPieChartStats?month=${month}`;
            console.log('Fine till here?', api1Url);
            // Make concurrent API calls
            const [response1, response2, response3] = await Promise.all([
                axios.get(api1Url),
                axios.get(api2Url),
                axios.get(api3Url)
            ]);

            
            // Combine the responses
            const combinedData = {
                Statistics: response1.data,
                barGraph: response2.data,
                pieChart: response3.data
            };

            res.status(200).json({staus:"Success", msg:combinedData});
        }catch(err){
            console.log('Error in controller', err);
            res.status(400).send("Some error occurred")
        }
    }
}