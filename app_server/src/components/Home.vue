<template>
    <div id="home" class="home">
     <v-container> 
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8" class="publicacoes">
          <h1 @click="handleClick('/receitas')">Receitas</h1>
          <v-container class="pubs">
            <v-row no-gutters>
              <v-col v-for="n in list" :key="n.id" cols="12" sm="6">
                <v-card class="pa-6 pub" outlined  @click="handleClick('/receitas/'+n.id)">
                  <v-row>
                    <v-col cols="12" sm="4" style="display:inline-flex">
                        <v-img src="../../public/default.png"></v-img>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <span style="font-size: 20px; color: #53a6bf;"> {{ n.titulo }} <br/> </span>  
                        <span > <b>Autor: </b>{{ n.creator }} <br/></span>
                        <span > <b>Dificuldade: </b>
                          <span v-if="n.dificuldade=='Fácil'" style="color:green"> {{n.dificuldade}} </span>
                          <span  v-else-if="n.dificuldade=='Média'" style="color:orange"> {{n.dificuldade}} </span>
                          <span v-else style="color:red"> {{n.dificuldade}} </span>
                        </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <span> <i> Adicionada {{ n.data | moment("from") }} </i> </span>
                  </v-row>
                </v-card> 
              </v-col>
            </v-row>
          </v-container>         
        </v-col>


        <v-col cols="6" md="4" class="recursos">
            <h1 @click="handleClick('/publicacoes')">Novas Publicações</h1>
            <v-container class="recs">
            <v-row no-gutters>
              <v-col v-for="n in pubs" :key="n.id" cols="12" sm="12">
                <v-card class="pa-6 rec" @click="handleClick('/publicacoes')">
                  <v-row>
                    <v-col cols="12" sm="4" style="display:inline-flex">
                        <v-img src="../../public/default.png"></v-img>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <span style="font-size: 20px; text-decoration: underline"> {{ n.titulo }} <br/> </span>
                        <span> <b>Receita: </b>{{ n.relativaA }} <br/> </span>
                        <span> {{ n.creator }} {{ n.data | moment("from") }} </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
    
      </v-row>

      <v-row>
          <v-col cols="8" align="center">
              <AddReceita/>
          </v-col>
      </v-row>
    </v-container>
    
    </div>

</template>



<script>
//import axios from 'axios'
import AddReceita from '@/components/AddReceita.vue'

export default {
    name: 'home',
    data() {
        return { 
            limite: 6,
            list: [],
            pubs: [], 
            recs: [], 
        }
    },
    components: {
      AddReceita
    },
    created() {                 
        this.pubs = [
            {id:"Pub_1",titulo:"O bolo do consolo", creator:"henrique", relativaA:"rec_3", data:"2021-02-17 22:51:13", descricao:"O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se."},
            {id:"Pub_2",titulo:"O bolo do consolado", creator:"jose", relativaA:"rec_1", data:"2021-06-17 12:51:13", descricao:"O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se."},
            {id:"Pub_3",titulo:"O bolo do conso", creator:"afonso", relativaA:"rec_2", data:"2021-06-18 19:20:13", descricao:"O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se."}
            ]
        this.recs = [
            {id:"Rec_1",titulo:"Bolo de chocolate", dificuldade: "Fácil", creator:"henrique", gostos: ["joaquim","joao"] ,  data:"2021-01-10 23:59:59", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:[]},
            {id:"Rec_2",titulo:"Bolo de ananás", dificuldade: "Média", creator:"joao", gostos: ["joaquim"] ,data:"2021-01-02 21:30:01",  descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["pao"]},
            {id:"Rec_3",titulo:"Bolo de feijão", dificuldade: "Fácil", creator:"ricardo", gostos: [] , data:"2021-02-01 13:23:23", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["bacalhua","pimento","chouriça","sal","pimenta","gelado"]},
            {id:"Rec_4",titulo:"Bolo de queijo", dificuldade: "Difícil", creator:"henrique", gostos: ["joaquim","joao","joana"] , data:"2021-02-26 17:21:27", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["feijoada","uma colher de sal","250g de farinha"]},
            {id:"Rec_5",titulo:"Bolo de abacaxi", dificuldade: "Fácil", creator:"joaquim", gostos: ["joaquim","joao"] ,  data:"2021-02-12 23:59:59", descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:[]},
            {id:"Rec_6",titulo:"Bolo de banana", dificuldade: "Média", creator:"joao", gostos: ["joaquim"] ,data:"2021-04-02 21:30:01",  descricao:"1. Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira.\n2. Junte a farinha e o fermento, com uma peneira, e incorpore.\n3. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", ingredientes:["pao"]}
        ]          
        this.list = this.sorted(this.recs).slice(0,this.limite)
        this.pubs = this.sorted(this.pubs)
    },
    methods: {
        handleClick(value) {
          this.$router.push(value)      
        },
        sorted(lista) {
            return lista.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))
        },
    }
}

</script>




<style>

.home {
    text-align: center;
    height: 100vh;
}

.home h1{
    font-size: 30px;
    text-decoration: underline;
    text-align: left;
    margin-top: 10px;
    text-underline-offset: 7px;
    text-decoration-thickness: 6px;
    text-decoration-color: #e88b00;
}

.publicacoes {
    padding-right: 30px !important;
}

.pubs {
    background-color: #a9a9a94a;
    border-radius: 5px;
    margin-top: 30px;
}

.pub {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
}

.recursos {
    max-height: 840px;
    border-left: 2px solid #969090;
    background-color: white;
    padding-left: 30px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 0;
    position: fixed;
}

.recursos h1 {
    text-align: center !important;
    text-decoration: none !important;
    background-color: #e88b00bd;
    width: fit-content;
    padding: 0px 5px;
}

.recs {
    margin-top: 20px;
}

.rec {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
    margin-bottom: 30px;
}

.img {
    margin: auto;
    text-align: right;
    max-height: 80px;
    max-width: 80px;
}

</style>