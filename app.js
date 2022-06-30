const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Root route working!');
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running on port 5000');
})