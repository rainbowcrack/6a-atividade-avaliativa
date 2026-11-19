# Biblioteca Web

Sistema web para cadastro de **Autores** e **Livros** (CRUD completo). Um autor pode ter vários livros (1:N), no mesmo molde do projeto Agenda Web (Contato → Compromisso).

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 17 + Spring Boot 3.2 (Web, Data JPA, Validation, Lombok) + Maven |
| Frontend | React 18 + React Router 6 + Axios • Node.js 20 + npm |
| Banco de dados | PostgreSQL 15 (desenvolvimento) • H2 em memória (perfil `test`) |
| Testes | JUnit 5 + Mockito (`@WebMvcTest`, `@MockBean`, MockMvc) • `@SpringBootTest` |
| Versão / CI / Containers | Git + GitHub • GitHub Actions • Docker + Docker Compose |

## Estrutura

```
biblioteca-web/
├── backend/            # API REST (Spring Boot)
│   ├── pom.xml, Dockerfile
│   └── src/main/java/com/biblioteca/{model, repository, controller}
├── frontend/           # React
│   ├── package.json, Dockerfile, nginx.conf, public/
│   └── src/{components, services}
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```

## Modelo de dados

- **autores**: id, nome (obrigatório, 100), nacionalidade (50), data_nascimento, criado_em
- **livros**: id, titulo (obrigatório, 200), isbn (20), ano_publicacao, genero (50), autor_id (FK obrigatória), criado_em

## Endpoints

| Verbo | URL | Status |
|---|---|---|
| POST | `/api/autores` | 201 |
| GET | `/api/autores` (ordem: nome) | 200 |
| GET | `/api/autores/{id}` | 200 / 404 |
| PUT | `/api/autores/{id}` | 200 / 404 |
| DELETE | `/api/autores/{id}` | 200 / 404 (409 se houver livros) |
| POST | `/api/livros` | 201 |
| GET | `/api/livros` (ordem: título) | 200 |
| GET | `/api/livros/{id}` | 200 / 404 |
| PUT | `/api/livros/{id}` | 200 / 404 |
| DELETE | `/api/livros/{id}` | 200 / 404 |
| GET | `/api/livros/autor/{autorId}` (extra) | 200 |

Exemplo para criar um livro:

```json
{ "titulo": "Dom Casmurro", "isbn": "978-8535910667", "anoPublicacao": 1899,
  "genero": "Romance", "autor": { "id": 1 } }
```

Swagger: http://localhost:8080/swagger-ui.html

## Como executar

Com Docker (backend, frontend e PostgreSQL):

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432 (banco `biblioteca_db`, usuário/senha `postgres`/`postgres`)

Sem Docker para o app (só o banco):

```bash
docker-compose up -d postgres
cd backend && mvn spring-boot:run
cd frontend && npm install && npm start
```

## Como rodar os testes

```bash
cd backend
mvn test                              # todos
mvn test -Dtest="*ControllerTest"     # unitários
mvn test -Dtest="IntegracaoTest"      # integração (H2, perfil test)

cd ../frontend
npm test -- --watchAll=false --passWithNoTests
```

## Divisão de trabalho

| Integrante | Responsabilidade | Branch |
|---|---|---|
| Aluno(a) 1 – DEV 1 (Izabel Chaves)| CRUD de Autores (model, repository, controller, teste, AutorList/AutorForm) | `feature/autores` |
| Aluno(a) 2 – DEV 2 (Izabel Chaves) | CRUD de Livros (model, repository, controller, teste, LivroList/LivroForm) | `feature/livros` |

Arquivos comuns (api.js, App.js, docker-compose.yml, CI, README) divididos entre os dois. Cada um revisa o Pull Request do outro.
