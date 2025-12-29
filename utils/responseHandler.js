
const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({
    code: err.status,
    status: "error",
    message: err.message || "Erro interno no servidor",
  });
};


const errorResponse = (status, message)=>({
  status: status,
  message: message
})


const successResponse = (status, message, data)=>({
  status: status, 
  message: message, 
  data: data
})
  

module.exports = {errorHandler, errorResponse, successResponse};