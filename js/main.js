function myfunction(){
  var adata = document.getElementById('delivA');
  var bdata = document.getElementById('delivB');
  var n = document.getElementById("firstline").value;
  if(!n){n=1;}
  var func = createParser(n);
  
  var linesa = adata.value.replace(/\s+/g,"").split("\n");
  var results = linesa.map(func);
  console.log(results)
  var conda=("OR(" + results.join(", ") + ")");

  var linesb = bdata.value.replace(/\s+/g,"").split("\n");
  var results = linesb.map(func);
  console.log(results)
  var condb=("OR(" + results.join(", ") + ")");
  
  var cond = "IF(" + conda + ", 'A', IF(" + condb + ",'B','C'))"
  document.getElementById("result").value = cond
}

function createParser(n){
  return function(line){
    var elements = line.split(',');
    var string = "AND(";
    for (i=0;i<elements.length;i++){
      var element = elements[i];
      if (!element) continue;
      cell = Alph(i) + n.toString();
      var hyph = element.indexOf('-')
      console.log(element + "and" + hyph);
      if (hyph > 0){
        var [low,high] = element.split('-');
        string += "AND(" + cell + ">=" + low + ',' + cell + "<=" + high +"),"
      } else {
        string += cell+'='+element + ','
      }
    }
    string +=")"
    console.log(string);
    return string;
  }
}

function Alph(o){
  return String.fromCharCode(o+65);
}
