var soma123 = 0;
var t = 0;

onload = function() {
    Mudarestado("fundo");
    Mudarestado("fundo2");
    document.getElementById("btt1").src = "./public/img/i01.png";
    document.getElementById("cor").src = "./public/img/v01.png";
    xAtualiza('i01');
    yAtualiza('v01');
    Mudarestado('fundo');
    Mudarestado('fundo2');
    calcula();
}

$("btfabrica").click(function() {
    $.get("demo_test.asp", function(data, status) {
        alert("Data: " + data + "\nStatus: " + status);
    });
});

function imprimir() {
    escondedisplay();
    window.print();
}

function escondedisplay() {
    var elems = document.getElementsByClassName('deletando');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'none';
    }
}


function trocadisplay() {
    var elems = document.getElementsByClassName('deletando');
    for (var i = 0; i < elems.length; i += 1) {
        var display = elems[i].style.display;
        if (display == "none") {
            document.getElementsByClassName('deletando')[i].style.display = 'inline';
        } else {
            document.getElementsByClassName('deletando')[i].style.display = 'none';
        }
    }
}


function nparcelasfuncao(sData) {
    if (sData != "") {
        var dt_pedido = sData.split("/");
        var dia = dt_pedido[0];
        var mes = parseInt(dt_pedido[1]);
        var ano = parseInt(dt_pedido[2]);
        var mes_final = 0;
        var j = 0;
        for (i = 0; i < 11; i++) {
            if (i > 0) {
                mes_final = mes++;
                if (mes_final > 12) {
                    mes = 1;
                    mes_final = mes++;
                    ano++;
                }
            }
            var dtVal = dia + "/" + str_pad(mes_final, 2, 0, "STR_PAD_LEFT") + "/" + ano;
            $("#parcela_dt" + j).val(dtVal);
            j++;
        }
    } else {
        for (i = 1; i < 11; i++) {
            $("#parcela_dt" + i).val("");
        }
    }
}

function calcula_parcelas(sData) {
    if (sData != "") {
        var dt_pedido = sData.split("/");
        var dia = dt_pedido[0];
        var mes = parseInt(dt_pedido[1]);
        var ano = parseInt(dt_pedido[2]);
        var mes_final = 0;
        var j = 0;
        for (i = 0; i < 11; i++) {
            if (i > 0) {
                mes_final = mes++;
                if (mes_final > 12) {
                    mes = 1;
                    mes_final = mes++;
                    ano++;
                }
            }
            var dtVal = dia + "/" + str_pad(mes_final, 2, 0, "STR_PAD_LEFT") + "/" + ano;
            $("#parcela_dt" + j).val(dtVal);
            j++;
        }
    } else {
        for (i = 1; i < 11; i++) {
            $("#parcela_dt" + i).val("");
        }
    }
}

function str_pad(input, pad_length, pad_string, pad_type) {
    var half = '',
        pad_to_go;
    var str_pad_repeater = function(s, len) {
        var collect = '',
            i;
        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);
        return collect;
    };
    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';
    if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
        pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type === 'STR_PAD_LEFT') {
            input = str_pad_repeater(pad_string, pad_to_go) + input;
        } else if (pad_type === 'STR_PAD_RIGHT') {
            input = input + str_pad_repeater(pad_string, pad_to_go);
        } else if (pad_type === 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }
    return input;
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k).toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if (display == "none") {
        document.getElementById(el).style.display = 'block';
    } else {
        document.getElementById(el).style.display = 'none';
    }
}

function exibe_tab(el) {
    var display = document.getElementById(el).style.display;
    if (display == "none") {
        document.getElementById(el).style.display = 'block';
        document.getElementById(el).style.position = 'fixed';
        document.getElementById('cabecario').style.display = 'none';
    } else {
        document.getElementById(el).style.display = 'none';
        document.getElementById('fundo').style.display = 'none';
        document.getElementById('fundo2').style.display = 'none';
        document.getElementById('cabecario').style.display = 'block';
    }
}

