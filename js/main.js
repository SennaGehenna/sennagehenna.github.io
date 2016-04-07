var people = [];
var regexp = new RegExp("^\\/d20(\\+|\\-)\\d+$")
var regexp2 = new RegExp("^\\-?\\\d+$");

var _count = 0;

function nextCompetitor(){

}

function newCompetitor(){
  $('#collapseExample').collapse('show');
  $('#list').collapse('hide');
}

function hideCompetitorWindow(){
  $('#collapseExample').collapse('hide');
  $('#list').collapse('show');
}


function addCompetitor(){
  var valid = true;
  var person = {};
  var init = $('#Initiative').val();
  var mod = -1;
  if(regexp.test(init)){
    mod = parseInt(init.substr(4)) + Math.floor((Math.random() * 20) + 1);
  }
  else if (regexp2.test(init)){
    mod = parseInt(init);
  }else{
    $('#Initiative').attr("class", $('#Initiative').attr("class") + " error");
    valid = false;
  }
  if(regexp2.test($('#AC').val())){
    person.id = _count++;
    person.initiative = mod;
    person.name = $('#Name').val();
    person.ac = $('#AC').val();
    hideCompetitorWindow();
  }
  else{
    valid = false;
    $('#AC').attr("class", $('#AC').attr("class") + " error");
  }
  
  if(valid){
    people.push(person);
    renderList();
  }
}

function renderList(){
  
}
