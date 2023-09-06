import { Router } from "express";

const routerU = Router();

routerU.get("/login", (req, res) => {
    res.render('login')
});

routerU.get("/register", (req, res) => {
    res.render('register')
});

// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
routerU.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
});

export default routerU;