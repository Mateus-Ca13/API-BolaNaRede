const express = require('express');
const authRoute = require('./routes/authRoutes');
const matchesRoutes = require('./routes/matchesRoutes')
const cors = require('cors');
const { errorHandler } = require('./utils/responseHandler');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: "*"})) // Define que podem ser feitas requisições de quaisquer origens.
app.use('/api/auth', authRoute);
app.use('/api/matches', matchesRoutes);

//===============================================
app.use(errorHandler) // Middleware padrão para envio de erros 

app.listen(port,()=>{console.log("Inicializando API em http://localhost:"+port)});

