let inferEngine;
let workerId;

// Inicialize o InferenceEngine e carregue o modelo ao carregar a página
window.addEventListener("DOMContentLoaded", async () => {
    inferEngine = new inferencejs.InferenceEngine();
    // Substitua pelos valores do seu projeto/modelo
    const MODEL_NAME = "hello-kitty-project";
    const MODEL_VERSION = 2;
    const PUBLISHABLE_KEY = "rf_2UReq7ZeloeoNXaDrPe1nZ3IzOg2";
    workerId = await inferEngine.startWorker(MODEL_NAME, MODEL_VERSION, PUBLISHABLE_KEY);
});

// Função para rodar a inferência
async function rodarInferencia() {
    const fileInput = document.getElementById("roboflowFileInput");
    const output = document.getElementById("roboflowOutput");
    const preview = document.getElementById("roboflowImgPreview");

    if (!fileInput.files.length) {
        output.textContent = "Selecione uma imagem.";
        return;
    }

    // Mostrar preview da imagem
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async function(e) {
        preview.src = e.target.result;

        // Criar um elemento de imagem para inferência
        const img = new window.Image();
        img.src = e.target.result;
        img.onload = async function() {
            // Rodar inferência
            const predictions = await inferEngine.infer(workerId, img);
            output.textContent = JSON.stringify(predictions, null, 2);
        };
    };
    reader.readAsDataURL(file);
}

// Adicione o evento ao botão
const botao = document.getElementById("botaoDetectar");
botao.addEventListener("click", rodarInferencia);

