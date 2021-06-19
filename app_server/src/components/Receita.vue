<template>
    <div id="receita" class="receita">
        <v-container> 
            <v-row>
                <v-col>
                    <v-img max-height="600px" src="../../public/default.png"></v-img>
                </v-col>
            </v-row>   
            <v-row align="center" >
                <v-col>
                    <h1 style="color:#57a2bf"> {{ receita.titulo }} </h1> 
                    <span> <b>Autor:</b> {{receita.creator}} </span>
                </v-col>

                <v-col sm="1" align="right">
                    <v-row align="center">
                        <div v-if="token">
                            <div v-if="receita.gostos.includes(receita.id)">
                                <v-icon @click="dislike(receita.id)" x-large color="red">mdi-cards-heart</v-icon>
                                <span style="margin-left:5px; font-size:20px"> {{ receita.gostos.length }} </span>
                            </div>
                            <div v-else>
                                <v-icon @click="like(receita.id)" x-large color="grey">mdi-cards-heart</v-icon>
                                <span style="margin-left:5px; font-size:20px"> {{ receita.gostos.length }} </span>
                            </div>
                        </div>
                        <div v-else>
                            <v-tooltip left max-width="160px">
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon v-on="on" v-bind="attrs" x-large color="grey">mdi-cards-heart</v-icon>
                                <span style="margin-left:5px; font-size:20px"> {{ receita.gostos.length }} </span>
                              </template>
                              <span>Efetue login para gostar das receitas</span>
                            </v-tooltip>
                            
                        </div>
                    </v-row>
                </v-col>
                
            </v-row>

            <v-card style="margin-top:10px;margin-bottom:10px" color="#57a2bf" height="2px">
                <v-card-title >
                </v-card-title>
            </v-card>

            <v-row>
               <v-col>
                   <span> Dificuldade: {{receita.dificuldade}} </span>
               </v-col>
            </v-row>

            <v-row>
                <v-col cols="8">
                    <v-card elevation="10">
                        <v-card-title>
                            <h3> Descrição: </h3>
                        </v-card-title>
                        <v-card-text style="font-size:18px;max-width:650px">
                            {{receita.descricao}}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card elevation="10">
                        <v-card-title>
                            <h3> Ingredientes: </h3>
                        </v-card-title>
                        <v-card-text>
                            <v-list v-for="i in receita.ingredientes" :key="i">
                                <v-list-item  style="font-size:18px">
                                  <v-icon color="#57a2bf"> mdi-check </v-icon>
                                  {{i}}
                                </v-list-item>
                            </v-list>
                            
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-card style="margin-top:20px;margin-bottom:20px" color="#57a2bf" height="2px">
                <v-card-title >
                </v-card-title>
            </v-card>

            <v-row >
              <v-col cols="12" align="center" justify="center"> 
                <p v-if="token" style="font-size:18px"> Adiciona uma publicação sobre a receita!</p>
                <p v-else style="font-size:18px"> Efetua login para poderes adicionar publicações!</p>
                <v-row>  
                    <v-col align="center" > 
                        <v-toolbar dense width="60.5rem" elevation="6">
                            <v-text-field
                             flat solo
                             class="shrink"
                             autocomplete="off"
                             type="text"
                             :disabled="token?false:true"
                             hide-details
                             v-model="titulo"
                             prepend-icon="mdi-pencil"
                             placeholder="Titulo"    
                           ></v-text-field>
                           <v-text-field
                             flat solo
                             autocomplete="off"
                             type="text"
                             :disabled="token?false:true"
                             hide-details
                             v-model="pub"
                             placeholder="Escreve um comentário"
                             prepend-icon="mdi-drag-vertical-variant"        
                           ></v-text-field>
                            <v-btn :disabled="token?false:true" @click="submitPub()" style="margin-right:-10px">
                              Submeter
                            </v-btn>
                        </v-toolbar>
                    </v-col>
                </v-row>
              </v-col>
            </v-row>

        </v-container>
    </div>
</template>


<script>
//import axios from 'axios'

export default {
    name: 'receita',
    data() {
        return { 
            receita: null,
            token: 'a',
            pub:'',
            titulo:'',
            alerta: false,
        }
    },
    created() {                 
        this.receita = {
            id:"rec_6",
            titulo:"Bolo de banana", 
            dificuldade: "Média", 
            creator:"joao", 
            gostos: ["joaquim"] ,
            data:"2021-04-02 21:30:01", 
            descricao:"Numa taça, junte o açúcar mascavado escuro e a manteiga sem sal à temperatura ambiente e bata. Junte os ovos e incorpore com a batedeira. Junte a farinha e o fermento, com uma peneira, e incorpore. Corte a banana em pedacinho, junte á mistura do bolo e envolva.", 
            ingredientes:["pao","1kg de arroz","250g de massa"]
        }
    },
    methods: {
        handleClick(value) {
          this.$router.push(value)      
        },
        sorted(lista) {
            return lista.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))
        },
        like(id){
            this.receita.gostos.push(id)
            //axios 
        },
        dislike(id) {
            var index = this.receita.gostos.map(function(item) { return item; }).indexOf(id);
            this.receita.gostos.splice(index, 1);
            //axios 
        },
        submitPub(){

        }
    }
}

</script>




<style>



</style>