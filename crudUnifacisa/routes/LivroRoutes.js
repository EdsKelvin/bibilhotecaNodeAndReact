
const router = require('express').Router()
const Livro = require('../models/LivroModels')



router.post('/', async (req, res) => {
    const { isbn, titulo, autor, editora, quant_paginas, ano_lancamento } = req.body;
  
    try {
      // Crie o livro usando o modelo Livro
      const livro = await Livro.create({
        isbn,
        titulo,
        autor,
        editora,
        quant_paginas,
        ano_lancamento,
      });
  
      res.status(201).json({ message: 'O livro foi inserido com sucesso' });
      return
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });


  router.get('/', async (req, res) => {
    try{
        const livro = await Livro.find()

        res.status(200).json(livro)
    } catch (error) {
        res.status(500).json({ error: error });
    }
  })


  router.get('/:id', async (req, res) =>{
    const id = req.params.id

    try{

        const livro = await Livro.findOne({_id: id })

        if(!livro){
            res.status(422).json({message:'O livro nao foi encontrado!'})
            return
        }


        res.status(200).json(livro)

    } catch (error) {
        res.status(500).json({ error: error });
    }
  })

//update put patch

router.patch('/:id', async(req, res) => {

    const id = req.params.id

    const { isbn, titulo, autor, editora, quant_paginas, ano_lancamento } = req.body;

    const livro = {
        isbn,
        titulo,
        autor,
        editora,
        quant_paginas,
        ano_lancamento,
    }

    try {
        const updatedLivro = await Livro.updateOne({_id: id}, livro)


        if(updatedLivro.matchedCount ===0) {
            res.status(422).json({message:'O livro nao foi encontrado!'})
            return
        }


        res.status(200).json(livro)

    }catch(error) {
        res.status(500).json({ error: error })
    }
})

//delete

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const livro = await Livro.findOne({_id: id })

    if(!livro){
        res.status(422).json({ message: 'O livro nao foi encontrado!' })
        return
    }

    try {
        
        await Livro.deleteOne({_id: id})

        res.status(200).json({ message: 'O livro foi removido!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


  module.exports = router