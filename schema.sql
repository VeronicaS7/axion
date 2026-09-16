-- ============================================================================
-- SCHEMA DO APLICATIVO EDUCACIONAL DE ENGENHARIA INTERATIVA (AXION ACADEMY)
-- ============================================================================

-- Habilitar UUID
create extension if not exists "uuid-ossp";

-- Limpar tabelas existentes para garantir reinstalação limpa
drop table if exists public.review_queue cascade;
drop table if exists public.attempts cascade;
drop table if exists public.misconceptions cascade;
drop table if exists public.ai_messages cascade;
drop table if exists public.ai_sessions cascade;
drop table if exists public.user_skill_mastery cascade;
drop table if exists public.lesson_skills cascade;
drop table if exists public.module_skills cascade;
drop table if exists public.course_skills cascade;
drop table if exists public.activity_validations cascade;
drop table if exists public.generated_activities cascade;
drop table if exists public.activity_templates cascade;
drop table if exists public.skills cascade;
drop table if exists public.prerequisites cascade;
drop table if exists public.user_lesson_progress cascade;
drop table if exists public.user_module_progress cascade;
drop table if exists public.user_course_progress cascade;
drop table if exists public.activity_options cascade;
drop table if exists public.activities cascade;
drop table if exists public.lesson_steps cascade;
drop table if exists public.lessons cascade;
drop table if exists public.modules cascade;
drop table if exists public.courses cascade;
drop table if exists public.engineering_areas cascade;
drop table if exists public.profiles cascade;

-- 1. Profiles (Perfil dos estudantes associados ao Auth.Users do Supabase)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    name text not null,
    email text not null,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Areas de Engenharia (Áreas de Formação)
