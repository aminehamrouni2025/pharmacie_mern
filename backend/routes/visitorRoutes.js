const express = require ('express')
const { getAllPharmacies, getAllProducts } = require('../controllers/visitorControllers')
const router = express.Router()


router.get("/pharmacies", getAllPharmacies)
router.get("/products", getAllProducts);






module.exports = router