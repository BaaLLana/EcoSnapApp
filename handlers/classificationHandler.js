const fs = require('fs');
const path = require('path');
const { uploadFileToStorage } = require('../services/storage');
const { classifyWaste } = require('../services/classification');


const classificationHandler = async (request, h) => {
    //handler for classification waste using machine learning
    const { file } = request.payload;
    const filePath = path.join(__dirname, 'uploads', file.hapi.filename);

    const writeStream = fs.createWriteStream(filePath);

    file.pipe(writeStream);

    writeStream.on('finish', async () => {
        try {
            const storageUrl = await uploadFileToStorage(filePath);
            const classificationResult = await classifyWaste(storageUrl);
            fs.unlinkSync(filePath); // Clean up the uploaded file
            return h.response({ classification: classificationResult }).code(200);
        } catch (error) {
            console.error(error);
            return h.response({ error: 'Failed to classify waste' }).code(500);
        }
    });

    writeStream.on('error', (err) => {
        console.error(err);
        return h.response({ error: 'Failed to upload file' }).code(500);
    });
}