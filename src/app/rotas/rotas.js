const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
                    <html>
                        <head>
                            <title>Casa do Código</title>
                        </head>
                        <body>
                            <h1>Casa do Código</h1>
                        </body>
                    </html>`
        );
    });

    app.get('/livros', (req, res) => {
        new LivroDao(db)
            .lista()
            .then(livros => {
                res.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                );
            })
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko'), { livro: {} }
        );
    });

    app.post('/livros', (req, res) => {
        new LivroDao(db)
            .adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });


    app.put('/livros', (req, res) => {
        new LivroDao(db)
            .atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/busca', (req, res) => {
        res.marko(
            require('../views/livros/busca/busca.marko')
        );
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        new LivroDao(db)
            .remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form/:id', (req, res) => {
        const id = req.params.id;
        new LivroDao(db)
            .buscaPorId(id)
            .then(livro => {
                res.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                );
            })
            .catch(erro => console.log(erro));
    });
}

