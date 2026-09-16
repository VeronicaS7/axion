-- Ativar a extensão pgvector (necessário para busca semântica)
create extension if not exists vector;

-- Criar a tabela para armazenar os trechos dos livros
create table if not exists public.book_chunks (
    id bigserial primary key,
    book_title text not null,
    page_number integer,
    content text not null,
    embedding vector(384) -- 384 é o tamanho do vetor do modelo all-MiniLM-L6-v2
);

-- Habilitar RLS (opcional, mas recomendado)
alter table public.book_chunks enable row level security;

-- Permitir leitura pública (já que os alunos precisarão buscar os dados)
create policy "Permitir leitura pública de book_chunks" on public.book_chunks
    for select using (true);

-- Permitir inserção autenticada ou via chave de serviço
create policy "Permitir inserção via service role" on public.book_chunks
    for insert with check (true);

-- Criar uma função para busca por similaridade (RPC)
create or replace function match_book_chunks (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  book_title text,
  page_number integer,
  content text,
  similarity float
)
language sql stable
as $$
  select
    book_chunks.id,
    book_chunks.book_title,
    book_chunks.page_number,
    book_chunks.content,
    1 - (book_chunks.embedding <=> query_embedding) as similarity
  from public.book_chunks
  where 1 - (book_chunks.embedding <=> query_embedding) > match_threshold
  order by book_chunks.embedding <=> query_embedding
  limit match_count;
$$;
