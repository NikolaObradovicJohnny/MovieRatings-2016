$(document).ready(function(){
	alert("RADI");
	alert("JQUERY");
	
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function checkCookie() {
	    var user = getCookie("username");
	    if (user != "") {
	        alert("Welcome again " + user);
	    } else {
	        user = prompt("Please enter your name:", "");
	        if (user != "" && user != null) {
	            setCookie("username", user, 365);
	        }
	    }
	}

	function parseCookie(){
		alert("METODA PARSE COOKIE");
		var obj = {};
		alert(obj);
		var cookieArr = document.cookie.split(";");
		alert(cookieArr);
		
		for (var i = 0; i < cookieArr.length; int++) {
			var cookieKeyValue = cookieArr[i];
			alert(cookieKeyValue);
			
			cookieKeyValue = cookieKeyValue.trim();
			alert(cookieKeyValue);
			
			var cookieKeyValueArr = cookieKeyValue.split("=");
			alert(cookieKeyValueArr);
			
			obj[cookieKeyValueArr[0]] = cookieKeyValueArr[1];
			alert(JSON.stringify(obj));
		}
		return obj;
	}
	
	if (document.cookie.lenght != 0) {
		
		alert("KUKI POSTOJI");
		alert(document.cookie);

	} else {
		document.cookie = "posetilac=postoji123123123;";

	}
	
	
	var $nazivFilma = $('#nazivFilma');
	var $opisFilma = $('#opisFilma');
	var $glumciFilma = $('#glumciFilma');
	var $sveKategorijeCombo = $('#sveKategorijeCombo');
	var $godinaFilma = $('#godinaFilma');
	var $reziserFilma = $('#reziserFilma');
	var $sveDrzaveCombo = $('#sveDrzaveCombo');
	var $sviJeziciCombo = $('#sviJeziciCombo');
	
	// Kada se ucita stranica, pokupimo listu filmova sa servera i popunimo tabelu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies",
		method: "GET",
		dataType: "json",
		success: function(response) {
			
			localStorage.setItem("brojFilmova", response.length);

//			alert(localStorage.brojFilmova);
			
			response.sort(function(a,b){
				return b.avgScore - a.avgScore;
			});
			
			for(var i=0; i<response.length; i++) {

				movie = response[i];
//				alert(movie);

				// Za svaki film kreiramo po jedan <tr> element u tebeli
				var movieTr = $("<tr></tr>");
				// <td>  sa klasom 'orderNumber' za redni broj kategorije
				var idTd = $("<td></td>");
				idTd.addClass("orderNumber");
				idTd.text(movie.id);
				movieTr.append(idTd);

				var titleTd = $("<td></td>");
				titleTd.text(movie.title);
				movieTr.append(titleTd);
				
				var descTd = $("<td></td>");
				descTd.text(movie.description);
				movieTr.append(descTd);
				

				
				var actorsTd = $("<td></td>");
				actorsTd.text(movie.actors);
				movieTr.append(actorsTd);
				

				
				var zanrTd = $("<td></td>");
				zanrTd.text(movie.category.name);
				movieTr.append(zanrTd);
				

				
				var yearTd = $("<td></td>");
				yearTd.text(movie.movieYear);
				movieTr.append(yearTd);
				

				
				var directorTd = $("<td></td>");
				directorTd.text(movie.director);
				movieTr.append(directorTd);
				
//				alert(movie.movieCountry.name);
				
				var countryTd = $("<td></td>");
				countryTd.text(movie.movieCountry.name);
				movieTr.append(countryTd);
				
//				alert(movie.movieLanguage.name);
				
				var languageTd = $("<td></td>");
				languageTd.text(movie.movieLanguage.name);
				movieTr.append(languageTd);
				
				var avgScoreTd = $("<td></td>");
				avgScoreTd.text(movie.avgScore);
				movieTr.append(avgScoreTd);
				
//				var dodajTd = $("<td><select id=\"ocenaID\" name="+movie.id+"></select></td>");
//				for (var int = 1; int < 101; int++) {
//					dodajTd.text("<option value="+int+">"+int+"</option>");
//				}
//				movieTr.append(dodajTd);
				
				//---mehanizam za kuki
				if (getCookie(""+movie.id+"") == "") {
//					document.cookie = "moviesID=";
					var dodajTd = $("<td></td>");
					dodajTd.append("<input id=\""+movie.id+"\" type=\"number\" />");
					movieTr.append(dodajTd);
				} else{
					var vecOcenjenTd = $("<td></td>");
					vecOcenjenTd.append("<input  type=\"text\" readonly=\"readonly\" value=\"vec ste ocenili\" />");
					movieTr.append(vecOcenjenTd);
//					var moviesIDArr = cookieObj["moviesID"].split(",");
//					
//					for (var i = 0; i < moviesIDArr.length; i++) {
//						var movieID = moviesIDArr[i];
//						if (movie.id == movieID) {
//							var vecOcenjenTd = $("<td></td>");
//							vecOcenjenTd.append("<input  type=\"text\" readonly=\"readonly\" value=\"vec ste ocenili\" />");
//							movieTr.append(vecOcenjenTd);
//						}
//					}
					
				}
				
				
//				var dodajTd = $("<td></td>");
//				dodajTd.append("<input id=\""+movie.id+"\" type=\"number\" />");
//				movieTr.append(dodajTd);
//				
//				var oceniTd = $('<td><input id="oceniSubmit" name="'+movie.id+'" type="submit" value="Oceni" </td>');
//				movieTr.append(oceniTd);
				
//				var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
//				movieTr.append(izmeniTd);
//				
//				var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
//				movieTr.append(obrisiTd);
				
				$("#movieTable").append(movieTr);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	alert("KRAJ");
	
	$("#btnOceniSubmit").click(function(){
		alert("oceni film!");
		
		var ocene = "";
//		var movieID = $("#oceniSubmit").val();
//		alert(movieID);
//		
//		var ocena = $('input#'+movieID+'').val();
//		alert(ocena);
		for (var i = 0; i <= localStorage.brojFilmova; i++) {
			var vrednostOcene = $('input#'+i+'').val();
//			alert(vrednostOcene);
			if (vrednostOcene > 0) {
				
				$.ajax({
					url: "http://localhost:8080/ProjekatOSA/api/scores/"+i+"/"+vrednostOcene+"",
					method: "POST",
					dataType: "json",
					success: function(response){
						alert("upisana je ocena");
						alert(JSON.stringify(response));
						
						var ocena = response.score;
						alert(ocena);
						
						var idFILMA = response.movie.id;
						alert(idFILMA)
						
						
						setCookie(""+idFILMA+"", ""+ocena+"", "365");
						
						
					},
					error: function(request, options, error){
						alert("NIJE UPISANA OCENA, GRESKA U AJAX ZAHTEVU");
						alert(error);
					}
				});
				
			}
		}
		
		document.cookie = cookieObj["moviesID"] + ocene +";";
		
	});
	
	//..prikaz zanrova u kombo boksu
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/categories",
		method: "GET",
		dataType: "json",
		success: function(response) {

			alert("prikazi kategoruje");
			for(var i=0; i<response.length; i++) {

				var kategorija = response[i];
				
				var newOption = $("<option value=" + kategorija.id + ">" + kategorija.name + "</option>");
				var newOption2 = $("<option value=" + kategorija.id + ">" + kategorija.name + "</option>");
					
//				$("#sveKategorijeCombo").append(newOption);
				$("#sveKategorijeComboFilter").append(newOption);
				
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
//	
//	//..prikaz drzava u kombo boksu
//	$.ajax({
//		url: "http://localhost:8080/ProjekatOSA/api/countries",
//		method: "GET",
//		dataType: "json",
//		success: function(response) {
//
//			alert("prikazi drzava");
//			for(var i=0; i<response.length; i++) {
//
//				var drzava = response[i];
//				
//				var newOption = $("<option value=" + drzava.id + ">" + drzava.name + "</option>");
//				var newOption2 = $("<option value=" + drzava.id + ">" + drzava.name + "</option>");
//					
//				$("#sveDrzaveCombo").append(newOption);
//			}
//		},
//		error: function(request, options, error) {
//			alert(error);
//			alert("erorcina........");
//		}
//	});
//	
//	
//	//..prikaz jezika u kombo boksu
//	$.ajax({
//		url: "http://localhost:8080/ProjekatOSA/api/languages",
//		method: "GET",
//		dataType: "json",
//		success: function(response) {
//
//			alert("prikazi drzava");
//			for(var i=0; i<response.length; i++) {
//
//				var languages = response[i];
//				
//				var newOption = $("<option value=" + languages.id + ">" + languages.name + "</option>");
//				var newOption2 = $("<option value=" + languages.id + ">" + languages.name + "</option>");
//					
//				$("#sviJeziciCombo").append(newOption);
//			}
//		},
//		error: function(request, options, error) {
//			alert(error);
//			alert("erorcina........");
//		}
//	});
//	
//	$('#btnDodajFilm').click(function(){
//		alert("DODAJ FILM");
//		//..........................................dovrsi................
//		
//		var $film = {
//				"title": $nazivFilma.val(),
//					"description": $opisFilma.val(),
//					"director": $reziserFilma.val(),
//					"producer": $reziserFilma.val(),
//					"actors": $glumciFilma.val(),
//					"movieYear": $godinaFilma.val(),
//					"category": {
//					"id": 4
//					"name": "Action",
//					"users": null,
//					"movies": null
//					},
//					"movieScore": null,
//					"movieCountry": {
//					"id": 1,
//					"name": "United States of America",
//					"movies": null
//					},
//					"movieLanguage": {
//					"id": 1,
//					"name": "english",
//					"movies": null
//					},
//					"avgScore": 0
//		};
//		
//		
//		$.ajax({
//			method: 'POST',
//			url: 'http://localhost:8080/ProjekatOsa/api/movies',
//			data: $film,
//			dataType: 'json',
//			success: function(movie){
//								
//				var movieTr = $("<tr></tr>");
//
//				var idTd = $("<td></td>");
//				idTd.addClass("orderNumber");
//				idTd.text(movie.id);
//				movieTr.append(idTd);
//
//				var titleTd = $("<td></td>");
//				titleTd.text(movie.title);
//				movieTr.append(titleTd);
//				
//				var descTd = $("<td></td>");
//				descTd.text(movie.description);
//				movieTr.append(descTd);
//				
//
//				
//				var actorsTd = $("<td></td>");
//				actorsTd.text(movie.actors);
//				movieTr.append(actorsTd);
//				
//
//				
//				var zanrTd = $("<td></td>");
//				zanrTd.text(movie.category.name);
//				movieTr.append(zanrTd);
//				
//
//				
//				var yearTd = $("<td></td>");
//				yearTd.text(movie.movieYear);
//				movieTr.append(yearTd);
//				
//
//				
//				var directorTd = $("<td></td>");
//				directorTd.text(movie.director);
//				movieTr.append(directorTd);
//				
////				alert(movie.movieCountry.name);
//				
//				var countryTd = $("<td></td>");
//				countryTd.text(movie.movieCountry.name);
//				movieTr.append(countryTd);
//				
////				alert(movie.movieLanguage.name);
//				
//				var languageTd = $("<td></td>");
//				languageTd.text(movie.movieLanguage.name);
//				movieTr.append(languageTd);
//				
//				var avgScoreTd = $("<td></td>");
//				avgScoreTd.text(movie.avgScore);
//				movieTr.append(avgScoreTd);
//				
////				var dodajTd = $("<td><a href='#' >Dodaj</a></td>");
////				movieTr.append(dodajTd);
//				
//				var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
//				movieTr.append(izmeniTd);
//				
//				var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
//				movieTr.append(obrisiTd);
//				
//				$("#movieTable").append(movieTr);
//			},
//			error: function(){
//				alert("ERROR U DODAVANJU FILMA");
//			}
//		});
//		
//		
//	});
//	
//	
//	
//	//.,prikaz zanrova
//	$.ajax({
//		url: "http://localhost:8080/ProjekatOSA/api/categories",
//		method: "GET",
//		dataType: "json",
//		success: function(response) {
//
//			alert("prikazi kategoruje");
//			for(var i=0; i<response.length; i++) {
//
//				category = response[i];
//				alert(category);
//
//				// Za svaki film kreiramo po jedan <tr> element u tebeli
//				var categoryTr = $("<tr></tr>");
//				// <td>  sa klasom 'orderNumber' za redni broj kategorije
//				var idTd = $("<td></td>");
//				idTd.addClass("orderNumber");
//				idTd.text(i);
//				categoryTr.append(idTd);
//
//				var nameTd = $("<td></td>");
//				nameTd.text(category.name);
//				categoryTr.append(nameTd);
//				
//				var dodajTd = $("<td><a href='#' >Dodaj</a></td>");
//				categoryTr.append(dodajTd);
//				
//				var izmeniTd = $("<td><a href='#' >Izmeni</a></td>");
//				categoryTr.append(izmeniTd);
//				
//				$("#categoryTable").append(categoryTr);
//			}
//		},
//		error: function(request, options, error) {
//			alert(error);
//			alert("erorcina........");
//		}
//	});
//	
//	//.,prikaz liste korisnika
//	$.ajax({
//		url: "http://localhost:8080/ProjekatOSA/api/users",
//		method: "GET",
//		dataType: "json",
//		success: function(response) {
//
//			alert("prikazi korisnike");
//			for(var i=0; i<response.length; i++) {
//
//				user = response[i];
//				alert(user);
//
//				// Za svaki film kreiramo po jedan <tr> element u tebeli
//				var userTr = $("<tr></tr>");
//				// <td>  sa klasom 'orderNumber' za redni broj kategorije
//				var idTd = $("<td></td>");
//				idTd.addClass("orderNumber");
//				idTd.text(i);
//				userTr.append(idTd);
//
//				var fnameTd = $("<td></td>");
//				fnameTd.text(user.firstName);
//				userTr.append(fnameTd);
//				
//				var lnameTd = $("<td></td>");
//				lnameTd.text(user.lastName);
//				userTr.append(lnameTd);
//				
//				var unameTd = $("<td></td>");
//				unameTd.text(user.userName);
//				userTr.append(unameTd);
//				
//				
//				var categoryTd = $("<td></td>");
//				if (user.category == null) {
//					categoryTd.text("");
//				} else { categoryTd.text(user.category.name);}
//				
//				userTr.append(categoryTd);
//				
//				var dodajTd = $("<td><a href='#' >Dodaj</a></td>");
//				userTr.append(dodajTd);
//				
//				var izmeniTd = $("<td><a href='#' >Izmeni</a></td>");
//				userTr.append(izmeniTd);
//				
//				$("#userTable").append(userTr);
//			}
//		},
//		error: function(request, options, error) {
//			alert(error);
//			alert("erorcina........");
//		}
//	});
	
	
	
	$("#btnMovieFilter").click(function(){
		
		$("#movieTable2").html("");
		
		var idKategorije = $("#sveKategorijeComboFilter").val();
		
		// Kada se ucita stranica, pokupimo listu filmova sa servera i popunimo tabelu
		$.ajax({
			url: "http://localhost:8080/ProjekatOSA/api/movies",
			method: "GET",
			dataType: "json",
			success: function(response) {
				
				$("#movieTable2").append("<tr><th>id</th><th>naziv</th><th>opis</th><th>glumci</th><th>kategorija</th><th>godina</th><th>reziser</th><th>drzava</th><th>jezik</th><th>srednja ocena</th><th>oceni</th><th>&nbsp;</th><th>&nbsp;</th></tr>");

				for(var i=0; i<response.length; i++) {

					movie = response[i];
//					alert(movie);
					if (movie.category.id == idKategorije) {
						
						// Za svaki film kreiramo po jedan <tr> element u tebeli
						var movieTr = $("<tr></tr>");
						// <td>  sa klasom 'orderNumber' za redni broj kategorije
						var idTd = $("<td></td>");
						idTd.addClass("orderNumber");
						idTd.text(movie.id);
						movieTr.append(idTd);
		
						var titleTd = $("<td></td>");
						titleTd.text(movie.title);
						movieTr.append(titleTd);
						
						var descTd = $("<td></td>");
						descTd.text(movie.description);
						movieTr.append(descTd);
						
		
						var actorsTd = $("<td></td>");
						actorsTd.text(movie.actors);
						movieTr.append(actorsTd);
						
		
						var zanrTd = $("<td></td>");
						zanrTd.text(movie.category.name);
						movieTr.append(zanrTd);
						
						var yearTd = $("<td></td>");
						yearTd.text(movie.movieYear);
						movieTr.append(yearTd);
						
						
						var directorTd = $("<td></td>");
						directorTd.text(movie.director);
						movieTr.append(directorTd);
						
						
						var countryTd = $("<td></td>");
						countryTd.text(movie.movieCountry.name);
						movieTr.append(countryTd);
						
						
						var languageTd = $("<td></td>");
						languageTd.text(movie.movieLanguage.name);
						movieTr.append(languageTd);
						
						var avgScoreTd = $("<td></td>");
						avgScoreTd.text(movie.avgScore);
						movieTr.append(avgScoreTd);
						
						var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
						movieTr.append(izmeniTd);
						
						var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
						movieTr.append(obrisiTd);
						
						$("#movieTable2").append(movieTr);
					}
				}
			},
			error: function(request, options, error) {
				alert(error);
				alert("erorcina........");
			}
		});
		alert("KRAJ");	
		
		
		
	});
	
	
	
	
	//----TOOGLE BUTTON
	$("div#movies7days").hide();
	$("div#movies30days").hide();
	
	$("button#btnMovies7Days").click(function(){
        $("div#movies7days").slideToggle();
    });
	$("button#btnMovies30Days").click(function(){
        $("div#movies30days").slideToggle();
    });
	
	//----prikaz filmova po ocenama od ove nedelje
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies/sort/7days",
		method: "GET",
		dataType: "json",
		success: function(response) {
			
			localStorage.setItem("brojFilmova", response.length);
			
			response.sort(function(a,b){
				return b.avgScore - a.avgScore;
			});
			
			for(var i=0; i<response.length; i++) {

				movie = response[i];
//				alert(movie);

				// Za svaki film kreiramo po jedan <tr> element u tebeli
				var movieTr = $("<tr></tr>");
				// <td>  sa klasom 'orderNumber' za redni broj kategorije
				var idTd = $("<td></td>");
				idTd.addClass("orderNumber");
				idTd.text(movie.id);
				movieTr.append(idTd);

				var titleTd = $("<td></td>");
				titleTd.text(movie.title);
				movieTr.append(titleTd);
				
				var descTd = $("<td></td>");
				descTd.text(movie.description);
				movieTr.append(descTd);
				
				
				var actorsTd = $("<td></td>");
				actorsTd.text(movie.actors);
				movieTr.append(actorsTd);
				

				var zanrTd = $("<td></td>");
				zanrTd.text(movie.category.name);
				movieTr.append(zanrTd);
				
				
				var yearTd = $("<td></td>");
				yearTd.text(movie.movieYear);
				movieTr.append(yearTd);
				

				
				var directorTd = $("<td></td>");
				directorTd.text(movie.director);
				movieTr.append(directorTd);
				
//				alert(movie.movieCountry.name);
				
				var countryTd = $("<td></td>");
				countryTd.text(movie.movieCountry.name);
				movieTr.append(countryTd);
				
//				alert(movie.movieLanguage.name);
				
				var languageTd = $("<td></td>");
				languageTd.text(movie.movieLanguage.name);
				movieTr.append(languageTd);
				
				var avgScoreTd = $("<td></td>");
				avgScoreTd.text(movie.avgScore);
				movieTr.append(avgScoreTd);
				
				//---mehanizam za kuki
				if (getCookie(""+movie.id+"") == "") {
					var dodajTd = $("<td></td>");
					dodajTd.append("<input id=\""+movie.id+"\" type=\"number\" />");
					movieTr.append(dodajTd);
				} else{
					var vecOcenjenTd = $("<td></td>");
					vecOcenjenTd.append("<input  type=\"text\" readonly=\"readonly\" value=\"vec ste ocenili\" />");
					movieTr.append(vecOcenjenTd);
					
				}
				
				
				
//				var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
//				movieTr.append(izmeniTd);
//				
//				var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
//				movieTr.append(obrisiTd);
				
				$("#movieTable7days").append(movieTr);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
	
	//----prikaz filmova po ocenama od ovog meseca
	$.ajax({
		url: "http://localhost:8080/ProjekatOSA/api/movies/sort/30days",
		method: "GET",
		dataType: "json",
		success: function(response) {
			
			localStorage.setItem("brojFilmova", response.length);

//			alert(localStorage.brojFilmova);
			
			response.sort(function(a,b){
				return b.avgScore - a.avgScore;
			});
			
			for(var i=0; i<response.length; i++) {

				movie = response[i];
//				alert(movie);

				// Za svaki film kreiramo po jedan <tr> element u tebeli
				var movieTr = $("<tr></tr>");
				// <td>  sa klasom 'orderNumber' za redni broj kategorije
				var idTd = $("<td></td>");
				idTd.addClass("orderNumber");
				idTd.text(movie.id);
				movieTr.append(idTd);

				var titleTd = $("<td></td>");
				titleTd.text(movie.title);
				movieTr.append(titleTd);
				
				var descTd = $("<td></td>");
				descTd.text(movie.description);
				movieTr.append(descTd);
				
				
				var actorsTd = $("<td></td>");
				actorsTd.text(movie.actors);
				movieTr.append(actorsTd);
				

				var zanrTd = $("<td></td>");
				zanrTd.text(movie.category.name);
				movieTr.append(zanrTd);
				
				
				var yearTd = $("<td></td>");
				yearTd.text(movie.movieYear);
				movieTr.append(yearTd);
				

				
				var directorTd = $("<td></td>");
				directorTd.text(movie.director);
				movieTr.append(directorTd);
				
//				alert(movie.movieCountry.name);
				
				var countryTd = $("<td></td>");
				countryTd.text(movie.movieCountry.name);
				movieTr.append(countryTd);
				
//				alert(movie.movieLanguage.name);
				
				var languageTd = $("<td></td>");
				languageTd.text(movie.movieLanguage.name);
				movieTr.append(languageTd);
				
				var avgScoreTd = $("<td></td>");
				avgScoreTd.text(movie.avgScore);
				movieTr.append(avgScoreTd);
				
				//---mehanizam za kuki
				if (getCookie(""+movie.id+"") == "") {
					var dodajTd = $("<td></td>");
					dodajTd.append("<input id=\""+movie.id+"\" type=\"number\" />");
					movieTr.append(dodajTd);
				} else{
					var vecOcenjenTd = $("<td></td>");
					vecOcenjenTd.append("<input  type=\"text\" readonly=\"readonly\" value=\"vec ste ocenili\" />");
					movieTr.append(vecOcenjenTd);
					
				}
				
				
//				
//				var izmeniTd = $("<td><a href='http://localhost:8080/ProjekatOSA/api/movies/"+movie.id+"' >Izmeni</a></td>");
//				movieTr.append(izmeniTd);
//				
//				var obrisiTd = $("<td><a href='#' >Obrisi</a></td>");
//				movieTr.append(obrisiTd);
				
				$("#movieTable30days").append(movieTr);
			}
		},
		error: function(request, options, error) {
			alert(error);
			alert("erorcina........");
		}
	});
		
	
});