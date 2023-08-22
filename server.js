const express = require('express');

const app = express();
app.use(express.json())

const mongoose = require('mongoose');
const Product = require("./models/productModel")
const {request, response} = require("express");


// DB config
mongoose.connect("mongodb+srv://krunal:krunal18599@kdapis.8o1fioc.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected To Database")

//  Start Application
    app.listen(3000, () => {
        console.log('Your Application is running on localhost:3000')
    })

}).catch((error) => {
    console.error(error);
});

app.get('/', function (req, res) {
  res.send('Node Js CRUD Operation Demo')
})


// Get All Products List
app.get("/products", async (req, res) => {
    try{
        const product_list = await Product.find({});
        res.status(200).json({
            "Data" : product_list
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// Retrive By ID
app.get("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: `Product with ID ${id} didn't found!`})
        }
        res.status(200).json({data: product})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// CREATE
app.post("/products/", async (req, res) => {
    try{
        let product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// Update Product
app.put("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Can't find any product with ID ${id}`})
        }
        res.status(200).json({data: product})
    } catch (error){
        res.status(500).json({message: error.message});
    }
});


// Delete Product
app.delete("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `Product with ID ${id} didn't found!`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
