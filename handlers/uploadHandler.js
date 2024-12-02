const fs = require('fs');
const path = require('path');
const { uploadFileToStorage } = require('../services/storage');

const uploadHandler = async (request, h) => {
    try {
        const { file } = request.payload;

        if (!file) {
            return h.response({ error: 'No file provided' }).code(400);
        }
        

        const filename = `${Date.now()}-${file.hapi.filename}`;
        const tempFilePath = path.join('/tmp', filename); // Gunakan direktori `/tmp`

        // Simpan file sementara di direktori `/tmp`
        const fileStream = fs.createWriteStream(tempFilePath);
        file.pipe(fileStream);

        await new Promise((resolve, reject) => {
            file.on('end', resolve);
            file.on('error', reject);
        });

        // Upload file ke Cloud Storage
        await uploadFileToStorage(tempFilePath, filename);

        // Hapus file sementara setelah diupload
        fs.unlinkSync(tempFilePath);

        return h.response({
            message: 'File uploaded successfully',
            filename,
        }).code(200);
    } catch (error) {
        console.error('Upload error:', error);
        return h.response({ error: 'Failed to upload file' }).code(500);
    }
};

module.exports = { uploadHandler };