create table public.engineering_areas (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Courses (Cursos sob uma área)
create table public.courses (
    id uuid default gen_random_uuid() primary key,
    engineering_area_id uuid references public.engineering_areas(id) on delete cascade not null,
    title text not null,
    description text not null,
    difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
    estimated_hours numeric default 0.0 not null,
    is_published boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Modules (Módulos de um Curso)
create table public.modules (
    id uuid default gen_random_uuid() primary key,
    course_id uuid references public.courses(id) on delete cascade not null,
    title text not null,
    description text not null,
    position integer not null,
    is_published boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (course_id, position)
);

-- 5. Lessons (Aulas pertencentes a um módulo)
create table public.lessons (
    id uuid default gen_random_uuid() primary key,
    module_id uuid references public.modules(id) on delete cascade not null,
    title text not null,
    description text not null,
    estimated_minutes integer not null,
    position integer not null,
    lesson_type text not null check (lesson_type in ('interactive', 'conceptual', 'simulation')),
    is_published boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (module_id, position)
);

-- 6. Lesson Steps (Passos sequenciais de uma aula)
create table public.lesson_steps (
    id uuid default gen_random_uuid() primary key,
    lesson_id uuid references public.lessons(id) on delete cascade not null,
    step_type text not null check (step_type in ('text', 'explanation', 'example', 'image', 'formula', 'activity', 'simulation', 'summary')),
    title text,
    content text not null,
    media_url text,
    formula text,
    configuration jsonb default '{}'::jsonb not null,
    position integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (lesson_id, position)
);

-- 7. Activities (Exercícios vinculados a uma aula e passo específico)
create table public.activities (
    id uuid default gen_random_uuid() primary key,
    lesson_id uuid references public.lessons(id) on delete cascade not null,
    lesson_step_id uuid references public.lesson_steps(id) on delete cascade not null,
    activity_type text not null check (activity_type in ('multiple_choice', 'numeric_input', 'drag_and_drop', 'ordering', 'simulation', 'diagram_selection')),
    statement text not null,
    explanation text not null,
    configuration jsonb default '{}'::jsonb not null, -- Ex: {"correct_answer": 8.57, "tolerance": 0.05}
    points integer default 10 not null,
    position integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (lesson_step_id)
);

-- 8. Activity Options (Opções de múltipla escolha)
create table public.activity_options (
    id uuid default gen_random_uuid() primary key,
    activity_id uuid references public.activities(id) on delete cascade not null,
    content text not null,
    is_correct boolean default false not null,
    feedback text,
    position integer not null,
    unique (activity_id, position)
);

-- 9. Prerequisites (Dependências de Pré-requisito entre módulos)
create table public.prerequisites (
    id uuid default gen_random_uuid() primary key,
    module_id uuid references public.modules(id) on delete cascade not null,
    prerequisite_module_id uuid references public.modules(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (module_id, prerequisite_module_id)
);

-- 10. User Course Progress (Progresso geral do usuário no curso)
create table public.user_course_progress (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    course_id uuid references public.courses(id) on delete cascade not null,
    progress_percentage numeric default 0.00 not null check (progress_percentage >= 0 and progress_percentage <= 100),
    total_score integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, course_id)
);

-- 11. User Module Progress (Progresso geral por módulo)
create table public.user_module_progress (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    module_id uuid references public.modules(id) on delete cascade not null,
    progress_percentage numeric default 0.00 not null check (progress_percentage >= 0 and progress_percentage <= 100),
    status text default 'not_started' not null check (status in ('not_started', 'in_progress', 'completed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, module_id)
);

-- 12. User Lesson Progress (Progresso geral por aula)
create table public.user_lesson_progress (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    lesson_id uuid references public.lessons(id) on delete cascade not null,
    status text default 'in_progress' not null check (status in ('not_started', 'in_progress', 'completed')),
    progress_percentage numeric default 0.00 not null check (progress_percentage >= 0 and progress_percentage <= 100),
    score integer default 0 not null,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, lesson_id)
);

-- 13. Skills (Habilidades/Competências específicas)
create table public.skills (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    category text not null, -- 'algebra_linear', 'amd', 'calculo_numerico', 'ciencia_materiais'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilidades vinculadas a Cursos, Módulos e Lições
create table public.course_skills (
    course_id uuid references public.courses(id) on delete cascade not null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    primary key (course_id, skill_id)
);

create table public.module_skills (
    module_id uuid references public.modules(id) on delete cascade not null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    primary key (module_id, skill_id)
);

create table public.lesson_skills (
    lesson_id uuid references public.lessons(id) on delete cascade not null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    primary key (lesson_id, skill_id)
);

-- 13.5 Templates de Atividades parametrizadas
create table public.activity_templates (
    id uuid default gen_random_uuid() primary key,
    skill_id uuid references public.skills(id) on delete cascade not null,
    activity_type text not null check (activity_type in ('multiple_choice', 'numeric_input', 'drag_and_drop', 'ordering', 'simulation', 'diagram_selection')),
    template_name text not null,
    statement_pattern text not null,
    parameter_schema jsonb default '{}'::jsonb not null,
    constraints jsonb default '{}'::jsonb not null,
    difficulty_min integer default 1 not null,
    difficulty_max integer default 4 not null,
    is_active boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13.6 Cache de Atividades Geradas e Validadas
create table public.generated_activities (
    id uuid default gen_random_uuid() primary key,
    template_id uuid references public.activity_templates(id) on delete set null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    activity_type text not null,
    difficulty integer not null,
    random_seed double precision not null,
    parameters_json jsonb not null,
    statement text not null,
    correct_answer_json jsonb not null,
    options_json jsonb not null,
    explanation text not null,
    hints_json jsonb not null,
    context_json jsonb not null,
    generator_version text not null,
    validation_status text not null check (validation_status in ('valid', 'invalid')),
    confidence_score numeric not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    expires_at timestamp with time zone
);

-- 13.7 Registro de Validações de Atividades
create table public.activity_validations (
    id uuid default gen_random_uuid() primary key,
    generated_activity_id uuid references public.generated_activities(id) on delete cascade not null,
    validator_name text not null,
    validator_version text not null,
    is_valid boolean not null,
    errors_json jsonb default '[]'::jsonb not null,
    warnings_json jsonb default '[]'::jsonb not null,
    validated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. Domínio do Estudante por Habilidade
create table public.user_skill_mastery (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    mastery_score numeric default 0.00 not null check (mastery_score >= 0 and mastery_score <= 100),
    confidence_score numeric default 0.00 not null check (confidence_score >= 0 and confidence_score <= 100),
    correct_attempts integer default 0 not null,
    incorrect_attempts integer default 0 not null,
    hints_used integer default 0 not null,
    last_practiced_at timestamp with time zone default timezone('utc'::text, now()) not null,
    next_review_at timestamp with time zone,
    unique (user_id, skill_id)
);

-- 15. Concepções Errôneas (Erros recorrentes detectados por IA)
create table public.misconceptions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    skill_id uuid references public.skills(id) on delete cascade not null,
    activity_id uuid references public.activities(id) on delete cascade,
    generated_activity_id uuid references public.generated_activities(id) on delete cascade,
    misconception_type text not null, -- Ex: 'confusao_vetores', 'incompatibilidade_pesos'
    description text not null,
    occurrence_count integer default 1 not null,
    last_detected_at timestamp with time zone default timezone('utc'::text, now()) not null,
    resolved_at timestamp with time zone
);

-- 16. Sessões de Conversa com o Tutor IA
create table public.ai_sessions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    lesson_id uuid references public.lessons(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. Histórico de Mensagens do Chat IA
create table public.ai_messages (
    id uuid default gen_random_uuid() primary key,
    session_id uuid references public.ai_sessions(id) on delete cascade not null,
    sender text not null check (sender in ('user', 'ai')),
    content text not null,
    help_level integer default 1 not null, -- Nível da escada socrática utilizada (1 a 6)
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. Fila de Revisão de Spaced Repetition (Repetição Espaçada)
create table public.review_queue (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    activity_id uuid references public.activities(id) on delete cascade,
    generated_activity_id uuid references public.generated_activities(id) on delete cascade,
    reason text not null, -- Motivo da inclusão
    is_active boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 19. Attempts (Histórico de tentativas dos alunos)
create table public.attempts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    activity_id uuid references public.activities(id) on delete cascade,
    generated_activity_id uuid references public.generated_activities(id) on delete cascade,
    selected_option_id uuid references public.activity_options(id) on delete set null,
    numeric_answer numeric,
    is_correct boolean not null,
    points_earned integer default 0 not null,
    attempt_number integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ============================================================================
-- FUNÇÃO SEGURA DE CORREÇÃO E PROGRESSO NO BACKEND (RPC)
-- ============================================================================

create or replace function public.submit_activity_answer(
    p_activity_id uuid,
    p_selected_option_id uuid default null,
    p_numeric_answer numeric default null
)
returns json
language plpgsql
security definer
as $$
declare
    v_user_id uuid;
    v_activity_type text;
    v_correct_numeric numeric;
    v_tolerance numeric;
    v_is_correct boolean := false;
    v_points integer;
    v_points_earned integer := 0;
    v_attempt_number integer;
    v_lesson_id uuid;
    v_step_id uuid;
    v_feedback text;
    v_total_activities integer;
    v_completed_activities integer;
    v_completion_percentage numeric;
    v_total_lesson_score integer;
    v_course_id uuid;
    v_module_id uuid;
    v_total_course_score integer;
    v_completed_lessons_count integer;
    v_total_lessons_in_course integer;
    v_course_percentage numeric;
begin
    -- 1. Obter ID do usuário logado
    v_user_id := auth.uid();
    if v_user_id is null then
        raise exception 'Não autorizado. Usuário não autenticado.';
    end if;

    -- 2. Obter detalhes da atividade
    select lesson_id, lesson_step_id, activity_type, points, (configuration->>'correct_answer')::numeric, (coalesce(configuration->>'tolerance', '0'))::numeric, explanation
    into v_lesson_id, v_step_id, v_activity_type, v_points, v_correct_numeric, v_tolerance, v_feedback
    from public.activities
    where id = p_activity_id;

    if not found then
        raise exception 'Atividade não encontrada.';
    end if;

    -- 3. Obter número da tentativa atual do usuário para esta atividade
    select coalesce(max(attempt_number), 0) + 1
    into v_attempt_number
    from public.attempts
    where user_id = v_user_id and activity_id = p_activity_id;

    -- 4. Validar resposta
    if v_activity_type = 'multiple_choice' then
        if p_selected_option_id is null then
            raise exception 'Opção selecionada é obrigatória para múltipla escolha.';
        end if;

        -- Verificar se a opção é correta e obter feedback específico
        select is_correct, coalesce(feedback, v_feedback)
        into v_is_correct, v_feedback
        from public.activity_options
        where id = p_selected_option_id and activity_id = p_activity_id;

    elsif v_activity_type = 'numeric_input' then
        if p_numeric_answer is null then
            raise exception 'Resposta numérica é obrigatória para este exercício.';
        end if;

        -- Verificar com tolerância
        if abs(p_numeric_answer - v_correct_numeric) <= v_tolerance then
            v_is_correct := true;
        else
            v_is_correct := false;
        end if;
    else
        raise exception 'Tipo de atividade não suportado pelo motor de correção do backend.';
    end if;

    -- 5. Calcular pontos ganhos (só ganha pontos na primeira tentativa correta)
    if v_is_correct then
        -- Verificar se já acertou anteriormente
        if not exists (
            select 1 from public.attempts 
            where user_id = v_user_id and activity_id = p_activity_id and is_correct = true
        ) then
            v_points_earned := v_points;
        end if;
    end if;

    -- 6. Registrar a tentativa
    insert into public.attempts (
        user_id,
        activity_id,
        selected_option_id,
        numeric_answer,
        is_correct,
        points_earned,
        attempt_number
    ) values (
        v_user_id,
        p_activity_id,
        p_selected_option_id,
        p_numeric_answer,
        v_is_correct,
        v_points_earned,
        v_attempt_number
    );

    -- 7. Calcular o progresso do usuário na aula (user_lesson_progress)
    select count(*) into v_total_activities
    from public.activities
    where lesson_id = v_lesson_id;

    select count(distinct a.id) into v_completed_activities
    from public.activities a
    join public.attempts att on att.activity_id = a.id
    where a.lesson_id = v_lesson_id and att.user_id = v_user_id and att.is_correct = true;

    if v_total_activities > 0 then
        v_completion_percentage := (v_completed_activities::numeric / v_total_activities::numeric) * 100;
    else
        v_completion_percentage := 100.00;
    end if;

    if v_completion_percentage > 100 then
        v_completion_percentage := 100;
    end if;

    -- Calcular pontuação total do usuário nesta aula
    select coalesce(sum(points_earned), 0) into v_total_lesson_score
    from public.attempts att
    join public.activities a on att.activity_id = a.id
    where a.lesson_id = v_lesson_id and att.user_id = v_user_id;

    -- Inserir ou atualizar progresso da aula
    insert into public.user_lesson_progress (
        user_id,
        lesson_id,
        status,
        progress_percentage,
        score,
        completed_at,
        updated_at
    ) values (
        v_user_id,
        v_lesson_id,
        case when v_completion_percentage = 100 then 'completed'::text else 'in_progress'::text end,
        v_completion_percentage,
        v_total_lesson_score,
        case when v_completion_percentage = 100 then now() else null end,
        now()
    )
    on conflict (user_id, lesson_id) do update set
        progress_percentage = excluded.progress_percentage,
        status = case when excluded.progress_percentage = 100 then 'completed'::text else public.user_lesson_progress.status end,
        score = excluded.score,
        completed_at = case when excluded.progress_percentage = 100 and public.user_lesson_progress.completed_at is null then now() else public.user_lesson_progress.completed_at end,
        updated_at = now();

    -- 8. Atualizar progresso geral do curso (user_course_progress)
    select m.course_id, l.module_id into v_course_id, v_module_id
    from public.lessons l
    join public.modules m on m.id = l.module_id
    where l.id = v_lesson_id;

    -- Calcular score acumulado no curso inteiro
    select coalesce(sum(ulp.score), 0) into v_total_course_score
    from public.user_lesson_progress ulp
    join public.lessons l on l.id = ulp.lesson_id
    join public.modules m on m.id = l.module_id
    where ulp.user_id = v_user_id and m.course_id = v_course_id;

    -- Calcular porcentagem de conclusão do curso (aulas completadas / total de aulas publicadas)
    select count(*) into v_total_lessons_in_course
    from public.lessons l
    join public.modules m on m.id = l.module_id
    where m.course_id = v_course_id and l.is_published = true;

    select count(*) into v_completed_lessons_count
    from public.user_lesson_progress ulp
    join public.lessons l on l.id = ulp.lesson_id
    join public.modules m on m.id = l.module_id
    where ulp.user_id = v_user_id and m.course_id = v_course_id and ulp.status = 'completed';

    if v_total_lessons_in_course > 0 then
        v_course_percentage := (v_completed_lessons_count::numeric / v_total_lessons_in_course::numeric) * 100;
    else
        v_course_percentage := 0;
    end if;

    -- Inserir ou atualizar user_course_progress
    insert into public.user_course_progress (
        user_id,
        course_id,
        progress_percentage,
        total_score,
        updated_at
    ) values (
        v_user_id,
        v_course_id,
        v_course_percentage,
        v_total_course_score,
        now()
    )
    on conflict (user_id, course_id) do update set
        progress_percentage = excluded.progress_percentage,
        total_score = excluded.total_score,
        updated_at = now();

    -- 9. Retornar resposta formatada
    return json_build_object(
        'is_correct', v_is_correct,
        'feedback', v_feedback,
        'points_earned', v_points_earned,
        'attempt_number', v_attempt_number,
        'lesson_progress', v_completion_percentage
    );
end;
$$;


-- ============================================================================
-- CONFIGURAÇÕES DE SEGURANÇA (RLS & POLICIES)
-- ============================================================================

-- Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.engineering_areas enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_steps enable row level security;
alter table public.activities enable row level security;
alter table public.activity_options enable row level security;
alter table public.prerequisites enable row level security;
alter table public.user_course_progress enable row level security;
alter table public.user_module_progress enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.skills enable row level security;
alter table public.course_skills enable row level security;
alter table public.module_skills enable row level security;
alter table public.lesson_skills enable row level security;
alter table public.user_skill_mastery enable row level security;
alter table public.misconceptions enable row level security;
alter table public.attempts enable row level security;
alter table public.ai_sessions enable row level security;
alter table public.ai_messages enable row level security;
alter table public.review_queue enable row level security;
alter table public.activity_templates enable row level security;
alter table public.generated_activities enable row level security;
alter table public.activity_validations enable row level security;

-- Políticas para Leitura de Conteúdos (Qualquer usuário autenticado ou visitante)
create policy "Qualquer um lê áreas" on public.engineering_areas for select using (true);
create policy "Qualquer um lê cursos" on public.courses for select using (is_published = true);
create policy "Qualquer um lê módulos" on public.modules for select using (is_published = true);
create policy "Qualquer um lê aulas" on public.lessons for select using (is_published = true);
create policy "Qualquer um lê passos de aulas" on public.lesson_steps for select using (true);
create policy "Qualquer um lê atividades" on public.activities for select using (true);
create policy "Qualquer um lê opções de múltipla escolha" on public.activity_options for select using (true);
create policy "Qualquer um lê pré-requisitos" on public.prerequisites for select using (true);
create policy "Qualquer um lê habilidades" on public.skills for select using (true);
create policy "Qualquer um lê habilidades do curso" on public.course_skills for select using (true);
create policy "Qualquer um lê habilidades do módulo" on public.module_skills for select using (true);
create policy "Qualquer um lê habilidades da lição" on public.lesson_skills for select using (true);
create policy "Qualquer um lê templates" on public.activity_templates for select using (true);
create policy "Qualquer um lê atividades geradas" on public.generated_activities for select using (true);
create policy "Qualquer um lê validações" on public.activity_validations for select using (true);
create policy "Qualquer um insere atividades geradas" on public.generated_activities for insert with check (true);
create policy "Qualquer um insere validações" on public.activity_validations for insert with check (true);

-- Políticas para Dados do Usuário (Privacidade Total)
create policy "Apenas o próprio lê seu perfil" on public.profiles for select using (auth.uid() = id);
create policy "Apenas o próprio edita seu perfil" on public.profiles for update using (auth.uid() = id);

create policy "Apenas o próprio lê seu progresso de curso" on public.user_course_progress for select using (auth.uid() = user_id);
create policy "Apenas o próprio edita seu progresso de curso" on public.user_course_progress for all using (auth.uid() = user_id);

create policy "Apenas o próprio lê seu progresso de módulo" on public.user_module_progress for select using (auth.uid() = user_id);
create policy "Apenas o próprio edita seu progresso de módulo" on public.user_module_progress for all using (auth.uid() = user_id);

create policy "Apenas o próprio lê seu progresso de aula" on public.user_lesson_progress for select using (auth.uid() = user_id);
create policy "Apenas o próprio edita seu progresso de aula" on public.user_lesson_progress for all using (auth.uid() = user_id);

create policy "Usuário lê seu domínio de habilidades" on public.user_skill_mastery for select using (auth.uid() = user_id);
create policy "Usuário altera seu domínio de habilidades" on public.user_skill_mastery for all using (auth.uid() = user_id);

create policy "Usuário lê suas concepções errôneas" on public.misconceptions for select using (auth.uid() = user_id);
create policy "Usuário altera suas concepções errôneas" on public.misconceptions for all using (auth.uid() = user_id);

create policy "Apenas o próprio lê suas tentativas" on public.attempts for select using (auth.uid() = user_id);
create policy "Apenas o próprio registra tentativas" on public.attempts for insert with check (auth.uid() = user_id);

create policy "Usuário lê suas sessões de IA" on public.ai_sessions for select using (auth.uid() = user_id);
create policy "Usuário altera suas sessões de IA" on public.ai_sessions for all using (auth.uid() = user_id);

create policy "Usuário lê mensagens de IA" on public.ai_messages for select using (exists (select 1 from public.ai_sessions s where s.id = session_id and s.user_id = auth.uid()));
create policy "Usuário insere mensagens de IA" on public.ai_messages for insert with check (exists (select 1 from public.ai_sessions s where s.id = session_id and s.user_id = auth.uid()));

create policy "Usuário lê sua fila de revisão" on public.review_queue for select using (auth.uid() = user_id);
create policy "Usuário altera sua fila de revisão" on public.review_queue for all using (auth.uid() = user_id);

-- Trigger para criar o perfil do estudante após cadastro no Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'name', 'Novo Estudante'), 
    new.email, 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ============================================================================
-- SEED DE CONTEÚDO (DADOS INICIAIS AXION ACADEMY)
-- ============================================================================

-- 1. Inserir Área de Engenharia de Produção
insert into public.engineering_areas (id, name, description) values
('e1111111-1111-1111-1111-111111111111', 'Engenharia de Produção', 'Gestão de processos produtivos, modelagem matemática de fluxos de valor, pesquisa operacional e otimização de sistemas industriais.');

-- 2. Inserir Habilidades (Skills)
insert into public.skills (id, name, description, category) values
('s_vector_rep', 'Representação Vetorial', 'Compreensão de direção, magnitude e representação de dados industriais em vetores cartesianos.', 'algebra_linear'),
('s_vector_ops', 'Operações Vetoriais', 'Operações de soma de vetores e produto por escalar para estimativas de capacidade e recursos.', 'algebra_linear'),
('s_matrix_ops', 'Operações Matriciais', 'Multiplicação e soma de matrizes de custos, insumos e demandas industriais.', 'algebra_linear'),
('s_dec_criteria', 'Alternativas e Critérios', 'Estruturação de matrizes de decisão e identificação de objetivos qualitativos e quantitativos no AMD.', 'amd'),
('s_weighted_sum', 'Soma Ponderada no AMD', 'Cálculo de notas ponderadas e normalização matemática de critérios para tomada de decisões.', 'amd'),
('s_matrix_dec', 'Matriz de Decisão e Dominância', 'Identificar alternativas dominadas e rankings gerais de decisão no AMD.', 'amd'),
('s_num_error', 'Análise de Erros Numéricos', 'Compreensão e cálculo de erros absolutos e relativos em medições aproximadas.', 'calculo_numerico'),
('s_bisection', 'Método da Bisseção', 'Encontrar raízes de equações não-lineares por divisão sucessiva de intervalos.', 'calculo_numerico'),
('s_convergence', 'Análise de Convergência', 'Avaliar velocidade de convergência e critérios de parada de iterações.', 'calculo_numerico'),
('s_mat_bonds', 'Ligações Químicas em Materiais', 'Relação entre as ligações atômicas e as propriedades mecânicas/térmicas de metais, cerâmicas e polímeros.', 'ciencia_materiais'),
('s_tensile_test', 'Ensaios Mecânicos', 'Interpretação da curva Tensão-Deformação, identificando os limites elástico, plástico e de escoamento.', 'ciencia_materiais'),
('s_class_materials', 'Classificação e Seleção de Materiais', 'Selecionar materiais sob restrições industriais de peso, custo e corrosão.', 'ciencia_materiais');

-- 3. Inserir os 4 Cursos
insert into public.courses (id, engineering_area_id, title, description, difficulty, estimated_hours, is_published) values
('c1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'Álgebra Linear', 'Compreenda vetores, matrizes, sistemas lineares e transformações aplicadas a dados, modelagem e otimização.', 'beginner', 12.0, true),
('c2222222-2222-2222-2222-222222222222', 'e1111111-1111-1111-1111-111111111111', 'Auxílio Multicritério à Decisão', 'Aprenda a estruturar decisões complexas, comparar alternativas e analisar critérios conflitantes.', 'intermediate', 15.0, true),
('c3333333-3333-3333-3333-333333333333', 'e1111111-1111-1111-1111-111111111111', 'Cálculo Numérico', 'Resolva problemas de engenharia utilizando aproximações, algoritmos iterativos e métodos computacionais.', 'intermediate', 18.0, true),
('c4444444-4444-4444-4444-444444444444', 'e1111111-1111-1111-1111-111111111111', 'Ciência dos Materiais', 'Entenda como estrutura, processamento e composição determinam as propriedades e o desempenho dos materiais.', 'beginner', 14.0, true);

-- Mapear Habilidades aos Cursos
insert into public.course_skills (course_id, skill_id) values
('c1111111-1111-1111-1111-111111111111', 's_vector_rep'),
('c1111111-1111-1111-1111-111111111111', 's_vector_ops'),
('c1111111-1111-1111-1111-111111111111', 's_matrix_ops'),
('c2222222-2222-2222-2222-222222222222', 's_dec_criteria'),
('c2222222-2222-2222-2222-222222222222', 's_weighted_sum'),
('c2222222-2222-2222-2222-222222222222', 's_matrix_dec'),
('c3333333-3333-3333-3333-333333333333', 's_num_error'),
('c3333333-3333-3333-3333-333333333333', 's_bisection'),
('c3333333-3333-3333-3333-333333333333', 's_convergence'),
('c4444444-4444-4444-4444-444444444444', 's_mat_bonds'),
('c4444444-4444-4444-4444-444444444444', 's_tensile_test'),
('c4444444-4444-4444-4444-444444444444', 's_class_materials');


-- ============================================================================
-- MODULOS E AULAS DE ÁLGEBRA LINEAR
-- ============================================================================
insert into public.modules (id, course_id, title, description, position, is_published) values
('m_alg_1', 'c1111111-1111-1111-1111-111111111111', 'Módulo 1 — Vetores e linguagem vetorial', 'Compreenda vetores, direção, sentido, plano cartesiano, soma, subtração, produto escalar e por escalar na produção.', 1, true),
('m_alg_2', 'c1111111-1111-1111-1111-111111111111', 'Módulo 2 — Matrizes', 'Entenda conceito, ordem, adição, subtração, multiplicação e determinantes aplicados a dados de produção.', 2, true),
('m_alg_3', 'c1111111-1111-1111-1111-111111111111', 'Módulo 3 — Sistemas lineares', 'Domine representação matricial, eliminação de Gauss e alocação de recursos industriais.', 3, true),
('m_alg_4', 'c1111111-1111-1111-1111-111111111111', 'Módulo 4 — Espaços vetoriais', 'Aprenda sobre espaços, subespaços, dependência/independência linear, base e dimensão.', 4, true),
('m_alg_5', 'c1111111-1111-1111-1111-111111111111', 'Módulo 5 — Transformações lineares', 'Defina operadores lineares, rotação, escala, projeção e composições computacionais.', 5, true),
('m_alg_6', 'c1111111-1111-1111-1111-111111111111', 'Módulo 6 — Autovalores e autovetores', 'Calcule a diagonalização e compreenda a interpretação geométrica em sistemas dinâmicos.', 6, true);

insert into public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) values
('l_alg_1_1', 'm_alg_1', 'Representando informações com vetores', 'Entenda o que define um vetor (direção, magnitude e sentido) e manipule suas coordenadas dinamicamente.', 10, 1, 'interactive', true),
('l_alg_2_1', 'm_alg_2', 'Conceito de matriz e representação', 'Represente demandas, custos e produtos em tabelas e realize multiplicações matriciais.', 10, 1, 'interactive', true),
('l_alg_3_1', 'm_alg_3', 'Equações lineares e eliminação de Gauss', 'Resolva sistemas lineares pelo método de eliminação gaussiana e determine a alocação de insumos.', 10, 1, 'interactive', true),
('l_alg_4_1', 'm_alg_4', 'Espaços vetoriais e base linear', 'Entenda a dependência linear, subespaços e base de um espaço vetorial em dados.', 12, 1, 'interactive', true),
('l_alg_5_1', 'm_alg_5', 'Definição de transformações lineares', 'Gire, projete e altere a escala de vetores cartesianos usando operadores lineares.', 11, 1, 'interactive', true),
('l_alg_6_1', 'm_alg_6', 'Conceito de autovalores e autovetores', 'Compreenda a diagonalização e identifique componentes principais em sistemas dinâmicos.', 10, 1, 'interactive', true);

insert into public.lesson_skills (lesson_id, skill_id) values
('l_alg_1_1', 's_vector_rep'),
('l_alg_1_1', 's_vector_ops'),
('l_alg_2_1', 's_matrix_ops'),
('l_alg_3_1', 's_matrix_ops'),
('l_alg_4_1', 's_vector_rep'),
('l_alg_5_1', 's_vector_ops'),
('l_alg_6_1', 's_vector_ops');

-- Passos da Aula 1 de Álgebra Linear
insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_alg_1', 'l_alg_1_1', 'text', 'O que é um vetor?', 'Na engenharia, um **vetor** é uma ferramenta matemática usada para representar grandezas que possuem não apenas um valor numérico (como a massa), mas também uma direção e um sentido no espaço. 

Representamos vetores graficamente por meio de setas orientadas no plano cartesiano. Suas coordenadas nos informam o deslocamento em cada eixo coordenado:
* **Eixo X:** Componente horizontal.
* **Eixo Y:** Componente vertical.', 1),
('s_alg_2', 'l_alg_1_1', 'simulation', 'Painel de Vetores', 'Use os sliders abaixo para ajustar as coordenadas X e Y de um vetor de força aplicado em uma célula de solda. Observe como a sua **magnitude (comprimento)** e **ângulo** mudam dinamicamente na grade geométrica.', 2),
('s_alg_3', 'l_alg_1_1', 'activity', 'Exercício 1: Conceito de Magnitude', 'Vamos analisar o efeito físico da magnitude do vetor.', 3);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_alg_1', 'l_alg_1_1', 's_alg_3', 'multiple_choice', 'Se aumentarmos o comprimento gráfico de um vetor de força aplicada em um ponto de solda, o que está acontecendo fisicamente?', 'O comprimento da seta representa graficamente a magnitude (ou seja, a intensidade ou força) do vetor. Portanto, aumentar o comprimento significa aumentar a força aplicada.', 10, 1);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_alg_1_1', 'a_alg_1', 'Aumentamos a intensidade da força aplicada no ponto', true, 'Correto! A magnitude é proporcional ao comprimento gráfico da seta.', 1),
('o_alg_1_2', 'a_alg_1', 'Mudamos a direção da soldagem em 90 graus', false, 'Incorreto. A direção é dada pelo ângulo do vetor, não pelo seu comprimento.', 2),
('o_alg_1_3', 'a_alg_1', 'Reduzimos a quantidade de material fundido no ponto', false, 'Incorreto. Uma força maior geralmente implica maior pressão e energia na solda.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_alg_4', 'l_alg_1_1', 'activity', 'Exercício 2: Soma de Vetores', 'Calcule a resultante da soma de dois vetores de demanda de produção.', 4);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, configuration, points, position) values
('a_alg_2', 'l_alg_1_1', 's_alg_4', 'numeric_input', 'Se o vetor de demanda planejada para o Turno A é V_A = [3, 4] e o do Turno B é V_B = [5, 2], qual é a componente horizontal (X) do vetor de demanda acumulado final (V_Total = V_A + V_B)?', 'Somamos as componentes correspondentes. A componente X do vetor resultante é a soma das componentes X: 3 + 5 = 8.', '{"correct_answer": 8, "tolerance": 0.0}', 10, 2);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_alg_5', 'l_alg_1_1', 'activity', 'Exercício 3: Multiplicação por Escalar', 'Analise o impacto de um escalar multiplicativo em um vetor.', 5);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_alg_3', 'l_alg_1_1', 's_alg_5', 'multiple_choice', 'Se multiplicarmos o vetor de produção de patinetes P = [10, 20] pelo escalar k = 0.5 (devido à redução da jornada de trabalho pela metade), qual será o novo vetor resultante?', 'A multiplicação de um vetor por um escalar multiplica cada uma de suas coordenadas pelo valor: 10 * 0.5 = 5 e 20 * 0.5 = 10. O novo vetor é [5, 10].', 10, 3);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_alg_3_1', 'a_alg_3', 'O vetor resultante é [5, 10]', true, 'Correto! A operação escalar divide proporcionalmente as duas componentes do vetor.', 1),
('o_alg_3_2', 'a_alg_3', 'O vetor resultante é [10, 10]', false, 'Incorreto. Apenas a componente Y foi alterada na sua resposta.', 2),
('o_alg_3_3', 'a_alg_3', 'O vetor resultante é [20, 40]', false, 'Incorreto. Você dobrou as componentes em vez de reduzi-las pela metade.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_alg_6', 'l_alg_1_1', 'summary', 'Resumo de Vetores', 'Excelente! Você concluiu a primeira lição. Agora você sabe que:
1. Vetores representam grandezas com magnitude, direção e sentido.
2. A magnitude corresponde ao comprimento da seta.
3. Somamos vetores somando suas coordenadas correspondentes X e Y.
4. Multiplicar por escalar distribui a redução/ampliação em ambas componentes.', 6);


-- ============================================================================
-- MODULOS E AULAS DE AMD
-- ============================================================================
insert into public.modules (id, course_id, title, description, position, is_published) values
('m_amd_1', 'c2222222-2222-2222-2222-222222222222', 'Módulo 1 — Fundamentos da decisão', 'Diferencie alternativas, critérios, objetivos, preferências e limitações de modelos multicritério.', 1, true),
('m_amd_2', 'c2222222-2222-2222-2222-222222222222', 'Módulo 2 — Estruturação do problema', 'Aprenda a selecionar critérios quantitativos e qualitativos e construir a matriz de decisão.', 2, true),
('m_amd_3', 'c2222222-2222-2222-2222-222222222222', 'Módulo 3 — Pesos e preferências', 'Distribua importância de pesos, normalização de dados e verifique sensibilidade e vieses.', 3, true),
('m_amd_4', 'c2222222-2222-2222-2222-222222222222', 'Módulo 4 — Método AHP', 'Comparações par a par, escalas de Saaty, análise de consistência e ranking de alternativas.', 4, true),
('m_amd_5', 'c2222222-2222-2222-2222-222222222222', 'Módulo 5 — Método TOPSIS', 'Normalização vetorial, distâncias euclidianas às soluções ideais e coeficiente de proximidade.', 5, true),
('m_amd_6', 'c2222222-2222-2222-2222-222222222222', 'Módulo 6 — Método ELECTRE', 'Relações de sobreclassificação, concordância, discordância e limites não compensatórios.', 6, true),
('m_amd_7', 'c2222222-2222-2222-2222-222222222222', 'Módulo 7 — Análise da decisão', 'Avalie sensibilidade, robustez, incertezas e a comunicação de decisões complexas.', 7, true);

insert into public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) values
('l_amd_1_1', 'm_amd_1', 'Alternativas, critérios e decisões', 'Descubra a diferença de escopo entre alternativas e critérios conflitantes na engenharia de gestão.', 10, 1, 'interactive', true),
('l_amd_2_1', 'm_amd_2', 'Matriz de decisão e seleção de critérios', 'Construa a matriz de decisão básica e classifique critérios qualitativos e quantitativos.', 10, 1, 'interactive', true),
('l_amd_3_1', 'm_amd_3', 'Pesos e preferências de decisão', 'Distribua pesos nos critérios e examine vieses na normalização de dados complexos.', 10, 1, 'interactive', true),
('l_amd_4_1', 'm_amd_4', 'Matriz de julgamento e método AHP', 'Estruture hierarquias e execute comparações par a par usando a escala de Saaty.', 15, 1, 'interactive', true),
('l_amd_5_1', 'm_amd_5', 'Ranking de proximidade pelo TOPSIS', 'Calcule a proximidade das alternativas em relação às soluções ideais positiva e negativa.', 12, 1, 'interactive', true),
('l_amd_6_1', 'm_amd_6', 'Sobreclassificação pelo método ELECTRE', 'Aprenda relações de sobreclassificação, concordância e limites não compensatórios no ELECTRE.', 13, 1, 'interactive', true),
('l_amd_7_1', 'm_amd_7', 'Análise de sensibilidade e robustez', 'Estruture análises de sensibilidade para garantir robustez e comunicação clara dos resultados.', 10, 1, 'interactive', true);

insert into public.lesson_skills (lesson_id, skill_id) values
('l_amd_1_1', 's_dec_criteria'),
('l_amd_1_1', 's_weighted_sum'),
('l_amd_2_1', 's_dec_criteria'),
('l_amd_3_1', 's_weighted_sum'),
('l_amd_4_1', 's_weighted_sum'),
('l_amd_5_1', 's_matrix_dec'),
('l_amd_6_1', 's_matrix_dec'),
('l_amd_7_1', 's_weighted_sum');

-- Passos da Aula 1 de AMD
insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_amd_1', 'l_amd_1_1', 'text', 'Complexidade das Decisões reais', 'Na vida real, a maioria das decisões envolvem múltiplos objetivos. Raramente uma única opção é superior em tudo. 

Por exemplo, ao comprar uma máquina:
* A opção mais barata pode ter baixa qualidade.
* A de melhor qualidade pode ter maior prazo de entrega.

O **Auxílio Multicritério à Decisão (AMD)** ajuda a estruturar esses problemas identificando **Alternativas** (opções disponíveis) e os **Critérios** (variáveis de avaliação).', 1),
('s_amd_2', 'l_amd_1_1', 'simulation', 'Distribuidor de Pesos', 'Use os sliders abaixo para ajustar os pesos de **Preço**, **Qualidade** e **Prazo** no processo de seleção. Observe como a nota geral ponderada de dois fornecedores concorrentes (Fornecedor A e Fornecedor B) muda em tempo real no gráfico de barras.', 2),
('s_amd_3', 'l_amd_1_1', 'activity', 'Exercício 1: Alternativa versus Critério', 'Determine a classificação dos termos de decisão.', 3);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_amd_1', 'l_amd_1_1', 's_amd_3', 'multiple_choice', 'Em um estudo de localização para uma nova fábrica, o que representam opções como "Cidade A" ou "Cidade B" no modelo de decisão?', 'As cidades A e B são as possíveis opções de escolha sob julgamento, logo são classificadas como Alternativas.', 10, 1);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_amd_1_1', 'a_amd_1', 'Alternativas do problema', true, 'Correto! Cidades de escolha representam as alternativas.', 1),
('o_amd_1_2', 'a_amd_1', 'Critérios de avaliação', false, 'Incorreto. Critérios seriam o custo do terreno ou proximidade das rodovias.', 2),
('o_amd_1_3', 'a_amd_1', 'Partes interessadas do processo', false, 'Incorreto. Partes interessadas são os engenheiros, comunidade e diretores.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_amd_4', 'l_amd_1_1', 'activity', 'Exercício 2: Soma Ponderada', 'Faça o cálculo matricial da nota global.', 4);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, configuration, points, position) values
('a_amd_2', 'l_amd_1_1', 's_amd_4', 'numeric_input', 'O fornecedor A tem nota 10 em Preço (peso 0.4) e nota 5 em Qualidade (peso 0.6). Qual é a sua nota final global ponderada? (Use a média ponderada)', 'Multiplicamos cada nota pelo respectivo peso e somamos: 10 * 0.4 + 5 * 0.6 = 4.0 + 3.0 = 7.0.', '{"correct_answer": 7.0, "tolerance": 0.05}', 10, 2);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_amd_5', 'l_amd_1_1', 'activity', 'Exercício 3: Limitações de Modelos', 'Entenda as premissas dos métodos de AMD.', 5);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_amd_3', 'l_amd_1_1', 's_amd_5', 'multiple_choice', 'Por que nenhum método multicritério garante encontrar uma decisão objetivamente ideal e perfeita?', 'Métodos multicritério apoiam a decisão baseando-se em pesos, preferências subjetivas e critérios selecionados pelos decisores, não existindo uma decisão ideal universal.', 10, 3);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_amd_3_1', 'a_amd_3', 'Porque o resultado depende de pesos subjetivos e critérios escolhidos', true, 'Correto! Mudando os pesos ou os critérios, o fornecedor vencedor pode mudar completamente.', 1),
('o_amd_3_2', 'a_amd_3', 'Porque os computadores erram as aproximações exatas das notas', false, 'Incorreto. O erro não é uma limitação de hardware computacional, mas conceitual do problema.', 2),
('o_amd_3_3', 'a_amd_3', 'Porque critérios quantitativos nunca podem ser normalizados', false, 'Incorreto. Critérios quantitativos são os mais fáceis de normalizar numericamente.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_amd_6', 'l_amd_1_1', 'summary', 'Resumo de AMD', 'Excelente! Você aprendeu que:
1. AMD estrutura decisões com múltiplos critérios.
2. Alternativas são as opções; critérios são os fatores de peso.
3. Não há decisão universal ideal; ela reflete a árvore de preferências dos tomadores de decisão.', 6);


-- ============================================================================
-- MODULOS E AULAS DE CÁLCULO NUMÉRICO
-- ============================================================================
insert into public.modules (id, course_id, title, description, position, is_published) values
('m_num_1', 'c3333333-3333-3333-3333-333333333333', 'Módulo 1 — Erros e aproximações', 'Erros absolutos e relativos, arredondamento, truncamento e estabilidade numérica.', 1, true),
('m_num_2', 'c3333333-3333-3333-3333-333333333333', 'Módulo 2 — Zeros de funções', 'Métodos iterativos da bisseção, Newton-Raphson e secante para encontrar raízes de equações.', 2, true),
('m_num_3', 'c3333333-3333-3333-3333-333333333333', 'Módulo 3 — Sistemas lineares numéricos', 'Resoluções numéricas de sistemas lineares por eliminação de Gauss, fatoração LU, Jacobi e Seidel.', 3, true),
('m_num_4', 'c3333333-3333-3333-3333-333333333333', 'Módulo 4 — Interpolação', 'Polinômios de Lagrange e Newton, splines e estimativa do erro de interpolação.', 4, true),
('m_num_5', 'c3333333-3333-3333-3333-333333333333', 'Módulo 5 — Ajuste de curvas', 'Regressão por mínimos quadrados linear e polinomial para aproximar dados de laboratório.', 5, true),
('m_num_6', 'c3333333-3333-3333-3333-333333333333', 'Módulo 6 — Diferenciação numérica', 'Calcule taxas de variação usando diferenças finitas progressivas, regressivas e centrais.', 6, true),
('m_num_7', 'c3333333-3333-3333-3333-333333333333', 'Módulo 7 — Integração numérica', 'Fórmulas dos trapézios e Simpson simples e compostas para cálculo aproximado de áreas.', 7, true),
('m_num_8', 'c3333333-3333-3333-3333-333333333333', 'Módulo 8 — Equações diferenciais', 'Soluções numéricas de PVI por Euler e métodos de Runge-Kutta.', 8, true);

insert into public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) values
('l_num_1_1', 'm_num_1', 'Por que precisamos de aproximações?', 'Compreenda a necessidade prática de estimar valores e o impacto dos limites de representação binária.', 10, 1, 'interactive', true),
('l_num_2_1', 'm_num_2', 'Zeros de funções e método da bisseção', 'Aprenda a aplicar o método da bisseção e Newton-Raphson para achar raízes de equações.', 12, 1, 'interactive', true),
('l_num_3_1', 'm_num_3', 'Métodos iterativos para sistemas lineares', 'Entenda os métodos Jacobi e Gauss-Seidel para resolver grandes sistemas de equações.', 10, 1, 'interactive', true),
('l_num_4_1', 'm_num_4', 'Interpolação de Lagrange e Newton', 'Estime valores intermediários utilizando polinômios de Lagrange ou Newton com facilidade.', 11, 1, 'interactive', true),
('l_num_5_1', 'm_num_5', 'Ajuste de curvas por mínimos quadrados', 'Utilize o método dos mínimos quadrados para aproximar dados de sensores de laboratório.', 10, 1, 'interactive', true),
('l_num_6_1', 'm_num_6', 'Diferenciação numérica por diferenças finitas', 'Calcule taxas de variação usando diferenças finitas progressivas, regressivas e centrais.', 10, 1, 'interactive', true),
('l_num_7_1', 'm_num_7', 'Integração numérica por trapézios e Simpson', 'Aproxime áreas sob curvas com a regra dos trapézios e fórmulas compostas de Simpson.', 12, 1, 'interactive', true),
('l_num_8_1', 'm_num_8', 'Equações diferenciais e método de Euler', 'Desenvolva soluções de PVI pelo método de Euler e métodos estáveis de Runge-Kutta.', 14, 1, 'interactive', true);

insert into public.lesson_skills (lesson_id, skill_id) values
('l_num_1_1', 's_num_error'),
('l_num_2_1', 's_bisection'),
('l_num_3_1', 's_convergence'),
('l_num_4_1', 's_num_error'),
('l_num_5_1', 's_num_error'),
('l_num_6_1', 's_num_error'),
('l_num_7_1', 's_num_error'),
('l_num_8_1', 's_convergence');

-- Passos da Aula 1 de Cálculo Numérico
insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_num_1', 'l_num_1_1', 'text', 'Aproximações Computacionais', 'Na engenharia, muitos problemas matemáticos são insolúveis analiticamente. Por exemplo, equações que governam o fluxo de fluidos ou a vibração estrutural de uma asa de avião.

Os computadores resolvem esses problemas transformando-os em sequências de operações aritméticas básicas e executando iterações repetidas. No entanto, por representarem números com um número fixo de bits, as soluções são **aproximações** contendo erros inerentes.', 1),
('s_num_2', 'l_num_1_1', 'simulation', 'Truncamento de Dízimas', 'Use o slider para definir a quantidade de casas decimais usadas na representação do valor real `1/3 = 0.33333...`. Observe como o **Erro Absoluto** e a perda de precisão variam conforme reduzimos a capacidade de representação do sistema.', 2),
('s_num_3', 'l_num_1_1', 'activity', 'Exercício 1: Erro Absoluto vs Relativo', 'Entenda os dois indicadores fundamentais de erro.', 3);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_num_1', 'l_num_1_1', 's_num_3', 'multiple_choice', 'Qual a principal diferença entre erro absoluto e erro relativo?', 'O erro absoluto é apenas a diferença bruta em magnitude. O erro relativo normaliza essa diferença dividindo-a pelo valor real, nos dando a proporção exata da falha.', 10, 1);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_num_1_1', 'a_num_1', 'O absoluto é o desvio bruto, o relativo é o desvio dividido pelo valor real', true, 'Correto! O erro relativo é adimensional e nos ajuda a comparar a precisão de diferentes ordens de grandeza.', 1),
('o_num_1_2', 'a_num_1', 'O absoluto é sempre percentual, enquanto o relativo é expresso em milímetros', false, 'Incorreto. O erro relativo costuma ser expresso em porcentagem, e o absoluto na unidade da variável.', 2),
('o_num_1_3', 'a_num_1', 'O erro relativo só ocorre quando o algoritmo falha em convergir', false, 'Incorreto. O erro relativo existe em qualquer aproximação, mesmo em convergência estável.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_num_4', 'l_num_1_1', 'activity', 'Exercício 2: Cálculo de Erro', 'Pratique o cálculo do desvio de aproximação.', 4);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, configuration, points, position) values
('a_num_2', 'l_num_1_1', 's_num_4', 'numeric_input', 'Se o valor real de uma constante física é 5.0 e a aproximação calculada pelo algoritmo é 4.8, qual é o erro absoluto?', 'Erro Absoluto = |Valor Real - Valor Aproximado| = |5.0 - 4.8| = 0.2.', '{"correct_answer": 0.2, "tolerance": 0.01}', 10, 2);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_num_5', 'l_num_1_1', 'activity', 'Exercício 3: Erro de Truncamento', 'Compreenda a causa do erro de truncamento.', 5);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_num_3', 'l_num_1_1', 's_num_5', 'multiple_choice', 'O que causa o erro de truncamento em algoritmos numéricos iterativos?', 'O erro de truncamento ocorre quando encerramos uma série matemática infinita em um termo finito (por exemplo, parando uma soma infinita no décimo termo).', 10, 3);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_num_3_1', 'a_num_3', 'Parar um processo de cálculo infinito após um número finito de passos', true, 'Correto! Truncamos a série infinita para que o computador termine o processamento.', 1),
('o_num_3_2', 'a_num_3', 'O ruído eletromagnético que afeta os cabos de rede', false, 'Incorreto. Ruído elétrico afeta transmissão, não a lógica do truncamento matemático.', 2),
('o_num_3_3', 'a_num_3', 'Um erro de digitação cometido pelo programador do algoritmo', false, 'Incorreto. Erros de digitação são bugs de código, enquanto truncamento é uma decisão de discretização.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_num_6', 'l_num_1_1', 'summary', 'Resumo de Cálculo Numérico', 'Excelente! Você completou a lição e aprendeu:
1. Computadores aproximam soluções porque trabalham de forma finita.
2. Erro absoluto mede a diferença direta; erro relativo mede a proporção.
3. Truncamento decorre de encerrar passos infinitos em termos finitos.', 6);


-- ============================================================================
-- MODULOS E AULAS DE CIÊNCIA DOS MATERIAIS
-- ============================================================================
insert into public.modules (id, course_id, title, description, position, is_published) values
('m_mat_1', 'c4444444-4444-4444-4444-444444444444', 'Módulo 1 — Introdução aos materiais', 'Estude a relação entre processamento, estrutura, propriedades e desempenho em ligas, polímeros e cerâmicas.', 1, true),
('m_mat_2', 'c4444444-4444-4444-4444-444444444444', 'Módulo 2 — Estrutura atômica e ligações', 'Identifique ligações iônicas, covalentes e metálicas e seu impacto nas propriedades dos materiais.', 2, true),
('m_mat_3', 'c4444444-4444-4444-4444-444444444444', 'Módulo 3 — Estruturas cristalinas e defeitos', 'Células unitárias, direções e planos cristalográficos, discordâncias, vacâncias e difusão atômica.', 3, true),
('m_mat_4', 'c4444444-4444-4444-4444-444444444444', 'Módulo 4 — Propriedades mecânicas e térmicas', 'Interprete ensaios mecânicos de tração, módulo elástico, limite de escoamento, tenacidade, impacto e expansão térmica.', 4, true),
('m_mat_5', 'c4444444-4444-4444-4444-444444444444', 'Módulo 5 — Diagramas de fase', 'Equilíbrio termodinâmico, regra da alavanca, ligações ferro-carbono e resfriamento.', 5, true),
('m_mat_6', 'c4444444-4444-4444-4444-444444444444', 'Módulo 6 — Tratamentos térmicos', 'Têmpera, normalização, recozimento e revenimento: modifique a dureza através da microestrutura.', 6, true),
('m_mat_7', 'c4444444-4444-4444-4444-444444444444', 'Módulo 7 — Seleção de materiais', 'Aplicação industrial, custos, propriedades mecânicas e matriz de decisão para escolha estrutural.', 7, true);

insert into public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) values
('l_mat_1_1', 'm_mat_1', 'Estrutura, propriedades, processamento e desempenho', 'Classifique materiais e entenda a relação fundamental processamento-estrutura-propriedade.', 10, 1, 'interactive', true),
('l_mat_2_1', 'm_mat_2', 'Estrutura atômica e ligações primárias', 'Entenda como as ligações metálicas, iônicas e covalentes determinam o comportamento físico.', 10, 1, 'interactive', true),
('l_mat_3_1', 'm_mat_3', 'Estruturas cristalinas e defeitos pontuais', 'Estude as células unitárias (CCC, CFC, HC) e defeitos como vacâncias e discordâncias.', 12, 1, 'interactive', true),
('l_mat_4_1', 'm_mat_4', 'Propriedades mecânicas e ensaio de tração', 'Analise curvas tensão-deformação, limite elástico/plástico e o módulo de elasticidade.', 11, 1, 'interactive', true),
('l_mat_5_1', 'm_mat_5', 'Diagramas de fase e regra da alavanca', 'Analise o resfriamento de ligas metálicas e interprete frações no diagrama ferro-carbono.', 10, 1, 'interactive', true),
('l_mat_6_1', 'm_mat_6', 'Tratamentos térmicos em ligas ferro-carbono', 'Têmpera, recozimento e revenimento: altere a microestrutura para aumentar a dureza.', 12, 1, 'interactive', true),
('l_mat_7_1', 'm_mat_7', 'Matriz de seleção técnica de materiais', 'Construa matrizes de seleção técnica cruzando custos, peso e confiabilidade mecânica.', 10, 1, 'interactive', true);

