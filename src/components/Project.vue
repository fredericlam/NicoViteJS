<script>
import { ref } from 'vue'
import axios from 'axios'
import works_json from './../assets/data/works.json'
import func from './../func.js'

export default {
  name: 'isotope_test',
  setup(){
   
  },
    data () {
    return {
      work : {} , 
      image : {} , 
      prev_work : {},
      next_work : {}
    }
  },
  // end vue app mounted
  mounted () {

    if ( this.$route.params.name == '' ) document.location.href = '/' ; 

    this.work = works_json.find( w => w.folder == this.$route.params.name )

    if ( this.work == undefined ) document.location.href = '/' ; 

    this.work = func.bindMainImage( this.work ) ;

    this.work.galery = [] ; 

    for ( var c = 1 ; c <= this.work.nb_items ; c++ ){
      this.work.galery.push({
        picture : func.bindGaleryImage( this.work , c , this.work.prefix )
      })
    }

    // console.info("this.work",this.work) ; 

    // set what is next and prev project
    this.prev_work = this.pageProject('prev'); 
    this.prev_work = func.bindMainImage(this.prev_work) ;

    this.next_work = this.pageProject('next'); 
    this.next_work = func.bindMainImage(this.next_work) ;

    console.info("prev_work",this.prev_work,this.next_work) ; 

    setTimeout(() => {
      
      $('[data-toggle="tooltip"]').tooltip({
        html : true
      })

      $('#container-project').css('opacity',1) ; 

    }, 250 )

  },   

  methods : {

    pageProject : function( dir ){

      let index = works_json.findIndex( w => w.folder == this.$route.params.name )

      let go_index_item = 0 ; 

      // 1st item
      if ( index == 0 && dir == "prev") 
        go_index_item = works_json.length - 1 ; 
      // last item 
      else if ( index == works_json.length - 1 && dir == "next") 
        go_index_item = 0 ;
      else if ( dir == "prev")
        go_index_item = index - 1 ; 
      else if ( dir == "next")
        go_index_item = index + 1 ; 

      // then find item by index
      let go_project = works_json[go_index_item] ; 

      return go_project;
    },

    goProject : function( dir ){

      let go_project = this.pageProject( dir ) ; 
      window.location.href = `/project/${go_project.folder}`;
    }

  }
}
</script>

<template>
  <section class="text-center" id="container-project">
    <div class="pb-3" id="block-work">
      <div class="col-lg-12 col-md-10 mx-auto">
        <div class="block-project">

          <a href="#" class="arrow-button prev-button" v-on:click="goProject('prev')" data-toggle="tooltip" data-html="true" data-placement="right" :title="'<span class=\'tooltip_title\'>'+prev_work.name+'</span><img class=\'tooltip_img\' src=\''+prev_work.sd+'\'>'">
            <i class="fas fa-arrow-left"></i>
          </a>

          <a href="#" class="arrow-button next-button" v-on:click="goProject('next')" data-toggle="tooltip" data-html="true" data-placement="left" :title="'<span class=\'tooltip_title\'>'+next_work.name+'</span><img class=\'tooltip_img\' src=\''+next_work.sd+'\'>'">
            <i class="fas fa-arrow-right"></i>
          </a>

          <img 
              class="card-img-top" :title="work.name" :alt="work.name"
              :src="work.path"
              :srcset="work.sd+' 600w,'+work.hd+' 1500w'"
              :sizes="'(max-width: 600px) 480px,(min-width: 1200px) 1500px'"
              />
          

          <figcaption>
            <footer class="row">
              <div class="col-xs-9 col-md-9">
                <a href="#" class="work-play" data-toggle="modal">
                  <i class="fas fa-play"></i>
                </a>
                <h1>{{ work.name }}</h1>
                <h2>{{ work.category }} , {{ work.director }} </h2>
              </div>
              <div class="col-xs-3 col-md-3 text-right">
                <p>{{ work.year }}</p>
              </div>
            </footer>
          </figcaption>

        </div>
      </div>
    </div>
    <div class="py-lg-3" id="block-gallery">
      <div id="container-grid-works">
        <div class="row">
          <div v-for="g in work.galery" class="col-lg-6 col-lg-6 col-xs-12">
            <a href="#" class="work-link">
              <figure>
                <img 
                  class="card-img-top" :title="work.name" :alt="work.name"
                  :src="g.picture.path"
                  :srcset="g.picture.sd+' 600w,'+g.picture.hd+' 1500w'"
                  :sizes="'(max-width: 600px) 480px,(min-width: 1200px) 1500px'"
                  />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  
</template>

<style lang="scss">

#container-project{
  opacity: 0 ; 
  transition: all 2s;
  min-height: 100vh ; 
  .block-project{
    position: relative ;
    a.arrow-button{
      display: block ; 
      margin: 0 20px ;
      position: absolute; 
      top: 50%;
      margin-top: -50px;
      cursor: pointer ; 
      z-index: 2;
      transition: all 0.3s ease-in-out;
      &:hover{
        i{
          color: #ccc ;
        }
      }
      &.next-button{
        right: 0;
      }
      i{
        font-size: 3em;
      }
    }
    figcaption{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0 30px; 
      footer{
        margin-top: auto;
        a.work-play{
          display: inline-block;
          border: solid 2px #fff ;
          padding: 2px 10px;
          position: absolute;
          left: 30px;
          /* top: -20px; */
          margin-top: -40px ;
          i{
            transition: all 0.3s ease-in-out;
          }
          &:hover{
            i{
              color: #ccc ; 
            }
          }
        }
        h1,h2{
          color: #fff ; 
          text-transform: uppercase; 
          text-align: left ; 
          font-size: 1em;
          padding: 5px 0 ; 
        }
        p{
          color: #fff ; 
          padding-top: 20px; 
          text-align: right; 
        }
      }
    }
  }
}

.tooltip{
  .tooltip-inner{
    text-transform: uppercase; 
    text-align: left ; 
    padding: 10px ;
    span.tooltip_title{
      display: block; 
      font-weight: bold; 
      padding-bottom: 5px;
    }
    img.tooltip_img{
      max-height: 90px;
      border: solid 1px #cccccc ;
    }
  }
}

</style>