function chamaaltura() {
    var precoVidro = document.getElementById("precoVidro").value;
    document.getElementById("SubTotal").value = parseFloat(document.getElementById("precoVidro").value) + parseFloat(document.getElementById("precoDiversos").value) + parseFloat(document.getElementById("precoFerro").value) + parseFloat(document.getElementById("precoKit").value);
    document.getElementById("Total").value = parseFloat(document.getElementById("quantidade").value) * document.getElementById("SubTotal").value;
    calcula();
}

function calcula() {
    var precoVidro = document.getElementById("precoVidro").value;
    var altura = document.getElementById("altura").value;
    var largura = document.getElementById("largura").value;
    var yCor = document.getElementById("yCor").value;
    var precoDiversos = document.getElementById("precoDiversos").value;
    var xFator = document.getElementById("xFator").value;
    var xDiversos = document.getElementById("xDiversos").value;
    var precoFerro = document.getElementById("precoFerro").value;
    var xFerro = document.getElementById("xFerro").value;
    var precoKit = document.getElementById("precoKit").value;
    var xKit = document.getElementById("xKit").value;
    var SubTotal = document.getElementById("SubTotal").value;
    var quantidade = document.getElementById("quantidade").value;
    var Total = document.getElementById("Total").value;
    //	precoVidro    = altura * largura * yCor;
    //	precoDiversos = altura * xFator * xDiversos;
    //	precoFerro 	  = xFerro;
    //	precoKit      = largura * xKit;
    //	SubTotal      = parseFloat(precoVidro) + parseFloat(precoDiversos) + parseFloat(precoFerro) + parseFloat(precoKit);
    //	Total 		  = parseFloat(quantidade) + SubTotal;
    document.getElementById("SubTotal").value = SubTotal;
    document.getElementById("precoVidro").value = (document.getElementById("altura").value * document.getElementById("largura").value * document.getElementById("yCor").value) / (1000000);
    document.getElementById("precoDiversos").value = document.getElementById("altura").value * document.getElementById("xFator").value * document.getElementById("xDiversos").value;
    document.getElementById("precoFerro").value = document.getElementById("xFerro").value;
    document.getElementById("precoKit").value = document.getElementById("largura").value * document.getElementById("xKit").value;
    document.getElementById("SubTotal").value = parseFloat(document.getElementById("precoVidro").value) + parseFloat(document.getElementById("precoDiversos").value) + parseFloat(document.getElementById("precoFerro").value) + parseFloat(document.getElementById("precoKit").value);
    document.getElementById("Total").value = parseFloat(document.getElementById("quantidade").value) * document.getElementById("SubTotal").value;
}

function inserir() {
    document.getElementById("SOMA").style.display = 'inline';
    inserirLinhaTabela();
    soma123 += parseFloat(document.getElementById("Total").value);
    document.getElementById("soma1234").innerHTML = number_format(soma123, 2, ",", ".");
    var vista = parseFloat(soma123) - ((5 * parseFloat(soma123)) / 100);
    document.getElementById("vista").innerHTML = number_format(vista, 2, ",", ".");
    fParcela();
}

function fParcela() {
    var parcelado = (parseFloat(soma123)) / document.getElementById("nparcelas").value;
    for (i = 1; i <= 12; i++) {
        document.getElementById("parcelado" + i).style.display = 'inline';
        document.getElementById("parcela_dt" + i).style.display = 'inline';
        if (i <= document.getElementById("nparcelas").value) {
            document.getElementById("parcelado" + i).innerHTML = number_format(parcelado, 2, ",", ".");
        } else {
            document.getElementById("parcelado" + i).style.display = 'none';
            document.getElementById("parcela_dt" + i).style.display = 'none';
        }
    }
}

