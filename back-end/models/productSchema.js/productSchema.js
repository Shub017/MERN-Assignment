import mongoose from 'mongoose';

// Define the product schema using the mongoose.Schema class
const productSchema = new mongoose.Schema({
  // The unique identifier for the product
  id: { 
    type: Number, 
    required: true, 
    unique: [true, 'Id is not unqiue']
  },
  // The title associated with the product
  title: { 
    type: String, 
    required: true 
  },
  // The price related to the product
  price: { 
    type: Number, 
    required: true 
  },
  // The description of the product
  description: {
    type: String,
    required: true   
  },
  // The category the product belongs to
  category: {
    type: String,
    required: true,
  },
  // The image URL of the product
  image: {
    type: String,
    required: true
  },
  // Boolean indicating if the product has been sold
  sold: {
    type: Boolean,
    required: true
  },
  // The date if the product was sold
  dateOfSale: {
    type: String,
    required: true
  }
});

// Export the product model based on the productSchema
const productModel = mongoose.model('product', productSchema);
export default productModel;
