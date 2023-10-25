const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll ({
    include: [{model:Product, through: ProductTag}],
  })
  .then((tags) => {
    res.json(tags)
  })
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findOne({
      include: [{model:Product, through: ProductTag}],
      where: {
        id: req.params.id,
      }
    });
    res.send(tags)
  } catch (err){
    res.send(err)
  }
  // be sure to include its associated Product data
});



router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
        id: req.body.id,
        tag_name: req.body.tag_name,
    });
    res.send(createTag);
  } catch (err){ 
    res.send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({tag_name:req.body.tag_name},{
      where: {
        id: req.params.id,
      }
      
    })

    if (!updateTag) {
      res.send("No tag with that id")
    }
    res.send(updateTag+' Tag updated')
   } catch (err) {
    res.send(err + " There was an error with the request")
   }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })

.then((deletedTag)=> {
  res.send(deletedTag + "Deleted");
})
.catch((err) =>{
  res.send(err);
})
});

module.exports = router;
