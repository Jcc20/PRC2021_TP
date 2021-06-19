<template>
    <div id="receita" class="receita">
        <v-container v-if="receita"> 
            <v-row>
                <v-col>
                    <v-img max-height="600px" src="../../public/default.png"></v-img>
                </v-col>
            </v-row>   
            <v-row align="center" >
                <v-col>
                    <h1 style="color:#57a2bf"> {{ receita.titulo }} </h1> 
                    <span> <b>Autor:</b> {{receita.autor}} </span>
                </v-col>

                <v-col sm="1" align="right">
                    <v-row align="center">
                        <div v-if="token">
                            <div v-if="receita.gostos.includes(receita.autor_id)">
                                <v-icon @click="dislike(receita.rec_id)" x-large color="red">mdi-cards-heart</v-icon>
                                <span style="margin-left:5px; font-size:20px"> {{ receita.gostos.length }} </span>
                            </div>
                            <div v-else>
                                <v-icon @click="like(receita.autor_id)" x-large color="grey">mdi-cards-heart</v-icon>
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
               <v-col cols="8">
                   <span> <b> Dificuldade:</b>  
                        <span v-if="receita.dificuldade=='Fácil'" style="color:green"> {{receita.dificuldade}} </span>
                        <span  v-else-if="receita.dificuldade=='Média'" style="color:orange"> {{receita.dificuldade}} </span>
                        <span v-else style="color:red"> {{receita.dificuldade}} </span>
                   </span>
                   <span style="margin-right:10px;margin-left:10px">|</span>
                   <span> <b> Tipo de cozinha:</b> {{receita.tipoCozinha}} </span>
                   <span style="margin-right:10px;margin-left:10px">|</span>
                   <span> <b> Tipo de prato:</b> {{receita.tipoPrato}} </span>
                   
               </v-col>
               <v-col  align="right">
                   <v-btn elevation="4" @click="handleClick('/publicacoes?receita=' + receita.rec_id)">
                        Ver publicacoes
                    </v-btn>
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
                            <v-list v-for="i in receita.ingredientes" :key="i" style="padding:0px;margin:0px;">
                                <v-list-item dense style="padding:0px;margin:0px;font-size:18px">
                                  <v-icon color="#57a2bf"> mdi-check </v-icon>
                                  {{i}}
                                </v-list-item>
                            </v-list>
                            
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            
            <!--
            <v-btn elevation="4" @click="handleClick('/publicacoes?receita=' + receita.rec_id)">
                Ver publicacoes
            </v-btn>-->

            <v-card style="margin-top:20px;margin-bottom:20px" color="#57a2bf" height="2px">
                <v-card-title >
                </v-card-title>
            </v-card>

            <v-row >
              <v-col cols="12" align="center" justify="center"> 
                <p v-if="token" style="font-size:18px"> Adiciona uma publicação sobre a receita! </p>
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
                             placeholder="Descrição"
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
import axios from 'axios'

export default {
    name: 'receita',
    data() {
        return { 
            receita: null,
            token: localStorage.getItem('jwt'),
            pub:'',
            titulo:'',
            alerta: false,
        }
    },
    created() {                 
        axios.get("http://localhost:7700/receita/"+this.$route.params.id)
            .then(data => {
                this.receita = data.data.receita
                this.receita.data = "2021-04-02 21:30:01"
            })
            .catch(err => {
                console.log(err)
            })                 
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