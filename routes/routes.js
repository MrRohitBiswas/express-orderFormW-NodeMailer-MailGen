const express = require("express");
const router = express.Router();

//TO GET FORM DETAILS IN REQ.BODY bodyParser used

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// COMPLETED TEMPLATES USING HANDLEBARS BY MISTAKE SO KEEPING IT AS COMMENT
// router.get('/',(req,res)=>{
//         res.render('home')
//     })
// router.get('/order',(req,res)=>{
    //     res.render('order')
    // })
    
    // router.post('/sendOrder',(req,res)=>{
        //     res.render('confirm')
        // })
        

//Creating MySQL connection to my local DB

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rohit@2001",
  database: "kpassin_rohit191",
});

//tried putting async await but VSCODE warned me it is unnecessary
const insertData = (orderNo,itemDesc,quantity,priceInRs,email) => {

    connection.connect((err) => {
        if (err)
            throw err;
        console.log("Connected to MySQL database!");
    });


    try {
      const result = connection.query(
          `INSERT INTO kpassign_rohit191 (orderNo, itemDesc, quantity,priceInRs,email) VALUES (${orderNo}, "${itemDesc}", ${quantity},${priceInRs},"${email}")`
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }finally{
        // Query the kpassign_rohit191 table
        connection.query("SELECT * FROM kpassign_rohit191", (err, results) => {
            if (err) throw err;
            console.log(results);
          });
          connection.end();
    }


  }


//MAILGEN & NodeMailer
const Mailgen = require('mailgen');
const nodemailer = require("nodemailer");

var mailGenerator = new Mailgen({
    theme: 'default',
    product:{
        name: 'Rohit Biswas, HIT (CSE)',
        link: 'https://tourcirkit.com/services', //Promotion of my website
    }
})
const sendMail=(orderNo,itemDesc,quantity,priceInRs,email)=>{
var email1 = {
    body: {
        name: 'Customer',
        intro: 'I acknowlege the receipt of following order:',
        table: {
            data: [
                {
                    'orderNo': orderNo,
                    'itemDesc': itemDesc,
                    'quantity': quantity,
                    'priceInRs': priceInRs
                }
            ],
        },
        greeting: 'Dear',
        signature: 'Truly',
        outro: 'Looking forward to do more business with you'
    }
};
let mail = mailGenerator.generate(email1);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rohitbiswas31012001@gmail.com',
      pass: 'hbfzcqtmmkreumhm',
    }
  });
  let msg = {
    from: 'Rohit Biswas',
    to: email,
    subject: 'Order Receipt | Rohit Biswas_191',
    html: mail 
  }
  transporter.sendMail(msg);
}
router.get("/", (req, res) => {
  res.render("pages/home");
});
router.get("/order", (req, res) => {
  res.render("pages/order");
});

router.post("/sendOrder", (req, res) => {
  // console.log(req.body);
  const data = req.body;

  insertData(data.orderNo,data.itemDesc,data.quantity,data.priceInRs,data.email);
  sendMail(data.orderNo,data.itemDesc,data.quantity,data.priceInRs,data.email);
      

  res.render("pages/confirm");
});

module.exports = router;
