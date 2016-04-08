var people = [];
var spells = {};
var caster_id = -1;
var regexp = new RegExp("^\\/d20(\\+|\\-)\\d+$")
var regexp2 = new RegExp("^\\-?\\\d+$");

var _count = 0;
var activeCompetitor = 0;

function nextCompetitor(){
  $('.active').removeClass("active");
  $('[id="'+people[activeCompetitor++].id+'"]').addClass("active")
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
  var pattern = '<div class="row" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{AC}}</span></div><a href="#" onclick="newSpell({{ID}})"><div class="col-xs-1"><span class="icon-magic-wand"></span></div></a></div>'
  var pattern_spell = '<div class="row spell" id="{{ID}}"><div class="col-xs-1"></div><div class="col-xs-3"><span>{{INIT}}</span></div><div class="col-xs-3"><span>{{NAME}}</span></div><div class="col-xs-3"><span>{{DURATION}} turn{{MORETHANONE}}</span></div><a href="#"><div class="col-xs-1"><i class="fa fa-ban"></i></div></a></div>';
  for (var i = 0; i < people.length; ++i){
    var person = people[i];
    var text = pattern.replace("{{ID}}",person.id);
    text = text.replace("{{NAME}}",person.name);
    text = text.replace("{{INIT}}",person.initiative);
    text = text.replace("{{AC}}",person.ac);
    text = text.replace("{{ID}}",person.id);
    $('#people').append(text);
    
    if (spells[person.id] !== undefined){
      var text_spell = pattern_spell.replace("{{ID}}",person.id);
      text_spell = text_spell.replace("{{INIT}}",person.initiative);
      text_spell = text_spell.replace("{{NAME}}",spells[person.id].name);
      text_spell = text_spell.replace("{{DURATION}}",spells[person.id].duration);
      if(spells[person.id].duration > 1)
        text_spell = text_spell.replace("{{MORETHANONE}}","s");
      else
        text_spell = text_spell.replace("{{MORETHANONE}}","");
      $('#people').append(text_spell);
    }
    
    if(activeCompetitor == i){
      $('[id="'+i+'"]').addClass("active");
    }
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

function newSpell(id){
  $('#collapse2').collapse('show');
  $('#list').collapse('hide');
  caster_id = id;
  goToByScroll("collapse2")
}

function cancelSpell(){
  $('#collapse2').collapse('hide');
  $('#list').collapse('show');
  $('#Spellname').val("");
}

function addSpell(){
    if($('#Spellname').val().trim().length !== 0){
      var spell = {};
      spell.name = $('#Spellname').val();
      spell.duration = parseInt($('#Duration').find(":selected").attr("value"));
      spells[caster_id] = spell;
      renderList();
      cancelSpell();
    }
}
