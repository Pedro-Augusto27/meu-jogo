// Arquivo 'jogador.js' é responsável por criar o jogador,
// desenhá-lo na tela e controlar seus movimentos.

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

// Movimetação do jogador
const velocidade = 5; // Quantos pixels o jogador anda por frame

function moverJogador() {
    if (teclasPressionadas['ArrowUp']) {
        if (jogador.y > 0) { 
            jogador.y -= velocidade; // Move para cima
        } else if (!inimigo.vivo) {
            // Se ele chegou no topo (y <= 0) e o inimigo morreu...
            mudarCenario();
        } 
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