insert into public.lesson_skills (lesson_id, skill_id) values
('l_mat_1_1', 's_mat_bonds'),
('l_mat_2_1', 's_mat_bonds'),
('l_mat_3_1', 's_mat_bonds'),
('l_mat_4_1', 's_tensile_test'),
('l_mat_5_1', 's_tensile_test'),
('l_mat_6_1', 's_tensile_test'),
('l_mat_7_1', 's_class_materials');

-- Passos da Aula 1 de Ciência dos Materiais
insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_mat_1', 'l_mat_1_1', 'text', 'O Tetraedro de Materiais', 'A Ciência dos Materiais baseia-se na forte correlação entre 4 vértices fundamentais:
1. **Processamento:** Como o material é fabricado (fundição, tratamentos térmicos).
2. **Estrutura:** O arranjo atômico interno (ligações, redes cristalinas).
3. **Propriedades:** O comportamento físico e mecânico (resistência, ductilidade).
4. **Desempenho:** Como a peça se comporta em operação real.

Para projetar estruturas seguras, precisamos compreender como submeter um corpo de prova a forças físicas e interpretar suas deformações.', 1),
('s_mat_2', 'l_mat_1_1', 'simulation', 'Ensaio de Tração', 'Selecione o material (Aço ou Cerâmica) e deslize o slider para aplicar **tensão (força)** na peça. Acompanhe a curva de **deformação** resultante e veja onde a peça sofre escoamento e, por fim, ruptura.', 2),
('s_mat_3', 'l_mat_1_1', 'activity', 'Exercício 1: Ligações Químicas', 'Mapeie o comportamento atômico.', 3);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_mat_1', 'l_mat_1_1', 's_mat_3', 'multiple_choice', 'Qual ligação atômica é caracterizada por uma "nuvem" de elétrons deslocalizados e livres, que gera alta condutividade elétrica nos metais?', 'A ligação metálica compartilha elétrons de valência livremente em um "mar de elétrons", conferindo excelentes propriedades condutoras aos metais.', 10, 1);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_mat_1_1', 'a_mat_1', 'Ligação metálica', true, 'Correto! A mobilidade dos elétrons livres é responsável pela condutividade e ductilidade metálica.', 1),
('o_mat_1_2', 'a_mat_1', 'Ligação iônica', false, 'Incorreto. Ligações iônicas prendem elétrons em íons fixos, sendo isolantes elétricos em estado sólido.', 2),
('o_mat_1_3', 'a_mat_1', 'Ligação covalente', false, 'Incorreto. Ligações covalentes compartilham elétrons de forma altamente direcional e localizada.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_mat_4', 'l_mat_1_1', 'activity', 'Exercício 2: Cálculo de Tensão', 'Pratique o cálculo da tensão mecânica.', 4);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, configuration, points, position) values
('a_mat_2', 'l_mat_1_1', 's_mat_4', 'numeric_input', 'Um corpo de prova com área transversal de 10 mm² é submetido a uma carga de tração de 500 N. Qual é a tensão mecânica aplicada em megapascais (MPa)? (Dica: Tensão = Força / Área)', 'Tensão = Força / Área = 500 N / 10 mm² = 50 N/mm² = 50 MPa.', '{"correct_answer": 50, "tolerance": 0.0}', 10, 2);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_mat_5', 'l_mat_1_1', 'activity', 'Exercício 3: Região de Deformação', 'Analise os limites de deformação do material.', 5);

