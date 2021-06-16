const Produtos = require('../models/produtos');
const status = require('http-status');
 
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const qtdEstoque = req.body.qtdEstoque;
    const ativo = req.body.ativo;
 
    Produtos.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        qtdEstoque: qtdEstoque,
        ativo: ativo
    })
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Produtos.findAll()
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const qtdEstoque = req.body.qtdEstoque;
    const ativo = req.body.ativo;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.update({
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    ativo: ativo,
                    qtdEstoque: qtdEstoque
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
