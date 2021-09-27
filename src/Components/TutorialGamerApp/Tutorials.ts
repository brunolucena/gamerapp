import {TutorialText} from './TutorialGamerApp';

export interface Tutorial {
  texts: TutorialText[];
}

export interface ITutorials {
  Home: Tutorial;
  MyCollection: Tutorial;
  Profile: Tutorial;
  SellerStore: Tutorial;
  Store: Tutorial;
  TradeListEmAndamento: Tutorial;
  [key: string]: any;
}

export const Tutorials: ITutorials = {
  // AddCreditCard: {active: false, completed: null, texts: []},
  // AddToCollection: {active: false, completed: null, texts: []},
  // Adm: {active: false, completed: null, texts: []},
  // Cadastro: {active: false, completed: null, texts: []},
  // ChangePassword: {active: false, completed: null, texts: []},
  // Chat: {active: false, completed: null, texts: []},
  // Coming: {active: false, completed: null, texts: []},
  // ContactGamerApp: {active: false, completed: null, texts: []},
  // CreateCollection: {active: false, completed: null, texts: []},
  // CreateWishlist: {active: false, completed: null, texts: []},
  // Cupons: {active: false, completed: null, texts: []},
  // EditProduct: {active: false, completed: null, texts: []},
  // EditProfile: {active: false, completed: null, texts: []},
  // GamerProduct: {active: false, completed: null, texts: []},
  // GamerProductGamer: {active: false, completed: null, texts: []},
  Home: {
    texts: [
      {
        text:
          'Olá, seja bem-vindo ao GamerApp. Estou muito feliz em te conhecer. Eu sou o GamerRex!',
      },
      {
        text:
          'Estou aqui para te ajudar a fazer suas trocas, vender e comprar seus jogos. Eu vou te ajudar a navegar pelo app e te dar dicas pra utilizar ao máximo o GamerApp',
      },
      {
        text:
          'Se você quiser comprar jogos, comece navegando pela "Home". Com o GamerApp você pode comprar de outros gamers e também de lojas.',
      },
      {
        text: 'Se você quer trocar seus jogos vá até "Coleção".',
      },
      {
        text: 'Se você quer vender no GamerApp, é só ir em "Loja".',
      },
    ],
  },
  // LevelUp: {active: false, completed: null, texts: []},
  // Login: {active: false, completed: null, texts: []},
  // MyOrder: {active: false, completed: null, texts: []},
  // MyOrders: {active: false, completed: null, texts: []},
  // OrderRequest: {active: false, completed: null, texts: []},
  // OrderRequestSuccess: {active: false, completed: null, texts: []},
  // PayPal: {active: false, completed: null, texts: []},
  // PaymentMethods: {active: false, completed: null, texts: []},
  // PosTrade: {active: false, completed: null, texts: []},
  // PosTradeCompleted: {active: false, completed: null, texts: []},
  // ProductDetails: {active: false, completed: null, texts: []},
  // ProfileAddresses: {active: false, completed: null, texts: []},
  // ProfileNewAddress: {active: false, completed: null, texts: []},
  // ProfileNewAddressCep: {active: false, completed: null, texts: []},
  // Ranking: {active: false, completed: null, texts: []},
  // SectionList: {active: false, completed: null, texts: []},
  // SellProduct: {active: false, completed: null, texts: []},
  // SellerStoreSee: {active: false, completed: null, texts: []},
  // SellerStoreSeeAll: {active: false, completed: null, texts: []},
  // Share: {active: false, completed: null, texts: []},
  MyCollection: {
    texts: [
      {
        text:
          'Adicione seus jogos na sua coleção e tenha uma bela visão da sua coleção de jogos. Suba fotos, informe se quer trocar ou vender e coloque o preço nos seus jogos.',
      },
      {
        text:
          'Na aba "WISHLIST", cadastre os jogos que você está procurando e que desejaria ter e eu vou buscar as melhores sugetões de trocas e compras especialmente pra você.',
      },
      {
        text:
          'É muito simples, adicione agora mesmo e comece a desfrutar do GamerApp.',
      },
    ],
  },
  Profile: {
    texts: [
      {
        text:
          'Aqui você pode editar seus dados, ver seus cupons, cadastrar endereços, trocar sua senha, atualizar sua foto do perfil e muito mais.',
      },
      {
        text:
          'Se você colocar uma foto no seu perfil, sua confiança com os outros gamers aumenta, melhorando suas chances de uma troca ou venda bem sucedida. Aproveita e coloca já sua foto, é só clickar no ícone do seu perfil!',
      },
    ],
  },
  SellerStore: {
    texts: [
      {
        text:
          'Gerencie seus produtos, preço, estoque e informações. Acompanhe suas vendas, veja seu saldo e solicite ao GamerApp um saque. Aqui você tem controle total sobre sua loja!',
      },
    ],
  },
  Store: {
    texts: [
      {
        text: 'Crie uma loja e alcance um público ainda maior!',
      },
      {
        text:
          'Você cadastra seus produtos e o restante é com a gente. Pagamento, correios, controle de estoque e muito mais.',
      },
      {
        text:
          'Crie agora mesmo sua loja e alcance uma comunidade inteira no primeiro app feito especialmente para gamers, é bem simples e rápido, você com certeza vai gostar!',
      },
    ],
  },
  TradeListEmAndamento: {
    texts: [
      {
        text: 'Aqui você pode acompanhar todas as suas trocas.',
      },
      {
        text:
          'Na aba "NEGOCIAÇÕES" estão listadas suas propostas enviadas e recebidas.',
      },
      {
        text:
          'Em "AUTO" estão as trocas que eu achei para você. Quanto mais informações você colocar no seu perfil, melhores serão as sujestões. Complete sua Coleção, Wishlist e Endereço agora mesmo!',
      },
      {
        text:
          'E por último, em "ACEITAS" você acompanha as negociações que foram aceitras. É aqui que você vai combinar a troca com o outro gamer.',
      },
    ],
  },
  // StoreOrder: {active: false, completed: null, texts: []},
  // StoreRegister: {active: false, completed: null, texts: []},
  // Storybook: {active: false, completed: null, texts: []},
  // TradeRequest: {active: false, completed: null, texts: []},
  // TradeRequestCompleted: {active: false, completed: null, texts: []},
  // TradeRequestSent: {active: false, completed: null, texts: []},
  // Wallet: {active: false, completed: null, texts: []},
};
