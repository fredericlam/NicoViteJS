
<!--

  <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/700002535?h=3d3cae22e3&autoplay=1&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

-->

<template>
  
  <nav class="site-header sticky-top py-1">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
      </a>
      <a class="py-2 d-none d-md-inline-block" href="#">Tour</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Product</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Features</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Enterprise</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Support</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Pricing</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Cart</a>
    </div>
  </nav>

  <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <h1 class="display-4 font-weight-normal">Punny headline</h1>
      <p class="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
      <a class="btn btn-outline-secondary" href="#">Coming soon</a>
    </div>
    <div class="product-device box-shadow d-none d-md-block"></div>
    <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
  </div>

  
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

import { reactive,computed } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

</script>


<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html{
  
  background: #000 !important; 
  color: #fff ; 
  overflow-x: hidden ; 

  a{
    color: #fff !important;
  }

  body{
    background: #000 !important; 
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

    main{
      width: 100%; 
      section{
        padding-top: 10vh !important; 
        h2{
          color: #fff!important ; 
        }
      }
    }
  }
}
</style>
