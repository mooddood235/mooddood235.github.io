const port = 8000;
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/shaders', function(req, res){
    const vertexStr = fs.readFileSync('shaders/vertex.glsl', 'utf8');
    const fragmentStr = fs.readFileSync('shaders/fragment.glsl', 'utf8');
    res.json({vertexStr:vertexStr, fragmentStr:fragmentStr});
});
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});