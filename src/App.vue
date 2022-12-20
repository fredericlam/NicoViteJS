
<!--

  <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/700002535?h=3d3cae22e3&autoplay=1&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

-->

<template>

  <header>
      <div class="navbar_container">
        <div class="container d-flex justify-content-between">
          <nav class="navbar navbar-light navbar-expand-lg">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Nicolas Berteyac - Directeur de la photographie</a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ms-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#work">Work</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#photos">Photos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#contact">Contact</a>
                </li>
              </ul>
              
            </div>
          </nav>
        </div>
      </div>
  </header>

  <main role="main">
    <router-view />
  </main>

  <footer>
    <div clas="row">
      © {{ year }} - All Rights Reserved - Nicolas Berteyac - Directeur de la photographie
    </div>
  </footer>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

import { reactive,computed } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

defineProps({
  year: String
})

const year = new Date().getFullYear() ; 

</script>


<style lang="scss">

@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');

html{
  
  background: #000 !important; 
  color: #fff ; 
  overflow-x: hidden ; 

  a{
    color: #fff !important;
  }

  a.link{
    cursor: pointer ; 
  }

  button.navbar-toggler{
    color: #fff ; 
    background-color: #fff;
  }

  body{
    background: #000 !important; 
    overflow-x: hidden;
    header,footer{
      left: 0;
      width:100%;
      text-align: center ; 
    }
    header{
      z-index: 2;
      top: 0 ; 
      padding: 0px 0 ; 
      position: fixed ; 
    }
    footer{
      padding: 30px 0 ; 
    }

    .navbar{
      width: 100%;
    }

    a.nav-link{
      display: block;
      position: relative;
      padding: 0.2em 0;
      margin: 0 20px ;
      &:hover{
        text-decoration: none!important; 
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.1em;
        background-color: #fff ;
        opacity: 0;
        transition: opacity 300ms, transform 300ms;
        opacity:1;
        transform: scale(0);
        transform-origin: center;
      }
      &:hover::after,
      &:focus::after{
        text-decoration: underline;
        transform: scale(1);
      }
    }

    h1{
      padding: 20px 0 ;
    }

    main{
      width: 100%; 
      section#container-home{
        padding-top: 100vh !important; 
        h2{
          color: #fff!important ; 
        }
      }
    }
  }
}
</style>
