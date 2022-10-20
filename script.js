var hossz = parseInt($("#hossz").val());

$(document).ready(function() {
    $("#jatek").click(function(){
        //mindent a default ertekbe helyezese
        jelenlegi_jatekos = true;//true=p1; false = p2
        valid_lepes = false;
        tud_lepni = false;
        perc = 0;
        masodperc = 0;
        htmlmasodperc.innerHTML="00";
        htmlperc.innerHTML=0;
        clearInterval(Interval);
        Interval = setInterval(Timer, 1000);
        document.getElementById("jatek").disabled = true;
        document.getElementById("hossz").disabled = true;
        document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: fekete";
        hossz=parseInt($("#hossz").val());
        $("#keret").html("");
        //--------------------------------------------
        var table =document.createElement("table");
        document.getElementById("keret").appendChild(table);
        if (hossz%2==1) {
            return;
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
                td.style.backgroundColor="darkgreen";
                td.classList="ures";
                td.addEventListener("click",()=>{Lepes(i,j);});
                PontSzamitas(i,j,td);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        KezdoKororngok();
    });
});
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
    var kord = Number(hossz/2-1);
    var img_feher = new Image();
    img_feher.src="img/white.png";
    img_feher.style.width="100%";
    img_feher.id=kord+";"+kord+"_img";
    document.getElementById(kord+";"+kord).append(img_feher);

    var img_fekete = new Image();
    img_fekete.src="img/black.png";
    img_fekete.style.width="100%";
    img_fekete.id=kord+";"+Number(kord+1)+"_img";
    document.getElementById(kord+";"+Number(kord+1)).append(img_fekete);
    
    var img_fekete_2 = new Image();
    img_fekete_2.src="img/black.png";
    img_fekete_2.style.width="100%";
    img_fekete_2.id=Number(kord+1)+";"+kord+"_img";
    document.getElementById(Number(kord+1)+";"+kord).append(img_fekete_2);

    var img_feher_2 = new Image();
    img_feher_2.src="img/white.png";
    img_feher_2.style.width="100%";
    img_feher_2.id=Number(kord+1)+";"+Number(kord+1)+"_img";
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).append(img_feher_2);
    
    document.getElementById(kord+";"+kord).classList="white";
    document.getElementById(kord+";"+Number(kord+1)).classList="black";
    document.getElementById(Number(kord+1)+";"+kord).classList="black";
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).classList="white";
    
    
}
var jelenlegi_jatekos = true;//true=p1; false = p2
var valid_lepes = false;
var tud_lepni = false;
var animacio_vege = true;
function Lepes(i,j) {
    if( animacio_vege && ValidLepes(i,j,false) && valid_lepes){// && valid_lepes
        valid_lepes=false;
        animacio_vege = false;
        if (jelenlegi_jatekos) {
            document.getElementById(i+";"+j).classList="black";
            var img_fekete = new Image();
            img_fekete.src="img/black.png";
            img_fekete.style.width="100%";
            img_fekete.id=i+";"+j+"_img";
            document.getElementById(i+";"+j).append(img_fekete);
        }
        else{
            document.getElementById(i+";"+j).classList="white";
            var img_feher = new Image();
            img_feher.src="img/white.png";
            img_feher.style.width="100%";
            img_feher.id=i+";"+j+"_img";
            document.getElementById(i+";"+j).append(img_feher);

        }
        if(!NextPlayerCantMove(!jelenlegi_jatekos)){
            jelenlegi_jatekos = !jelenlegi_jatekos;
            if (jelenlegi_jatekos) {
                document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: feher";
                document.getElementById("jelenlegi_jatekos").style.color="white";
            }
            else{
                document.getElementById("jelenlegi_jatekos").innerHTML="Jelenlegi játékos: fekete";
                document.getElementById("jelenlegi_jatekos").style.color="black";
            }
            jelenlegi_jatekos = !jelenlegi_jatekos;
        }else{
            if(NextPlayerCantMove(jelenlegi_jatekos)){
                JatekVege();
            }
        }
    }
    else{
       // alert("nem lephetsz ide");
    }
}
function NextPlayerCantMove(ki){
    jelenlegi_jatekos = ki;
    tud_lepni = false;
    for (let i = 0; i < hossz; i++) {
        for (let j = 0; j < hossz; j++) {
            //csak ha nincs ott semmi
            ValidLepes(i,j,true);
            if (tud_lepni) {
                return false;
            }
        }
    }
    return true;
}
function ValidLepes(i,j,teszt) { // ha teszt igaz akkor nem valodi lepes csak nézi hogy tudna e lepni
    if(document.getElementById(i+";"+j).classList=="ures"){
        Iranyok(-1,0,i,j,teszt);
        Iranyok(-1,+1,i,j,teszt);
        Iranyok(0,+1,i,j,teszt);
        Iranyok(+1,+1,i,j,teszt);
        Iranyok(+1,0,i,j,teszt);
        Iranyok(+1,-1,i,j,teszt);
        Iranyok(0,-1,i,j,teszt);
        Iranyok(-1,-1,i,j,teszt);
    }
    else{
        return false;
    }
    return true;
}

//publikus



