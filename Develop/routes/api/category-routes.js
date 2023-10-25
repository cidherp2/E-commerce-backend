const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {
  const getCategories = await Category.findAll({
    include:[{model:Product}],
  })
  res.send(getCategories);
} catch (err) {
  res.send("An error ocurred " + err)
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const getCategoryById = await Category.findOne({
      include:[{model:Product}],
      where: {
        id: req.params.id
      },
    });
    res.send(getCategoryById)
  } catch (err) {
    res.send('There was an error ' + err)
  }
  // be sure to include its associated Products
});

router.post('/',async  (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      id: req.body.id,
      category_name:req.body.category_name,
    })
    res.send('Category created \n' + createCategory)
  } catch (err){
res.send("There was an error" + err);
  }
  
});

router.put('/:id', async  (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
