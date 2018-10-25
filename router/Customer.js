// @flow
module.exports = function (app: any) {
    app.get('/ahcogn/:mes', (req, res) => {
        res.send(req.params.mes)
    })
    // app.get()
}