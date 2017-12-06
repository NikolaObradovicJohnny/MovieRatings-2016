$(document).ready(function(){
	
	alert(sessionStorage.idUlogovan);
	if (sessionStorage.idCategoryUlogovan != "0") {
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	} else if(sessionStorage.idCategoryUlogovan == "undefined"){
		window.location.replace("http://localhost:8080/ProjekatOSA/login.html");
	}
	
	//popuni combo boks sa kategorijama
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/categories",
		method: "GET",
		dataType: "json",
		success: function(response) {

			alert("prikazi kategoruje");
			for(var i=0; i<response.length; i++) {

				var kategorija = response[i];
				
				var newOption = $("<option id=\"option"+kategorija.id+"\" value=" + kategorija.id + ">" + kategorija.name + "</option>");
				var newOption2 = $("<option value=" + kategorija.id + ">" + kategorija.name + "</option>");
					
				$("#selectIzaberiKategoriju").append(newOption);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	//00 klik na izaberi kategoriju
	$("#izaberiKategorijuSubmit").click(function(){
		alert("izaberi klik");
		var idKategorije = $("#selectIzaberiKategoriju").val();
		
		alert(idKategorije);
		
		$.ajax({
	        url: "http://localhost:8080/ProjekatOSA/api/categories/"+idKategorije+"",
	        type: "GET",
	        contentType: 'application/json',
			dataType: "json",
	        success: function(response){
	            alert(response);
	            alert(JSON.stringify(response));
	            
	            var kategorija = response;
	            
	            var lblID = $("#idCategory");
	        	var lblNAME = $("#nameCategoryInput");
	        	
	        	lblID.val(kategorija.id);
	        	lblNAME.val(kategorija.name);
	            
	        },error: function(request, options, error){
	            alert("nije proslo");
	            alert(error);
	            alert("ERRORCINA");
	        }
	    });
	});
	
	
	// izmena kategorije
    $("#izmeniKategorijuSubmit").click(function(){
       
        var id = $("#idCategory");
        var naziv = $("#nameCategoryInput");
        
        var zanr = {
        		"id": id.val(),
                "name": naziv.val()
            }
        alert(zanr);
        alert(JSON.stringify(zanr));
        
        $.ajax({
            url: "http://localhost:8080/ProjekatOSA/api/categories/"+id.val()+"",
            type: "PUT",
            contentType: 'application/json',
			dataType: "json",
            data: JSON.stringify(zanr),
            success: function(response){
                alert(response);
                alert(JSON.stringify(response));
            },error: function(request, options, error){
                alert("nije proslo");
                alert(error);
                alert("ERRORCINA");
            }
        });
        
        
    });
    
    
  //........odjava
	$("#idOdjava").click(function(){
		alert("ODJAVLJIVANJE");
		sessionStorage.removeItem("idUlogovan");
		sessionStorage.removeItem("usernameUlogovan");
		sessionStorage.removeItem("idCategoryUlogovan");
		
		window.location.replace("http://localhost:8080/ProjekatOSA/index.html");
		
	});
	
	
});