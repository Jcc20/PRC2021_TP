var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var gdb = require("../utils/graphdb");
const { v4: uuidv4 } = require('uuid');


function verifyToken(token){  
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
    var query = `select   ?s ?d ?da ?t ?tr ?a ?n where {  ?s rdf:type :Publicacao.
        ?s :RelativaA ?r.
        ?s :descricao ?d.
        ?s :data ?da.
   		?s :titulo ?t.
        ?r  :titulo ?tr.
   		?s :CriadaPor ?a.
        ?a :nome ?n.
       
       `
           
    if(req.query.tituloP){
        query+=`\nFILTER regex (str(?t), "${req.query.tituloP}", "i").`
    }else if(req.query.tituloR){
        query+=`\nFILTER regex (str(?tr), "${req.query.tituloR}", "i").`
    }
    query+="}"
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
        res.status(201).jsonp({publis:arr})
    }else{
        res.status(404).jsonp({message:"Não existem publicações!"})

    }
    
});

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


router.get('/recentes', async function(req, res, next) {
    var query = `select ?d ?s ?da ?di ?tc ?tp ?a ?n (GROUP_CONCAT(distinct ?ig;SEPARATOR="&") AS ?igs) ?t (GROUP_CONCAT(distinct ?g;SEPARATOR="&") AS ?gs) where {  ?s rdf:type :Receita.
        ?s :descricao ?d.
        ?s :data ?da.
        ?s :dificuldade ?di.
        ?s :ingrediente ?ig.
   		?s :titulo ?t.
        ?s :tipoCozinha ?tc.
        ?s :tipoPrato ?tp.
        ?s :CriadaPor ?a.
        ?a :nome ?n.
        OPTIONAL {?s :éGostadoPor ?g.}
    } 
group by ?d ?s ?da ?di ?t ?tc ?tp ?a ?n
order by desc(?da)
limit 6`
    var result =await gdb.execQuery(query)
   
    if(result.results.bindings[0]){
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
                "tipoPrato": a.tp.value,
                "autor": a.n.value
            }
            arr.push(obj)
        });
        res.status(201).jsonp({receitas:arr})
    }
    else{
        res.status(404).jsonp({message:"Receitas não existem!"})
    }
});

router.post('/', async function(req, res, next) {
    var token = verifyToken(req.headers.authorization)
    console.log(req.headers.authorization)
    console.log(token)
    console.log(req.body.idUser)
    if(!token || token.email != req.body.idUser) {res.status(403).jsonp({erro: "Não tem acesso à operação."})}
    else{

        var pub_id = uuidv4()
        
        var query = `INSERT DATA
        { 
               :${pub_id} rdf:type :Publicacao;
                        :titulo "${req.body.titulo}" ;
                        :data "${req.body.data}" ;
                        :descricao "${req.body.descricao}".
                       
        }`
        console.log(query)
        var queryRel = `INSERT 
        {
            :${pub_id} :CriadaPor ?p.
            ?p :Criou  :${pub_id}.
            :${pub_id} :RelativaA ?r.
          

        } 
        where{
            ?p rdf:type :Utilizador .
            FILTER regex (str(?p), "${req.body.idUser}").
            ?r rdf:type :receita .
            FILTER regex (str(?r), "${req.body.idReceita}").
        }`
        console.log(queryRel)
        try {
            var result =await gdb.execTransaction(query)
            console.log(result)
            var resultRel =await gdb.execTransaction(queryRel)
            console.log(resultRel)
            
            res.status(201).jsonp({message:"Publicação registada com sucesso!", idPub: pub_id})
        } catch (error) {
            res.status(500).jsonp({message:"Erro no registo da receita! "+ error})
        }
    }

});



module.exports = router;
