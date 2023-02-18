var colors;

fetch("https://api.color.pizza/v1/").then(response => {
    // indicates whether the response is successful (status code 200-299) or not
    if (!response.ok) {
      throw new Error(`Request failed with status ${reponse.status}`)
    }
    return response.json()
  })
  .then(data => {
    colors = data.colors;
  })
  .catch(error => console.log(error));



  function getAllTeamCombos4(
    n,
    f,
    m,
    r,
    firstNameRequiredLeader
){

    var endList = []

    endList.push(getAllTeamCombos3("" + n.firstName[0], f, m, r))

    

    if (n.lastName != null && n.lastName != "")
        endList.push(getAllTeamCombos3("" + n.lastName[0], f, m, r))
    
    if (firstNameRequiredLeader) 
        return endList
    

    endList.push(getAllTeamCombos3("" + f.firstName[0], n, m, r))
    endList.push(getAllTeamCombos3("" + m.firstName[0], f, n, r))
    endList.push(getAllTeamCombos3("" + r.firstName[0], f, m, n))


    if (f.lastName != null && f.lastName != "")
        endList.push(getAllTeamCombos3("" + f.lastName[0], n, m, r))
    if (m.lastName != null && m.lastName != "")
        endList.push(getAllTeamCombos3("" + m.lastName[0], f, n, r))
    if (r.lastName != null)
        endList.push(getAllTeamCombos3("" + r.lastName[0], f, m, n))


    return endList
}

function getAllTeamCombos3(
    partial,
    f,
    m,
    r
){

    var endList = []

    endList.push(getAllTeamCombos2(partial + r.firstName[0], f, m))
    endList.push(getAllTeamCombos2(partial + m.firstName[0], f, r))
    endList.push(getAllTeamCombos2(partial + f.firstName[0], r, m))

    if (r.lastName != null && r.lastName != "")
        endList.push(getAllTeamCombos2(partial + r.lastName[0], f, m))
    if (m.lastName != null && m.lastName != "")
        endList.push(getAllTeamCombos2(partial + m.lastName[0], f, r))
    if (f.lastName != null && f.lastName != "")
        endList.push(getAllTeamCombos2(partial + f.lastName[0], r, m))

    return endList
}

function getAllTeamCombos2(
    partial,
    a,
    b
) {

    var endList = []

    endList.push(getAllTeamCombos1(partial + a.firstName[0], b))
    endList.push(getAllTeamCombos1(partial + b.firstName[0], a))

    if (a.lastName != null && a.lastName != "") 
        endList.push(getAllTeamCombos1(partial + a.lastName[0], b))
    if (b.lastName != null && b.lastName != "") 
        endList.push(getAllTeamCombos1(partial + b.lastName[0], a))

    return endList
}

function getAllTeamCombos1(
    partial,
    a
){

    var endList = []

    endList.push(partial + a.firstName[0])
    if (a.lastName != null && a.lastName != "")
        if((partial + a.firstName[0]) != (partial + a.lastName[0]))
            endList.push(partial + a.lastName[0])

    return endList
}

class MyRegex {

    constructor(team, reg) {

        this.team = team;
        this.reg = reg;
    
    }

}

function characterRegex(chara) {
    if(chara != null && chara != "")
        return "["+chara.toLowerCase()+chara.toUpperCase()+"].*"
    else
        return ""
}

function teamStringToRegex(team) {

    var regex = new RegExp(".*" + 
        characterRegex(team[0]) +
        characterRegex(team[1]) +
        characterRegex(team[2]) +
        characterRegex(team[3])
    )

    var teamName = "" +
            (team[0].toUpperCase()) +
            (team[1].toUpperCase()) +
            (team[2].toUpperCase()) +
            (team[3].toUpperCase())

    return new MyRegex(teamName, regex)
}

class Name {
    constructor(
        firstName,
        lastName
    ){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}


class Color {
    constructor(
        colorName,
        hex
    ) {
        this.colorName = colorName;
        this.hex = hex;
    }
}

class FoundColor {
    constructor(
        colorName,
        hex,
        teamAcronym
    ){
        this.colorName = colorName;
        this.hex = hex;
        this.teamAcronym = teamAcronym;
    }
}

function getResults(name1, name2, name3, name4, enforceLeader, colors){
    
    var unflattedCombos = getAllTeamCombos4(name1, name2, name3, name4, enforceLeader)

    var combos = unflattedCombos.flat(4).map ( it => 
        teamStringToRegex(it)
    )

    var resultWithDupes = combos.flatMap ( reg =>
        colors.filter ( col =>
            col.name.match(reg.reg) != null
        ).map (it => 
            new FoundColor(it.name, it.hex, reg.team)
        )
    )

    

    var result = resultWithDupes.filter ( it => resultWithDupes.findIndex(it2 => it2.colorName == it.colorName)  != resultWithDupes.findLastIndex(it2 => it2.colorName == it.colorName) )
    .sort(function(a,b) { 
        return a.teamAcronym.localeCompare(b.teamAcronym) 
    })

    console.log("result: "+result.length)
    
    return result
}
