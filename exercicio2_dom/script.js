function getById(id){
    return document.getElementById(id);
}

//1.
function exibirMensagemErro(id, mensagem){
    var errorMessage = getById(id);
    errorMessage.innerText = mensagem;

    errorMessage.classList.remove('oculto');
    setTimeout(function() {
    errorMessage.classList.add('oculto');
    }, 3000);
}

document.getElementById('botaoErro').addEventListener('click', function() {
    let id = getById('id').value;
    let mensagem = getById('mensagem').value;

    if(mensagem == ""){
        mensagem = "Mensagem não pode estar vazia!";
    }

    exibirMensagemErro(id, mensagem);
});

//2.

var botaoExibir = getById('botaoExibir');
botaoExibir.addEventListener('click', exibirConteudo);

function exibirConteudo(){
    getById('conteudo').innerHTML = "";
    let texto = getById('caixaDeTexto').value;

    //2.a)
    if(texto.trim() == ""){
        //2.b)
        exibirMensagemErro('mensagemErro2', 'Conteúdo do campo não pode estar vazio!');
        return;
    }

    getById('conteudo').innerHTML = texto;
}

//3.
var botaoEngaj = getById('botaoCalcular');
botaoEngaj.addEventListener('click', calcularEngajamento);

function calcularEngajamento(){
    getById('conteudo2').innerHTML = "";
    let interacoes = getById('interacoes').value;
    let visualizacoes = getById('visualizacoes').value;

    if(interacoes.trim() == "" || visualizacoes.trim() == ""){
        exibirMensagemErro('mensagemErro3', 'Conteúdo do campo não pode estar vazio!');
        return;
    }else{
        interacoes = parseFloat(interacoes);
        visualizacoes = parseFloat(visualizacoes);

        if(isNaN(interacoes) || isNaN(visualizacoes)){
            exibirMensagemErro('mensagemErro3', 'Informe valores numéricos válidos!');
            return;
        }
    }

    let texto = (interacoes / visualizacoes) * 100;
    getById('conteudo2').innerHTML = `Engajamento: ${texto.toFixed(2)}%`;
}

//4.
var botaoImagem = getById('botaoImagem');
botaoImagem.addEventListener('click', mostrarImagem);

function mostrarImagem(){
    getById('resultado').innerHTML = '';

    let uploadImagem = getById('uploadImagem');
    var arquivoSelecionado = uploadImagem.files[0];

    let img = document.createElement('img');
    img.src = URL.createObjectURL(arquivoSelecionado);

    getById('resultado').appendChild(img);
}

//5.
const selectElement = document.querySelector(".personagens");
const result = getById('result');

selectElement.addEventListener("change", (event) => {
    let opcao = event.target.value;
    let img = document.createElement('img');

    if(opcao == "hellokitty"){
        img.src = "imagens/hellokitty.jpg";
    }
    else if(opcao == "melody"){
        img.src = "imagens/mymelody.jpg";
    }
    else if(opcao == "kuromi"){
        img.src = "imagens/kuromi.jpg";
    } else {
        result.innerHTML = '';
        return;
    }

    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });

    result.innerHTML = '';
    result.appendChild(img);
});

//6.
var botaoRedes = getById('enviarBtn');
botaoRedes.addEventListener('click', mostrarRedes);

function mostrarRedes(){
    getById('redesSelecionadas').innerHTML = '';
    let resultado = "";

    var redes = document.getElementsByName("redesSociais");
    let cont = 0;
    for(let rede of redes){
        if(rede.checked){
           resultado += `${rede.value}, `;
        } else {
            cont++;
        }
    }
    if(cont == 5){
        exibirMensagemErro('mensagemErro4', 'Escolha uma das opções!');
        return;
    }

    getById('redesSelecionadas').innerHTML = `<strong>Selecionadas:</strong> ` + resultado.slice(0, -2);
}

//7.
var botaoAdd = getById('adicionarBtn1');
var botaoLimpar = getById('limparBtn1');
var select = document.getElementById('select1');
var hashtagsDiv = document.getElementById('hashtags1');

