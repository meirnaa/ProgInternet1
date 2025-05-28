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

    //7.
    function copiarTexto() {
        var texto = document.getElementById("entrada").value;
        var textoMaiusculo = texto.toUpperCase();
        document.getElementById("saida").value = textoMaiusculo;
    }

    //8.
    function alterarBody() {
        document.body.classList.add("alto-contraste");
    } 
    
    function resetarBody() {
        document.body.classList.remove("alto-contraste");
    }  

    let tamanho_fonte = 14;

    function aumentarTamanho() {
      if (tamanho_fonte < 32) {
        tamanho_fonte += 1;
        document.body.style.fontSize = tamanho_fonte + "px";
      }
    }

    function diminuirTamanho() {
      if (tamanho_fonte > 10) {
        tamanho_fonte -= 1;
        document.body.style.fontSize = tamanho_fonte + "px";
      }
    }
