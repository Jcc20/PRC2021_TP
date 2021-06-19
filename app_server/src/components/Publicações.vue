<template>
  <div id="publicacoes" class="publicacoes">
  
    <v-container class="pa-0">
      <v-row >

        <v-col cols="2" >
            <v-select
            :items="items"
            v-model="filter"
            light
            label="Filtro">
            </v-select>
        </v-col>

        <v-col cols="2">
            <v-text-field 
            type="text" 
            v-model="word" 
            label="Palavra">
            </v-text-field>        
        </v-col>

        <v-col cols="2">
            <v-btn style="margin-top:10px" @click="search()"> 
              Procurar
              <v-icon> mdi-magnify </v-icon>
            </v-btn>        
        </v-col>

      </v-row>
    </v-container>

    <v-container class="pa-0">
        <v-row no-gutters >
          <v-col v-for="n in pubs" :key="n.id" cols="12" sm="12">
              <!--<v-card class="pa-6 rec" @click="handleClick('/publicacoes/'+n.id)">-->
            <v-card class="pa-6 rec">
              <v-row>
                <v-col cols="12" sm="4" style="display:inline-flex">
                    <v-img src="../../public/default.png"></v-img>
                </v-col>
                <v-col cols="12" sm="8">
                    <span style="font-size: 24px;"> <b> {{ n.titulo }}</b> <br/> </span> <br/> 
                    <span  style="cursor:pointer" @click="handleClick('/receitas/'+n.relativaA)"> <b>Receita: </b> {{ n.relativaA }}  <br/> </span> <br/> 
                    <span>  {{ n.descricao }}  <br/> </span> <br/> 
                    <span> {{ n.creator }} {{ n.data | moment("from") }} </span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
    </v-container>

     <v-row>
                <v-col align="center">
                    <v-btn @click="searchAll()"> Ver Todos 
                    </v-btn>
                </v-col>
            </v-row>
  </div>
</template>


<script>
//import axios from 'axios'

export default {
    name: 'publicacoes',
    data() {
        return { 
            filter: null,
            word: null,
            list: [],
            pubs: [],
            items: ["titulo","receita"]
        }
    },
    created() {                 
        this.pubs = [
            {id:"pub_1",titulo:"O bolo do consolo", creator:"henrique", relativaA:"rec_3", data:"2021-02-17 22:51:13", descricao:"O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se. O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se. O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se. O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se. O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se. O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se."},
            {id:"pub_2",titulo:"O bolo do consolado", creator:"jose", relativaA:"rec_1", data:"2021-06-17 12:51:13", descricao:"O verão chegou e é sinónimo de praia. Altura de férias, dar uns mergulhos, apanhar sol, descansar e fazer as refeições na areia. No entanto, com as idas à praia é possível que acabe com as marmitas cheias de sanduíches, hambúrgueres e batatas fritas. Por isso, o 24Kitchen selecionou várias receitas de saladas para poder fazer e levar para a praia. Incluímos receitas vegetarianas (V), sem glúten (SG) e vegans (VG) para que todos em casa possam comer e deliciarem-se."},
            {id:"pub_3",titulo:"O bolo do conso", creator:"afonso", relativaA:"rec_2", data:"2021-06-18 19:20:13", descricao:"Um bolo com uma grande categoria e uma qualidade extrema!"}
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
            console.log("filtro: " + this.filter)
            console.log("word: " + this.word)
        },
    }
}

</script>




<style>


</style>