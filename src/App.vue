<template>
  <div id="app">
    <h1>Vue & Firebase</h1>
    <div class="card">
      <div class="card-header">
        <h3>Agregar link</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addLink" class="form-inline">
          <div class="form-group">
            <label>Titulo</label>
            <input  v-model="newLink.titulo"
                    class="form-control" 
                    placeholder="Titulo" 
                    type="text"/>

            <label>Autor</label>
            <input  v-model="newLink.autor"
                    class="form-control" 
                    placeholder="Autor" 
                    type="text"/>

            <label>Url</label>
            <input  v-model="newLink.url"
                    class="form-control" 
                    placeholder="Url" 
                    type="text"/>

            <input type="submit" class="btn btn-success" value="Agregar link"/>
          </div>
          
        </form>
      </div>  
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Lista de Links</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(link,index) in links" v-bind:key="index">
              <td>
                <a target="_blank" v-bind:href="link.url">{{ link.titulo }}</a>
              </td>
              <td>
                {{link.autor}}
              </td>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>
</template>

<script>
import Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCPtHpUlaLXO0KubcK3sCnE3oNLqBo0YqE",
  authDomain: "vuefirebase-f0c31.firebaseapp.com",
  databaseURL: "https://vuefirebase-f0c31-default-rtdb.firebaseio.com",
  projectId: "vuefirebase-f0c31",
  storageBucket: "vuefirebase-f0c31.appspot.com",
  messagingSenderId: "882599444103",
  appId: "1:882599444103:web:6145972e0e0b7507278222",
  measurementId: "G-LXBHPFVCZ5"
}
Firebase.initializeApp(firebaseConfig);
let db = Firebase.database();
let linksRef = db.ref('links');

export default {
  name: 'App',
  firebase: {
    links: linksRef
  },
  data(){
    return {
      newLink: {
        titulo: '',
        autor: '',
        url: ''
      },
      links: []
    }
  },
  methods: {
    addLink: function() {
      linksRef.push(this.newLink);
      this.newLink.titulo = '';
      this.newLink.autor = '';
      this.newLink.url = '';
      this.$nextTick(function () {
        console.log(this.links); // => 'updated'
      })
    },
    readLinks: function() {
      linksRef.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {       
            this.links.push(childSnapshot);
            console.log(this.links); // => 'updated'
        });
      });
    }
  },
  mounted() {
    this.readLinks();
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
