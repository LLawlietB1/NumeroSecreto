let listaNumerosUsados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}
function MensagemInicial(){
    exibirTexto('h1', 'Número secreto!');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}:`);
}

MensagemInicial();
function verificarChute() {
    let chute =document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Você acertou!');
        let palavraTentativas = tentativas >1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns! você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'O número secreto é menor...');
        }
        else{
            exibirTexto('p','O número secreto é maior...');
        }
        tentativas++;
        limparCampo();

    }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido =  parseInt(Math.random() *numeroLimite +1);
   let quantidadeElementosLista = listaNumerosUsados.length;

   if (quantidadeElementosLista == numeroLimite) {
        listaNumerosUsados = [];
   }
   if (listaNumerosUsados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   } else {
    listaNumerosUsados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute  = document.querySelector('input');
    chute.value = '';
}
 
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;    
    MensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}