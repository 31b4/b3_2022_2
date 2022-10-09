$(document).ready(function() {
    $("#jatek").click(function(){
        $("#keret").html("");
        var table =document.createElement("table");
        document.getElementById("keret").appendChild(table)
        var hossz=parseInt($("#hossz").val());
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
                PontSzamitas(hossz,i,j,td)
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
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
    td.innerHTML = pont;
    td.value = pont;
}