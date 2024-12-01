const { uploadHandler } = require('../handlers/uploadHandler');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response({ message: 'Server berjalan!' }).code(200);
        },
    },
    {
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
        handler: uploadHandler,
    },
    {
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
          return h.response('OK').code(200);  // Memberikan status 200 OK
        }
      }
    
];
