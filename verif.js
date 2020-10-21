var numero = document.getElementById('error');

tel.addEventListener('keyup', function (event) {
	if (isNaN(tel.value)) {
		document.getElementById('error').innerHTML = '<p style="color:red"> KO</p>';
    event.preventDefault();
	}else{

		document.getElementById('error').innerHTML = '';
	}
});

//COMPTEUR MESSAGE

var compteMessage = document.getElementById('message');
var maxLength = 10;
compteMessage.addEventListener('keyup', function (event) {
	
	console.log(compteMessage.value.length);

	if(compteMessage.value.length > maxLength){
		compteMessage.value=compteMessage.value.substr(0,maxLength);
	}
	
	document.getElementById('error-message').innerHTML = '<p style="color:red"> il vous reste '
		+(maxLength-compteMessage.value.length) +'</p>';

	if (compteMessage.value.length == maxLength) {
		document.getElementById('error-message').innerHTML = '';
		document.getElementById('message').style.borderColor='green';
	}
})

function verif()
{
	// Recupération du nom du formulaire
	//document.formul
	//console.log(document.formul);

	//Récupération la valueur de l'input
   if(document.formul.firstname.value == "" )  {
     alert("Attention un des champs doit etre rempli \n\n - Nom \n   ");
     document.formul.firstname.focus();
     document.formul.firstname.style.backgroundColor = "#f2dede";
     
     return false;
    }
 
   if(document.formul.lastname.value == "" )  {

     alert("Attention un des champs doit etre rempli \n\n - Prenom \n   ");
     document.formul.lastname.focus();
     document.formul.lastname.style.backgroundColor = "#f2dede";
     
     return false;
    }

    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/;
    if (!regex.test(document.getElementById('email').value))  
    {  
      alert("Entrez email valide!");
      document.formul.email.focus();
      document.formul.email.style.backgroundColor = "#f2dede";
      return false;
    }

    var mobile = /^(01|02|03|04|05|06|08|0033|\+33)[0-9]{8}/;
    //var mobile = /(0|\+33\s?)[6|7](\s?\d{2}){4}/;

    if (!mobile.test(document.getElementById('tel').value))
    {
        alert(" Entrez un numero de téléphone valide ");
       document.formul.tel.focus();
       document.formul.tel.style.backgroundColor = "#f2dede";
        return false;
    }

    if(document.formul.message.value == "" )  {

     alert("Attention un des champs doit etre rempli \n\n - Message \n   ");
     document.formul.message.focus();
     document.formul.message.style.backgroundColor = "#f2dede";
     
     return false;
    }
}