botaoAdd.addEventListener('click', adicionarHashtag1);
botaoLimpar.addEventListener('click', limparHashtags1);

function adicionarHashtag1(){
    let hashtag = getById('hashtag1').value.trim();
    
    if(hashtag !== "") {
        let opcao = document.createElement('option');
        opcao.value = hashtag;
        opcao.innerText = hashtag;
        select.appendChild(opcao);
    }

    // Se houver pelo menos uma opção, mostra a div
    if(select.options.length > 0){
        hashtagsDiv.style.display = 'block';
    }
}

function limparHashtags1(){
    select.innerHTML = '';
    document.getElementById('hashtags1').style.display = 'none';
}


//8.

const botaoAdd2 = getById('adicionarBtn2');
const select2 = getById('select2');
const mensagemErro5 = getById('mensagemErro5');
const botaoLimpar2 = getById('limparBtn2');

botaoAdd2.addEventListener('click', adicionarHashtag2);
botaoLimpar2.addEventListener('click', limparHashtags2);

function adicionarHashtag2(){
    let hashtag = getById('hashtag2').value.trim();
    mensagemErro5.textContent = ""; 

    // 8.b)
    if(hashtag === ""){
        exibirMensagemErro('mensagemErro5',"Digite uma hashtag válida!");
        return;
    }

    // 8.c)
    if(hashtag.length < 2){
        exibirMensagemErro('mensagemErro5',"Hashtag muito curta! Mínimo de 2 caracteres.");
        return;
    }

    // 8.a) 
    for(let i=0; i < select2.options.length; i++){
        if(select2.options[i].value.toLowerCase() === hashtag.toLowerCase()){
            exibirMensagemErro('mensagemErro5', "Hashtag já adicionada!");
            return;
        }
    }

    // 8.d)
    if(select2.options.length >= 5){
        exibirMensagemErro('mensagemErro5', "Limite máximo de 5 hashtags atingido!");
        return;
    }

    let opcao = document.createElement('option');
    opcao.value = hashtag;
    opcao.text = hashtag;
    select2.appendChild(opcao);

    getById('hashtag2').value = "";

    if(select2.options.length > 0){
        getById('hashtags2').style.display = 'block';
    }
}

function limparHashtags2(){
    select2.innerHTML = '';
    mensagemErro5.textContent = "";
    getById('hashtags2').style.display = 'none';
}

//9.

const botaoRemover = getById('removerBtn');
botaoRemover.addEventListener('click', removerHashtag);

function removerHashtag(){
    const selecionadas = select2.selectedOptions;
    
    if(selecionadas.length === 0){
        return;
    }

    for(let i = 0; i < selecionadas.length; i++){
        select2.removeChild(selecionadas[i]);
    }

    if(select2.options.length === 0){
        getById('hashtags2').style.display = 'none';
    }
}

//10.

const ativosDisponiveis = getById('ativosDisponiveis');
const carteiraInvestimentos = getById('carteiraInvestimentos');
const btnDireita = getById('moverParaDireitaBtn');
const btnEsquerda = getById('moverParaEsquerdaBtn');

btnDireita.addEventListener('click', () => moverSelecionados(ativosDisponiveis, carteiraInvestimentos));
btnEsquerda.addEventListener('click', () => moverSelecionados(carteiraInvestimentos, ativosDisponiveis));

function moverSelecionados(origem, destino){
    mensagemErro6.textContent = ""; 

    //11.

    const selecionados = Array.from(origem.selectedOptions);
    if(selecionados.length === 0){
        exibirMensagemErro('mensagemErro6', "Selecione ao menos um item para mover!");
        return;
    }

    selecionados.forEach(option => {
        destino.appendChild(option);
    });

    atualizarBotoes();
}

//11.
function atualizarBotoes(){
    btnDireita.disabled = ativosDisponiveis.options.length === 0;
    btnEsquerda.disabled = carteiraInvestimentos.options.length === 0;
}