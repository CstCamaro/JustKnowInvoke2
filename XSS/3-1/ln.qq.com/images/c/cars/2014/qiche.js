$(function() {
    var url = 'http://ln.qq.com/c/auto/auto20140211?'+Math.random();
    $.get(url,function(apidata){
        var obj = apidata.split('data=')[1].split('</script>')[0];
        var dataz = eval('('+obj+')');
        for(var K in dataz){
            for(SK in dataz[K]){
                switch(SK){
                    case '1':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '2':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '3':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '4':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '5':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '6':
                        brandContent(dataz[K][SK],SK);
                        break;
                    case '7':
                        brandContent(dataz[K][SK],SK);
                        break;
                    default:;
                }
            }
        }
                   function brandContent(type1,avx){
							//alert(type1);
							var html = '';
							var S = 0;
							for(ssk in type1){
									html += "<tr><td>"+type1[ssk]['serial_name']+"<\/td><td><span class='jieduan'><a href='"+type1[ssk]['model_url']+"' target='_blank'>"+type1[ssk]['model_name']+"<\/a><\/span><\/td><td class='price1'><span>"+type1[ssk]['guide_price']+"<\/span>Íò<\/td><td class='price2'><span>"+type1[ssk]['shop_price']+"<\/span>Íò<\/td><td><a href='"+type1[ssk]['dealer_url']+"' target='_blank'>"+type1[ssk]['short_name']+"<\/a><\/td><\/tr>";
							}
							S++;
							if(avx==1){
								$('#bas01').html(html);	
							}else if(avx==2){
								$('#bas02').html(html);		
							}else if(avx==3){
								$('#bas03').html(html);		
							}else if(avx==4){
								$('#bas04').html(html);		
							}else if(avx==5){
								$('#bas05').html(html);		
							}else if(avx==6){
								$('#bas06').html(html);		
							}else if(avx==7){
								$('#bas07').html(html);		
							}

        };
    });
});/*  |xGv00|20532885ea7b2982e4d6e44c768b60bc */