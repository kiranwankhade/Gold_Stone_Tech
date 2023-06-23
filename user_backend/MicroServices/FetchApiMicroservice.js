// microservice 1 - Getting Data
const express = require('express');
const axios = require('axios');
const User = require('../Model/User.model');

const router = express.Router();

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://gorest.co.in/public-api/users');
    // console.log('response:', response.data)
    const users = response.data;

    const data = users.data;
    console.log('users:', data)

   

    // Store users in the User Master table in the database
    await User.insertMany(users.data);

    await User.updateMany({}, {$set:{Created_at: today.toISOString()}},{upsert: true})
    
    res.json({ message: 'Data stored in the database' });
  } catch (error) {
    console.error('Error fetching data from the API or storing data in the database', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/users',async(req,res) => {
    try{
        let user = await User.find();
        console.log('user:', user)
        res.send({"Users":user})
    }catch(err){
        console.log('err:', err)
    }
})

module.exports = router;

