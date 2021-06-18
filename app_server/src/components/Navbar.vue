<template>
  <div id="navbar-max">
    <div v-if="token">
      <v-layout row justify-center class="navbar">
        <v-toolbar color="#57a2bf" class="hidden-xs-and-down">
          <v-img
          @click="goToLink('/')"
          class="logo"
          max-height="45"
          max-width="490"
          src="../assets/mfc.png"
          ></v-img>
            <v-toolbar-items>
             <v-btn class="navbar-button">
                <span class="hyperlink" @click="goToLink('/publicacoes')"><b>Publicações</b></span>
             </v-btn>
             <v-btn class="navbar-button">
                <span class="hyperlink" @click="goToLink('/receitas')"><b>Receitas</b></span>
             </v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items>
             <v-btn class="navbar-button">
                <span class="hyperlink" @click="goToLink('/perfil')"><b>Perfil</b></span>
             </v-btn>
             <v-btn class="navbar-button">
                <span @click="handleLogout()"> <b> Logout </b></span>
             </v-btn>
            </v-toolbar-items>
          </v-toolbar>
      </v-layout>
    </div>
    <div v-else>
      <v-layout row justify-center class="navbar">
        <v-toolbar color="#57a2bf" class="hidden-xs-and-down">
          <v-img
          @click="goToLink('/')"
          class="logo"
          max-height="45"
          max-width="490"
          src="../assets/mfc.png"
          ></v-img>
              <v-spacer></v-spacer>
            <v-toolbar-items>
             <v-btn class="navbar-button">
                <Login/>
             </v-btn>
            </v-toolbar-items>
          </v-toolbar>
      </v-layout>
    </div>
  </div>

</template>

<script>
import Login from "@/components/Login.vue"
//import axios from 'axios'

export default {
  name: "App",
  components: {
    Login
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.go()
      window.location.href = '/'
    },
    goToLink(link) {
      var currentUrl = window.location.pathname;
      if (currentUrl!=link) this.$router.push(link)
    }
  },
  data () {
    return {
      idUser: null,
      dialog: false,
      token: ''
    }
  },
  created() {
    /*
    if (this.token) {
      axios({
          method: "post",
          url: "http://localhost:8081/api/user/token/",
          data: this.token,
      })
      .then(data => {
          this.idUser = data.data.idUser
          this.link = this.link + this.idUser
      })
      .catch(err => {
          console.log(err)
      })
    }*/
  }
};
</script>

<style>

#navbar-max {
    margin-bottom: 70px;
}

.navbar {
    z-index: 10; 
    width:100%; 
    position: fixed;
    margin-left: 0px !important;
}

.navbar-button {
    background-color: #57a2bf !important; 
    padding-top: 10px !important; 
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%) !important;
}

.hyperlink {
    text-decoration: none;
    color: #212121 !important;
}

.logo{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
</style>

