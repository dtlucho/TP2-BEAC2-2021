// EJERCICIO
import { getConnection } from './connection.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

const DB = "tp2";
const COLLECTION_USERS = "users";
const saltRounds = 10;

async function massUploadUsers() {
    let users = JSON.parse(fs.readFileSync('./mongo/luciano-di-tomaso/users.json', 'utf-8'));

    users.forEach(user => {
        delete user._id
        // console.log(user.name.padEnd(20), user.email.padEnd(40), user.password)
    });

    const client = await getConnection();
    console.log(client);

    let result = client.db(DB)
        .collection(COLLECTION_USERS)
        .insertMany(users);

    return result;
}

async function getUsers() {
    const client = await getConnection();
    const users = client.db(DB)
        .collection(COLLECTION_USERS)
        .find()
        .toArray();

    return users;
}

async function getUserbyEmail(email) {
    const client = await getConnection();
    const user = client.db(DB)
        .collection(COLLECTION_USERS)
        .findOne({ email: email });

    return user;
}

async function addUser(user) {
    let { password } = user;

    let hash = await bcrypt.hash(password, saltRounds);

    user.password = hash;
    const client = await getConnection();
    const result = client.db(DB)
        .collection(COLLECTION_USERS)
        .insertOne(user);

    return result;
}

async function updateUser(user) {
    const client = await getConnection();
    let db_user = await client.db(DB)
        .collection(COLLECTION_USERS)
        .findOne({ email: user.email });

    if (!db_user) {
        return 'Usuario incorrecto';
    }

    const match = await bcrypt.compare(user.password, db_user.password);
    if (!match) {
        return 'Contraseña incorrecta';
    }

    delete user.password;
    const result = client.db(DB)
        .collection(COLLECTION_USERS)
        .updateOne({ email: user.email }, {
            $set: {
                name: user.name,
            }
        });
    console.log('result');
    return result;
}

async function deleteUser(email) {
    const client = await getConnection();

    const result = client.db(DB)
        .collection(COLLECTION_USERS)
        .deleteOne({ email: email });

    return result;
}

export { massUploadUsers, getUsers, getUserbyEmail, addUser, updateUser, deleteUser };