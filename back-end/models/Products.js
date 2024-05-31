import axios from "axios";
import mongoose from "mongoose";
import productModel from "./productSchema.js/productSchema.js";

export const fetchDataAndSeedDatabase = async ()=>{
    try{
        // Use axios to get data in json format
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const data = response.data;

        // Seed data
        const products = data.map(entry=>
            ({
                id:entry.id,
                title:entry.title,
                price:entry.price,
                description:entry.description,
                category:entry.category,
                image:entry.image,
                sold:Boolean(entry.sold),
                dateOfSale:entry.dateOfSale
            })
        )

        
        
        // For better handling of the error if data is already present 
        try {
            await productModel.insertMany(products);
            console.log('Database initialized with seed data');
          } catch (error) {
            if (error.code === 11000) {
              console.error('Duplicate key error:');
              // Handle duplicate key error
            } else {
              console.error('Error inserting documents:');
              // Handle other errors
            }
          }
    }
    catch (error) {
        console.error('Error fetching data and seeding database');
    }
}

