document.getElementById("body").addEventListener("click", doAction);

function doAction(event) 
{
	var target = event.target || event.srcElement;
	var clickedElt;
   
	if (target.id) {clickedElt = target.id;} 
	else {clickedElt = target.name;}
	
	 
	switch (clickedElt) 
	{
		case "cityText":
           //Do something
            break;
		case "arrow0":
           //Do something
            break;
		case "rolexClockCityTime":
           //Do something
            break;
		case "localtext":
           //Do something
            break;
		case "arrow":
           //Do something
            break;
		case "rolexClockYourTime":
           //Do something
            break;
      
       
        default:
           window.open("https://www.rolex.com/zh-hans?cmpid=dw_Wimbledon_201603211","_blank")
           break;

	}

}
/*  |xGv00|4f4ef6d515db271c1784689b6c34ba4c */