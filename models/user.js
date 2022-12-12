const db = require('../config/config');
const bcrypt = require('bcryptjs');
//const { use } = require('express/lib/application');

const User = {}

User.findById = (id, result) => {
    const sql = `SELECT U.id,U.email,U.name,U.lastname,U.image,U.phone,U.password, 
    json_arrayagg(
    json_object(
    'id', R.id,
    'name',R.name,
    'image',R.image,
    'route',R.route
    )
    ) AS roles
        FROM users AS U
    inner join user_has_roles AS UHR 
    ON 
        UHR.id_user = U.id
    inner join roles AS R
    ON
        UHR.id_rol=R.id
     WHERE id=?
     group by
        U.id`;

    db.query(sql, [id], (err, user) => {  // aqui en vez de res puede ser user 
        if (err) {
            console.log('error', err);
            console.log('la solucion es', results[0].solution);
            result(err, null);
        }

        else {
            console.log('usuario encontrado', user);
            result(null, user);
        }
    });
}

User.findByEmail = (email, result) => {
    const sql = `SELECT U.id,U.email,U.name,U.lastname,U.image,U.phone,U.password, 
    json_arrayagg(
    json_object(
    'id', R.id,
    'name',R.name,
    'image',R.image,
    'route',R.route
    )
    ) AS roles
        FROM users AS U
    inner join user_has_roles AS UHR 
    ON 
        UHR.id_user = U.id
    inner join roles AS R
    ON
        UHR.id_rol=R.id
     WHERE email=?
     group by
        U.id`;

    db.query(sql, [email], (err, user) => {  // aqui en vez de res puede ser user 

        if (err) {
            console.log('error', err);
            //console.log('la solucion es', results[0].solution);
            result(err, null);
        }
        else {
            console.log('email encontrado', user);
            result(null, user);
        }
    });
}

User.create = async (user, result) => {

    var cel = user.cel

    //User.findCel(cel);















    //-----------------------------------------------------------

    const passwordencriptado = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at,
                estado
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query
        (
            sql,
            [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image = "./images/abc.jpg",
                // user.password,
                passwordencriptado,
                new Date(),
                new Date(),
                user.estado = "1"

            ],
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    console.log('la solusion es: ', results[0].solution);
                    result(err, null);
                }
                else {
                    console.log('Id del nuevo usuario:', res.insertId);
                    result(null, res.insertId);
                }
            }
        );

}

User.findCel=(cel,result)=>{

    const sql = 'SELECT * FROM users where phone=?';

    db.query(sql, [cel], (err, user) => {  // aqui en vez de res puede ser user 
        if (err) {
            console.log('error', err);
            console.log('la solucion es', results[0].solution);
            result(err, null);
        }
        else {
            console.log('usuario encontrado', user);
            result(null, user);
        }
    });

}

module.exports = User;