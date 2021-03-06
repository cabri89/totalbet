function readTextFile(file)
{
    var numberPattern = /\d+/g;
    var rawFile = new XMLHttpRequest();
    var centDepense = 0;
    var centGain = 0;
    var decimalDepense = 0;
    var decimalGain = 0;

    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                document.getElementById('test').innerHTML = allText;

                var allCelDepense =  document.getElementsByClassName('bet-user-progress');
                for (var cel in allCelDepense) {
                    if (allCelDepense[cel].textContent != undefined) {
                        var celContent = allCelDepense[cel].textContent.match(numberPattern);
                        if (celContent != null) {
                            decimalDepense += parseInt(celContent[0]);
                            if (celContent[1]) {
                                centDepense += parseInt(celContent[1]);
                            }
                        }
                    }
                }

                var allCelGain =  document.getElementsByClassName('gain-user');
                for (var celGain in allCelGain) {
                    if (allCelGain[celGain].children != undefined) {
                        if (allCelGain[celGain].children.length != 2) {
                            if (allCelGain[celGain].children[0] != undefined) {
                                var celContentGain = allCelGain[celGain].children[0].textContent.match(numberPattern);
                                if (allCelGain[celGain].parentElement.className != "combined-detail cashout-details") {
                                    if (celContentGain != null) {
                                        decimalGain += parseInt(celContentGain[0]);
                                        if (celContentGain[1]) {
                                            centGain += parseInt(celContentGain[1]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                centGain = centGain / 100;
                var totalGain = decimalGain + centGain;

                centDepense = centDepense / 100;
                var totalDepense = decimalDepense + centDepense;

                document.getElementById('depense').innerHTML = "Dépensé " + totalDepense + "€";
                document.getElementById('gain').innerHTML = "Gagné " + totalGain + "€";

            }
        }
    }
    rawFile.send(null);
}

function readfiles(files) {
  var xhr, form,resTopScore;

  var file = files[0];

  xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php');

  form = new FormData();
  form.append('htmlFile',file);

  function handleLoad(evt)
  {
      resTopScore = evt;
      readTextFile("files/"+resTopScore.srcElement.responseText);
  }

  function handleError(evt) {
  }

  xhr.addEventListener('load', handleLoad);
  xhr.addEventListener('error', handleError);
  xhr.send(form);
}

var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();
  readfiles(e.dataTransfer.files);
}

function getFile(){
  document.getElementById("htmlFile").click();
}

function sub(obj){
   var file = obj.value;
   var fileName = file.split("\\");
   document.getElementById("yourBtn").innerHTML = fileName[fileName.length-1];
   readfiles(document.getElementById('htmlFile').files);
 }
