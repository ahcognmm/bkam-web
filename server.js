import express from 'express'
import hbs from 'hbs'
import customer from './router/Customer'
let app = express()
let port = process.env.PORT || 1507

app.set("view engine","hbs")
app.use(express.static('public'))
customer(app)

app.listen(port)
console.log("web started on: "+ port)