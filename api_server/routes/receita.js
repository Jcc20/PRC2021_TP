var express = require('express');
var router = express.Router();
var gdb = require("../utils/graphdb");

router.get('/', async function(req, res, next) {
    var query = `select  ?s ?d ?da ?di ?tc ?tp ?n (GROUP_CONCAT(distinct ?ig;SEPARATOR="&") AS ?igs) ?t (GROUP_CONCAT(distinct ?g;SEPARATOR="&") AS ?gs) where {  ?s rdf:type :Receita.
        ?s :descricao ?d.
        ?s :data ?da.
        ?s :dificuldade ?di.
        ?s :ingrediente ?ig.
   		?s :titulo ?t.
        ?s :tipoCozinha ?tc.
        ?s :tipoPrato ?tp.
        ?s :CriadaPor ?a.
        ?a :nome ?n.
        
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
    query+="} group by ?s ?d ?da ?di ?t ?tc ?tp ?n"
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
            "tipoPrato": a.tp.value,
            "autor": a.n.value
        }
        arr.push(obj)
    });
    res.status(201).jsonp({receitas:arr})
});

router.get('/tiposCozinha', async function(req, res, next) {
    var query = `select distinct ?p where{ ?s :tipoCozinha ?p.}`
    var result =await gdb.execQuery(query)
   
    var arr = []
    result.results.bindings.forEach(a => {
        arr.push(a.p.value)
    });
    res.status(201).jsonp({tipos:arr})
});



router.get('/tiposPrato', async function(req, res, next) {
    var query = `select distinct ?p where{ ?s :tipoPrato ?p.}`
    var result =await gdb.execQuery(query)
   
    var arr = []
    result.results.bindings.forEach(a => {
        arr.push(a.p.value)
    });
    res.status(201).jsonp({tipos:arr})
});


router.get('/autores', async function(req, res, next) {
    var query = `select distinct ?n where{ ?s :Criou ?p. 
        ?s :nome ?n.}`
    var result =await gdb.execQuery(query)
   
    var arr = []
    result.results.bindings.forEach(a => {
        arr.push(a.n.value)
    });
    res.status(201).jsonp({tipos:arr})
});

router.get('/:id', async function(req, res, next) {
    var id = '<http://www.di.uminho.pt/prc2021/PRC2021_Tp#'+req.params.id+'>'
    var query = `select  ?d ?da ?di ?tc ?tp ?a ?n (GROUP_CONCAT(distinct ?ig;SEPARATOR="&") AS ?igs) ?t (GROUP_CONCAT(distinct ?g;SEPARATOR="&") AS ?gs) where {  ?s rdf:type :Receita.
        ${id} :descricao ?d.
        ${id} :data ?da.
        ${id} :dificuldade ?di.
        ${id} :ingrediente ?ig.
   		${id} :titulo ?t.
        ${id} :tipoCozinha ?tc.
        ${id} :tipoPrato ?tp.
        ${id} :CriadaPor ?a.
        ?a :nome ?n.
        OPTIONAL {${id} :éGostadoPor ?g.}
    } group by ?d ?da ?di ?t ?tc ?tp ?a ?n`
           

    console.log(query)
    var result =await gdb.execQuery(query)
    if(result.results.bindings[0]){


        var ing=[]
        result.results.bindings[0].igs.value.split('&').forEach(i=>{
            ing.push(i)
        })
        var gostos = []
        result.results.bindings[0].gs.value.split('&').forEach(g=>{
           gostos.push(g.split('#')[1])
        })
        var obj = {
            "rec_id": req.params.id,
            "descricao": result.results.bindings[0].d.value,
            "ingredientes": ing,
            "titulo": result.results.bindings[0].t.value,
            "dificuldade": result.results.bindings[0].di.value,
            "gostos": gostos,
            "data": result.results.bindings[0].da.value,
            "tipoCozinha": result.results.bindings[0].tc.value,
            "tipoPrato": result.results.bindings[0].tp.value,
            "autor": result.results.bindings[0].n.value,
            "autor_id": result.results.bindings[0].a.value.split('#')[1],
        }
        
    
        res.status(201).jsonp({receita:obj})
    }else{
        res.status(404).jsonp({message:"Receita não existe!"})

    }
}); 


module.exports = router;
