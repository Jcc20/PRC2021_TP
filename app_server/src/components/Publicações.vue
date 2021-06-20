<template>
  <div id="publicacoes" class="publicacoes">
  
    <v-container class="pa-0">
      <v-row  no-gutters >

        <v-col class="d-flex pa-2" cols="12" sm="3">
            <v-text-field
              v-model="tituloP"
              label="Titulo da Publicação"
              dense
              outlined
              hide-details
            ></v-text-field>
        </v-col>

        <v-col class="d-flex pa-2" cols="12" sm="3">
            <v-text-field
              v-model="tituloR"
              label="Titulo da Receita"
              dense
              outlined
              hide-details
            ></v-text-field>
        </v-col>

        <v-col class="d-flex pa-2" cols="12" sm="2">
            <v-btn  @click="search()"> 
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
                      <v-row class="pa-2">
                        <b style="font-size: 24px;"> {{ n.titulo }}</b> 
                        <v-spacer></v-spacer>
                        <v-icon v-if="idUser==n.autor_id" color="red" @click="removePub(n.id)"> mdi-close </v-icon>
                      </v-row>
                    <br/> 
                    <span  style="cursor:pointer" @click="handleClick('/receitas/'+n.rec_id)"> <b>Receita: </b> {{ n.titulo_receita }}  <br/> </span> <br/> 
                    <span>  {{ n.descricao }}  <br/> </span> <br/> 
                    <span> {{ n.autor }} {{ n.data | moment("from") }} </span>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
    </v-container>

    <v-row v-if="!all">
        <v-col align="center">
            <v-btn @click="searchAll()"> Ver Todas 
            </v-btn>
        </v-col>
    </v-row>
  </div>
</template>


<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
    name: 'publicacoes',
    data() {
        return { 
            tituloR: '',
            tituloP: '',
            list: [],
            pubs: [],
            token: localStorage.getItem('jwt'),
            idUser: '',
            all: false
        }
    },
    created() {                 
        if (this.$route.params.receita) {
          axios.get("http://localhost:7700/publicacao/receita/"+this.$route.params.receita)
              .then(data => {
                  console.log(data.data.publis)
                  this.pubs = this.sorted(data.data.publis)
                  this.all = true
              })
              .catch(err => {
                  console.log(err)
              })   
        }
        else {
          axios.get("http://localhost:7700/publicacao/")
              .then(data => {
                  console.log(data.data.publis)
                  this.pubs = this.sorted(data.data.publis)
              })
              .catch(err => {
                  console.log(err)
              })   
        }  
        if (this.token) { 
            this.idUser = jwt.decode(this.token).email
        }
    },
    methods: {
        handleClick(value) {
          this.$router.push(value)      
        },
        sorted(lista) {
            return lista.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))
        },
        search() {
            if (this.$route.query.receita) console.log("id: " + this.$route.query.receita)
            console.log("filtro: " + this.filter)
            console.log("word: " + this.word)
        },
        removePub(id) {
          if (confirm("Deseja mesmo remover a publicação?")) {
            console.log("remover " + id)
          }
        },
        searchAll(){
            axios.get("http://localhost:7700/publicacao/")
                .then(data => {
                    console.log(data.data.publis)
                    this.pubs = this.sorted(data.data.publis)
                    this.all = true
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