const express = require('express');// As in the server.js
const route = express.Router(); 
const services = require('../services/render'); 
const controller = require('../controller/controller'); 

// import middleware
const validateDrug = require('../middlewares/validateDrug');

// Các route hiển thị UI
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API cho CRUD operations
route.post('/api/drugs', validateDrug, controller.create);  // kiểm tra trước khi create
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', validateDrug, controller.update); // kiểm tra trước khi update
route.delete('/api/drugs/:id', controller.delete);

// Thêm route POST cho purchase
route.post('/api/purchase', controller.purchase);



module.exports = route;

