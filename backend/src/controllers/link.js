const express = require('express');

const { Link } = require('../models');

const router = express.Router();

/* List links */
router.get('/', async (req, res) => {
    const { accountId } = req;
    const links = await Link.findAll({where: {accountId}});


    return res.jsonOK(links);
});

/* Get a link by Id */
router.get('/:id', async (req, res) =>{
    const { accountId } = req;
    const { id }  = req.params;
    
    const link = await Link.findOne({where: {id, accountId}}) //nesse where por ser a variavel e o campo com o mesmo nome (id:id) pode deixar apenas 1 de cada
    if(!link) return res.jsonNotFound();

    return res.jsonOK(link);
});

/* Create a link */
router.post('/', async (req, res) => {
    const { accountId , body } = req; // com a implementação do middleware de token essa variável terá o valor recebido de (req.id)
    const {label, url, isSocial} = body;
    console.log(req.id);
    const image = 'https://google.com/image.jpg';

    const link = await Link.create({ label, url, isSocial, image, accountId })

    return res.jsonOK(link);
});

/* Update a link */
router.put('/:id', async (req, res) =>{
    const { accountId , body } = req; // com a implementação do middleware de token essa variável terá o valor recebido de (req.id → foreignKey = accountId)
    const { id }  = req.params; //para pegar o (:id) da requisição (id da table link)
    //const { body } = req; por não estar utilizando as váriaveis {label, url, isSocial}, renomeio elas para ficar menos poluido

    const fields = ['label', 'url', 'isSocial']; //campos que irei/posso alterar

    const link = await Link.findOne({where: {id, accountId}}) //nesse where por ser a variavel e o campo com o mesmo nome (id:id) pode deixar apenas 1 de cada
    if(!link)   return res.jsonNotFound();

    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue != undefined) link[fieldName] = newValue;
    });

    await link.save();

    return res.jsonOK(link);

});

/* Delete a link by Id*/
router.delete('/:id', async (req, res) =>{
    const { accountId } = req;
    const { id }  = req.params;
    const link = await Link.findOne({where: {id, accountId}})
    if(!link) return res.jsonNotFound();

    await link.destroy();

    return res.jsonOK(link);
});

module.exports = router;