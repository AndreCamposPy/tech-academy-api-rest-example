import  express  from 'express';
import StatusCodes from 'http-status-codes'

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    {id: 1, name: 'Rafael Ribeiro', age: 31},
    {id: 2, name: 'Gabriel Custódio', age: 27},
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', ( request, response)  => {
    return response.send(`<h1>Trabalhando com servidor Express</h1>`);
});

app.get('/users', ( request, response) => {
    return response.send(users);
});

app.get('/users/:id', ( request, response) => {
    const userId = request.params.id;
    const user = users.find(user => {
        return (user.id === Number(userId))
    });
    return response.send(user);
});

app.post('/users', ( request, response) => {
    const newUser = request.body;
    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:id', ( request, response) => {
    const userId = request.params.id;
    const updatedUser = request.body;

    users = users.map( user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }
        return user;
    });

    return response.send(updatedUser);
})

app.delete('/users/:id', ( request, response) => {
    const userId = request.params.id;

    users = users.filter(user => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});