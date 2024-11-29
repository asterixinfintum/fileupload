const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 3033;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.get('/download', (req, res) => {
    const outputPath = path.join(__dirname, 'uploads');
    const zipFileName = 'all-files.zip';

    const archive = archiver('zip', { zlib: { level: 9 } });
    res.attachment(zipFileName);

    archive.pipe(res);

    archive.directory(outputPath, false);

    archive.finalize();

    archive.on('error', (err) => {
        res.status(500).send({ error: err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
