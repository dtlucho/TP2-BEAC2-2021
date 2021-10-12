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

export { massUploadUsers, getUsers };