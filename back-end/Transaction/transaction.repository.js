import productModel from "../models/productSchema.js/productSchema.js";

export default class transactionRepository{
    
    listTransaction = async (month, searchTerm='', page=1) => {
        try{
            const searchCriteria = {};
            console.log(searchCriteria);
            
            // Add condition for month 
            if (month) {
                // Construct regex pattern for the month format (e.g., "01", "02", "03")
                const monthPattern = `-${month.padStart(2, '0')}-`;
                searchCriteria.dateOfSale = { $regex: monthPattern, $options: 'i' };
            }
            // In case if searchTerm is empty we will simply not put anything in searchCriteria
            if (isNaN(Number(searchTerm))) {
                searchCriteria.$or = [
                  { description: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive regex match for description
                  { title: { $regex: searchTerm, $options: 'i' } },       // Case-insensitive regex match for title
                          // Case-insensitive regex match for price
                ];
            }

            if (!isNaN(Number(searchTerm)) && searchTerm !== '') {
                // Conversion to number didn't result in NaN
                console.log('Converted to NUmber: ', searchTerm);
                searchCriteria.price = Number(searchTerm);
            } 

            console.log(searchCriteria);

            // Perform the query
            const results = await productModel.find(searchCriteria);
            
            // Pagination logic
            const pageSize = 10; // Number of items in each page
            const startIndex = (page - 1) * pageSize; // Calculate the starting index of the page
            const endIndex = startIndex + pageSize; // Calculate the ending index of the page

            // Slice the results array to return only the documents for the current page
            const paginatedResults = results.slice(startIndex, endIndex);

            return paginatedResults;
            
            
            


        }catch(err){
            console.log(err);
        }
    }


    getStatistics = async (month)=>{
        try{
            const searchCriteria = {}
            // Add condition for month 
            if (month) {
                // Construct regex pattern for the month format (e.g., "01", "02", "03")
                const monthPattern = `-${month.padStart(2, '0')}-`;
                searchCriteria.dateOfSale = { $regex: monthPattern, $options: 'i' };
            }

            // Perform the query
            const results = await productModel.find(searchCriteria);

            // Perform the operations-:
            const { sold, unsold, totalPrice } = results.reduce((accumulator, currentValue) => {
                if (currentValue.sold) {
                    accumulator.sold += 1;
                } else {
                    accumulator.unsold += 1;
                }
                accumulator.totalPrice += currentValue.price;
                return accumulator;
            }, { sold: 0, unsold: 0, totalPrice: 0 });
            
            console.log(sold);       // Total price of sold items
            console.log(unsold);     // Total price of unsold items
            console.log(totalPrice); // Total price of all items
            return {sold, unsold, totalPrice};

        }catch(err){
            console.log(err)
        }
    }

    barChartMonthStats = async (month)=>{
        try{
            
            const searchCriteria = {}
            // Add condition for month 
            if (month) {
                // Construct regex pattern for the month format (e.g., "01", "02", "03")
                const monthPattern = `-${month.padStart(2, '0')}-`;
                searchCriteria.dateOfSale = { $regex: monthPattern, $options: 'i' };
            }

            // Perform the query
            const results = await productModel.find(searchCriteria);
            
            const obj = {'0-100':0, '900-above': 0};
            
            let i = 101
            while (i < 900){
                
                const keyStart = i;
                const keyEnd = i+99;
                const key = `${keyStart}-${keyEnd}`;
                obj[key] = 0
                i += 100
            }
            
            console.log(obj);
            
            results.forEach((data)=>{
                if (data.price < 100){
                    obj[`0-100`] += 1;
                }

                else if (data.price > 900){
                    obj[`900-above`] += 1;
                }

                
                else {
                    let i = 201;
                    while (data.price > i) {
                        i += 100;
                    }
                    let startKey = i - 100;
                    let endKey = i - 1;
                    const key = `${startKey}-${endKey}`; // Construct key dynamically
                    obj[key] += 1; // Increment count for the dynamically constructed key
                }
            })

            return obj;
        }catch(err){
            console.log('Some error occured');
        }
    }

    pieChartForSelectedMonth = async (month)=>{
        try{
            const searchCriteria = {}
            // Add condition for month 
            if (month) {
                // Construct regex pattern for the month format (e.g., "01", "02", "03")
                const monthPattern = `-${month.padStart(2, '0')}-`;
                searchCriteria.dateOfSale = { $regex: monthPattern, $options: 'i' };
            }

            // Perform the query
            const results = await productModel.find(searchCriteria);

            const ansObj = {}
            results.forEach((data)=>{
                if (data.category in ansObj){
                    ansObj[data.category] += 1
                }
                else{
                    ansObj[data.category] = 1
                }
            })


            return ansObj;
        }catch(err){
            
            console.log(err)
        }
    }
}