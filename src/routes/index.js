const { Router } = require("express");
const router = Router();

router.get('/api', (req, res) => {
  res.json({"Title":"I'm mike-506"})
  console.log('Hello Mike! Excellent C:!');
})

router.get('/api/test', (req, res) => {
  const data = {
    "name": "Mike",
    "email": "mike@mail.com"
  }
  res.json(data)
  console.log('Hello Mike! Excellent C:!');
})

module.exports = router;