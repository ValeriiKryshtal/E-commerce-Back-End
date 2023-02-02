const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
     // find all categories with its associated Products
     Category.findAll({
          include: {
               model: Product,
               attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }})
          .then(data=>{res.json(data)});
});
     
router.get('/:id', (req, res) => {
     // find one category by its `id` value with its associated Products
     Category.findOne({where: {id: req.params.id}, include: {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
     }}).then(data=>{res.json(data)});
});

router.post('/', (req, res) => {
     Category.create({
          category_name: req.body.category_name
     }).then(data=>res.json(data))
  // create a new category
});

router.put('/:id', (req, res) => {
     // update a category by its `id` value
     Category.update(req.body, {
          where: {
               id: req.params.id
          }}
     ).then(data=>res.json(data))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
     Category.destroy({where: {id: req.params.id}}).then(data=>{res.json(data)})
});

module.exports = router;