function xAtualiza(x) {
    document.getElementById("espessura").value = "8mm";
    switch (x) {
        case "i01":
            //  Valor do Basculante   Imagem i01.
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7; // Metro da cantoneira
            // 35  + 80 %     --> alterei em 17 de julho de 2020 para :  45 + 40% nesse e nos outros
            document.getElementById("xFerro").value = 63.00; // Valor da Ferragem Basculante   + 80%
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i01.png"
            break;
        case "i02":
            // Fechadura
            document.getElementById("xFator").value = 3;
            document.getElementById("xDiversos").value = 7; // Metro da Cantoneira
            // 55 + 80%      = 99    --> alterei em 17 de julho de 2020 para :  45 + 40% nesse e nos outros
            document.getElementById("xFerro").value = 63.00; // Valor da Ferragem + 80%
            document.getElementById("xKit").value = 90.00;
            document.getElementById("btt1").src = "./public/img/i02.png";
            break;
        case "i03":
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7;
            // 55 + 80%      = 99 
            document.getElementById("xFerro").value = 98.00;
            document.getElementById("xKit").value = 90.00;
            document.getElementById("btt1").src = "./public/img/i03.png";
            break;
        case "i04":
            document.getElementById("xFator").value = 3;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 28.00;
            document.getElementById("xKit").value = 90.00;
            document.getElementById("btt1").src = "./public/img/i04.png";
            break;
        case "i05":
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 56.00; //alterado
            document.getElementById("xKit").value = 90.00;
            document.getElementById("btt1").src = "./public/img/i05.png";
            break;
        case "i06":
            document.getElementById("xFator").value = 3;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 161.00; //alterado
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i06.png";
            break;
        case "i07":
            document.getElementById("xFator").value = 3;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 140.00; //alterado
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i07.png";
            break;
        case "i08":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i08.png";
            break;
        case "i09":
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 238;
            document.getElementById("xKit").value = 85.00;
            document.getElementById("btt1").src = "./public/img/i09.png";
            break;
        case "i10":

            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i10.png";
            t = 7;
            document.getElementById("espessura").value = "4mm";
            yAtualiza2();
            break;
        case "i11":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("espessura").value = "4mm";
            document.getElementById("btt1").src = "./public/img/i11.png";
            t = 6;
            yAtualiza2();
            break;
        case "i12":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i12.png";
            t = 8;
            yAtualiza2();
            break;
        case "i13":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i13.png";
            t = 9;
            yAtualiza2();
            break;
        case "i14":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i14.png";
            t = 8; // Envia para o mesmo valor do case 12  (600)
            yAtualiza2();
            break;
        case "i15":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i15.png";
            t = 8; // Envia para o mesmo valor do case 12  (600)
            yAtualiza2();
            break;
        case "i16":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i16.png";
            t = 9; // Envia para o mesmo valor do case 12  (700)
            yAtualiza2();
            break;
        case "i17":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i17.png";
            t = 10;
            yAtualiza2();
            break;
        case "i18":
            document.getElementById("xFator").value = 2;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xFerro").value = 0;
            document.getElementById("xKit").value = 0;
            document.getElementById("btt1").src = "./public/img/i18.png";
            t = 8; // Envia para o mesmo valor do case 12  (600)
            yAtualiza2();
            break;
        case "i19": //box de canto
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xKit").value = 0.00;
            document.getElementById("btt1").src = "./public/img/i19.png";
            break;
        case "i20": //box de Frontal
            document.getElementById("xFator").value = 5;
            document.getElementById("xDiversos").value = 7;
            document.getElementById("xKit").value = 0.00;
            document.getElementById("btt1").src = "./public/img/i20.png";
            break;
        default:
            alert("clicou numa imagem inexistente");
    }
    document.getElementById("btt1").value = document.getElementById("hidden_" + x).value;
    document.getElementById("cor").src = "./public/img/v03.png";
    Mudarestado("fundo");
    calcula();
}

