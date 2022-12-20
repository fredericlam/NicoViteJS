<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
	name: 'isotope_test',
	setup(){
	 
	},
  	data () {
		return {
			works : []
		}
	},
	// end vue app mounted
	mounted () {

		for( var i = 0 ; i < 50 ; i++ )
			this.works.push({
				path : 'http://localhost:5173/pictures/work/lucioles/main-1000.jpg'
			})

		$('#container-home').imagesLoaded( ( instance ) => {
	        console.log('ALWAYS - all images have been loaded',instance);

	        $('#container-grid-works').isotope({
	          // options
	          itemSelector: '.work-card',
	          layoutMode: 'fitRows'
	        });

	      })
	}
}
</script>

<template>

	<section class="text-center" id="container-home">
		<div class="py-lg-5" id="works">
			<div class="col-lg-12 col-md-10 mx-auto">
				
			</div>
			<div id="container-grid-works">
				<div class="work-card" v-for="work in works">
	          		<img :src="work.path">
	          	</div>	
			</div>
		</div>
	</section>

</template>

<style lang="scss">
#container-home{
	width: 100%;
	#works{
		.work-card{
			width:50%;
			img{
				max-width: 100%;
			}
		}
	}
}
</style>