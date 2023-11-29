const mongoose = require('mongoose')

const Livro = mongoose.model('Livro', {
    isbn: String,
    titulo: String,
    autor: String,
    editora: String,
    quant_paginas:Number,
    ano_lancamento: Number,
})

module.exports = Livro