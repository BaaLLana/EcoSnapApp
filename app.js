const Hapi = require('@hapi/hapi');
const uploadRoutes = require('./routes/uploadRoutes');

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

    // Registrasi routes
    server.route(uploadRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
