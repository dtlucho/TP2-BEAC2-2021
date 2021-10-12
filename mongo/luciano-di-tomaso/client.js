import { massUploadUsers, getUsers, getUserbyEmail, addUser, updateUser, deleteUser } from "./users.js";

// console.log(await massUploadUsers());

console.log(await getUsers());

// console.log(await getUserbyEmail('brenda_martin@fakegmail.com'));

// console.log(await addUser({ name: 'Luciano Di Tomaso', email: 'luciano.ditomaso@gmail.com', password: 'pass123' }));

// console.log(await updateUser({ name: 'Luciano Di', email: 'luciano.ditomaso@gmail.com', password: 'pass123' }));

// console.log(await deleteUser('luciano.ditomaso@gmail.com'));