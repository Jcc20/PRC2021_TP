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


                        <v-col class="pa-2" style="margin-top:-5px">
                            <v-autocomplete
                              v-model="tipoCozinha"
                              :items="tiposCozinha"
                              outlined
                              dense
                              label="Tipo de cozinha"
                            ></v-autocomplete>
                        </v-col>

                        <v-col class="pa-2" style="margin-top:-30px">
                            <v-autocomplete
                              v-model="tipoPrato"
                              :items="tiposPrato"
                              outlined
                              dense
                              label="Tipo de prato"
                            ></v-autocomplete>
                        </v-col>

                        <v-col class="pa-2" style="margin-top:-30px">
                            <v-select
                              v-model="dificuldade"
                              :items="dificuldades"
                              outlined
                              dense
                              label="Dificuldade do prato"
                            ></v-select>
                        </v-col>

                        <v-col class="pa-2" style="margin-top:-30px">
                          <v-combobox 
                            multiple
                            v-model="select" 
                            label="Ingredientes" 
                            chips
                            outlined
                            deletable-chips
                            class="tag-input"
                            :search-input.sync="search" 
                            @keyup.tab="updateTags"
                            @paste="updateTags">
                          </v-combobox>
                        </v-col>
                      
                        <v-col class="pa-2" style="margin-top:-35px">
                            <v-textarea 
                            hide-details
                            dense
                            type="text" 
                            v-model="descricao" 
                            label="Descrição"
                            outlined
                            ></v-textarea>
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
          search: "",
          select: [],
          tiposCozinha: ["marroquina","chinesa","italiana","baguete"],
          tiposPrato: ["carne","peixe","sobremesa","pizza"],
          dificuldades: ["Fácil","Média","Difícil"],
          dificuldade:'',
          titulo:'',
          descricao:'',
          data:null,
          menu: false,
          loading:false,
          tipoPrato:'',
          tipoCozinha:'',
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
        updateTags() {
          this.$nextTick(() => {
            this.select.push(...this.search.split(","));
            this.$nextTick(() => {
              this.search = "";
            });
          });
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