<template>
    <div id="receitasSearch" class="receitasSearch">
        <v-container> 
            <v-row no-gutters>
                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-text-field
                      v-model="titulo"
                      label="Titulo"
                      dense
                      outlined
                      hide-details
                    ></v-text-field>
                </v-col>

                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-text-field
                      v-model="ingrediente"
                      label="Ingrediente"
                      dense
                      outlined
                      hide-details
                    ></v-text-field>
                </v-col>

                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-select
                      :items="tiposCozinha"
                      v-model="tipoCozinha"
                      label="Tipo de cozinha"
                      dense
                      outlined
                      hide-details
                      clearable
                    ></v-select>
                </v-col>

                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-select
                      :items="tiposPrato"
                      v-model="tipoPrato"
                      label="Tipo de prato"
                      dense
                      clearable
                      hide-details
                      outlined
                    ></v-select>
                </v-col>

                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-select
                      :items="chefs"
                      v-model="chef"
                      label="Chef"
                      dense
                      outlined
                      hide-details
                      clearable
                    ></v-select>
                </v-col>

                <v-col class="d-flex pa-2" cols="12" sm="2">
                    <v-btn @click="search()"> Procurar 
                        <v-icon> mdi-magnify </v-icon>
                    </v-btn>
                </v-col>
            
            </v-row>


            <v-row>
                <v-col cols="12"  class="publicacoes">
                      <v-row no-gutters>
                        <v-col v-for="n in list" :key="n.id" cols="12" sm="6">
                          <v-card class="pa-6 pub" outlined  @click="handleClick('/receitas/'+n.rec_id)">
                            <v-row>
                              <v-col cols="12" sm="5" style="display:inline-flex">
                                  <v-img src="../../public/default.png"></v-img>
                              </v-col>
                              <v-row class="pa-2" align="end">
                                <v-col cols="12" sm="10">
                                    <span style="font-size: 20px; color: #53a6bf;"> {{ n.titulo }} <br/> </span>  
                                    <span > <b>Autor: </b>{{ n.creator }} <br/></span>
                                    <span > <b>Dificuldade: </b>
                                        <span v-if="n.dificuldade=='Fácil'" style="color:green"> {{n.dificuldade}} </span>
                                        <span  v-else-if="n.dificuldade=='Média'" style="color:orange"> {{n.dificuldade}} </span>
                                        <span v-else style="color:red"> {{n.dificuldade}} </span><br/><br/>
                                    </span>
                                    <span> <i> Adicionada {{ n.data | moment("from") }} </i> </span>
                                </v-col>
                                <v-col align="right" sm="2">
                                    <v-row>
                                        <v-icon color="red">mdi-cards-heart</v-icon>
                                        <span style="margin-left:5px"> {{ n.gostos.length }} </span>
                                    </v-row>
                                </v-col>
                              </v-row>
                            </v-row>
                           </v-card> 
                        </v-col>
                      </v-row>      
                </v-col>
            </v-row>

            <v-row>
                <v-col align="center">
                    <v-btn @click="searchAll()"> Ver Todos 
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>   
    </div>
</template>




<script>
import axios from 'axios'

export default {
    name: 'receitasSearch',
    data() {
        return { 
            titulo: null,
            tipoCozinha: null,
            tipoPrato: null,
            chef: null,
            ingrediente: null,
            list: [],
            recs: [],
            tiposCozinha: [],
            tiposPrato: [],
            chefs: []
        }
    },
    created() {
        axios.get("http://localhost:7700/receita/tiposCozinha")
                .then(data => {
                    console.log(data.data)
                    this.tiposCozinha = data.data.tipos
                })
                .catch(err => {
                    console.log(err)
                })
        axios.get("http://localhost:7700/receita/tiposPrato")
                .then(data => {
                    console.log(data.data)
                    this.tiposPrato = data.data.tipos
                })
                .catch(err => {
                    console.log(err)
                })
        axios.get("http://localhost:7700/receita/autores")
                .then(data => {
                    console.log(data.data)
                    this.chefs = data.data.tipos
                })
                .catch(err => {
                    console.log(err)
                })                 
        this.recs = [
            {id:"Rec_1",titulo:"Bolo de chocolate", dificuldade: "Fácil", creator:"henrique", gostos: ["joaquim","joao"] ,  data:"2021-01-10 23:59:59", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:[]},
            {id:"Rec_2",titulo:"Bolo de ananás", dificuldade: "Média", creator:"joao", gostos: ["joaquim"] ,data:"2021-01-02 21:30:01",  descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["pao"]},
            {id:"Rec_3",titulo:"Bolo de feijão", dificuldade: "Fácil", creator:"ricardo", gostos: [] , data:"2021-02-01 13:23:23", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["bacalhua","pimento","chouriça","sal","pimenta","gelado"]},
            {id:"Rec_4",titulo:"Bolo de queijo", dificuldade: "Difícil", creator:"henrique", gostos: ["joaquim","joao","joana"] , data:"2021-02-26 17:21:27", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["feijoada","uma colher de sal","250g de farinha"]},
            {id:"Rec_5",titulo:"Bolo de abacaxi", dificuldade: "Fácil", creator:"joaquim", gostos: ["joaquim","joao"] ,  data:"2021-02-12 23:59:59", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:[]},
            {id:"Rec_6",titulo:"Bolo de banana", dificuldade: "Média", creator:"joao", gostos: ["joaquim"] ,data:"2021-04-02 21:30:01",  descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["pao"]}
        ]          
        this.list = this.sorted(this.recs)
    },
    methods: {
        handleClick(value) {
          this.$router.push(value)      
        },
        sorted(lista) {
            return lista.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))
        },
        search() {
            var query = ''
            if (this.tipoCozinha) query+= (query==''?'':'&') + "tipoCozinha=" + this.tipoCozinha
            if (this.tipoPrato) query+= (query==''?'':'&') + "tipoPrato=" + this.tipoPrato
            if (this.chef) query+= (query==''?'':'&') + "autor=" + this.chef
            if (this.titulo) query+= (query==''?'':'&') + "titulo=" + this.titulo
            if (this.ingrediente) query+= (query==''?'':'&') + "ingrediente=" + this.ingrediente
            axios.get("http://localhost:7700/receita?"+query)
                .then(data => {
                    this.list = this.sorted(data.data.receitas)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        searchAll(){
            axios.get("http://localhost:7700/receita/")
                .then(data => {
                    this.list = this.sorted(data.data.receitas)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}

</script>




<style>


</style>