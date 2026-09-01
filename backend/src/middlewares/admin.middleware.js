class AdminMiddleware {

    verificar(req, res, next) {

        //---------------------verifica administrador---------------
        if (req.usuario.tipo_usuario_id !== 1) {
            return res.status(403).json({
                erro: "Acesso permitido somente para administradores."
            });
        }

        return next();
    }
}

export default new AdminMiddleware();