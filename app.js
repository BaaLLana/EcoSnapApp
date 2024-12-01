const Hapi = require('@hapi/hapi');
const uploadRoutes = require('./routes/uploadRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000, // Gunakan PORT dari environment atau fallback ke 3000
        host: '0.0.0.0', // Gunakan '0.0.0.0' agar bisa diakses secara publik
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
