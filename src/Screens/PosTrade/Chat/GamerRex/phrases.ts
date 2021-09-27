export const gamerRexChatPhrases = [
  'Se for menor de idade, nunca vá sozinho trocar um game hein! Promete? Fecho?',
  'Meu trabalho aqui é trazer e enviar mensagens entre você e o outro jogador.',
  'Ouvi dizer que tem jogos em que os dinossauros entram em crise e matam pessoas, é verdade?',
  'Não seja troll cara! Envie certinho o item da troca para o outro jogador, ok?',
  'Se der algum problema na troca, vá até a sessão ‘Tive um Problema’ beleza?',
  'Você já viu algum dinossauro no espaço? Devo ser o primeiro.',
  'Meus braços são curtos, me desculpe se eu derrubar alguma mensagem.',
  'Cuidado ao fazer a troca. Sempre leve alguém junto, é mais safe.',
  'Porque um dinossauro? O dragão lá do início não faria mais sentido?',
  'Eu tenho outros amigos, é que não deu tempo de eles se apresentarem a vocês.',
  'Meu console favorito? É o ReXstation One é claro!',
  'Qual sua posição no GamerRanking? Eu sou o #1 hehe.',
  'Trocas bem sucedidas geram bastante pontos sabia?',
  'Levar alguém junto pra trocar é igual farmar embaixo da torre: safe!',
  'Só os dinossauros da Terra foram extintos? Os gamers não hahaha.',
  'Você sabia que meus criadores também são gamers?',
  'Eu sonhei que um dia vai dar pra comprar pelo app…',
  'Compre sempre mídias físicas! Elas vem com mapa, e você pode trocar elas aqui!',
  'Mídias digitais são legais, mas só as físicas podem ir pra sua estante.',
  'Qual o jogo mais aguardado do ano? No meu planeta é o novo The Legend Of Rex!',
  'Já pensou ser o #1 do GamerRanking? É só continuar ganhando pontos!',
  'Tive outro sonho! Missões com recompensas para você ganhar mais pontos…',
  'Quantos jogos de dinossauro você conhece?',
  'Dizem que aí na terra, vocês usam dinossauro como cavalos.',
  'Ouvi dizer que tem um encanador italiano que tem um dinossauro verde também!',
  'Me ajude a criar uma comunidade confiável de gamers! Avalie as trocas.',
  'Algum problema? Vá no ‘tive um problema’ e nos conte.',
  'Você é menor de idade? Cuidado redobrado hein!',
  'Você sabia que fazer proposta de trocas gera pontos pra você?',
  'Pode cadastrar também seus jogos digitais, só não vai dar pra trocá-los.',
  'Só jogos? E consoles? Controles? Você não tem isso?',
  'Se você colocar fotos dos jogos, maior a chance de conseguir um bom negócio.',
  'Já escolheu seu nickname? É bem importante ter um nickname.',
  'Meu nickname é GamerRex! Já o meu nome é ….',
  'Já procurou nosso canal no Youtube? Zuera, a gente não tem. Ainda.',
  'Você já cadastrou seu endereço? Se não, tá esperando o que???',
  'Como assim jogo digital é mais barato? Eles não vem com mapa!',
  'Física Rainha, Digital Nadinha! Brincadeira, mas sempre opte pela caixinha!',
  'Dizem que a próxima geração de consoles vai ser um estouro, o que acha?',
  'Qual seu estilo de jogo favorito? O meu sem dúvida é RPG.',
  'Sério que tem gente que compra o mesmo jogo todo ano?',
  'Eu queria trocar minha skin, mas eu não tenho dinheiro agora. Me ajuda?',
  'Qual console você acha o melhor? Acho que isso não existe.',
];

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomGamerRexPhrase(): string {
  const randomIndex = getRandomInt(0, gamerRexChatPhrases.length - 1);

  return gamerRexChatPhrases[randomIndex];
}
