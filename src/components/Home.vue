<script>
import { ref } from 'vue'
import axios from 'axios'
import works_json from './../assets/data/works.json'
import func from './../func.js'

export default {
  name: 'home',
  setup(){
  },
  data () {
    return {
      hash : '',
      apis : {
        'work' : './data/json/work.json' , 
        'galery' : './data/json/galery.json'
      } , 

      // dataset : 
      dataset : {
        work : [] , 
        resume : [] 
      } , 

      image : 'http://localhost:5173/pictures/work/lucioles/main-1000.jpg' , 

      works : [] ,

      works_group : [] , 

      photos : [] , 

      grid : {}
    }
  },
  // end vue app mounted
  mounted () {

    this.works = works_json ; 

    axios.all([

      // work
      axios.get( this.apis.galery ) ,

    ])

    // load promises
    .then( axios.spread( ( galery_promise ) => {
      
      let obj , groups = [] , cpt_group = 0  ; 

      this.works.map( w => {
        w = func.bindMainImage(w) ;
        return w  ; 
      })

      this.works_group = Array.from( d3.group( this.works , 
        d => d.category 
      )).map( m => {

        return {
          name : m[0].charAt(0).toUpperCase() + m[0].substring(1) , 
          slug : m[0] , 
          items : m[1]
        } ; 
      }) ;

      // console.info( "this.works_group", this.works_group ) ;          

      this.photos = galery_promise.data
        .filter( file => !file.picture.includes('full') )
        .map( file => {
          let f = file.picture.replace('./', '') ; 
          let thumb = f.replace('HD','thumbs') ; 
          let thumb_tmp = thumb.split('/') ; 
          thumb_tmp.splice( thumb_tmp.length - 1 , 0 , 'thumbs') 
          return {
            //dir : 'https://www.nicolasberteyac.com/' , 
            thumb : thumb_tmp.join('/') ,
            t : thumb_tmp , 
            path : f  
          }
        })
      // console.info("photos" , this.photos )

      $('#container-home').imagesLoaded( ( instance ) => {
        
        console.log('ALWAYS - all images have been loaded',instance);

        this.grid = $('#container-grid-works').isotope({
          // options
          itemSelector: '.work-card',
          layoutMode: 'fitRows'
        });

      })

    })) 

  } ,  // end mounted , 

  methods : {

    /**
    * Method converting g spreasheet row to object
    */
    rowToObject : ( row ) => {

      // director: Karin Albou, production: Karel, year: 2015, category: FEATURE FILM
      let obj = {} ,  values = row.split(',') , val = [] ; 
      for ( var v in values ){
        val = values[v].trim().split(': ') ; 
        // console.info("val",val[0].trim(),val[1].trim()) ; 
        obj[val[0].trim()] = val[1].trim() ; 
      }
      return obj ; 
    } , 

    filterWork : ( slug ) => {

      // $('#container-grid-works').isotope({ filter: ( slug != '*' ) ? `.${slug}` : '*' });
      $('#container-grid-works').isotope({ filter: ( slug != '*' ) ? `.${slug}` : '*' });

    } 

  }
}

</script>

