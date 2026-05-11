// Arquivo 'inimigo.js' é responsavel por criar o objeto inimigo 
// e suas propriedades, como posição, tamanho, cor, velocidade, vida, etc.

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
