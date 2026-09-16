import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/solda_inspecao"
)

def get_connection():
    """Retorna uma conexao com o banco PostgreSQL solda_inspecao."""
    return psycopg2.connect(DATABASE_URL)

def setup_database():
    """Valida a conexao com o PostgreSQL solda_inspecao e verifica integridade das tabelas."""
    print("=" * 60)
    print("AXION - CONFIGURAÇÃO E DIAGNÓSTICO DO BANCO DE DADOS")
    print("=" * 60)
    print(f"Connecting to: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else DATABASE_URL}")
    
    try:
        conn = get_connection()
        conn.autocommit = True
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        print(">> Conexão com PostgreSQL estabelecida com sucesso!")
        
        # 1. Listar tabelas existentes
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        tables = [r['table_name'] for r in cursor.fetchall()]
        print(f"\n[1] Tabelas encontradas ({len(tables)}):")
        print("    " + ", ".join(tables))
        
        # 2. Verificar contagem de registros principais
        stats = {}
        for tbl in ['courses', 'modules', 'lessons', 'subjects', 'questions', 'question_options', 'content_chunks', 'users']:
            if tbl in tables:
                cursor.execute(f"SELECT COUNT(*) as count FROM {tbl};")
                stats[tbl] = cursor.fetchone()['count']
            else:
                stats[tbl] = 0

        print("\n[2] Estatísticas de Dados Reais:")
        print(f"    - Cursos: {stats.get('courses', 0)}")
        print(f"    - Módulos: {stats.get('modules', 0)}")
        print(f"    - Aulas: {stats.get('lessons', 0)}")
        print(f"    - Disciplinas (Subjects): {stats.get('subjects', 0)}")
        print(f"    - Questões Técnicas: {stats.get('questions', 0)}")
        print(f"    - Alternativas de Questões: {stats.get('question_options', 0)}")
        print(f"    - Chunks Técnicos (com pgvector): {stats.get('content_chunks', 0)}")
        print(f"    - Usuários: {stats.get('users', 0)}")

        # 3. Garantir que as tabelas essenciais para o funcionamento do Axion existem
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS public.axion_settings (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        """)
        
        # Salvar metadados da configuração do banco
        cursor.execute("""
            INSERT INTO public.axion_settings (key, value, updated_at)
            VALUES ('database_status', 'connected', NOW())
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
        """)
        
        print("\n[3] Validação de integridade das questões:")
        cursor.execute("""
            SELECT q.id, q.statement, count(o.id) as num_options
            FROM questions q
            LEFT JOIN question_options o ON q.id = o.question_id
            GROUP BY q.id, q.statement
            LIMIT 3;
        """)
        sample_q = cursor.fetchall()
        for idx, sq in enumerate(sample_q, 1):
            stmt = sq['statement'][:80].replace('\n', ' ')
            print(f"    Exemplo {idx}: [{sq['num_options']} opções] {stmt}...")

        print("\n[4] Status Final: Banco PostgreSQL 'solda_inspecao' configurado e pronto para uso pelo Axion!")
        print("=" * 60)
        
        cursor.close()
        conn.close()
        return True
        
    except psycopg2.OperationalError as e:
        print(f"\n[ERRO OPERACIONAL] Não foi possível conectar ao PostgreSQL: {e}")
        print("Verifique se o serviço PostgreSQL está rodando em localhost:5432.")
        return False
    except Exception as e:
        print(f"\n[ERRO] Ocorreu uma exceção: {e}")
        return False

if __name__ == "__main__":
    setup_database()
