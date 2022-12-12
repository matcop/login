const db = require('../config/config');

const Rol = {};
Rol.create = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)
    `;

    db.query(sql, [id_user, id_rol, new Date(), new Date()], (err, res) => {  // aqui en vez de res puede ser user 
        if (err) {
            console.log('error', res);
            //console.log('la solucion es', results[0].solution);
            result(err, null);
        }
        else {
            console.log('usuario con ROL registrado', res.insertId);
            result(null, res.insertId);
        }
    });



}
module.exports = Rol