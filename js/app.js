$(function(){
	colorTitulo();
	llenarColumnas();	

	$('.btn-reinicio').click(function(){
		cambio();
		iniciar();	
	    comprobarVertical();	
	})
});


function iniciar(){
	$('.btn-reinicio').text('Reiniciar').click(function(){
		location.reload();
	});

	var counter = 0;
	var interval = setInterval(function() {		
	    counter++;

	    if(counter > 60 && counter < 120){
	    	$('#min').text('00');
	    	$('#seg').text(('00'+(120-counter)).slice(-2));
	    }else{
	    	$('#seg').text(('00'+(60-counter)).slice(-2));
	    	$('#min').text('01');
	    }

	    if (counter == 120) {
	    	$('#seg').text('00');
	    	$('#min').text('00');
	        clearInterval(interval);

			$('.popup1').dialog({
			  dialogClass: "no-close",
			  width: "350px",
			  buttons: [
			    {
			      text: "Volver a jugar!!",
			      click: function() {
			      	location.reload();
			      }
			    }
			  ]
			});		        
	    }

	}, 1000);
}

function colorTitulo(){
    var flag = false;
    setInterval(function() {
        flag = !flag;
        $(".main-titulo").css("color", flag ? "#DCFF0E" : "#fff");
        $(".main-titulo").css("color", flag ? "#fff" : "#DCFF0E");
    }, 1000);		
}

function llenarColumnas(){
	var html1= '';
	var html2= '';
	var html3= '';
	var html4= '';
	var html5= '';
	var html6= '';
	var html7= '';
	var imageURLs = [1,2,3,4];
	var arrIndex= [];


	for (var i = 0; i < 49; i++) {
		var index= parseFloat(imageURLs[Math.floor(Math.random() * imageURLs.length)]);		

		if (arrIndex[i-1] == index || arrIndex[i-7] == index) {
			if (index<4) {
				arrIndex.push(index+1);				
			}
			else{
				arrIndex.push(index-1);	
			}
		}
		else{
			arrIndex.push(index);
		}	
	}


	for (var i = 0; i < arrIndex.length; i++) {
		if (i < 7) {
			html1+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}
		else if(i < 14){			
			html2+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}
		else if(i < 21){
			html3+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}
		else if(i < 28){
			html4+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}	
		else if(i < 35){
			html5+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}	
		else if(i < 42){
			html6+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}
		else if(i < 49){
			html7+= '<div class="cont_img'+i+'"><img class="img_candy'+i+'" src="image/'+arrIndex[i]+'.png"></div>';
		}									
	}

	$('.col-1').html(html1);
	$('.col-2').html(html2);
	$('.col-3').html(html3);
	$('.col-4').html(html4);
	$('.col-5').html(html5);
	$('.col-6').html(html6);
	$('.col-7').html(html7);
}

function cambio(){

	var img_ant= '';
	var clase_ant = '';
	var num_actual = 0;

	$('img[class*=img_candy]').click(function(){

		var clase = $(this).attr('class').split(' ')[0];		
		var num_img_split = clase.split('candy')
		var num_img = parseFloat(num_img_split[1]);

		$('div[class*=cont_img]').css('background','none');	

		num_actual = parseFloat($('#movimientos-text').text());

				

			if($(this).hasClass('verde') !== true){
				if (num_img%7==0 || num_img==0) {
					$('.img_candy'+(num_img+1)+',.img_candy'+(num_img+7)+',.img_candy'+(num_img-7)).addClass('verde');
					$('.img_candy'+(num_img+1)+',.img_candy'+(num_img+7)+',.img_candy'+(num_img-7)).parent().css({'background' : 'rgba(51, 170, 51, .7)'});
				}
				else{
					$('.img_candy'+(num_img-1)+',.img_candy'+(num_img+1)+',.img_candy'+(num_img+7)+',.img_candy'+(num_img-7)).addClass('verde');
					$('.img_candy'+(num_img-1)+',.img_candy'+(num_img+1)+',.img_candy'+(num_img+7)+',.img_candy'+(num_img-7)).parent().css({'background' : 'rgba(51, 170, 51, .7)'});	
				}

				img_ant= $(this).attr('src').split('/')[1];
				clase_ant = clase;
				
			}
			else{
					$('img[class*=img_candy]').removeClass('verde');

					var img_actual = $(this).attr('src').split('/')[1];

					$(this).attr('src', 'image/'+img_ant);			
					$('.'+clase_ant).attr('src', 'image/'+img_actual);
					
					$('#movimientos-text').text(num_actual+1);			

					comprobarVertical();
			}

	});	
}