//var a = setInterval;
//------
function Iranyok(x,y,i,j,teszt) { // ha teszt igaz akkor nem valodi lepes csak nézi hogy tudna e lepni
    var ellenfel_color="";
    var sajat_color="";
    if (jelenlegi_jatekos){
        ellenfel_color="white";
        sajat_color="black";
    }
    else{
        ellenfel_color = "black";
        sajat_color="white";
    }

    if (i+x>=0 && i+x<hossz && j+y>=0 && j+y<hossz) {
        var szorzo = 1;
        var lepesek =[];
        while(i+(x*szorzo)>=0 && i+(x*szorzo)<hossz && j+(y*szorzo)>=0 && j+(y*szorzo)<hossz 
                && (document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==ellenfel_color 
                || document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==sajat_color)){
            if(document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).classList ==sajat_color){
                if(lepesek.length!=0){
                    tud_lepni = true;
                    if (!teszt) {
                        valid_lepes=true;
                        for (let k = 0; k < lepesek.length; k++) {
                            document.getElementById(lepesek[k]).classList=sajat_color;
                            if (sajat_color=="black") {
                                let kep= document.getElementById(lepesek[k]+"_img");
                                //let a = setInterval(()=>{forgas("black",kep, a);}, 1);
                                //sleep(300)
                                setTimeout(Forgasd, 1000*k, "black", kep,k,lepesek.length);
                            } else{
                                let kep= document.getElementById(lepesek[k]+"_img");                                                                                            
                                //let a = setInterval(()=>{forgas("white",kep, a);}, 1);
                                //sleep(300)
                                setTimeout(Forgasd, 1000*k, "white", kep,k,lepesek.length);
                            }
                        }
                    }
                }
                break;
            }
            lepesek.push(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo)));
            szorzo+=1;
        }
    }   
}
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
function Forgasd(szin,kep,i,len){
    var fok=0;
    let a = setInterval(()=>{fok = forgas(szin,kep, a,fok,i,len);}, 1);
    
    //setTimeout(forgas(szin,kep),1000)
}

function forgas(szin,kep,a,fok,i,len) {
    $(kep).css(
        '-webkit-transform', 'rotateY('+fok +'deg'+')',
        '-moz-transform', 'rotateY('+fok +'deg'+')',
        '-ms-transform', 'rotateY('+fok +'deg'+')',
        '-o-transform', 'rotateY('+fok +'deg'+')',
        'transform', 'rotateY('+fok +'deg'+')'
    );        
    fok += 1;
    if (fok == 90) {    
        $(kep).attr("src", "img/"+szin+".png");
    }else if(fok == 180){
        fok = 0;
        clearInterval(a);
        if(i+1 == len){
            animacio_vege = true;
        }
    }

    return fok;
}

function JatekVege(){
    clearInterval(Interval);
    document.getElementById("jatek").disabled = false;
    document.getElementById("hossz").disabled = false;
    var fekete_pont = 0;
    var feher_pont = 0;
    for (let i = 0; i < hossz; i++) {
        for (let j = 0; j < hossz; j++) {
            //document.getElementById(i+";"+j).innerHTML=document.getElementById(i+";"+j).value
            if (document.getElementById(i+";"+j).classList=="black") {
                fekete_pont+= document.getElementById(i+";"+j).value;
            }
            else if(document.getElementById(i+";"+j).classList=="white"){
                feher_pont+= document.getElementById(i+";"+j).value;
            }
        }
    }
    if (fekete_pont> feher_pont) {
        ModalMake("Fekete játékos nyert "+fekete_pont+" ponttal, Fehér vesztett "+ feher_pont+" ponttal");
        console.log("Fekete játékos nyert "+fekete_pont+" ponttal, Fehér vesztett "+ feher_pont+" ponttal");
    }
    else if(fekete_pont< feher_pont){
        ModalMake("Fehér játékos nyert "+feher_pont+" ponttal, Fekete vesztett "+ fekete_pont+" ponttal");
        console.log("Fehér játékos nyert "+feher_pont+" ponttal, Fekete vesztett "+ fekete_pont+" ponttal");
    }
    else{
        ModalMake("Döntetlen lett "+feher_pont+" - "+fekete_pont+" ponttal");
        console.log("Döntetlen lett "+feher_pont+" - "+fekete_pont+" ponttal");
    }
}
    

var perc = 0; 
var masodperc = 0; 
var htmlmasodperc = document.getElementById("masodperc");
var htmlperc = document.getElementById("perc");
var Interval;


function Timer () {
    masodperc++;
    if(masodperc <= 9){
        htmlmasodperc.innerHTML = "0" + masodperc;
    }
    if (masodperc > 9){
        htmlmasodperc.innerHTML = masodperc;
    }
    if (masodperc > 59) {
        perc++;
        htmlperc.innerHTML = "0" + perc;
        masodperc = 0;
        htmlmasodperc.innerHTML = "0" + 0; 
    }
    if (perc > 9){
        htmlperc.innerHTML = masodperc;
    }
}



//MODAL_______________________


function ModalMake(ezt){
    
    var myModal = new bootstrap.Modal(document.getElementById("winner_modal"));
    myModal.show();
    $("#modal_cim").text(ezt);
    
}