var express = require('express');
var router = express.Router();

var ProductCont = require('../controller/productCont');

router.get('/', ProductCont.getProduct);



router.post('/', ProductCont.postProduct);


router.delete('/:SKU', ProductCont.deleteProduct);


router.post('/getparam', ProductCont.getParameter);



router.post('/updateproduct', ProductCont.updateProduct)


module.exports = router;

