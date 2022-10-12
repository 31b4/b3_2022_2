$(document).ready(function() {
    $("#jatek").click(function(){
        $("#keret").html("");
        var table =document.createElement("table");
        document.getElementById("keret").appendChild(table)
        var hossz=parseInt($("#hossz").val());
        if (hossz%2==1) {
            alert("Csak páros oldalú lehet")
            return
        }
        table.id="table";
        table.style.border="2px solid";
        for (let i = 0; i < hossz; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < hossz; j++) {
                var td = document.createElement("td");
                td.style.height="25px";
                td.style.width="25px";
                td.style.border="2px solid";
                td.id=i+';'+j;
                td.addEventListener("click",()=>{Lepes(i,j)});
                PontSzamitas(hossz,i,j,td)
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        KezdoKororngok(hossz)
        
    })
})
function PontSzamitas(hossz,i,j,td){
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


function KezdoKororngok(hossz){
    var kord = Number(hossz/2-1)
    console.log(kord+";"+Number(kord+1))
    document.getElementById(kord+";"+kord).style.backgroundColor="white"
    document.getElementById(kord+";"+Number(kord+1)).style.backgroundColor="black"
    document.getElementById(Number(kord+1)+";"+kord).style.backgroundColor="black"
    document.getElementById(Number(kord+1)+";"+Number(kord+1)).style.backgroundColor="white"
    
    
}
var jelenlegi_jatekos = true;//true=p1; false = p2
function Lepes(i,j) {
    if (jelenlegi_jatekos) {
        document.getElementById(i+";"+j).style.backgroundColor="black"
        jelenlegi_jatekos=!jelenlegi_jatekos
    }
    else{
        document.getElementById(i+";"+j).style.backgroundColor="white"
        jelenlegi_jatekos=!jelenlegi_jatekos
    }
}