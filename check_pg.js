const { Client } = require('pg');

async function check() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
    const dbs = res.rows.map(r => r.datname);
    console.log("Databases:", dbs);
    await client.end();
    
    for (const db of dbs) {
      const dbClient = new Client({
        user: 'postgres',
        host: 'localhost',
        database: db,
        password: 'postgres',
        port: 5432,
      });
      try {
        await dbClient.connect();
        const resTables = await dbClient.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
        const tables = resTables.rows.map(r => r.table_name);
        
        let out = `\n--- DB: ${db} ---\n`;
        if (tables.includes('lesson_questions')) {
           const res1 = await dbClient.query('SELECT COUNT(*) FROM lesson_questions');
           out += `lesson_questions: ${res1.rows[0].count}\n`;
        }
        if (tables.includes('questions')) {
           const res2 = await dbClient.query('SELECT COUNT(*) FROM questions');
           out += `questions: ${res2.rows[0].count}\n`;
        }
        if (tables.includes('lessons')) {
           const res3 = await dbClient.query('SELECT COUNT(*) FROM lessons');
           out += `lessons: ${res3.rows[0].count}\n`;
        }
        if (tables.includes('question_import_queue')) {
           const res4 = await dbClient.query('SELECT COUNT(*) FROM question_import_queue');
           out += `question_import_queue: ${res4.rows[0].count}\n`;
        }
        console.log(out);
        await dbClient.end();
      } catch (e) {
         // ignore
      }
    }
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

check();
