var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var gdb = require("../utils/graphdb");

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX : <http://www.di.uminho.pt/prc2021/PRC2021_Tp#> 
`
function verifyToken(token){  
  token = token.split(" ")[1] // Bearer ey341...
  var t = null;
  
  jwt.verify(token,'PRC2021',function(e,decoded){
    if(e){
      t = null
    }
    else return t = decoded
  })

  return t
}

router.post('/login' ,async function(req, res){
  console.log(req.body)
  var query = `SELECT * WHERE {	<http://www.di.uminho.pt/prc2021/PRC2021_Tp#${req.body.email}> :password ?p. 
  <http://www.di.uminho.pt/prc2021/PRC2021_Tp#${req.body.email}> :nome ?n.} `;

  try{
    var dados = await gdb.execQuery(query);
      
    if(!dados.results.bindings[0]) { return res.status(500).jsonp({message:"Utilizador inexistente!\n"})}
    if(req.body.password!=dados.results.bindings[0].p.value){
      return res.status(403).jsonp({message:"Credenciais inválidas!\n"})
    }
  
    jwt.sign({email: req.body.email, nome: dados.results.bindings[0].n.value},
      'PRC2021',
      {expiresIn: "3h"},
      function(e, token) {
        if (e) res.status(500).jsonp({error:"Erro na geração do token: " + e})
        else res.status(201).jsonp({token: token})
    });

  }catch(err){
    res.status(500).jsonp({error:"Erro no login:"+ err})
  }

})


router.post('/registar' , async function(req, res){
  var query = `SELECT * WHERE {	<http://www.di.uminho.pt/prc2021/PRC2021_Tp#${req.body.email}>  :email ?s. }`
  var result =await gdb.execQuery(query)
  if(result.results.bindings[0]){
    return res.status(409).jsonp({message: "Utilizador já existe!"})
  }
  var query1 = `INSERT DATA
  { 
  <http://www.di.uminho.pt/prc2021/PRC2021_Tp#${req.body.email}> rdf:type :Utilizador;
                                                 :nome "${req.body.nome}" ;
                                                 :email "${req.body.email}" ;
                                                 :password "${req.body.password}".
  }`

  
  var result1 = await gdb.execTransaction(query1);
  res.status(201).jsonp({message: "Utilizador registado com sucesso!"})
  
})


module.exports = router;
