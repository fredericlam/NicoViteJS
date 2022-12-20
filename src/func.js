export default {
	
    bindMainImage: function( w )
    {

        let sd = 500 , md = 1000 , hd = 1500 ; 

        w.path = `/pictures/work/${w.folder}/main-${md}.jpg` ; 
        w.default = `/pictures/work/${w.folder}/main-${md}.jpg` ; 
        w.sd = `/pictures/work/${w.folder}/main-${sd}.jpg` ; 
        w.hd = `/pictures/work/${w.folder}/main-${hd}.jpg` ; 
        w.route = `/project/${w.folder}`;
        return w ; 
    }, 


    bindGaleryImage: function( w , index , prefix )
    {
        let sd = 600 , md = 1200 , hd = 1920 ; 

        let g = {} ; 

        if ( prefix == 'mc'){
            sd = 500 ; md = 1000 ; hd = 1380 ; 
        }

        g.path = `/pictures/work/${w.folder}/gallery/${prefix}-${index}-${md}.jpg` ; 
        g.default = `/pictures/work/${w.folder}/gallery/${prefix}-${index}-${md}.jpg` ; 
        g.sd = `/pictures/work/${w.folder}/gallery/${prefix}-${index}-${sd}.jpg` ; 
        g.hd = `/pictures/work/${w.folder}/gallery/${prefix}-${index}-${hd}.jpg` ; 
        return g ; 
    }
}