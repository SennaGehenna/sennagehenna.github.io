var activeCompetitor = -1;
var caster_id = -1;
var combatInitiated = false;
var count = 0;
var people =[];
var spells = {};
var pattern = '<div class="row" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{AC}}</span></div><a href="#" onclick="newSpell({{ID}})"><div class="col-xs-1"><span class="icon-magic-wand"></span></div></a><a href="#" onclick="removeCompetitor({{ID}})"><div class="col-xs-1"><span class="fa fa-close"></span></div></a></div>'
  var pattern_spell = '<div class="row spell" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{DURATION}} turn{{MORETHANONE}}</span></div><a href="#" onclick="removeSpell({{ID}})"><div class="col-xs-1"><i class="fa fa-ban"></i></div></a></div>';

var oldId = -1;

var regexp = new RegExp(/(\+|\-)\d+/)
var regexp2 = new RegExp("^\\-?\\\d+$");


// #visiblity

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

function newSpell(id){
  caster_id = id;
  $('#Castername').text($.grep(people, function(e){ return e.id == caster_id; })[0].name);
  $('#collapse2').collapse('show');
  $('#list').collapse('hide');
  goToByScroll("collapse2")
}

function cancelSpell(){
  $('#collapse2').collapse('hide');
  $('#list').collapse('show');
  $('#Spellname').val("");
}

// #end visbility


function addNewCompetitor(){
  var init = $('#Initiative').val();
  var mod = -1;
  var valid = true;
  if(regexp.test(init)){
    mod = parseInt(init)+Math.floor((Math.random() * 20) + 1);
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
    person.hasSpells = false;
    hideCompetitorWindow();
  }
  else{
    valid = false;
    $('#AC').attr("class", $('#AC').attr("class") + " error");
  }
  
  if(combatInitiated){
    oldId = people[activeCompetitor].id;
  }
  if(valid){
    people.push(person);
    renderList();
    if(combatInitiated)
      setActive();
    else
      $('#compButton').show();
  }
}

function nextCompetitor(){
  if(people[activeCompetitor].hasSpells){
    spells[people[activeCompetitor]].duration--;
  }
  if(activeCompetitor + 1 === people.length)
    activeCompetitor = 0;
  else
    activeCompetitor++;
  renderList();
}

function renderList(){
  people.sort(function(a, b){return b.initiative - a.initiative});
  if(combatInitiated)
    oldId = $('.active').attr("id");
  people.empty();
  for(var i = 0; i < people.length; ++i){
    renderPerson(people[i]);
    if(people[i].hasSpells)
      renderSpell(people[i].id);
  }
  if(combatInitiated){
    activeCompetitor = people.findIndex(function(elem){ return elem.id == oldId});
    setActive(oldId);
  }
}

function renderPerson(person){
  
}

function setActive(id){
  $('[id="'+id+'"']').addClass("active");
}
