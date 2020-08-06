var soma123 = 0;
var soma123Fabrica = 0;
var descontoAltura = 10;
var descontoLargura = 10;
var numeroDePartes = 1; // por qexmplo numa janela 4 folhas esse número é 4. usado no romaneio

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
    Mudarestado('fundo2');
    calcula();
    console.log("Depois que faz tudo do OnLoad");


}

$('body').click(function() {
    console.log('clicou no boy');
    escondeTudoGeral();
});

$("btfabrica").click(function() {
    $.get("demo_test.asp", function(data, status) {
        alert("Data: " + data + "\nStatus: " + status);
    });
});

function whatsApp() {
    var telCliente = document.getElementById("idTelefone").value;
    if (telCliente != "") {
        console.log(telCliente);

        telCliente = "+055" + telCliente[1] + telCliente[2] + telCliente[5] + telCliente[6] + telCliente[7] + telCliente[8] + telCliente[9] + telCliente[11] + telCliente[12] + telCliente[13] + telCliente[14];
        var apiTel = "https://wa.me/" + telCliente;
        var NomeCliente = document.getElementById("idCliente").value;
        var link = "https://www.calculesuaobra.com.br/teste.pdf";
        var apiTexto1 = "?text=Oi%20*" + NomeCliente + "*!%20Estou%20te%20enviando%20o%20PDF%20do%20orçamento%20conforme%20combinamos:%20%20";
        var apiTexto2 = "%20%20Continuo%20a%20disposição";
        var API = apiTel + apiTexto1 + link + apiTexto2;
        window.open(API, "minhaJanela", "height=800px,width=800px")

    } else {
        console.log("telefone é vazio");
    }
}

function imprimir() {
    escondedisplay();
    escondeTudoGeral();
    window.print();
}


function imprimirFabrica() {
    escondedisplayFabrica();
    escondeTudoGeral();
    window.print();
}

function escondedisplay() {
    var elems = document.getElementsByClassName('deletando');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'none';
    }
    document.getElementById("itens").style.visibility = 'visible';
    document.getElementById("itensFabrica").style.visibility = 'hidden';
}

function escondedisplayFabrica() {
    var elems = document.getElementsByClassName('deletando');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'none';
    }
    document.getElementById("itens").style.visibility = 'hidden';
    document.getElementById("itensFabrica").style.visibility = 'visible';
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

function MudarVisibilidade(el) {
    var visi = document.getElementById(el).style.visibility;
    if (visi == "visible") {
        document.getElementById(el).style.visibility = 'hidden';
        escondeTudoGeral();
    } else {
        escondeTudoGeral();
        document.getElementById(el).style.visibility = 'visible';
    }
}

