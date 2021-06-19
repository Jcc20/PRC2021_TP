<template>
    <div id="addRecurso">
        <v-dialog max-width="900px" v-model="show">
            <template v-slot:activator="{ on }">
               <v-btn v-on="on"> Nova receita </v-btn>
            </template>
            <v-card >
                <v-card-text >                   
                    <v-container>
                        
                        <v-col id="titulo">
                            <h1 >Adicionar Receita</h1>
                        </v-col>

                        <v-col class="pa-2">
                            <v-text-field 
                            hide-details
                            dense
                            type="text" 
                            v-model="titulo" 
                            label="Título"
                            outlined
                            ></v-text-field>
                        </v-col>

                        <v-col class="pa-2">
                            <v-text-field 
                            hide-details
                            dense
                            type="text" 
                            v-model="descricao" 
                            label="Descrição"
                            outlined
                            ></v-text-field>
                        </v-col>

                        <v-col class="pa-2" style="margin-bottom:-25px">
                            <v-autocomplete
                              v-model="tipo"
                              :items="types"
                              outlined
                              dense
                              label="Seleciona o tipo"
                            ></v-autocomplete>
                        </v-col>

                        <v-col class="pa-2">
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="data"
                                    hide-details
                                    dense
                                    outlined
                                    label="Data de criação"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                   ></v-text-field>
                                </template>

                                <v-date-picker
                                  ref="picker"
                                  v-model="data"
                                  color="#4F4E81"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1900-01-01"
                                  @change="save"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                      
                        <v-col cols="1" offset="11">
                            <v-file-input
                              v-model="fileInput"
                              hide-input
                              prepend-icon="mdi-plus"
                            ></v-file-input>
                        </v-col>
                        
                        <v-col align="right">
                          <v-btn :loading="loading" v-ripple="{ class: 'primary--text' }" width="150" style="height:40px" class="white--text" elevation="1" v-on:click="submeter()" color="#00ace6">Submeter</v-btn>
                          <v-btn v-ripple="{ class: 'primary--text' }" width="150" style="margin-left:10px;height:40px" class="white--text" elevation="1" v-on:click="cancelar()" color="#527a7a">Cancelar</v-btn>
                        </v-col>

                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog> 
    </div>
</template>


<script>
//import axios from 'axios'

export default {
    name: "addReceita",
    data() {
        return{
          hover: false,
          show:false,
          types:[],
          titulo:'',
          descricao:'',
          data:null,
          menu: false,
          loading:false,
          tipo:'',
          fileInput:''
        }
    },
    methods: {
        cancelar() {
            this.show=false;
            this.titulo='',
            this.descricao='',
            this.data=null,
            this.tipo='',
            this.fileInput='',
            this.loading=false
        },
        save(date) {
            this.$refs.menu.save(date)
        },
        submeter() {
            this.loading=true

            //var token = localStorage.getItem('jwt')
            /*
            axios({
                method: "post",
                url: "http://localhost:8081/api/resource/",
                data: bodyFormData,
                headers: { "Authorization" : token},
            })
            .then(data => {
                    alert('Recurso adicionado com sucesso!')
                    this.cancelar();
                    this.$router.push('/recursos/' + data.data.idResource)
                })
            .catch(err => {
                    console.log(err)
                    alert('Não foi possível adicionar novo recurso')
                    this.cancelar();
                })*/
        }
    },
    created() {
    }
}

</script>

<style> 

</style>