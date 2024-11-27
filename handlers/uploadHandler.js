const { uploadFileToStorage } = require('../services/storage');
const fs = require('fs');
const path = require('path');

const uploadHandler = async (request, h) => {
    const data = request.payload;

    if (!data || !data.file) {
        return h.response({ error: 'File is required!' }).code(400);
    }

    const file = data.file;
    const filename = `${Date.now()}-${file.hapi.filename}`;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Simpan file sementara di server lokal
    const fileStream = fs.createWriteStream(filePath);
    file.pipe(fileStream);

    await new Promise((resolve, reject) => {
        file.on('end', resolve);
        file.on('error', reject);
    });

    try {
        // Upload file ke Cloud Storage
        await uploadFileToStorage(filePath, filename);

        // Hapus file sementara setelah diupload
        fs.unlinkSync(filePath);

        // Placeholder respons
        return h.response({
            message: 'File uploaded successfully!',
            fileName: filename,
            type: 'Plastic', // Placeholder jenis sampah
            tips: 'Reduce, Reuse, Recycle', // Placeholder tips
        }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to upload file.' }).code(500);
    }
};

module.exports = { uploadHandler };