insert into public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) values
('a_mat_3', 'l_mat_1_1', 's_mat_5', 'multiple_choice', 'No ensaio de tração, qual o nome do ponto que marca a transição entre a deformação elástica (reversível) e a deformação plástica (permanente)?', 'O limite de escoamento é o ponto em que o material sofre tensão suficiente para começar a se deformar plasticamente (de forma irreversível).', 10, 3);

insert into public.activity_options (id, activity_id, content, is_correct, feedback, position) values
('o_mat_3_1', 'a_mat_3', 'Limite de escoamento', true, 'Correto! Acima do escoamento, o material sofre deformações permanentes irreversíveis.', 1),
('o_mat_3_2', 'a_mat_3', 'Limite de resiliência', false, 'Incorreto. Resiliência é a capacidade de absorver energia na região elástica, não o ponto divisor.', 2),
('o_mat_3_3', 'a_mat_3', 'Ponto de fratura final', false, 'Incorreto. A fratura é o ponto em que o corpo de prova se rompe completamente, muito após o início da fase plástica.', 3);

insert into public.lesson_steps (id, lesson_id, step_type, title, content, position) values
('s_mat_6', 'l_mat_1_1', 'summary', 'Resumo de Materiais', 'Excelente! Você completou a lição e aprendeu:
1. O tetraedro correlaciona Processamento -> Estrutura -> Propriedades -> Desempenho.
2. A ligação metálica explica a alta condutividade dos metais.
3. Tensão é força sobre área (N/mm² ou MPa).
4. O escoamento delimita as deformações elástica e plástica.', 6);