function escondeTudoGeral() {
    configEscondeTudo();
    document.getElementById("divConfiguracaoSistema").style.visibility = 'hidden';
    document.getElementById("divFIMFIM").style.visibility = 'hidden';
    document.getElementById("divUsuario").style.visibility = 'hidden';
    console.log("ERA PRA TER ESCONDIDO TUDO");
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

//function chamaaltura() {
//var precoVidro = document.getElementById("precoVidro").value;
//document.getElementById("SubTotal").value = parseFloat(document.getElementById("precoVidro").value) + parseFloat(document.getElementById("precoDiversos").value) + parseFloat(document.getElementById("precoFerro").value) + parseFloat(document.getElementById("precoKit").value);
//document.getElementById("Total").value = parseFloat(document.getElementById("quantidade").value) * document.getElementById("SubTotal").value;
//calcula();
//}

function calcula() {
    var precoVidro = document.getElementById("precoVidro").value;
    var altura = parseFloat(document.getElementById("altura").value) / 1000;
    var largura = parseFloat(document.getElementById("largura").value) / 1000;
    var yCor = document.getElementById("yCor").value;
    var precoDiversos = document.getElementById("precoDiversos").value;
    var quantidadeCantoneirasVertical = document.getElementById("quantidadeCantoneirasVertical").value;
    var pvMETROCANTONEIRA = document.getElementById("pvMETROCANTONEIRA").value;
    var precoFerro = document.getElementById("precoFerro").value;
    var xFerro = document.getElementById("xFerro").value;
    var precoKit = document.getElementById("precoKit").value;
    var xKit = document.getElementById("xKit").value;
    var SubTotal = document.getElementById("SubTotal").value;
    var quantidade = document.getElementById("quantidade").value;
    var Total = document.getElementById("Total").value;


    //pvMETROCANTONEIRA é quanto vai gastar com cantoneira
    //quantidadeCantoneirasVertical é quantas cantoneiras verticais vão

    //	precoVidro    = altura * largura(TRANSPASSE) * yCor;
    //	precoDiversos = altura * quantidadeCantoneirasVertical * pvMETROCANTONEIRA;
    //	precoFerro 	  = xFerro;
    //	precoKit      = largura * xKit;
    //	SubTotal      = parseFloat(precoVidro) + parseFloat(precoDiversos) + parseFloat(precoFerro) + parseFloat(precoKit);
    //	Total 		  = parseFloat(quantidade) * SubTotal ;
    document.getElementById("SubTotal").value = SubTotal;
    document.getElementById("precoVidro").value = parseFloat((altura * (largura + TRANSPASSE(document.getElementById("btt1").src)) * parseFloat(document.getElementById("yCor").value)));
    document.getElementById("precoDiversos").value = altura * document.getElementById("quantidadeCantoneirasVertical").value * document.getElementById("pvMETROCANTONEIRA").value;
    document.getElementById("precoFerro").value = document.getElementById("xFerro").value;
    document.getElementById("precoKit").value = largura * document.getElementById("xKit").value;
    document.getElementById("SubTotal").value = parseFloat(document.getElementById("precoVidro").value) + parseFloat(document.getElementById("precoDiversos").value) + parseFloat(document.getElementById("precoFerro").value) + parseFloat(document.getElementById("precoKit").value);
    document.getElementById("Total").value = parseFloat(document.getElementById("quantidade").value) * document.getElementById("SubTotal").value;
}


function TRANSPASSE(x) { //COMO CALCULAR O TRANSPASSE
    switch (x) {
        case "https://calculesuaobra.herokuapp.com/public/img/i01.png": //JANELA DUAS FOLHAS --> TRANSPASSE É DE 70 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i02.png": //JANELA DUAS FOLHAS --> TRANSPASSE É DE 70 MM
            return 0.07;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i03.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.14;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i04.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.07;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i05.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.14;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i06.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i07.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i08.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i09.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.14;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i10.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i11.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i12.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i13.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i14.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i15.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i16.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i17.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i18.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i019.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.1;
            break;
        case "https://calculesuaobra.herokuapp.com/public/img/i20.png": //JANELA quatro folhas --> TRANSPASSE É DE 140 MM
            return 0.05;
            break;

    }
}

function inserir() {
    document.getElementById("SOMA").style.display = 'inline';
    inserirLinhaTabela();
    inserirLinhaTabelaFabrica();
    soma123 += parseFloat(document.getElementById("Total").value);
    var soma123COMMAODEOBRA = soma123 + parseFloat(document.getElementById("maoDeObra").value)
    soma123Fabrica += parseFloat(document.getElementById("Total").value);
    document.getElementById("soma1234").innerHTML = number_format(soma123COMMAODEOBRA, 2, ",", ".");
    var vista = (parseFloat(soma123) - ((5 * parseFloat(soma123)) / 100));
    document.getElementById("vista").innerHTML = number_format(vista, 2, ",", ".");
    fParcela();

}

function irParaFinalDaPagina() {
    $('html, body').animate({
        scrollTop: $(document).height()
    }, 700);
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

    var lucroAtual = (parseFloat(document.getElementById("LUCRO").value) + 100) / 100; //transformando em porcentagem de multiplicar e acrescentar ex: 40% vira 1,4
    var quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTESIMPLES").value);
    var quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTESIMPLES").value);
    var pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTESIMPLES").value) * lucroAtual;
    var pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTESIMPLES").value) * lucroAtual;
    var pvKit = parseFloat(document.getElementById("pcKITBASCULANTESIMPLES").value) * lucroAtual;
    var transpasse = parseFloat(document.getElementById("TRANSPASSE").value);
    var imagem = "";
    switch (x) {
        case "i01": //basculante simples
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTESIMPLES").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTESIMPLES").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTESIMPLES").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTESIMPLES").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTESIMPLES").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTESIMPLES").value);
            imagem = "./public/img/i01.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 1;
            break;
        case "i02":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTEBF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTEBF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTEBF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTEBF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTEBF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTEBF").value);
            imagem = "./public/img/i02.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 2;
            break;
        case "i03":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTEFBF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTEFBF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTEFBF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTEFBF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTEFBF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTEFBF").value);
            imagem = "./public/img/i03.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 3;
            break;
        case "i04":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTEBFB").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTEBFB").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTEBFB").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTEBFB").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTEBFB").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTEBFB").value);
            imagem = "./public/img/i04.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 3;
            break;
        case "i05":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTEBFBAIXO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTEBFBAIXO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTEBFBAIXO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTEBFBAIXO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTEBFBAIXO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTEBFBAIXO").value);
            imagem = "./public/img/i05.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 2;
            break;
        case "i06":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALBASCULANTEBFALTO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALBASCULANTEBFALTO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRABASCULANTEBFALTO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMBASCULANTEBFALTO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITBASCULANTEBFALTO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEBASCULANTEBFALTO").value);
            imagem = "./public/img/i06.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 2;
            break;
        case "i07":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA2FOLHASFECHADURA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA2FOLHASFECHADURA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA2FOLHASFECHADURA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA2FOLHASFECHADURA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA2FOLHASFECHADURA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA2FOLHASFECHADURA").value);
            imagem = "./public/img/i07.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i08":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA2FOLHASBATEFECHA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA2FOLHASBATEFECHA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA2FOLHASBATEFECHA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA2FOLHASBATEFECHA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA2FOLHASBATEFECHA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA2FOLHASBATEFECHA").value);
            imagem = "./public/img/i08.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i09":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA2FOLHASTRINCO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA2FOLHASTRINCO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA2FOLHASTRINCO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA2FOLHASTRINCO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA2FOLHASTRINCO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA2FOLHASTRINCO").value);
            imagem = "./public/img/i09.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i10":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA4FOLHASFECHADURA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA4FOLHASFECHADURA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA4FOLHASFECHADURA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA4FOLHASFECHADURA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA4FOLHASFECHADURA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA4FOLHASFECHADURA").value);
            imagem = "./public/img/i10.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i11":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA4FOLHASBATEFECHA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA4FOLHASBATEFECHA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA4FOLHASBATEFECHA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA4FOLHASBATEFECHA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA4FOLHASBATEFECHA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA4FOLHASBATEFECHA").value);
            imagem = "./public/img/i11.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i12":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALJANELA4FOLHASTRINCO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALJANELA4FOLHASTRINCO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAJANELA4FOLHASTRINCO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMJANELA4FOLHASTRINCO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITJANELA4FOLHASTRINCO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEJANELA4FOLHASTRINCO").value);
            imagem = "./public/img/i12.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i13":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRSIMPLES").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRSIMPLES").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRSIMPLES").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRSIMPLES").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRSIMPLES").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRSIMPLES").value);
            imagem = "./public/img/i13.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i14":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRPP").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRPP").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRPP").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRPP").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRPP").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRPP").value);
            imagem = "./public/img/i14.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i15":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRPPF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRPPF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRPPF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRPPF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRPPF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRPPF").value);
            imagem = "./public/img/i15.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i16":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRPF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRPF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRPF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRPF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRPF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRPF").value);
            imagem = "./public/img/i16.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i17":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRFPPF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRFPPF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRFPPF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRFPPF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRFPPF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRFPPF").value);
            imagem = "./public/img/i17.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i18":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRFPPFTUBO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRFPPFTUBO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRFPPFTUBO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRFPPFTUBO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRFPPFTUBO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRFPPFTUBO").value);
            imagem = "./public/img/i18.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i19": //box de canto
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTAABRIRFPPFTUBOBANDEIRA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTAABRIRFPPFTUBOBANDEIRA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTAABRIRFPPFTUBOBANDEIRA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTAABRIRFPPFTUBOBANDEIRA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTAABRIRFPPFTUBOBANDEIRA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTAABRIRFPPFTUBOBANDEIRA").value);
            imagem = "./public/img/i19.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i20": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTACORRERFC").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTACORRERFC").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTACORRERFC").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTACORRERFC").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTACORRERFC").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTACORRERFC").value);
            imagem = "./public/img/i20.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i21":
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTACORRERPC").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTACORRERPC").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTACORRERPC").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTACORRERPC").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTACORRERPC").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTACORRERPC").value);
            imagem = "./public/img/i21.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i22": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTACORRERPCCP").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTACORRERPCCP").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTACORRERPCCP").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTACORRERPCCP").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTACORRERPCCP").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTACORRERPCCP").value);
            imagem = "./public/img/i22.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i23": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALPORTACORRERFCCF").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALPORTACORRERFCCF").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAPORTACORRERFCCF").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMPORTACORRERFCCF").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITPORTACORRERFCCF").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEPORTACORRERFCCF").value);
            imagem = "./public/img/i23.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i24": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSPANORAMICO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSPANORAMICO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSPANORAMICO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSPANORAMICO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSPANORAMICO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSPANORAMICO").value);
            imagem = "./public/img/i24.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i25": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSTUBULAR").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSTUBULAR").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSTUBULAR").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSTUBULAR").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSTUBULAR").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSTUBULAR").value);
            imagem = "./public/img/i25.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i26": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSSACADAS").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSSACADAS").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSSACADAS").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSSACADAS").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSSACADAS").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSSACADAS").value);
            imagem = "./public/img/i26.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i27": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSBOX").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSBOX").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSBOX").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSBOX").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSBOX").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSBOX").value);
            imagem = "./public/img/i27.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i28": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSBOXL").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSBOXL").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSBOXL").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSBOXL").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSBOXL").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSBOXL").value);
            imagem = "./public/img/i28.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            break;
        case "i29": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSESPELHOLAPIDADO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSESPELHOLAPIDADO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSESPELHOLAPIDADO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSESPELHOLAPIDADO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSESPELHOLAPIDADO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSESPELHOLAPIDADO").value);
            imagem = "./public/img/i29.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 6;
            document.getElementById("espessura").value = "4mm";
            yAtualiza2();
            break;
        case "i30": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALOUTROSESPELHOBIZOTE").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALOUTROSESPELHOBIZOTE").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAOUTROSESPELHOBIZOTE").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMOUTROSESPELHOBIZOTE").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITOUTROSESPELHOBIZOTE").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEOUTROSESPELHOBIZOTE").value);
            imagem = "./public/img/i30.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 7;
            document.getElementById("espessura").value = "4mm";
            yAtualiza2();
            break;
        case "i31": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAPORTA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAPORTA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAPORTA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAPORTA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAPORTA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAPORTA").value);
            imagem = "./public/img/i31.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 9;
            yAtualiza2();
            break;
        case "i32": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAPORTAO").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAPORTAO").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAPORTAO").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAPORTAO").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAPORTAO").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAPORTAO").value);
            imagem = "./public/img/i32.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 8;
            yAtualiza2();
            break;
        case "i33": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAJANELA4FOLHAS").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAJANELA4FOLHAS").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAJANELA4FOLHAS").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAJANELA4FOLHAS").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAJANELA4FOLHAS").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAJANELA4FOLHAS").value);
            imagem = "./public/img/i33.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 8; // Envia para o mesmo valor do case 12  (600)
            yAtualiza2();
            break;
        case "i34": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAJANELA2FOLHAS").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAJANELA2FOLHAS").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAJANELA2FOLHAS").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAJANELA2FOLHAS").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAJANELA2FOLHAS").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAJANELA2FOLHAS").value);
            imagem = "./public/img/i34.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 8; // Envia para o mesmo valor do case 12  (600)
            yAtualiza2();
            break;
        case "i35": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAVENEZIANACORTINA").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAVENEZIANACORTINA").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAVENEZIANACORTINA").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAVENEZIANACORTINA").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAVENEZIANACORTINA").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAVENEZIANACORTINA").value);
            imagem = "./public/img/i35.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 10;
            yAtualiza2();
            break;
        case "i36": //
            quantidadeCantoneirasVertical = parseFloat(document.getElementById("quantidadeCANTONEIRAVERTIVALESQUADRILHAVENAZIANA3FOLHAS").value);
            quantidadeCantoneirasHorizontal = parseFloat(document.getElementById("quantidadeCANTONEIRAHORIZONTALESQUADRILHAVENAZIANA3FOLHAS").value);
            pvMetroCantoneira = parseFloat(document.getElementById("pcCANTONEIRAESQUADRILHAVENAZIANA3FOLHAS").value) * lucroAtual;
            pvFerragem = parseFloat(document.getElementById("pcFERRAGEMESQUADRILHAVENAZIANA3FOLHAS").value) * lucroAtual;
            pvKit = parseFloat(document.getElementById("pcKITESQUADRILHAVENAZIANA3FOLHAS").value) * lucroAtual;
            transpasse = parseFloat(document.getElementById("pcTRANSPASSEESQUADRILHAVENAZIANA3FOLHAS").value);
            imagem = "./public/img/i36.png";
            descontoAltura = 10;
            descontoLargura = 10;
            numeroDePartes = 4;
            t = 9; // Envia para o mesmo valor do case 12  (700)
            yAtualiza2();
            break;
        default:
            alert("clicou numa imagem inexistente");
    }

    console.log("lucro atual: " + lucroAtual);
    console.log("quantidadeCantoneirasVertical: " + quantidadeCantoneirasVertical);
    console.log("quantidadeCantoneirasHorizontal: " + quantidadeCantoneirasHorizontal);
    console.log("pvMetroCantoneira: " + pvMetroCantoneira);
    console.log("pvFerragem: " + pvFerragem);
    console.log("pvMETROCANTONEIRA: " + pvMETROCANTONEIRA);

    document.getElementById("xFerro").value = pvFerragem;
    document.getElementById("pvMETROCANTONEIRA").value = pvMetroCantoneira;
    document.getElementById("xKit").value = pvKit;
    document.getElementById("btt1").src = "./public/img/i01.png";
    document.getElementById("quantidadeCantoneirasVertical").value = quantidadeCantoneirasVertical;
    document.getElementById("quantidadeCantoneirasHorizontal").value = quantidadeCantoneirasHorizontal;
    document.getElementById("btt1").src = imagem;

    document.getElementById("btt1").value = document.getElementById("hidden_" + x).value;
    document.getElementById("cor").src = "./public/img/v03.png";
    Mudarestado("fundo");
    calcula();
}

