const Hapi = require('@hapi/hapi');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

// Inisialisasi Google Cloud Storage
const storage = new Storage();
const bucketName = 'ecosnap-uploads';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Aktifkan CORS
            },
        },
    });

    // Route untuk mengunggah gambar
    server.route({
        method: 'POST',
        path: '/upload',
        options: {
            payload: {
                maxBytes: 10 * 1024 * 1024, // Maksimal ukuran file 10MB
                output: 'stream',
                parse: true,
                multipart: true,
            },
        },
        handler: async (request, h) => {
            const { file } = request.payload;

            if (!file) {
                return h.response({ error: 'File is required!' }).code(400);
            }

            const filename = `${Date.now()}-${file.hapi.filename}`;
            const filePath = path.join(__dirname, 'uploads', filename);

            // Simpan file sementara di server lokal
            const fileStream = fs.createWriteStream(filePath);
            file.pipe(fileStream);

            await new Promise((resolve, reject) => {
                file.on('end', resolve);
                file.on('error', reject);
            });

            try {
                // Upload file ke Cloud Storage
                await storage.bucket(bucketName).upload(filePath, {
                    destination: `uploads/${filename}`,
                });

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
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
