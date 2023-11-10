require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('./models/user')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json());

app.get("/user/:id", async (req, res) => {
  const id = req.params.id

  const user = await User.findbyId(id, '-password')

  if(!user) {
      return res.status(404).json({message: "Usuário não encontrado"})
  }

  res.status(200).json({user})
})

function checkToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
      return res.status(401).json({message: "Acesso negado"})
  }

  try {
      const secret = "JFSEJFSLLkfsfks9420fk3022fjf209r"

      jwt.verify(token, secret)

      next()
  } catch (error) {
      res.status(400).json({message: 'Token inválido'})
  }
}
app.post('/auth/register', async (req, res) => {
  const {user_name, email, password, confirmpassword} = req.body

  if(!user_name) {
      return res.status(422).json({message: 'O nome é obrigatório'})
  }

  
  if(!email) {
      return res.status(422).json({message: 'O email é obrigatório'})
  }

  
  if(!password) {
      return res.status(422).json({message: 'A senha é obrigatória'})
  }

  if(password != confirmpassword) {
      return res.status(422).json({message: 'A senha não se coincidem'})
  }

  const userExists = await User.findOne({email: email})

  if(userExists) {
      return res.status(422).json({message: 'Por favor utilize outro email'})
  }

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
      user_name,
      email,
      password: passwordHash,
  })

  try {

      await user.save()

      res.status(500).json({message:'Usuário criado com sucesso'})
      
  } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
  }


})

app.post("/auth/login", async (req, res) => {
  const {email, password} = req.body

  if(!email) {
      return res.status(422).json({message: 'O email é obrigatório'})
  }

  
  if(!password) {
      return res.status(422).json({message: 'A senha é obrigatória'})
  }

  const user = await User.findOne({email: email})

  if(!user) {
      return res.status(404).json({message: 'Usuário não encontrado'})
  }

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword) {
      return res.status(422).json({message: 'Senha inválida'})
  }
  try {

      const secret = process.env.SECRET//olhar

      const token = jwt.sign({
          id: user._id
       }, 
       secret,
      )

      res.status(200).json({message: 'Autenticação realizada com sucesso', token})
      
  } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
  }
})



//rotas
const livroRoutes = require ('./routes/LivroRoutes')

app.use('/livro', livroRoutes)

app.get('/', async (req, res) => {
  try {
    const livros = await Livro.find()

    res.status(200).json(livros)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

app.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const livro = await Livro.findOne({_id: id})

    if(!livro){
      res.status(422).json({message: 'o livro não foi encontrado'})
      return
    }

    res.status(200).json(livro)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

app.patch('/livro/:id', async (req, res) => {
  const id = req.params.id

  const {isbn, titulo, autor, editora, quant_paginas, ano_lancamento} = req.body;

  const livro = {
    isbn,
    titulo,
    autor,
    editora,
    quant_paginas,
    ano_lancamento,
  }

  try {
    const updateLivro = await Livro.updateOne({_id: id}, livro)

    if(updateLivro.matchedCount === 0) {
        res.status(422).json({message: 'o livro não foi encontrado'})
        return
    }

    res.status(200).json(livro)
    
  } catch (error) {
    res.status(500).json({error: error})
    
  }
})

  app.delete('/:id', async (req, res) => {
    const id = req.params.id

    const livro = await Livro.findOne({_id: id})

    if(!livro){
      res.status(422).json({message: 'o livro não foi encontrado'})
      return
    }

  try {
    await Livro.deleteOne({_id: id})

    res.status(200).json({message: 'o livro foi removido com sucesso'})
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

  //const livroRoutes = require('./routes/LivroRoutes');

  //app.use('/', livroRoutes);

  app.get('/', (req, res) => {
    res.json({ message: 'Olá leitor!' });
  });

  const DB_USER = process.env.DB_USER
  const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

  mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@livroscluster.hvgmq6u.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
