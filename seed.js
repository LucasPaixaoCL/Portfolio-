import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Dados de exemplo
const contactsData = [
  {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    message: 'Olá! Gostaria de mais informações sobre seus serviços. Poderiam me contatar?',
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    message: 'Excelente landing page! Gostaria de saber mais sobre os planos disponíveis.',
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    message: 'Tenho interesse em contratar seus serviços. Qual é o valor?',
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    message: 'Adorei o design do site! Vocês fazem customizações?',
  },
  {
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@example.com',
    message: 'Preciso de uma solução para meu negócio. Vocês podem ajudar?',
  },
  {
    name: 'Juliana Martins',
    email: 'juliana.martins@example.com',
    message: 'Qual é o tempo de implementação? Preciso urgentemente.',
  },
  {
    name: 'Roberto Alves',
    email: 'roberto.alves@example.com',
    message: 'Gostaria de agendar uma reunião para discutir o projeto.',
  },
  {
    name: 'Fernanda Lima',
    email: 'fernanda.lima@example.com',
    message: 'Vocês oferecem suporte após a implementação?',
  },
  {
    name: 'Lucas Gomes',
    email: 'lucas.gomes@example.com',
    message: 'Estou procurando uma empresa confiável. Vocês têm referências?',
  },
  {
    name: 'Beatriz Rocha',
    email: 'beatriz.rocha@example.com',
    message: 'Ótimo trabalho! Gostaria de conhecer melhor sua equipe.',
  },
];

async function seedDatabase() {
  try {
    const client = await pool.connect();

    console.log('🌱 Iniciando população do banco de dados...\n');

    // Limpar contatos existentes (opcional)
    // await client.query('TRUNCATE TABLE contacts;');

    // Inserir contatos
    for (const contact of contactsData) {
      await client.query(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
        [contact.name, contact.email, contact.message]
      );
      console.log(`✓ Contato adicionado: ${contact.name}`);
    }

    // Contar total de contatos
    const result = await client.query('SELECT COUNT(*) FROM contacts');
    const totalContacts = result.rows[0].count;

    console.log(`\n✅ Banco de dados populado com sucesso!`);
    console.log(`📊 Total de contatos: ${totalContacts}\n`);

    client.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao popular banco de dados:', err);
    process.exit(1);
  }
}

seedDatabase();

