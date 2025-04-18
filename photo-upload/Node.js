const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('photo'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'Photo uploaded successfully!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