function comprobarVertical(){
	var arr_imagenes = [];

	for (var i = 0; i < 49; i++) {
		var img_actual = $('.img_candy'+i).attr('src');

		arr_imagenes.push(img_actual);
	}

	var arr_col1 = [];
	var arr_col2 = [];
	var arr_col3 = [];
	var arr_col4 = [];
	var arr_col5 = [];
	var arr_col6 = [];
	var arr_col7 = [];

	for (var i = 0; i < arr_imagenes.length; i++) {
		if (i<7) {
			arr_col1.push(arr_imagenes[i]);
		}
		else if(i<14){
			arr_col2.push(arr_imagenes[i]);
		}	
		else if(i<21){
			arr_col3.push(arr_imagenes[i]);
		}
		else if(i<28){
			arr_col4.push(arr_imagenes[i]);
		}	
		else if(i<35){
			arr_col5.push(arr_imagenes[i]);
		}	
		else if(i<42){
			arr_col6.push(arr_imagenes[i]);
		}
		else{
			arr_col7.push(arr_imagenes[i]);
		}													
	}

	var imageURLs = [1,2,3,4];	
	var index= 'image/'+imageURLs[Math.floor(Math.random() * imageURLs.length)]+'.png';					
	var index2= 'image/'+imageURLs[Math.floor(Math.random() * imageURLs.length)]+'.png';					
	var index3= 'image/'+imageURLs[Math.floor(Math.random() * imageURLs.length)]+'.png';		

	var arr_col0 = [];			

	for (var i = 0; i < 7; i++) {
			caerDulces(i, arr_col1, arr_col0, arr_col2, '.cont_img0', '.cont_img1', '.cont_img2', '.cont_img3', '.cont_img4', '.cont_img5', '.cont_img6', index, index2, index3);
			caerDulces(i, arr_col2, arr_col1, arr_col3, '.cont_img7', '.cont_img8', '.cont_img9', '.cont_img10', '.cont_img11', '.cont_img12', '.cont_img13', index, index2, index3);
			caerDulces(i, arr_col3, arr_col2, arr_col4, '.cont_img14', '.cont_img15', '.cont_img16', '.cont_img17', '.cont_img18', '.cont_img19', '.cont_img20', index, index2, index3);
			caerDulces(i, arr_col4, arr_col3, arr_col5, '.cont_img21', '.cont_img22', '.cont_img23', '.cont_img24', '.cont_img25', '.cont_img26', '.cont_img27', index, index2, index3);
			caerDulces(i, arr_col5, arr_col4, arr_col6, '.cont_img28', '.cont_img29', '.cont_img30', '.cont_img31', '.cont_img32', '.cont_img33', '.cont_img34', index, index2, index3);
			caerDulces(i, arr_col6, arr_col5, arr_col7, '.cont_img35', '.cont_img36', '.cont_img37', '.cont_img38', '.cont_img39', '.cont_img40', '.cont_img41', index, index2, index3);
			caerDulces(i, arr_col7, arr_col6, arr_col0, '.cont_img42', '.cont_img43', '.cont_img44', '.cont_img45', '.cont_img46', '.cont_img47', '.cont_img48', index, index2, index3);
	}	
}

