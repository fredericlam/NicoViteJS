<?php
	// phpinfo(); 
	
	header('Content-Type: application/json; charset=utf-8');

	$pictures = array() ; 

	function scandir($dir,$listDirectories=false, $skipDots=true) {
	    $dirArray = array();
	    if ($handle = opendir($dir)) {
	        while (false !== ($file = readdir($handle))) {
	            if (($file != "." && $file != "..") || $skipDots == true) {
	                if($listDirectories == false) { if(is_dir($file)) { continue; } }
	                array_push($dirArray,basename($file));
	            }
	        }
	        closedir($handle);
	    }
	    return $dirArray;
	}

	function getAllContentOfLocation($loc)
	{
	    $scandir = scandir($loc);

	    if (empty($scandir)) {
	        // echo '<p style="color:red">Empty Dir</p>';
	    }

	    // var_dump($scandir) ; 

	    foreach ($scandir as $file) {
	        $baseLink = $loc.DIRECTORY_SEPARATOR.$file;
	        //array_push($pictures,$baseLink); 
	        echo json_encode(array("picture"=>$baseLink));
	        //echo '<ol>';
	        if (is_dir($baseLink)) {
	            //echo '<p style="font-weight:bold;color:blue">'.$file.'</p>';
	            getAllContentOfLocation($baseLink);
	        } else {
	            //echo $file.'';
	        }
	        // echo '</ol>';
	    }
	}
	//Call function and set location that you want to scan
	getAllContentOfLocation( $_SERVER['DOCUMENT_ROOT'] . '/galery/');

	// var_dump($pictures) ; 

