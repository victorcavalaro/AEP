# AEP
AEP - Analise e desenvolvimento de sistemas 5º semestre turma B Noturno

# EcoColeta - Plataforma Inteligente para Gestão de Resíduos Urbanos (Simulação Front-end)

## 1. Introdução

O projeto EcoColeta é uma simulação de uma plataforma web interativa focada na gestão inteligente de resíduos urbanos. O objetivo principal é demonstrar como uma interface front-end poderia facilitar a conexão entre cidadãos/empresas geradoras de resíduos e os responsáveis pela coleta e reciclagem, promovendo práticas mais sustentáveis.

Esta implementação é uma **simulação client-side**, utilizando HTML, CSS (com Tailwind CSS) e JavaScript puro para a lógica da aplicação. Os dados são persistidos localmente no navegador do usuário através da API `localStorage`, servindo como um mock de um banco de dados para fins de demonstração das funcionalidades.

## 2. Funcionalidades Implementadas (Simuladas)

A plataforma simulada inclui as seguintes funcionalidades interativas:

* **Cadastro e Login de Usuários:**
    * Permite que novos usuários se cadastrem informando nome e e-mail.
    * Usuários existentes podem "fazer login" com seu e-mail.
    * As informações dos usuários (incluindo pontuação) são salvas localmente.
* **Agendamento de Coletas:**
    * Usuários logados podem agendar a coleta de resíduos, especificando tipo de material, endereço (simulado), data/hora e quantidade estimada.
* **Visualização de Pontos no Mapa (SVG Interativo):**
    * Um mapa SVG estático é utilizado para exibir marcadores dinâmicos.
    * Coletas agendadas são exibidas como marcadores no mapa.
    * Usuários podem adicionar "pontos de descarte irregular" e "cooperativas/centros de reciclagem" (simulados), que também aparecem no mapa.
    * Ao passar o mouse sobre um marcador, informações básicas são exibidas. Um clique no marcador mostra um alerta com mais detalhes.
* **Sistema de Pontuação:**
    * Usuários ganham pontos por realizar ações na plataforma, como agendar uma coleta ou registrar um ponto de descarte irregular. A pontuação é exibida em diferentes partes da interface.
* **Painel de Estatísticas e Impacto (Simulado):**
    * Seções da página exibem estatísticas (ex: número de usuários, total de resíduos coletados) e métricas de impacto (ex: redução de descarte irregular). Estes números são atualizados dinamicamente com base nos dados armazenados no `localStorage`.

## 3. Tecnologias Utilizadas

* **HTML5:** Para a estruturação semântica do conteúdo da página.
* **CSS3:** Para a estilização visual.
    * **Tailwind CSS (via CDN):** Framework CSS utility-first para agilizar o desenvolvimento da interface e garantir responsividade.
    * **CSS Customizado (`style.css`):** Estilos específicos para elementos da aplicação, como modais e componentes do mapa SVG.
* **JavaScript (Vanilla JS):** Utilizado para toda a lógica da aplicação front-end, incluindo:
    * Manipulação do DOM (criação e atualização de elementos da interface).
    * Gerenciamento de eventos (cliques, submissões de formulário).
    * Lógica de "negócio" da simulação (cadastro, agendamento, pontuação).
    * Interação com a API `localStorage`.
* **`localStorage` API:** Para armazenar e recuperar dados da aplicação diretamente no navegador do usuário, simulando a persistência de dados que um backend e banco de dados forneceriam.

## 4. Como Executar o Projeto

Para executar esta simulação da plataforma EcoColeta:

1.  **Baixe os arquivos do projeto:**
    * `index.html`
    * `style.css`
    * `script.js`
2.  **Organize os arquivos:** Certifique-se de que os três arquivos (`index.html`, `style.css`, e `script.js`) estejam localizados na mesma pasta/diretório em seu computador.
3.  **Abra no Navegador:**
    * Abra o arquivo `index.html` em qualquer navegador web moderno (como Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

A aplicação será carregada e estará pronta para interação. Como os dados são salvos no `localStorage`, as informações persistirão entre as sessões no mesmo navegador, até que o cache/dados do navegador sejam limpos.

## 5. Estrutura dos Arquivos

* `index.html`: Contém a estrutura principal da página web, todos os elementos visuais e seções da plataforma. Inclui links para o arquivo CSS externo e para o script JavaScript.
* `style.css`: Responsável pela apresentação visual e estilização da página. Contém regras CSS personalizadas e complementa o Tailwind CSS.
* `script.js`: Arquivo central com toda a lógica de programação da simulação. Gerencia a interatividade do usuário, a manipulação dos dados (salvos e lidos do `localStorage`), e a atualização dinâmica da interface.

## 6. Escopo e Limitações do Projeto

É importante ressaltar que este projeto é uma **simulação front-end** e possui limitações inerentes a essa abordagem:

* **Ausência de Backend:** Não há um servidor ou banco de dados real. Toda a "persistência" de dados ocorre no `localStorage` do navegador, o que significa que os dados são locais para cada usuário e não podem ser compartilhados ou acessados por outros.
* **Segurança:** Nenhuma medida de segurança de dados ou autenticação robusta foi implementada, pois não há um backend.
* **Funcionalidades Avançadas Não Implementadas:** Recursos como geolocalização precisa em tempo real, otimização de rotas para coletores, sistema de notificações, perfis de acesso distintos (catador, cooperativa) e comunicação em tempo real entre usuários exigiriam uma arquitetura de backend completa.
* **Mapa SVG:** O mapa interativo é uma representação simplificada utilizando SVG, e não uma integração com serviços de mapas completos (como Google Maps API ou Leaflet), portanto, não possui funcionalidades de navegação, busca de endereços reais, etc.
* **Escalabilidade:** A solução com `localStorage` não é escalável para um grande volume de dados ou usuários.

## 7. Possíveis Próximos Passos e Melhorias Futuras

Para transformar esta simulação em uma aplicação web completa e funcional, os seguintes passos seriam considerados:

* **Desenvolvimento de Backend:**
    * Escolher uma tecnologia de backend (ex: Node.js com Express, Python com Django/Flask, Java com Spring Boot, Ruby on Rails).
    * Implementar APIs RESTful para comunicação entre o front-end e o backend.
* **Banco de Dados:**
    * Integrar um sistema de gerenciamento de banco de dados relacional (ex: PostgreSQL, MySQL) ou NoSQL (ex: MongoDB) para armazenamento persistente e seguro dos dados.
* **Autenticação e Autorização:**
    * Implementar um sistema de autenticação seguro (ex: JWT, OAuth2) e gerenciamento de perfis de usuário com diferentes níveis de acesso.
* **Integração com Serviços de Mapa:**
    * Utilizar APIs de mapas como Google Maps Platform ou Leaflet (com OpenStreetMap) para geolocalização precisa, visualização de rotas e busca de endereços.
* **Funcionalidades Específicas para Coletores/Cooperativas:**
    * Desenvolver painéis e ferramentas específicas para os coletores visualizarem coletas disponíveis, otimizarem rotas e gerenciarem o recebimento de materiais.
* **Notificações:**
    * Implementar um sistema de notificações (ex: via WebSockets, e-mail ou push notifications) para informar os usuários sobre o status de suas coletas, novas solicitações, etc.
* **Painel Administrativo:**
    * Criar uma interface para administradores gerenciarem usuários, dados da plataforma e configurações do sistema.
* **Testes e Deploy:**
    * Escrever testes unitários e de integração.
    * Configurar um ambiente de produção e realizar o deploy da aplicação em um servidor de hospedagem.

