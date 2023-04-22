const express = require('express');
const app = express();

const port =5000;

//setting router

const routes = require('./routes/routes')
app.use('/',routes);

// COMPLETED TEMPLATES USING HANDLEBARS BY MISTAKE SO KEEPPING IT AS COMMENT

//setting handlebars

// const hbs = require('express-handlebars');
// app.engine('handlebars',hbs.engine())
// app.set('view engine','handlebars')
// app.set('views','./views')

//setting EJS

app.set('view engine','ejs')
app.set('views','./views')



app.listen(port,()=>{
    console.log('server listening on port: ', port);
})
