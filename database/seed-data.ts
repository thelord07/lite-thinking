import bcrypt from 'bcryptjs';

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}

interface SeedData {
    users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Joys Florez',
            email: 'joys@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Invitado',
            email: 'guest@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'guest'
        },
    ]
}