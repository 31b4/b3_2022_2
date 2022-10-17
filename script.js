
var hossz=parseInt($("#hossz").val());
var img_fekete = new Image()
img_fekete.src="img/black.png"
img_fekete.style.width="100%"
var img_feher = new Image()
img_feher.src="img/white.png"
img_feher.style.width="100%"
$(document).ready(function() {
    $("#jatek").click(function(){
        //mindent a default ertekbe helyezese
        jelenlegi_jatekos = true;//true=p1; false = p2
        valid_lepes = false;
        tud_lepni = false;
        perc = 00;
        masodperc = 00;
        htmlmasodperc.innerHTML="00"
        htmlperc.innerHTML=0
        clearInterval(Interval);
        Interval = setInterval(Timer, 1000);
        document.getElementById("jatek").disabled = true;
        document.getElementById("hossz").disabled = true;
        document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: fekete"
        hossz=parseInt($("#hossz").val());
        jelenlegi_jatekos = true
        $("#keret").html("");
        //--------------------------------------------
        var table =document.createElement("table");
        document.getElementById("keret").appendChild(table)
        if (hossz%2==1) {
            return
        }
        table.id="table";
        table.style.border="2px solid";
        for (let i = 0; i < hossz; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < hossz; j++) {
                var td = document.createElement("td");
                td.style.height="50px";
                td.style.width="50px";
                td.style.border="2px solid";
                td.id=i+';'+j;
                td.style.backgroundColor="darkgreen"
                td.classList="ures"
                td.addEventListener("click",()=>{Lepes(i,j)});
                PontSzamitas(i,j,td)
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        KezdoKororngok()
        
    })
})
function PontSzamitas(i,j,td){
    var pont;
    if (i<(hossz/2)) {
        if (j<(hossz/2)) {
            if (i<j) {
                pont=i+1;
            } else {
                pont=j+1;
            } 
        } else if (j>=(hossz/2)) {
            if (i<hossz-j) {
                pont=i+1;
            } else {
                pont=hossz-j;
            } 
        }
    } else if (i>=(hossz/2)) {
        if (j<(hossz/2)) {
            if (hossz-i>j) {
                pont=j+1;
            } else {
                pont=hossz-i;
            } 
        } else if (j>=(hossz/2)) {
            if (i>j) {
                pont=hossz-i;
            } else {
                pont=hossz-j;
            } 
        }
    }
    //td.innerHTML = pont;
    td.value = pont;
    /*
    if(pont%2==0){
        td.style.backgroundColor="yellow"
        $(td).css("backgroundcolor","yellow")
    }
    */

}


function KezdoKororngok(){
    var kord = Number(hossz/2-1)


    document.getElementById(kord+";"+kord).append(img_feher.cloneNode())
    document.getElementById(kord+";"+Number(kord+1)).append(img_fekete.cloneNode())
    document.getElementById(Number(kord+1)+";"+kord).append(img_fekete.cloneNode())
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).append(img_feher.cloneNode())
    
    document.getElementById(kord+";"+kord).classList="white"
    document.getElementById(kord+";"+Number(kord+1)).classList="black"
    document.getElementById(Number(kord+1)+";"+kord).classList="black"
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).classList="white"
    
    
}
var jelenlegi_jatekos = true;//true=p1; false = p2
var valid_lepes = false;
var tud_lepni = false;
function Lepes(i,j) {
    if(ValidLepes(i,j,false) && valid_lepes){// && valid_lepes
        valid_lepes=false
        if (jelenlegi_jatekos) {
            document.getElementById(i+";"+j).classList="black"
            document.getElementById(i+";"+j).append(img_fekete.cloneNode())
        }
        else{
            document.getElementById(i+";"+j).classList="white"
            document.getElementById(i+";"+j).append(img_feher.cloneNode())

        }
        if(!NextPlayerCantMove(!jelenlegi_jatekos)){
            jelenlegi_jatekos = !jelenlegi_jatekos
            if (jelenlegi_jatekos) {
                document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: feher"
                document.getElementById("jelenlegi_jatekos").style.color="white"
            }
            else{
                document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: fekete"
                document.getElementById("jelenlegi_jatekos").style.color="black"
            }
            jelenlegi_jatekos = !jelenlegi_jatekos
        }else{
            if(NextPlayerCantMove(jelenlegi_jatekos)){
                JatekVege()
            }

        }
    }
    else{
       // alert("nem lephetsz ide");
    }
}
function NextPlayerCantMove(ki){
    jelenlegi_jatekos = ki
    tud_lepni = false
    for (let i = 0; i < hossz; i++) {
        for (let j = 0; j < hossz; j++) {
           ValidLepes(i,j,true)
            if (tud_lepni) {
                return false
            }
        }
        
    }
    return true
}
function ValidLepes(i,j,teszt) { // ha teszt igaz akkor nem valodi lepes csak nézi hogy tudna e lepni
    if(document.getElementById(i+";"+j).classList=="ures"){
        Iranyok(-1,0,i,j,teszt)
        Iranyok(-1,+1,i,j,teszt)
        Iranyok(0,+1,i,j,teszt)
        Iranyok(+1,+1,i,j,teszt)
        Iranyok(+1,0,i,j,teszt)
        Iranyok(+1,-1,i,j,teszt)
        Iranyok(0,-1,i,j,teszt)
        Iranyok(-1,-1,i,j,teszt)
    }
    else{
        return false;
    }
    return true;
}
function Iranyok(x,y,i,j,teszt) { // ha teszt igaz akkor nem valodi lepes csak nézi hogy tudna e lepni
    var ellenfel_color=""
    var sajat_color=""
    if (jelenlegi_jatekos){
        ellenfel_color="white"
        sajat_color="black"
    }
    else{
        ellenfel_color = "black"
        sajat_color="white"
    }

    if (i+x>=0 && i+x<hossz && j+y>=0 && j+y<hossz) {
        var szorzo = 1;
        var lepesek =[]
        while(i+(x*szorzo)>=0 && i+(x*szorzo)<hossz && j+(y*szorzo)>=0 && j+(y*szorzo)<hossz 
                && (document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==ellenfel_color 
                || document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==sajat_color)){
            if(document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==sajat_color){
                if(lepesek.length!=0){
                    tud_lepni = true
                    if (!teszt) {
                        valid_lepes=true
                        for (let i = 0; i < lepesek.length; i++) {
                            document.getElementById(lepesek[i]).classList=sajat_color;
                            document.getElementById(lepesek[i]).innerHTML=""
                            if (sajat_color=="black") {
                                //let imageSelected = document.getElementById(lepesek[i]).getElementsByTagName('img').item(0).getAttribute('src');
                                document.getElementById(lepesek[i]).append(img_fekete.cloneNode())
                            }
                            else{
                                document.getElementById(lepesek[i]).append(img_feher.cloneNode())
                            }
                        }
                    }
                }
                break;
            }
            lepesek.push(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo)))
            szorzo+=1;
        }
    }   
}


