var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var gdb = require("../utils/graphdb");


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

router.get('/receita/:id', async function(req, res, next) {
    var query = `select   ?s ?d ?da ?t ?tr ?a ?n where {  ?s rdf:type :Publicacao.
        ?s :RelativaA :${req.params.id}.
        ?s :descricao ?d.
        ?s :data ?da.
   		?s :titulo ?t.
        :${req.params.id}  :titulo ?tr.
   		?s :CriadaPor ?a.
        ?a :nome ?n.
       }
       `
        
    console.log(query)
    var result =await gdb.execQuery(query)

    var arr = []
    if(result.results.bindings[0]){
        result.results.bindings.forEach(a => {
            var obj = {
                "pub_id": a.s.value.split('#')[1],
                "descricao": a.d.value,
                "titulo": a.t.value,
                "data": a.da.value,
                "titulo_receita": a.tr.value,
                "autor_id": a.a.value.split('#')[1],
                "autor": a.n.value
            }      
            arr.push(obj)
        });   
        res.status(201).jsonp({publi:arr})
    }else{
        res.status(404).jsonp({message:"Não existem publicações!"})

    }
});



module.exports = router;
