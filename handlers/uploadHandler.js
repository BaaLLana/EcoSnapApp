const fs = require('fs');
const os = require('os');
const path = require('path');
const { uploadFileToStorage, getSignedUrl } = require('../services/storage');

const uploadHandler = async (request, h) => {
    try {
        const { file } = request.payload;

        if (!file) {
            return h.response({ error: 'No file provided' }).code(400);
        }

        // Generate a unique filename
        const filename = `${Date.now()}-${file.hapi.filename}`;
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, filename);

        // Save the file temporarily
        const fileStream = fs.createWriteStream(tempFilePath);
        file.pipe(fileStream);

        await new Promise((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });

        // Upload the file to storage
        await uploadFileToStorage(tempFilePath, filename);

        // Delete the temporary file
        fs.unlinkSync(tempFilePath);

        // Get the signed URL from storage
        const imageUrl = await getSignedUrl(filename);

        // Respond with the file details
        return h.response({
            message: 'File uploaded successfully',
            id: filename, // ID based on filename
            imageUrl, // URL to access the image
        }).code(200);
    } catch (error) {
        console.error('Upload error:', error);
        return h.response({ error: 'Failed to upload file' }).code(500);
    }
};

module.exports = { uploadHandler };






