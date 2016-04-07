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
  $('#AC, #Initiative, #Name').val("");
  $('.error').removeClass("error")
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
  people.sort(function(a, b){return b.initiative - a.initiative});
  $('#people').empty()
  var muster = '<div class="row" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{AC}}</span></div></div>'
  for (var i = 0; i < people.length; ++i){
    var person = people[i];
    var text = muster.replace("{{ID}}",person.id);
    text = text.replace("{{NAME}}",person.name);
    text = text.replace("{{INIT}}",person.initiative);
    text = text.replace("{{AC}}",person.ac);
    $('#people').append(text);
  }
}
