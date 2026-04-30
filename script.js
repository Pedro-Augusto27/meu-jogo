// Pega o elemento canva do HTML com id "meuJogo".
const canvas = document.getElementById('meuJogo');

// ctx = Contexto, é o que usamos para desenhar no canvas e o tipo de contexto.
const ctx = canvas.getContext('2d'); // 2d é o tipo de contexto para que possa desenhar.


// PARTES DO JOGADOR:

// Cria o objeto jogador
const jogador = {
    x: 50,  // Posição horizontal inicial
    y: 50,  // Posição vertical inicial

    // Tamanho do jogador
    largura: 40,
    altura: 40,

    cor: 'red',// Cor dele
    vida: 3, // Vida do jogador
    estaPiscando: false,
    temEspada: false,
};

// Desenha o jogador
function desenharJogador() {
    // Vida do Jogador
    if (jogador.vida <= 0) return;

    // Se estiver piscando (levou dano), desenha branco.
    // Senão, desenha com a cor original.
    ctx.fillStyle = jogador.estaPiscando ? 'white' : jogador.cor;
    ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);
   

    // Desenha a espada se tiver coletada
    if (jogador.temEspada) {
        ctx.fillStyle = '#C0C0C0'; // Cor prata/cinza
        // Desenha a espada saindo da direita do jogador
        ctx.fillRect(jogador.x + jogador.largura, jogador.y + 10, 10, 25);
        // Um pequeno detalhe para o cabo da espada
        ctx.fillStyle = 'brown';
        ctx.fillRect(jogador.x + jogador.largura, jogador.y + 25, 10, 5);
    }

    // Exibir vidas na tela
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText("Vidas: " + jogador.vida, 10, 30);

}


// Const para o navegador saber que as teclas estão sendo pressionados
const teclasPressionadas = {}
// Quando apertar a tecla
window.addEventListener('keydown', (e) => {
    teclasPressionadas[e.key] = true;
});


// Quando soltar a tecla
window.addEventListener('keyup', (e) => {
    teclasPressionadas[e.key] = false;
});

// Movimetação do jogador
const velocidade = 5; // Quantos pixels o jogador anda por frame

function moverJogador() {
    if (teclasPressionadas['ArrowUp'] && jogador.y > 0) {
        jogador.y -= velocidade; // Move para cima 
    }
    if (teclasPressionadas['ArrowDown'] && jogador.y < canvas.height - jogador.altura) {
        jogador.y += velocidade; // Move para baixo
    }
    if (teclasPressionadas['ArrowLeft'] && jogador.x > 0) {
        jogador.x -= velocidade; // Move para esquerda
    }
    if (teclasPressionadas['ArrowRight'] && jogador.x < canvas.width - jogador.largura) {
        jogador.x += velocidade; // Move para direita
    }
}

/* ------------------------------------------------ */

// PARTES DO INIMIGO:

// Criar objeto inimigo
const inimigo = {
    x: 200,
    y: 200,
    largura: 40,
    altura: 40,
    cor: 'blue',
    velocidade: 1.5,
    vivo: true,
    vida: 3,
    estaPiscando: false,
}

// Desenhar o inimigo
function desenharInimigo() {
    ctx.fillStyle = inimigo.cor;
    ctx.fillRect(inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);
}

// Movimentação do inimigo
function moverInimigo() {
    if (!inimigo.vivo || jogador.vida <= 0) return; // Se estiver morto, não se move

    // Movimentação: inimigo segue jogador
    // Logica do eixo X (Esquerda/Direita)
    if (inimigo.x < jogador.x) inimigo.x += inimigo.velocidade;
    else if (inimigo.x > jogador.x) inimigo.x -= inimigo.velocidade;

    // Logica do eixo Y (Cima/Baixo)
    if (inimigo.y < jogador.y) inimigo.y += inimigo.velocidade;
    else if (inimigo.y > jogador.y) inimigo.y -= inimigo.velocidade;
}

/* ------------------------------------------------ */

// PARTE DA COLSÃO:

// Colisão entre jogador e inimigo
jogador.temEspada = false;

function checarColisao() {
    if (!inimigo.vivo || jogador.vida <= 0) return;

    // Verifica se os dois quadrados estão se sobrepondo (AABB)
    const houveContato =
        jogador.x < inimigo.x + inimigo.largura &&
        jogador.x + jogador.largura > inimigo.x &&
        jogador.y < inimigo.y + inimigo.altura &&
        jogador.y + jogador.altura > inimigo.y;


    // Só mata o inimigo se houver contato E a tecla Espaço (' ') estiver pressionada
    if (houveContato) {

        // CASO 1: Jogador ataca o inimigo
        if (teclasPressionadas[' '] && !inimigo.estaPiscando) {
            inimigo.vida -= 1; // Dminui a vida do inimigo
            inimigo.estaPiscando = true; // Ativa o efeito de piscar

            // Time para parar de piscar após 100ms
            setTimeout(() => {
                inimigo.estaPiscando = false;
            }, 100);

            // Se avida zerar, ele morre e dá a espada
            if (inimigo.vida <= 0) {
                inimigo.vivo = false;
                jogador.temEspada = true;
                jogador.cor = 'gold'; // Indica que o jogador agora tem a espada
            }
        }

        // CASO 2: Inimigo toca no jogador(Dano no jogador)
        // Só toma dano se não estiver atacando e não estiver piscando (invencível)
        else if (!teclasPressionadas[' '] && !jogador.estaPiscando) {
            jogador.vida -= 1;
            jogador.estaPiscando = true;

            // Jogador fica branco/invencível por 1 segundo
            setTimeout(() => {
                jogador.estaPiscando = false;
            }, 1000);

            if (jogador.vida <= 0) {
                // Alerta pausa o jogo. Quando você clica em OK, o código continua.
                alert("GAME OVER! Você foi derrotado.")

                resetarJogo(); // Limpa tudo para começar de novo
            }
        }
    }
}

function desenharInimigo() {
    if (!inimigo.vivo) return;

    // Se estiver piscando, a tinta é branca. Senão, é a cor original.
    ctx.fillStyle = inimigo.estaPiscando ? 'white' : inimigo.cor;

    ctx.fillRect(inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);
}

/* ------------------------------------------------ */

// PARTE DE RESETAR O JOGO:
// Acontece quando o jogador perde todas as vidas.
function resetarJogo() {
    // Reseta o Jogador
    jogador.x = 50;
    jogador.y = 50;
    jogador.vida = 3;
    jogador.temEspada = false;
    jogador.cor = 'red';
    jogador.estaPiscando = false;

    // Reseta o Inimigo
    inimigo.x = 200;
    inimigo.y = 200;
    inimigo.vida = 3;
    inimigo.vivo = true;
    inimigo.estaPiscando = false;

    console.log("Jogo Resetado!");
}

/** 
 * Função para atualizar o jogo, onde faz com o navegador redesenhe a tela
 * muitas vezes por segundo. 
 * 
 * Ele limpa a tela, atualiza a posição do jogador e desenha novamente.
 * 
 * Essa função gerencia tudo o que acontece no jogo.
*/
function atualizar() {
    // 1. Limpa o canvas inteiro (da posição 0, 0 até o fim)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Atualiza a logica de cada objeto
    moverJogador();
    moverInimigo();
    checarColisao();


    // 3. Redesenha tudo na tela
    desenharJogador();
    if (inimigo.vivo) {
        desenharInimigo();
    }

    // 4. Repete
    requestAnimationFrame(atualizar);
}

atualizar();