function JatekVege(){
    clearInterval(Interval);
    document.getElementById("jatek").disabled = false;
    document.getElementById("hossz").disabled = false;
    var fekete_pont = 0
    var feher_pont = 0
    for (let i = 0; i < hossz; i++) {
        for (let j = 0; j < hossz; j++) {
            //document.getElementById(i+";"+j).innerHTML=document.getElementById(i+";"+j).value
            if (document.getElementById(i+";"+j).classList=="black") {
                fekete_pont+= document.getElementById(i+";"+j).value
                document.getElementById(i+";"+j).style.color="white"
            }
            else if(document.getElementById(i+";"+j).classList=="white"){
                feher_pont+= document.getElementById(i+";"+j).value
            }
        }
    }
    if (fekete_pont> feher_pont) {
        console.log("Fekete jatekos nyert "+fekete_pont+"pontal, Fehér vesztett "+ feher_pont+" pontal")
    }
    else if(fekete_pont< feher_pont){
        console.log("Feher jatekos nyert "+feher_pont+"pontal, Fekete vesztett "+ fekete_pont+" pontal")
    }
    else{
        console.log("Döntetlen lett "+feher_pont+" - "+fekete_pont+" pontal")
    }
}
    

var perc = 00; 
var masodperc = 00; 
var htmlmasodperc = document.getElementById("masodperc")
var htmlperc = document.getElementById("perc")
var Interval;


function Timer () {
    masodperc++; 
    
    if(masodperc <= 9){
        htmlmasodperc.innerHTML = "0" + masodperc;
    }
    
    if (masodperc > 9){
        htmlmasodperc.innerHTML = masodperc;
    } 
    
    if (masodperc > 99) {
        perc++;
        htmlperc.innerHTML = "0" + perc;
        masodperc = 0;
        htmlmasodperc.innerHTML = "0" + 0; 
    }
    
    if (perc > 9){
        htmlperc.innerHTML = masodperc;
    }
}