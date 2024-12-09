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
        method: 'GET',
        path: '/form',
        handler: (request, h) => {
            return h.response(`
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="file" />
                    <button type="submit">Upload</button>
                </form>
            `).code(200);
        },
    },
    {
        method: 'GET',
        path: '/api/hello',
        handler: (request, h) => {
            return { message: 'Hello from App Engine!' };
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
