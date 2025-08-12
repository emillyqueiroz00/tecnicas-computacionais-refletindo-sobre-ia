import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

const perguntas = [
    {
        enunciado: "Ao caminhar pela vida, você se depara com um convite: seguir o caminho estreito que exige renuncia ou o caminho largo, cheio de prazeres instantâneos. Qual o primeiro pensamento?",
        alternativas: [
            {
                texto: "O caminho estreito, mesmo difícil, parece mais seguro.",
                afirmacao: [
                    "Você sentiu um chamado para buscar significado além dos prazeres terrenos.",
                    "Reconheceu que a verdadeira felicidade pode exigir renúncia."
                ]
            },
            {
                texto: "O caminho largo parece mais divertido e livre.",
                afirmacao: [
                    "A atração pelos prazeres imediatos falou mais alto.",
                    "Você ignorou os avisos interiores sobre as consequências."
                ]
            }
        ]
    },
    {
        enunciado: "Um pregador aborda você na rua e fala sobre o pecado e a necessidade de arrependimento. Como reage?",
        alternativas: [
            {
                texto: "Reflete sobre suas ações e busca mudar de vida.",
                afirmacao: [
                    "Você experimentou a libertação do perdão divino.",
                    "Entendeu que o arrependimento é o primeiro passo para a transformação."
                ]
            },
            {
                texto: "Ignora, achando que 'Deus é amor' e não se importa com pequenos erros.",
                afirmacao: [
                    "Seu coração se endureceu gradualmente aos chamados de Deus.",
                    "Você começou a justificar cada vez mais seus pecados."
                ]
            }
        ]
    },
    {
        enunciado: "Você presencia alguém sendo injustiçado. O que faz?",
        alternativas: [
            {
                texto: "Defende o fraco, mesmo que isso traga prejuízos para você.",
                afirmacao: [
                    "Você plantou sementes de justiça que frutificaram em bênçãos.",
                    "Descobriu que obedecer a Deus traz paz, mesmo nas dificuldades."
                ]
            },
            {
                texto: "Finge não ver para evitar problemas.",
                afirmacao: [
                    "A omissão pesou em sua consciência, mas você a abafou.",
                    "A indiferença se tornou um hábito em sua vida."
                ]
            }
        ]
    },
    {
        enunciado: "Em um momento de crise, você busca ajuda:",
        alternativas: [
            {
                texto: "Ajoelha-se e ora, confiando na providência divina.",
                afirmacao: [
                    "Deus agiu de modo surpreendente em sua vida.",
                    "Você aprendeu que a fé move montanhas."
                ]
            },
            {
                texto: "Recorre apenas a soluções humanas, desprezando a espiritualidade.",
                afirmacao: [
                    "As portas se fecharam, e você se sentiu cada vez mais desesperado.",
                    "A falta de fé o isolou da fonte verdadeira de esperança."
                ]
            }
        ]
    },
    {
        enunciado: "Após uma vida de escolhas, você sente o peso de suas ações no coração. Um último convite surge: arrepender-se e buscar a Deus com humildade ou endurecer o coração e continuar como antes. O que você faz?",
        alternativas: [
            {
                texto: "Clama por perdão, reconhecendo que precisa de Deus.",
                afirmacao: "A misericórdia divina te alcançou! Você encontrou paz e um novo propósito, vivendo em comunhão com o Criador até o fim dos seus dias."
            },
            {
                texto: "Ignora o chamado, achando que 'sempre há tempo' para mudar.",
                afirmacao: "O tempo passou, e seu coração se tornou insensível. A ausência de Deus, que você escolheu em vida, tornou-se sua eterna realidade."
            }
        ]
    }
];

// Conclusão:
console.log("Suas escolhas determinaram seu destino eterno. A vida é uma jornada de decisões: cada passo em direção a Deus é luz, e cada passo em direção ao ego é escuridão. 'Que aproveita ao homem ganhar o mundo inteiro e perder a sua alma?' (Marcos 8:36)");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.classList.add("mostrar");
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    mostraPergunta();
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

substituiNome();