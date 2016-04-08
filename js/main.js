var people = [];
var regexp = new RegExp("^\\/d20(\\+|\\-)\\d+$")
var regexp2 = new RegExp("^\\-?\\\d+$");

var _count = 0;
var activeCompetitor = 0;

function nextCompetitor(){
  $('.active').removeClass("active");
  $('#'+people[activeCompetitor++].id).addClass("active")
  if(activeCompetitor === people.length)
    activeCompetitor = 0;
}

function newCompetitor(){
  $('#collapseExample').collapse('show');
  $('#list').collapse('hide');
  goToByScroll("collapseExample")
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
    $('#compButton').show()
  }
}

function renderList(){
  people.sort(function(a, b){return b.initiative - a.initiative});
  $('#people').empty()
  var pattern = '<div class="row" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{AC}}</span></div></div>'
  for (var i = 0; i < people.length; ++i){
    var person = people[i];
    var text = pattern.replace("{{ID}}",person.id);
    text = text.replace("{{NAME}}",person.name);
    text = text.replace("{{INIT}}",person.initiative);
    text = text.replace("{{AC}}",person.ac);
    $('#people').append(text);
  }
}

function goToByScroll(id){
      // Reove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}
