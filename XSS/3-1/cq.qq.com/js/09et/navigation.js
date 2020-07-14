function getObject(objectId) {
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId);
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId);
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
} 

function turn1(n){
	for(i=1;i<7;i++){
		if(n==i){
			getObject('lm1_'+i).className="now"
			getObject('content1_'+i).style.display=""
		}else{
			getObject('lm1_'+i).className=""
			getObject('content1_'+i).style.display="none"
		}
	}
}



function turn2(m,n){					
	for(i=1;i<4;i++){
		if(n==i){
			getObject('lm'+m+'_'+i).className="now"
			getObject('content'+m+'_'+i).style.display=""
		}else {
			getObject('lm'+m+'_'+i).className=""
			getObject('content'+m+'_'+i).style.display="none"
		}
		if(n==3){
			getObject('lm'+m+'_3').className="now end"
		}else{
			getObject('lm'+m+'_3').className="end"
		}					
	}						
}

function turn3(m,n){	
	if(n==1){
		getObject('lm'+m+'_'+1).className="now left"
		getObject('content'+m+'_'+1).style.display=""
		getObject('lm'+m+'_'+2).className="right"
		getObject('content'+m+'_'+2).style.display="none"
		}else {
		getObject('lm'+m+'_'+1).className="left"
		getObject('content'+m+'_'+1).style.display="none"
		getObject('lm'+m+'_'+2).className="now right"
		getObject('content'+m+'_'+2).style.display=""
	}			
}		/*  |xGv00|96e4ea80010b706326ea5c7f4d58eed4 */