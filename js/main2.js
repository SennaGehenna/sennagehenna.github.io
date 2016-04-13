var activeCompetitor = -1;
var caster_id = -1;
var combatInitiated = false;
var count = 0;
var people =[];
var spells = {};

var oldId = -1;

var regexp = new RegExp(/(\+|\-)\d+/)
var regexp2 = new RegExp("^\\-?\\\d+$");




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
  }
}
