const express = require('express')
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const { getProducts, getProduct, getPharmacies, getPharmacy } = require('../controllers/clientRoutes');
const router = express.Router()

router.get('/products' , verifyToken , checkRole('client') , getProducts)
router.get("/product/:id", verifyToken, checkRole("client"), getProduct);
router.get("/pharmacies", verifyToken, checkRole("client"), getPharmacies);
router.get("/pharmacy/:id", verifyToken, checkRole("client"), getPharmacy);






module.exports = router 