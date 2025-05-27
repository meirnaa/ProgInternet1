    // 2.a)
    document.getElementById("p1").innerHTML = "Olá, mundo!";

    // 2.b)
    const h1s = document.getElementsByTagName("h1");

    for (let i = 0; i < h1s.length; i++) {
        h1s[i].style.color = "purple";
    }

    const h2s = document.getElementsByTagName("h2");

    for (let i = 0; i < h2s.length; i++) {
        h2s[i].style.color = "green";
    }

    // 3.
    const divParagrafos = document.getElementById("paragrafos");

    const paragrafos = divParagrafos.getElementsByTagName("p");
    const quantidade = paragrafos.length;
    
    const divR = document.getElementById("resultado")
    
    divR.textContent = `Quantidade de Parágrafos: ${quantidade}`;

    //4.
    var botao = document.getElementById("botao");

    botao.addEventListener("click", function() {  
        var paragrafo = document.getElementById("paragrafo");
        // altere o texto do parágrafo
        paragrafo.textContent = "O texto deste parágrafo foi alterado!";
    });

    var botaoLimpar = document.getElementById("botao_limpar");

    botaoLimpar.addEventListener("click", function() {
        var paragrafo = document.getElementById("paragrafo");
        paragrafo.textContent = "";
    });

    //5.
    document.getElementById("exemplo").textContent;
    document.getElementById("exemplo").innerText;
    document.getElementById("exemplo").innerHTML;
