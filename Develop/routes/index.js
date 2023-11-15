const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<style>h1{text-align:center; font-size:xxx-large;} body{display:flex; justify-content:center; height:100vh; width:100%; align-items: center; overflow: hidden;} </style><h1>Hey there hot stuff ;)</h1>")
});

module.exports = router;