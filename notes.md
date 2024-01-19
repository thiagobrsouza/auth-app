# AUTH APP

## Objetivo
O objetivo do sistema é tratar permissões de usuários. Nós poderemos criar perfis baseado na lista de permissões possíveis no sistema. Com isso, poderemos atribuir esses perfis a usuários.

Para testar a funcionalidade, cada usuário poderá atuar com objetos carros. Cada usuário pode cadastrar um carro no sistema e se ele não for administrador ou tiver permissões superiores, não pode visualizar ou tratar carros de outros usuários.

## Escopo do App
- usuário faz logon no sistema
- usuário autenticado no sistema visualiza os carros que ele cadastrou ou foram atribuídos a ele.
- se o usuário for administrador, ele pode visualizar todos os carros e também todos os usuários.
- se o usuário não for administrador, ele só pode visualizar seus carros e verificar somente o seu perfil.
- usuário com perfil pode editar, cadastrar carros
- somente o administrador de usuários pode cadastrar, editar e excluir usuários e perfis.

## Tipos de permissões
- visualizar, criar, editar perfil
- excluir perfil
- visualizar, criar, editar usuário
- visualizar, criar, editar carros
- excluir carro

## Projeto - Backend
### Pacotes a serem instalados:
- [] Task 1


