const {io} = require('../index.js')


io.on('connection', client =>{

    console.log('cliente conectado');    

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log( payload );

        io.emit('mensaje1', { apellido : 'herrera' } );
    });

});