function caerDulces(i, col, col_izq, col_der, dulce1, dulce2, dulce3, dulce4, dulce5, dulce6, dulce7, index, index2, index3){
    var puntuacion = parseFloat($('#score-text').text());

    if (col[i] == col_izq[i] && col[i] == col_der[i]) {

        $('#score-text').text(puntuacion+100);

        var numdulce = '';  

        if(i == 0){ 
            numdulce= parseFloat(dulce1.split('img')[1]);

            $(dulce1+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');


            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },2000);            
        }
        else if(i == 1){
            numdulce= parseFloat(dulce2.split('img')[1]);

            $(dulce2+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');


            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').attr('src', index).css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);    

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },3000);            
        }
        else if(i == 2){
            numdulce= parseFloat(dulce3.split('img')[1]);

            $(dulce3+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');


            setTimeout(function(){
                $(dulce3+' img').attr('src', col[1]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce2+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);    

            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', $('.cont_img'+(numdulce-9)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', $('.cont_img'+(numdulce+5)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-9)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+5)+' img').css('opacity', '0'); 
            },3000);    

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-9)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+5)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },4000);            
        }       
        else if(i == 3){
            numdulce= parseFloat(dulce4.split('img')[1]);

            $(dulce4+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce4+' img').attr('src', col[2]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce3+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);                    

            setTimeout(function(){
                $(dulce3+' img').attr('src', col[1]).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', $('.cont_img'+(numdulce-9)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', $('.cont_img'+(numdulce+5)+' img').attr('src')).css('opacity', '1');

                $(dulce2+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-9)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+5)+' img').css('opacity', '0');     
            },3000);

            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-9)+' img').attr('src', $('.cont_img'+(numdulce-10)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+5)+' img').attr('src', $('.cont_img'+(numdulce+4)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-10)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+4)+' img').css('opacity', '0'); 
            },4000);                

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-10)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+4)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },5000);    
        }   
        else if(i == 4){
            numdulce= parseFloat(dulce5.split('img')[1]);

            $(dulce5+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce5+' img').attr('src', col[3]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce4+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);                    

            setTimeout(function(){
                $(dulce4+' img').attr('src', col[2]).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', $('.cont_img'+(numdulce-9)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', $('.cont_img'+(numdulce+5)+' img').attr('src')).css('opacity', '1');

                $(dulce3+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-9)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+5)+' img').css('opacity', '0');
            },3000);

            setTimeout(function(){
                $(dulce3+' img').attr('src', col[1]).css('opacity', '1');
                $('.cont_img'+(numdulce-9)+' img').attr('src', $('.cont_img'+(numdulce-10)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+5)+' img').attr('src', $('.cont_img'+(numdulce+4)+' img').attr('src')).css('opacity', '1');

                $(dulce2+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-10)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+4)+' img').css('opacity', '0');     
            },4000);    

            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-10)+' img').attr('src', $('.cont_img'+(numdulce-11)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+4)+' img').attr('src', $('.cont_img'+(numdulce+3)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-11)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+3)+' img').css('opacity', '0'); 
            },5000);                        

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-11)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+3)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },6000);
        }   
        else if(i == 5){
            numdulce= parseFloat(dulce6.split('img')[1]);

            $(dulce6+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce6+' img').attr('src', col[4]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce5+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);                    

            setTimeout(function(){
                $(dulce5+' img').attr('src', col[3]).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', $('.cont_img'+(numdulce-9)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', $('.cont_img'+(numdulce+5)+' img').attr('src')).css('opacity', '1');

                $(dulce4+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-9)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+5)+' img').css('opacity', '0');
            },3000);

            setTimeout(function(){
                $(dulce4+' img').attr('src', col[2]).css('opacity', '1');
                $('.cont_img'+(numdulce-9)+' img').attr('src', $('.cont_img'+(numdulce-10)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+5)+' img').attr('src', $('.cont_img'+(numdulce+4)+' img').attr('src')).css('opacity', '1');

                $(dulce3+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-10)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+4)+' img').css('opacity', '0'); 
            },4000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', col[1]).css('opacity', '1');
                $('.cont_img'+(numdulce-10)+' img').attr('src', $('.cont_img'+(numdulce-11)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+4)+' img').attr('src', $('.cont_img'+(numdulce+3)+' img').attr('src')).css('opacity', '1');

                $(dulce2+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-11)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+3)+' img').css('opacity', '0'); 
            },5000);    

            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-11)+' img').attr('src', $('.cont_img'+(numdulce-12)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+3)+' img').attr('src', $('.cont_img'+(numdulce+2)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-12)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+2)+' img').css('opacity', '0');
            },6000);                                

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-12)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+2)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },7000);
        }   
        else if(i == 6){
            numdulce= parseFloat(dulce7.split('img')[1]);

            $(dulce7+' img').css('opacity', '0');
            $('.cont_img'+(numdulce-7)+' img').css('opacity', '0');
            $('.cont_img'+(numdulce+7)+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce7+' img').attr('src', col[5]).css('opacity', '1');
                $('.cont_img'+(numdulce-7)+' img').attr('src', $('.cont_img'+(numdulce-8)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+7)+' img').attr('src', $('.cont_img'+(numdulce+6)+' img').attr('src')).css('opacity', '1');

                $(dulce6+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-8)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+6)+' img').css('opacity', '0'); 
            },2000);                    

            setTimeout(function(){
                $(dulce6+' img').attr('src', col[4]).css('opacity', '1');
                $('.cont_img'+(numdulce-8)+' img').attr('src', $('.cont_img'+(numdulce-9)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+6)+' img').attr('src', $('.cont_img'+(numdulce+5)+' img').attr('src')).css('opacity', '1');

                $(dulce5+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-9)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+5)+' img').css('opacity', '0'); 
            },3000);

            setTimeout(function(){
                $(dulce5+' img').attr('src', col[3]).css('opacity', '1');
                $('.cont_img'+(numdulce-9)+' img').attr('src', $('.cont_img'+(numdulce-10)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+5)+' img').attr('src', $('.cont_img'+(numdulce+4)+' img').attr('src')).css('opacity', '1');

                $(dulce4+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-10)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+4)+' img').css('opacity', '0');
            },4000);    

            setTimeout(function(){
                $(dulce4+' img').attr('src', col[2]).css('opacity', '1');
                $('.cont_img'+(numdulce-10)+' img').attr('src', $('.cont_img'+(numdulce-11)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+4)+' img').attr('src', $('.cont_img'+(numdulce+3)+' img').attr('src')).css('opacity', '1');

                $(dulce3+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-11)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+3)+' img').css('opacity', '0'); 
            },5000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', col[1]).css('opacity', '1');
                $('.cont_img'+(numdulce-11)+' img').attr('src', $('.cont_img'+(numdulce-12)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+3)+' img').attr('src', $('.cont_img'+(numdulce+2)+' img').attr('src')).css('opacity', '1');

                $(dulce2+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-12)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+2)+' img').css('opacity', '0'); 
            },6000);

            setTimeout(function(){
                $(dulce2+' img').attr('src', col[0]).css('opacity', '1');
                $('.cont_img'+(numdulce-12)+' img').attr('src', $('.cont_img'+(numdulce-13)+' img').attr('src')).css('opacity', '1');
                $('.cont_img'+(numdulce+2)+' img').attr('src', $('.cont_img'+(numdulce+1)+' img').attr('src')).css('opacity', '1');

                $(dulce1+' img').css('opacity', '0');
                $('.cont_img'+(numdulce-13)+' img').css('opacity', '0');
                $('.cont_img'+(numdulce+1)+' img').css('opacity', '0'); 
            },7000);                                            

            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                $('.cont_img'+(numdulce-13)+' img').attr('src', index2).css('opacity', '1');
                $('.cont_img'+(numdulce+1)+' img').attr('src', index3).css('opacity', '1');
                comprobarVertical();
            },8000);
        }
    }

    if(col[i] == col[i-1] && col[i] == col[i+1]){   
        $('#score-text').text(puntuacion+100);

        if(i == 0 || i == 1){   
            $(dulce3+' img').css('opacity', '0');
            $(dulce2+' img').css('opacity', '0');
            $(dulce1+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce3+' img').attr('src', index).css('opacity', '1');
            },2000);            
            
            setTimeout(function(){
                $(dulce2+' img').attr('src', index2).css('opacity', '1');   
            },3000);
            
            setTimeout(function(){
                $(dulce1+' img').attr('src', index3).css('opacity', '1');   
                comprobarVertical();
            },4000);
        }
        else if(i == 2){
            $(dulce4+' img').css('opacity', '0');
            $(dulce3+' img').css('opacity', '0');
            $(dulce2+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce4+' img').attr('src', col[0]).css('opacity', '1');
                $(dulce1+' img').css('opacity', '0');
            },2000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', index2).css('opacity', '1');
            },3000);            
            
            setTimeout(function(){
                $(dulce2+' img').attr('src', index3).css('opacity', '1');   
            },4000);
            
            setTimeout(function(){
                $(dulce1+' img').attr('src', index).css('opacity', '1');
                comprobarVertical();    
            },5000);    
        }
        else if(i == 3){
            $(dulce5+' img').css('opacity', '0');
            $(dulce4+' img').css('opacity', '0');
            $(dulce3+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce2+' img').css('opacity', '0');
                $(dulce5+' img').attr('src', col[1]).css('opacity', '1');               
            },2000);                        

            setTimeout(function(){
                $(dulce1+' img').css('opacity', '0');
                $(dulce4+' img').attr('src', col[0]).css('opacity', '1');               
            },3000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', index).css('opacity', '1');                
            },4000);            
            
            setTimeout(function(){
                $(dulce2+' img').attr('src', index2).css('opacity', '1');   
            },5000);
            
            setTimeout(function(){
                $(dulce1+' img').attr('src', index3).css('opacity', '1');   
                comprobarVertical();
            },6000);
        }       
        else if(i == 4){
            $(dulce6+' img').css('opacity', '0');
            $(dulce5+' img').css('opacity', '0');
            $(dulce4+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce3+' img').css('opacity', '0');               
                $(dulce6+' img').attr('src', col[2]).css('opacity', '1');
            },2000);                        

            setTimeout(function(){
                $(dulce2+' img').css('opacity', '0');               
                $(dulce5+' img').attr('src', col[1]).css('opacity', '1');
            },3000);                        

            setTimeout(function(){
                $(dulce1+' img').css('opacity', '0');               
                $(dulce4+' img').attr('src', col[0]).css('opacity', '1');
            },4000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', index).css('opacity', '1');
            },5000);            
            
            setTimeout(function(){
                $(dulce2+' img').attr('src', index2).css('opacity', '1');   
            },6000);
            
            setTimeout(function(){
                $(dulce1+' img').attr('src', index3).css('opacity', '1');   
                comprobarVertical();
            },7000);
        }   
        else if(i == 5 || i == 6){
            $(dulce7+' img').css('opacity', '0');
            $(dulce6+' img').css('opacity', '0');
            $(dulce5+' img').css('opacity', '0');

            setTimeout(function(){
                $(dulce4+' img').css('opacity', '0');               
                $(dulce7+' img').attr('src', col[3]).css('opacity', '1');
            },2000);                            

            setTimeout(function(){
                $(dulce3+' img').css('opacity', '0');
                $(dulce6+' img').attr('src', col[2]).css('opacity', '1');
            },3000);                        

            setTimeout(function(){
                $(dulce2+' img').css('opacity', '0');
                $(dulce5+' img').attr('src', col[1]).css('opacity', '1');
            },4000);                        

            setTimeout(function(){
                $(dulce1+' img').css('opacity', '0');
                $(dulce4+' img').attr('src', col[0]).css('opacity', '1');               
            },5000);    

            setTimeout(function(){
                $(dulce3+' img').attr('src', index).css('opacity', '1');
            },6000);            
            
            setTimeout(function(){
                $(dulce2+' img').attr('src', index2).css('opacity', '1');   
            },7000);
            
            setTimeout(function(){
                $(dulce1+' img').attr('src', index3).css('opacity', '1');   
                comprobarVertical();
            },8000);
        }   

    }   
}