function trocaAba(abaClicada) {
    document.getElementById("fundoBasculantes").style.visibility = "hidden";
    document.getElementById("fundoJanelas").style.visibility = "hidden";
    document.getElementById("fundoPortas").style.visibility = "hidden";
    document.getElementById("fundoOutros").style.visibility = "hidden";
    document.getElementById("fundoEsquadrilhas").style.visibility = "hidden";

    document.getElementById("spanBasc").style.backgroundColor = "#488b85";
    document.getElementById("spanJane").style.backgroundColor = "#488b85";
    document.getElementById("spanPort").style.backgroundColor = "#488b85";
    document.getElementById("spanOutr").style.backgroundColor = "#488b85";
    document.getElementById("spanEsqu").style.backgroundColor = "#488b85";
    switch (abaClicada) {
        case 1:
            document.getElementById("fundoBasculantes").style.visibility = "visible";
            document.getElementById("spanBasc").style.backgroundColor = "#388172f5";
            document.getElementById("spanBasc").style.color = "white";
            break;
        case 2:
            document.getElementById("fundoJanelas").style.visibility = "visible";
            document.getElementById("spanJane").style.backgroundColor = "#388172f5";
            document.getElementById("spanJane").style.color = "white";
            break;
        case 3:
            document.getElementById("fundoPortas").style.visibility = "visible";
            document.getElementById("spanPort").style.backgroundColor = "#388172f5";
            document.getElementById("spanPort").style.color = "white";
            break;
        case 4:
            document.getElementById("fundoOutros").style.visibility = "visible";
            document.getElementById("spanOutr").style.backgroundColor = "#388172f5";
            document.getElementById("spanOutr").style.color = "white";
            break;
        case 5:
            document.getElementById("fundoEsquadrilhas").style.visibility = "visible";
            document.getElementById("spanEsqu").style.backgroundColor = "#388172f5";
            document.getElementById("spanEsqu").style.color = "white";
            break;
    }
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
                    document.getElementById("yCor").value = document.getElementById("pvVIDROINCO6").value;
                    break;
                case "8mm": // vidro + 12%     = 84,00   * 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROINCO8").value;
                    break;
                case "10mm": // vidro + 12%     = 112,50  * 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROINCO10").value;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 2: // Vidro Fumê
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%  =   93,50    * 80%  
                    document.getElementById("yCor").value = document.getElementById("pvVIDROFUME6").value;
                    break;
                case "8mm": // vidro + 12 %  =  114,80   + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROFUME8").value;
                    break;
                case "10mm": // vidro + 12%   = 158,93   + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROFUME10").value;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 3: // VIDRO VERDE 
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%   =  96,72 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROVERD6").value;
                    break;
                case "8mm": // vidro + 12%   =  114,80 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROVERD8").value;
                    break;
                case "10mm": // vidro + 12%   =  158,93 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROVERD10").value;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 4: // Vidro Bronze
            switch (document.getElementById("espessura").value) {
                case "6mm": // vidro + 12%   =  111,80 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROBRON6").value;
                    break;
                case "8mm": // vidro + 12%   =  140,00 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROBRON8").value;
                    break;
                case "10mm": // vidro + 12%   =  181 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROBRON10").value;
                    break;
                default:
                    alert("espessura inesistente");
            }
            break;
        case 5: //Pontilhado - fantasia
            switch (document.getElementById("espessura").value) {
                case "8mm": // vidro + 12%   =  143 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROPONT8").value;
                    break;
                case "10mm": // vidro + 12%   =  187,48 + 80%
                    document.getElementById("yCor").value = document.getElementById("pvVIDROPONT10").value;
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
                img.setAttribute('width', '80px');
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
                divx.setAttribute("style", "padding-left:60px; padding-top:15px");
                var texto = document.getElementById('altura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 2:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:60px; padding-top:15px");
                var texto = document.getElementById('largura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 3:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:60px; padding-top:15px");
                var texto = document.getElementById('espessura').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 4:
                newCell.style.width = "120px";
                var img2 = document.createElement("IMG");
                img2.setAttribute("style", "padding-left:10px");
                img2.src = document.getElementById('cor').src;
                newCell.appendChild(img2);
                break;
            case 5:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:0px; padding-top:15px");
                var texto = document.getElementById('aluminio').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 6:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:30px; padding-top:15px");
                var texto = document.getElementById('quantidade').value;
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 7:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:50px; padding-top:15px");
                var texto = number_format(document.getElementById('SubTotal').value, 2, ",", ".");
                var txt_aux = texto.split();
                divx.appendChild(document.createTextNode(txt_aux[0]));
                newCell.appendChild(divx);
                break;
            case 8:
                var divx = document.createElement('p');
                divx.setAttribute("style", "padding-left:25px; padding-top:15px");
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


function inserirLinhaTabelaFabrica() {
    calcula();
    var table = document.getElementById("minhaTabelaFabrica"); // Captura a referência da tabela com id “minhaTabela”
    var numOfRows = table.rows.length; // Captura a quantidade de linhas já existentes na tabela
    var numOfCols = table.rows[numOfRows - 1].cells.length; // Captura a quantidade de colunas da última linha da tabela
    //var newRow = table.insertRow(numOfRows); // Insere uma linha no fim da tabela.


    var tableEsquerda = document.getElementById("minhaTabelaFabricaEsquerda"); // Captura a referência da tabela com id “minhaTabela”
    var numOfRowsEsquerda = tableEsquerda.rows.length; // Captura a quantidade de linhas já existentes na tabela
    var numOfColsEsquerda = tableEsquerda.rows[numOfRowsEsquerda - 1].cells.length; // Captura a quantidade de colunas da última linha da tabela


    var j = -1;
    for (var i = 0; i < (5); i++) {
        var newRow = table.insertRow(numOfRows); // Insere uma linha no fim da tabela.
        var newRowEsquerda = tableEsquerda.insertRow(numOfRowsEsquerda); // Insere uma linha no fim da tabela.
        var j = -1;
        while (j < numOfCols) {
            j = j + 1;
            newCell = newRow.insertCell(j); // Insere uma coluna na nova linha 
            newCellEsquerda = newRowEsquerda.insertCell(j); // Insere uma coluna na nova linha 
            switch (j) {
                case 0:
                    if (i < 1) {
                        var divx = document.createElement('p');
                        divx.setAttribute("style", "padding-top:0px; width: 1px; color: white;");
                        var texto = document.getElementById('altura').value;
                        var txt_aux = texto.split();
                        var diferenca1 = "-----";
                        divx.appendChild(document.createTextNode(diferenca1));
                        newCell.appendChild(divx);
                        var img = document.createElement("IMG");
                        img.src = document.getElementById('btt1').src;
                        img.setAttribute('width', '93px');
                        var div = document.createElement('p');
                        div.setAttribute("style", "font-size:8px;");
                        var texto = document.getElementById('btt1').value;
                        var txt_aux = texto.split("-");
                        newCellEsquerda.appendChild(img);
                        div.appendChild(document.createTextNode(txt_aux[0]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createTextNode(txt_aux[1]));
                        if (i < numeroDePartes) {
                            newCellEsquerda.appendChild(div);
                        }


                        //newCell.innerHTML = img.value;
                        //document.getElementById('image').appendChild(img);
                    } else {
                        var divx = document.createElement('p');
                        divx.setAttribute("style", "padding-top:0px; width: 1px; color: white;");
                        var texto = document.getElementById('altura').value;
                        var txt_aux = texto.split();
                        var diferenca1 = "-----";
                        divx.appendChild(document.createTextNode(diferenca1));
                        newCell.appendChild(divx);
                        if (i < numeroDePartes) {
                            newCell.appendChild(divx);
                        }


                    }

                    break;
                case 1:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px;");
                    var texto = document.getElementById('altura').value;
                    var txt_aux = texto.split();
                    var diferenca1 = txt_aux[0] - descontoLargura;
                    divx.appendChild(document.createTextNode(diferenca1));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 2:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px");
                    var texto = document.getElementById('largura').value;
                    var txt_aux = texto.split();
                    var diferenca2 = txt_aux[0] - descontoLargura;
                    divx.appendChild(document.createTextNode(diferenca2));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 3:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px");
                    var texto = document.getElementById('espessura').value;
                    var txt_aux = texto.split();
                    divx.appendChild(document.createTextNode(txt_aux[0]));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 4:
                    newCell.style.width = "120px";
                    var img2 = document.createElement("IMG");
                    img2.setAttribute("style", "padding-left:10px");
                    img2.src = document.getElementById('cor').src;

                    if (i < numeroDePartes) {
                        newCell.appendChild(img2);
                    }
                    break;
                case 5:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:0px; padding-top:0px");
                    var texto = document.getElementById('aluminio').value;
                    var txt_aux = texto.split();
                    divx.appendChild(document.createTextNode(txt_aux[0]));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 6:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px");
                    var texto = document.getElementById('quantidade').value;
                    var txt_aux = texto.split();
                    divx.appendChild(document.createTextNode(txt_aux[0]));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 7:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px");
                    var texto = number_format(document.getElementById('SubTotal').value, 2, ",", ".");
                    var txt_aux = texto.split();
                    divx.appendChild(document.createTextNode(txt_aux[0]));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
                    break;
                case 8:
                    var divx = document.createElement('p');
                    divx.setAttribute("style", "padding-left:30px; padding-top:0px");
                    var texto = number_format(document.getElementById('Total').value, 2, ",", ".");
                    var txt_aux = texto.split();
                    divx.appendChild(document.createTextNode(txt_aux[0]));
                    if (i < numeroDePartes) {
                        newCell.appendChild(divx);
                    }
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

                    if (i < numeroDePartes) {
                        newCell.appendChild(img3);
                    }
                    break;
                default:
            }
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

function configEscondeTudo() {
    document.getElementById("divLucro").style.visibility = "hidden";
    document.getElementById("tbPRECOBASE").style.visibility = "hidden";
    document.getElementById("trKIT").style.visibility = "hidden";
    document.getElementById("trIMAGEM").style.visibility = "hidden";
    document.getElementById("trFERRAGEM").style.visibility = "hidden";
    document.getElementById("trTRANSPASSE").style.visibility = "hidden";
    document.getElementById("trCANTONEIRAPRECO").style.visibility = "hidden";
    document.getElementById("trCANTONEIRAQUANTIDADEVERTICAL").style.visibility = "hidden";
    document.getElementById("trCANTONEIRAQUANTIDADEHORIZONTAL").style.visibility = "hidden";
    document.getElementById("obsPRECOVIDRO").style.visibility = "hidden";
    document.getElementById("obsCANTONEIRA").style.visibility = "hidden";
}

function configMostraImagem() {
    document.getElementById("trIMAGEM").style.visibility = "visible";
}

function configMostraPrecoBase() {
    if (document.getElementById("tbPRECOBASE").style.visibility == "visible") {
        configEscondeTudo();
    } else {
        configEscondeTudo();
        document.getElementById("tbPRECOBASE").style.visibility = "visible";
        document.getElementById("obsPRECOVIDRO").style.visibility = "visible";
    }
}

function configMostraKit() {
    if (document.getElementById("trKIT").style.visibility == "visible") {
        configEscondeTudo();
    } else {
        configEscondeTudo();
        configMostraImagem();
        document.getElementById("trKIT").style.visibility = "visible";
    }
}

function configMostraFerragem() {
    if (document.getElementById("trFERRAGEM").style.visibility == "visible") {
        configEscondeTudo();
    } else {
        configEscondeTudo();
        configMostraImagem();
        document.getElementById("trFERRAGEM").style.visibility = "visible";
    }
}

function configMostraLucro() {
    if (document.getElementById("divLucro").style.visibility == "visible") {
        configEscondeTudo();
    } else {
        configEscondeTudo();
        document.getElementById("divLucro").style.visibility = "visible";
    }
}

function configMostraCantoneira() {
    if (document.getElementById("trCANTONEIRAPRECO").style.visibility == "visible") {
        configEscondeTudo();
    } else {
        configEscondeTudo();
        configMostraImagem();
        document.getElementById("trCANTONEIRAPRECO").style.visibility = "visible";
        document.getElementById("trCANTONEIRAQUANTIDADEVERTICAL").style.visibility = "visible";
        document.getElementById("trCANTONEIRAQUANTIDADEHORIZONTAL").style.visibility = "visible";
        document.getElementById("obsCANTONEIRA").style.visibility = "visible";
    }
}