function yAtualiza(y) {
    switch (y) {
        case "v01": // Vidrof INCOLOR
            document.getElementById("cor").src = "./public/img/v01.png";
            t = 1;
            yAtualiza2();
            break;
        case "v02": // Vidro FUMÊ
            document.getElementById("cor").src = "./public/img/v02.png";
            t = 2;
            yAtualiza2();
            break;
        case "v03":
            document.getElementById("cor").src = "./public/img/v03.png";
            t = 3;
            yAtualiza2();
            break;
        case "v04":
            document.getElementById("cor").src = "./public/img/v04.png";
            t = 4;
            yAtualiza2();
            break;
        case "v05":
            document.getElementById("cor").src = "./public/img/v05.png";
            t = 5;
            yAtualiza2();
            break;
        default:
            alert("clicou numa imagem inexistente");
    }
    Mudarestado("fundo2");
    yAtualiza2();
    calcula();
}

function yAtualiza2() {
    switch (t) {
        case 1: // Vidro incolor 
            switch (document.getElementById("espessura").value) {
                case "6mm": //  vidro + 12%    = 75   *  50% (DEPOIS O VALOR FOI mudado de cabeça)
                    document.getElementById("yCor").value = 110.60;
                    break;
                case "8mm": // vidro + 12%     = 84,00   * 80%
                    document.getElementById("yCor").value = 140.00;
                    break;
                case "10mm": // vidro + 12%     = 112,50  * 80%
                    document.getElementById("yCor").value = 189.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 2: // Vidro Fumê
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%  =   93,50    * 80%  
                    document.getElementById("yCor").value = 140.00;
                    break;
                case "8mm": // vidro + 12 %  =  114,80   + 80%
                    document.getElementById("yCor").value = 182.00;
                    break;
                case "10mm": // vidro + 12%   = 158,93   + 80%
                    document.getElementById("yCor").value = 238.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 3: // VIDRO VERDE 
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%   =  96,72 + 80%
                    document.getElementById("yCor").value = 140.00;
                    break;
                case "8mm": // vidro + 12%   =  114,80 + 80%
                    document.getElementById("yCor").value = 182.00;
                    break;
                case "10mm": // vidro + 12%   =  158,93 + 80%
                    document.getElementById("yCor").value = 238.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 4: // Vidro Bronze
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%   =  111,80 + 80%
                    document.getElementById("yCor").value = 182.00;
                    break;
                case "8mm": // vidro + 12%   =  140,00 + 80%
                    document.getElementById("yCor").value = 238.00;
                    break;
                case "10mm": // vidro + 12%   =  181 + 80%
                    document.getElementById("yCor").value = 294.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 5: //Pontilhado - fantasia
            switch (document.getElementById("espessura").value) {
                case "8mm": // vidro + 12%   =  143 + 80%
                    document.getElementById("yCor").value = 273.00;
                    break;
                case "10mm": // vidro + 12%   =  187,48 + 80%
                    document.getElementById("yCor").value = 362.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 6: // Espelho Lapidado
            switch (document.getElementById("espessura").value) {
                case "4mm": // espelho + 12%  = 183,00 + 80%
                    document.getElementById("yCor").value = 234.00;
                    break;
                case "5mm": // espelho + 12%  = 211,10 + 80%
                    document.getElementById("yCor").value = 270.00;
                    break;
                case "6mm": // espelho + 12%  = 248,62 + 80%
                    document.getElementById("yCor").value = 324.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 7: // Espelho Bisote
            switch (document.getElementById("espessura").value) {
                case "4mm": // espelho+ 12%  = 206,41 + 80%
                    document.getElementById("yCor").value = 288.00;
                    break;
                case "5mm": // espelho + 12%  = 262,70 + 80%
                    document.getElementById("yCor").value = 324.00;
                    break;
                case "6mm": // espelho + 12%  = 274,45 + 80%
                    document.getElementById("yCor").value = 378.00;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 8: // Esquadrilha alumínio
            document.getElementById("yCor").value = 600.00;
            break;
        case 9: // Esquadrilha alumínio
            document.getElementById("yCor").value = 700.00;
            break;
        case 10: // Esquadrilha alumínio
            document.getElementById("yCor").value = 800.00;
            break;
    }
    Mudarestado("fundo2");
    calcula();
}

function inserirLinhaTabela() {
    var table = document.getElementById("minhaTabela"); // Captura a referência da tabela com id “minhaTabela”
    var numOfRows = table.rows.length; // Captura a quantidade de linhas já existentes na tabela
    var numOfCols = table.rows[numOfRows - 1].cells.length; // Captura a quantidade de colunas da última linha da tabela
    var newRow = table.insertRow(numOfRows); // Insere uma linha no fim da tabela.
    for (var j = 0; j < (numOfCols + 1); j++) {
        newCell = newRow.insertCell(j); // Insere uma coluna na nova linha 
        switch (j) {
            case 0:
                var img = document.createElement("IMG");
                img.src = document.getElementById('btt1').src;
                img.setAttribute('width', '100px');
                var div = document.createElement('p');
                div.setAttribute("style", "font-size:8px");
                var texto = document.getElementById('btt1').value;
                var txt_aux = texto.split("-");
                newCell.appendChild(img);
                div.appendChild(document.createTextNode(txt_aux[0]));
                div.appendChild(document.createElement("br"));
                div.appendChild(document.createTextNode(txt_aux[1]));
                newCell.appendChild(div);
                //newCell.innerHTML = img.value;
                //document.getElementById('image').appendChild(img);
                break;
            case 1:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:60px");
                var texto = document.getElementById('altura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 2:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:60px");
                var texto = document.getElementById('largura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 3:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:60px");
                var texto = document.getElementById('espessura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 4:
                newCell.style.width = "200px";
                var img2 = document.createElement("IMG");
                img2.setAttribute("style", "padding-left:10px");
                img2.src = document.getElementById('cor').src;
                newCell.appendChild(img2);
                break;
            case 5:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:0px");
                var texto = document.getElementById('aluminio').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 6:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:30px");
                var texto = document.getElementById('quantidade').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 7:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:50px");
                var texto = number_format(document.getElementById('SubTotal').value, 2, ",", ".");
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 8:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:25px");
                var texto = number_format(document.getElementById('Total').value, 2, ",", ".");
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                //var div = ( document.all ) ? document.all['myDiv'] : document.getElementById('myDiv');
                //div.innerHTML = '<button id="btn" name="btn">Button</button>';
                break;
            case 9:
                newCell.style.width = "100px";
                newCell.className = "deletando";
                newCell.style.display = "inline";
                var img3 = document.createElement("IMG");
                img3.setAttribute("style", "width:20px");
                img3.src = "./public/img/x.png";
                //tá imprimindo 45, mas está certo  pois realmente tem um monte de linhas em branco na tabela
                img3.setAttribute("onclick", "delRow(this.parentNode.parentNode.rowIndex, this.parentNode.parentNode.getElementsByTagName('td'))");
                newCell.appendChild(img3);
                break;
            default:
        }
    }
}


function delRow(i, j) {
    document.getElementById("soma1234").innerHTML = number_format(1000 * (parseFloat(document.getElementById("soma1234").innerHTML) - parseFloat(j[8].firstChild.innerHTML)), 2, ",", ".");
    soma123 = soma123 - (parseFloat(j[8].firstChild.innerHTML) * 1000);
    document.getElementById('minhaTabela').deleteRow(i);
    var vista = parseFloat(soma123) - ((5 * parseFloat(soma123)) / 100);
    document.getElementById("vista").innerHTML = number_format(vista, 2, ",", ".");
    var parcelado = (parseFloat(soma123)) / 10;
    for (a = 1; a < 11; a++) {
        document.getElementById("parcelado" + a).innerHTML = number_format(parcelado, 2, ",", ".");
    }
}