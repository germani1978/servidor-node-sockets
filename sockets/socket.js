const {io} = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Metalica'));
bands.addBand( new Band('Heroes del Silencio'));
bands.addBand( new Band('Guns and Rose'));


//mensaje de sockets
io.on('connection', client =>{

    console.log('cliente conectado');    

    client.emit( 'active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log( payload );

        io.emit('emitir-mensaje', { apellido : 'herrera' } );
    });

    client.on ('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit( 'active-bands', bands.getBands() );
    });
    
    client.on ('add-band', (payload) => {
        bands.addBand( new Band(payload.name) );
        io.emit( 'active-bands', bands.getBands() );
    });

    client.on ('del-band', (payload) => {
        console.log( bands.bands.length );
        console.log(payload.id);
        bands.deleteBand(payload.id );
        console.log( bands.bands.length );
        io.emit( 'active-bands', bands.getBands());
    });
    

    // client.on('emitir-mensaje', (payload) => {
    //     client.broadcast.emit('nuevo-mensaje', payload ); 
    // });

});