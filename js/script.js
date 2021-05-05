document.addEventListener("DOMContentLoaded", function(){

    var nema = document.getElementById("nema");
    
    

    document.getElementById("trazi").addEventListener("input", function(event){

        var pojam = event.target.value;

        var xhttp;
        if(window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        }
        else{
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

      

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                var podaci = "";
                
                var xml = this.responseXML;
                var pjesmeKolekcija = xml.getElementsByTagName("pjesma");


                if (pjesmeKolekcija.length === 0) {
                    nema.style = 'display:block';
                }

                if (pjesmeKolekcija.length != 0){
                    nema.style = 'display:none';
                }

                

                for(var i=0; i<pjesmeKolekcija.length; i++){
                    var nazivPjesme = pjesmeKolekcija[i].getElementsByTagName("nazivPjesme")[0].innerHTML;
                    var nazivIzvodaca = pjesmeKolekcija[i].getElementsByTagName("nazivIzvodaca")[0].innerHTML;
                    var pjesma = nazivPjesme + " - " + nazivIzvodaca;
                    podaci += "<li>"+pjesma+"</li>";
                
                }
                
                if(document.getElementById("trazi").value == ""){
                    document.getElementById("spremnik").style='display:none';
                }
                if(document.getElementById("trazi").value != ""){
                    document.getElementById("spremnik").style='none';
                }

                document.getElementById("spremnik").innerHTML = podaci;
                
                
            }
        };


        xhttp.open("GET", `http://hlapcic-education.atwebpages.com/pjesme-xml.php?pojam=${pojam}`, true);
        xhttp.send();
    });
    
});