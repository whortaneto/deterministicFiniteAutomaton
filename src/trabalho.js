var fs = require("fs");
var arvore = JSON.parse(fs.readFileSync("./arquivo.json",
    "utf8"));
function makeNodes (arvore) {
    var node = {} , nodes = {}, chaves;
    for(var i = 0;  i < Object.keys(arvore.transições).length;i++) {
        chaves = Object.keys(arvore.transições[i]);
        node = {name: chaves.join(), childrens: arvore.transições[i][chaves], write: "", goesTo: ""};
        nodes[chaves.join()] = node;
    }
    chaves = Object.keys(nodes);
    for (var i = 1; i < chaves.length; i++) {
        for(var j = 0; j < nodes[chaves[i]].childrens.length; j++) {
        node = {name: nodes[chaves[i]].childrens[j].replace(" ", ""), childrens: [], write: nodes[chaves[i]].childrens[j][0], goesTo: nodes[chaves[i]].childrens[j][1] ? nodes[chaves[i]].childrens[j][1]: ""};
            if(!nodes[nodes[chaves[i]].childrens[j]]) {
                nodes[nodes[chaves[i]].childrens[j]] = node;
            }
        }
    }
    return nodes;
};

var nodes = makeNodes(arvore);

console.log(nodes);
exports.processWord = function (word) {
    console.log(nodes);
    var aceito = 'Não Aceito', position = 'S', writen = '';
    var j = 0, i = 0;
    while (writen.length < word.length) {
        if(nodes[position].childrens.length > 0) {
            if(nodes[nodes[position].childrens[j]].childrens.join().indexOf(word[i])>-1) {
                position = nodes[nodes[position].childrens[j]].name;
                j=0;
            } else if (nodes[nodes[position].childrens[j]].write === word[i]) {
                writen += nodes[nodes[position].childrens[j]].write;
                position = nodes[nodes[position].childrens[j]].goesTo;
                j=0;
                i++;
            } else {
                j++;
            }
        } else {
            writen += nodes[position].write;
            position = nodes[position].goesTo;
        }
        if(writen === word && position === '') {
            aceito = 'Aceito';
            break;
        }
    }

    return aceito;
};