<template>

  
  <section class="text-center" id="container-home">
    <div class="row" id="home">
      <div class="iframe-wrapper">
        <iframe src="https://player.vimeo.com/video/700002535?loop=1&autoplay=1&background=1&title=0&byline=0&portrait=0" style="position:absolute;width:100%;height:100%;background-color: #000;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>
      </div>
    </div>
    <div id="works" class="py-lg-5">
      <h1>Works</h1>
      <div class="container">
        <ul class="nav justify-content-center py-lg-5" id="nav_works">
          <li class="nav-item">
            <a class="nav-link active link" aria-current="page" v-on:click="filterWork('*')">All</a>
          </li>
          <li class="nav-item" v-for="menu in works_group">
            <a class="nav-link link" v-on:click="filterWork(menu.slug)">
              {{ menu.name }}
            </a>
          </li>
        </ul>
      </div>
      <div id="container-grid-works">
        <div :class="'work-card ' +work.category" v-for="work in works">
          <a href="#" class="work-link">
            <figure>
              <img 
                class="card-img-top" :title="work.name" :alt="work.name"
                :src="work.path"
                :srcset="work.sd+' 600w,'+work.hd+' 1500w'"
                :sizes="'(max-width: 600px) 480px,(min-width: 1200px) 1500px'"
                />
              <div class="work-wrapper">
                <div class="work-desc">
                  <figcaption>
                    <main>
                      <a href="#" class="work-button work-play" data-toggle="modal" data-target=".bs-example-modal-lg-641">
                        <i class="fas fa-play"></i>
                      </a>
                      <a :href="work.route" class="work-button work-more">
                        <i class="fas fa-plus"></i>
                      </a>
                    </main> 
                    <footer class="row">
                      <div class="col-xs-9 col-md-9">
                        <h2>{{ work.name }}</h2>
                        <h3>{{ work.category }}, {{ work.director }} </h3>
                      </div>
                      <div class="col-xs-3 col-md-3 text-right">
                        <p>{{ work.year }} </p>
                      </div>
                    </footer>
                  </figcaption>
                </div>
              </div>
            </figure>
          </a>
        </div>
      </div>
    </div>

    <div id="photos" class="row py-lg-5">
      <div class="col-lg-10 col-md-8 mx-auto">
        <h1>Photos</h1>
        <div class="row py-lg-5">
          <div class="py-lg-2 col-lg-3 col-md-6 col-xs-12" v-for="picture in photos">
            <div class="galery-card">
              <img :src="'https://www.nicolasberteyac.com/' + picture.thumb " class="card-img-top">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row py-lg-5" id="contact">
      <div class="py-lg-5 col-lg-12 col-md-8 mx-auto contact-delimiter">
        <h1>Contact 1</h1>
        <p>
          <span>nicolas.berteyac@gmail.com</span><br/>
          <span>+33 6 80 54 03 56</span><br/>
          <a href="https://www.imdb.com/name/nm2952837/" target="_blank" class="hover_itm">
            <img src="../../src/assets/img/imdb.svg" title="IMDB" class="row py-lg-2 mx-auto">
            <span>Filmography IMDB</span>
          </a>
        </p>
      </div>

      <div class="py-lg-5 col-lg-12 col-md-8 mx-auto contact-delimiter">
        <h1>Contact 2</h1>
        <div class="row py-lg-5">
          <div class="col-lg-3 col-md-3 col-xs-12 mx-auto">
            <a href="mailto:nicolas.berteyac@gmail.com" class="hover_itm">
              <img src="../../src/assets/img/email.svg" title="Email" class="row py-lg-2 mx-auto">
              <span>nicolas.berteyac@gmail.com</span>
            </a>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 mx-auto">
            <a href="tel:+33 6 80 54 03 56" class="hover_itm">
              <img src="../../src/assets/img/telephone.svg" title="Phone" class="row py-lg-2 mx-auto">
              <span>+33 6 80 54 03 56</span>
            </a>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 mx-auto">
            <a href="https://wa.me/33680540356" target="_blank" class="hover_itm">
              <img src="../../src/assets/img/whatsapp.svg" title="Whatspp"  class="row py-lg-2 mx-auto">
              <span>+33 6 80 54 03 56</span>
          </a>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 mx-auto">
            <a href="https://www.imdb.com/name/nm2952837/" target="_blank" class="hover_itm">
              <img src="../../src/assets/img/imdb.svg" title="IMDB" class="row py-lg-2 mx-auto">
              <span>Filmography IMDB</span>
            </a>
          </div>
        </div>
      </div>
    </div>

  </section>



</template>

<style lang="scss">

.iframe-wrapper {
  position: absolute ;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

/* Make the iframe keep an aspect ratio, and
position it in the middle of its parent wrapper*/

.iframe-wrapper iframe {
  width: 100vw;
  height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
  min-height: 100vh;
  min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

section{
  h2{
    padding: 30% ; 
  }
  
  #container-grid-works{
    width: 100%; 
  }

  #works{
    .work-card{
      width:50%;
      a.work-link{
        display: block ; 
        width: 100% ; 
        height: 100% ; 
        position: relative;
        figure{
          margin: 0 ;
          .work-wrapper{
            transition: all 0.3s ease-in-out;
            width: 100% ; 
            height: 100% ; 
            position: absolute;
            left: 0;
            top: 0;
            padding: 20px ; 
            .work-desc{
              figcaption {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 0 30px ;
                main{
                  a.work-button{
                    font-size: 14px;
                    color: #fff;
                    border: solid 2px #fff;
                    padding: 15px 18px;
                    margin: 0 5px ;
                    margin-top: 0% ;
                    opacity: 0 ;  
                    display: inline-block;
                    transition: all 0.3s ease-in-out;
                  }
                }
                footer{
                  position: absolute;
                  padding: 0 30px;
                  bottom: 30px;
                  h2 {
                    font-size: .8em ;
                    letter-spacing: .5px;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    margin-bottom: 0px !important;
                    margin-top: 25px;
                    padding: 0 ;
                    text-align: left ; 
                  }
                  h3 {
                    font-size: .6em;
                    letter-spacing: .5px;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    margin-top: 5px;
                    text-align: left ; 
                  }
                  p {
                    font-size: .8em ;
                    letter-spacing: .5px;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    margin-top: 43px;
                    text-align: right ; 
                  }
                }
              }
            }
          }
        }
        &:hover{
          .work-wrapper{
            background: rgba(5, 5, 5, 0.3);
          }
          figure .work-wrapper .work-desc figcaption main a.work-button{
            margin-top: 20% ;
            opacity: 1 ;  
          }
        }
        img{
          max-width: 100%;
        }
      }
    }
  }

  #contact{
    a{
      display: inline-block;
      position: relative;
      text-decoration: none ; 
      &:hover{
        text-decoration: none!important; 
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
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
      img{
        display: inline-block;
        max-height: 40px;
      }
      span{
        width: 100%;
        display: inline-block;
      }
    }
  }
}

@media( max-width: 768px){
  section{
    #works{
      .work-card{
        width:100%;
      }
    }
  }
}


</style>