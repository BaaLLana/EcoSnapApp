const { Storage } = require('@google-cloud/storage');

// Inisialisasi Storage dengan kredensial secara eksplisit
const storage = new Storage({
    keyFilename: './service-account.json',
});

const bucketName = 'ecosnap';

// Fungsi upload file ke bucket
const uploadFileToStorage = async (filePath, filename) => {
    await storage.bucket(bucketName).upload(filePath, {
        destination: `uploads/${filename}`,
    });
};

// Fungsi untuk mendapatkan Signed URL
const getSignedUrl = async (filename) => {
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 menit
    };

    const [url] = await storage.bucket(bucketName).file(`uploads/${filename}`).getSignedUrl(options);
    return url;
};

module.exports = { uploadFileToStorage, getSignedUrl };
