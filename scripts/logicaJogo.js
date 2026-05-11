// Arquivo 'logicaJogo.js' é responsavel por toda a logica do
// jogo, como movimentação, colisão, mudança de cenário, etc.


// PARTE DA COLSÃO:
jogador.temEspada = false; // Colisão entre jogador e inimigo

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


/* ------------------------------------------------ */
// PARTE DE MUDAR CENÁRIO:
function mudarCenario() {
    cenarioAtual ++;
    console.log("Bem-Vindo ao cenário" + cenarioAtual);

    // 1. Reposiciona o jogador no na parte inferior da tela
    jogador.y = canvas.height - jogador.altura - 10;

    // 2. Cria um novo inimigo ou reseta o atual
    inimigo.vivo = true;
    inimigo.vida = 3 + cenarioAtual; // Fica mais dificil s cada fase
    inimigo.x = Math.random() * (canvas.width - inimigo.largura);
    inimigo.y = 100; // Inimigo aparece no topo no novo mapa

}


/* ------------------------------------------------ */
// PARTE DE ATUALIZAR:

/** 
 * NOTA:
 * Função para atualizar o jogo, onde faz com o navegador redesenhe a tela
 * muitas vezes por segundo. 
 * 
 * Ele limpa a tela, atualiza a posição do jogador e desenha novamente.
 * 
 * Essa função gerencia tudo o que acontece no jogo.
*/
function atualizar() {
    // 1. Limpa o canvas inteiro (da posição 0, 0 até o fim)
    // Muda a cor de fundo conforme o cenário
    if (cenarioAtual === 1) {
        ctx.fillStyle = "rgb(92, 97, 107)"; // Cinza original
    } else if (cenarioAtual === 2) {
        ctx.fillStyle = "#2d5a27"; // Um verde floresta
    } else {
        ctx.fillStyle = "#5a2d27"; // Um tom de caverna
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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