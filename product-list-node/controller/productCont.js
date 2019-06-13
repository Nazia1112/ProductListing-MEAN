var Product = require('../models/product');

module.exports.getProduct = function (req, res, next) {
  console.log("puppy")
    Product.find({}).
        then((formdata) => {
            res.statusCode = 200;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(formdata);
        }, (err) => next(err));
};

module.exports.postProduct = (req, res, next) => {
    console.log(req.body);
    Product.create(req.body).
        then((products) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log("products : " + products);
            res.json(products);
        }, err => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ msg: err });
        });
}

module.exports.deleteProduct = function (req, res) {

    console.log(req.params.SKU);
    Product.deleteOne({"SKU":req.params.SKU}).
        then((status) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return Product.find({})
        })
        .then((docs) => {
            res.json({ deleted : true, data : docs });
        })
        .catch((err) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ msg: err });
        })
} 

module.exports.getParameter = function(req, res)
{
    console.log(req.body);
    Product.findOne(req.body,(err,data)=> {
        if(err)
        {
            res.send(err);
        }
        else{
            res.json(data);
        }
    })
}


module.exports.updateProduct = function(req, res)
{
    Product.findOneAndUpdate({"SKU":req.body.SKU},req.body,(err,data)=>
    {
        if(err)
        {
            res.json({"status": 404,msg: {str1:'Failed to Delete Product.', str2: ''}});
        }
        else{
            res.json({"status": 200, msg: {
                str1: 'Successfully Updated Product',
                str2: ''
                }});
        }
    })
}