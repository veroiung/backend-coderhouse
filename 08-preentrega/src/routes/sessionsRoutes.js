import { Router } from 'express';
import userModel from '../models/user.model.js';

const routerS = Router();

routerS.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    console.log("Registrando user");
    console.log(req.body);

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password // se ecripta despues
    }
    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
});

routerS.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password })//Ya que el password no está hasheado, podemos buscarlo directamente

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" })

    // damos de alta la session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

export default routerS;