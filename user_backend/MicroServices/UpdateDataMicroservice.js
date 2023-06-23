// microservice-3 update data
const express = require('express');
const User = require('../Model/User.model');

const router = express.Router();

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id:', id)
  const updatedData = req.body;
  console.log('updatedData:',updatedData)

  try {
    const query=await  User.findByIdAndUpdate({_id:id}, updatedData);
    console.log('query:', query)
    res.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
