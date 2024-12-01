const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'ecosnap';

const uploadFileToStorage = async (filePath, filename) => {
    await storage.bucket(bucketName).upload(filePath, {
        destination: `uploads/${filename}`,
    });
};

module.exports = { uploadFileToStorage };
