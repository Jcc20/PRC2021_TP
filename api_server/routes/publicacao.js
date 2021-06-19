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

router.get('/', async function(req, res, next) {
    var query = `select  ?s ?d ?da ?di ?tc ?tp (GROUP_CONCAT(distinct ?ig;SEPARATOR="&") AS ?igs) ?t (GROUP_CONCAT(distinct ?g;SEPARATOR="&") AS ?gs) where {  ?s rdf:type :Receita.
        ?s :descricao ?d.
        ?s :data ?da.
        ?s :dificuldade ?di.
        ?s :ingrediente ?ig.
   		?s :titulo ?t.
        ?s :tipoCozinha ?tc.
        ?s :tipoPrato ?tp.
        OPTIONAL {?s :éGostadoPor ?g.}`
           
    if(req.query.titulo){
        query+=`\n?s :titulo ?r.
        FILTER regex (str(?r), "${req.query.titulo}", "i").`
    }
    else if(req.query.tipoCozinha){
        query+="\n?s :tipoCozinha \""+req.query.tipoCozinha+"\"."
    }else if(req.query.tipoPrato){
        query+="\n?s :tipoPrato \""+req.query.tipoPrato+"\"."
    }else if(req.query.ingrediente){
        query+=`\n?s :ingrediente ?i.
        FILTER regex (str(?i), "${req.query.ingrediente}", "i").`
    }else if(req.query.autor){
        query+=`\n?s :CriadaPor ?c.
    	?c :nome "${req.query.autor}".`
    }
    query+="} group by ?s ?d ?da ?di ?t ?tc ?tp"
    console.log(query)
    var result =await gdb.execQuery(query)

    var arr = []
    result.results.bindings.forEach(a => {
        var ing=[]
        a.igs.value.split('&').forEach(i=>{
            ing.push(i)
        })
        var gostos = []
        a.gs.value.split('&').forEach(g=>{
            console.log(g)
           gostos.push(g.split('#')[1])
        })
        var obj = {
            "rec_id": a.s.value.split('#')[1],
            "descricao": a.d.value,
            "ingredientes": ing,
            "titulo": a.t.value,
            "dificuldade": a.di.value,
            "gostos": gostos,
            "data": a.da.value,
            "tipoCozinha": a.tc.value,
            "tipoPrato": a.tp.value
        }
        arr.push(obj)
    });
    res.status(201).jsonp({receitas:arr})
});



module.exports = router;
