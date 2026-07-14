export default function errorMiddleware(error, req, res, next){
    console.error(error.message);
    return res.status(400).json({
        erro: error.message
    });
}