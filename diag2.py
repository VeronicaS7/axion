import psycopg2
conn = psycopg2.connect('postgresql://postgres@localhost:5432/template0')
cur = conn.cursor()
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
print('Tables in template0:', [r[0] for r in cur.fetchall()])
