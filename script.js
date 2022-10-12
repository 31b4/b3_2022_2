var hossz=parseInt($("#hossz").val());
$(document).ready(function() {
    $("#jatek").click(function(){
        hossz=parseInt($("#hossz").val());
        jelenlegi_jatekos = true
        $("#keret").html("");
        var table =document.createElement("table");
        document.getElementById("keret").appendChild(table)
        if (hossz%2==1) {
            alert("Csak páros oldalú lehet")
            return
        }
        table.id="table";
        table.style.border="2px solid";
        console.log(hossz)
        for (let i = 0; i < hossz; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < hossz; j++) {
                var td = document.createElement("td");
                td.style.height="25px";
                td.style.width="25px";
                td.style.border="2px solid";
                td.id=i+';'+j;
                td.style.backgroundColor="darkgreen"
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
    document.getElementById(kord+";"+kord).style.backgroundColor="white"
    document.getElementById(kord+";"+Number(kord+1)).style.backgroundColor="black"
    document.getElementById(Number(kord+1)+";"+kord).style.backgroundColor="black"
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).style.backgroundColor="white"
    
    
}
var jelenlegi_jatekos = true;//true=p1; false = p2
function Lepes(i,j) {
    if(ValidLepes(i,j)){
        if (jelenlegi_jatekos) {
            document.getElementById(i+";"+j).style.backgroundColor="black"
            jelenlegi_jatekos=!jelenlegi_jatekos
        }
        else{
            document.getElementById(i+";"+j).style.backgroundColor="white"
            jelenlegi_jatekos=!jelenlegi_jatekos
        }
    }
    else{
        alert("nem lephetsz ide");
    }
}
function ValidLepes(i,j) {

    if(document.getElementById(i+";"+j).style.backgroundColor=="darkgreen"){
        Iranyok(-1,0,i,j)
        Iranyok(-1,+1,i,j)
        Iranyok(0,+1,i,j)
        Iranyok(+1,+1,i,j)
        Iranyok(+1,0,i,j)
        Iranyok(+1,-1,i,j)
        Iranyok(0,-1,i,j)
        Iranyok(-1,-1,i,j)
    }
    else{
        return false;
    }
    return true;
}
function Iranyok(x,y,i,j) {
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
        console.log((i+x)+";"+(j+y));
        var szorzo = 1;
        var lepesek =[]
        while(i+(x*szorzo)>=0 && i+(x*szorzo)<hossz && j+(y*szorzo)>=0 && j+(y*szorzo)<hossz 
                && (document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).style.backgroundColor ==ellenfel_color 
                || document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).style.backgroundColor ==sajat_color)){
            if(document.getElementById(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo))).style.backgroundColor ==sajat_color){
                for (let i = 0; i < lepesek.length; i++) {
                    document.getElementById(lepesek[i]).style.backgroundColor=sajat_color;
                }
                break;
            }
            lepesek.push(Number(i+(x*szorzo))+";"+Number(j+(y*szorzo)))
            szorzo+=1;
            console.log(i+(x*szorzo))
            console.log(j+(y*szorzo)>=0)
        }
    }   
}