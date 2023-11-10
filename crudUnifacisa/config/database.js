
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/jwt", { 
useNewUrlParser: true, 
useUnifiedTopology:true
}).then(() => {
console.log('Conexão bem-sucedida com o MongoDB');
})
.catch((err) => {
console.error('Erro ao conectar ao MongoDB:', err);
})