# Preciso apenas o comando para iniciar a API

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## cURL para importação em Postman para realizar os testes (Por favor verificar qual porta a API subiu na sua maquina)

- Cadastrar Pauta

curl --location '<http://localhost:3000/api/pauta>' \
--header 'Content-Type: application/json' \
--data '{
  "titulo": "Testing QA",
  "descricao": "Testando Testando"
}'

- Abrir Sessão
curl --location '<http://localhost:3000/api/sessao>' \
--header 'Content-Type: application/json' \
--data '{
    "pautaId": "da8ecf73-4c4f-4451-a986-67409b60b9b1",
    "duracao": 2
}'

- Votar

curl --location '<http://localhost:3000/api/voto>' \
--header 'Content-Type: application/json' \
--data '{
  "pautaId": "574bfe9a-0944-4595-a1f4-04892a2b4e2e",
  "cpf": "80038042053",
  "voto": "NAO"
}'

- Ver Resultado

curl --location '<http://localhost:3000/api/pauta/c3ffedbe-be53-4a8c-88d2-053e0a3a1032/resultado>'
