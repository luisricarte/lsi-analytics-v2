# Lsi Analytics v2 

O LSI Analytics é uma plataforma open-source para criação de gráficos, dashboards e visualizações de dados diretamente na web. Após analisar as funcionalidades existentes, vi uma grande oportunidade de expandir a capacidade da ferramenta e implementei novos gráficos: rosca, área, barras horizontais e cascata.

Além dos gráficos, criei novas formas de visualização que permitem aos usuários explorar dados de forma mais intuitiva e personalizada. As principais novidades são:
**![][image1]**


📈 KPI: Indicadores chave para acompanhamento rápido de métricas essenciais.
🗺️ Mapa coroplético: Visualização para dados geográficos detalhados, totalmente personalizável.

Falando um pouco mais sobre os mapas coropléticos , essa foi uma das visualizações mais complexas que desenvolvi! Agora, o LSI Analytics permite exibir dados de qualquer região utilizando arquivos GeoJSON ou .shp. As cores são customizáveis e é possível reorganizá-las facilmente usando drag and drop. A ideia foi criar algo simples e intuitivo, mas que oferecesse flexibilidade para quem trabalha com dados espaciais.

Outra melhoria importante foi a adição de suporte a planilhas CSV e XLSX como fontes de dados. Antes, era possível trabalhar apenas com bancos de dados, mas agora os usuários podem importar suas próprias planilhas e começar a explorar visualmente suas informações com muito mais praticidade.

As tecnologias que utilizei para construir essa nova versão foram:
Frontend: TypeScript, React, ShadCN, Radix UI, React Query, Axios, Apache ECharts e TailwindCSS.
Backend e banco de dados: Node.js, Express, NestJS, TypeScript, Prisma, PostgreSQL e Docker.
