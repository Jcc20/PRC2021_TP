var axios = require('axios')
var prefixes = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX : <http://www.di.uminho.pt/prc2021/PRC2021_Tp#> 
        `           

exports.execQuery = async function (query){
    var getLink = "http://localhost:7200/repositories/PRC2021_Tp?query="
    var encoded = encodeURIComponent(prefixes + query)
    var result = await axios.get(getLink + encoded)
    console.log(result.data)
    return result.data
}

exports.execTransaction = async function(query){
    var postLink = "http://localhost:7200/repositories/PRC2021_Tp/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try{
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    }catch(error){
        throw(error)
    }
}