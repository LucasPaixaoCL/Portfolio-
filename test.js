import http from 'http';

const BASE_URL = 'http://localhost:3001';
let testsPassed = 0;
let testsFailed = 0;

// Helper function to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('\n📋 Teste 1: Health Check');
  try {
    const response = await makeRequest('GET', '/api/health');
    if (response.status === 200 && response.body.status === 'ok') {
      console.log('✓ Server is running');
      console.log(`  Database: ${response.body.database}`);
      testsPassed++;
    } else {
      console.log('✗ Health check failed');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testCreateContact() {
  console.log('\n📋 Teste 2: Criar Contato');
  try {
    const response = await makeRequest('POST', '/api/contacts', {
      name: 'João Silva',
      email: 'joao@example.com',
      message: 'Teste de contato',
    });

    if (response.status === 200 && response.body.success) {
      console.log('✓ Contact created successfully');
      console.log(`  Contact ID: ${response.body.id}`);
      testsPassed++;
    } else {
      console.log('✗ Failed to create contact');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testCreateContactInvalidEmail() {
  console.log('\n📋 Teste 3: Validação de Email Inválido');
  try {
    const response = await makeRequest('POST', '/api/contacts', {
      name: 'Maria Santos',
      email: 'invalid-email',
      message: 'Teste com email inválido',
    });

    if (response.status === 400 && !response.body.success) {
      console.log('✓ Invalid email rejected correctly');
      console.log(`  Error: ${response.body.error}`);
      testsPassed++;
    } else {
      console.log('✗ Invalid email was not rejected');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testCreateContactMissingFields() {
  console.log('\n📋 Teste 4: Validação de Campos Obrigatórios');
  try {
    const response = await makeRequest('POST', '/api/contacts', {
      name: 'Pedro Costa',
      // Missing email and message
    });

    if (response.status === 400 && !response.body.success) {
      console.log('✓ Missing fields rejected correctly');
      console.log(`  Error: ${response.body.error}`);
      testsPassed++;
    } else {
      console.log('✗ Missing fields were not rejected');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testGetContacts() {
  console.log('\n📋 Teste 5: Listar Contatos');
  try {
    const response = await makeRequest('GET', '/api/contacts');

    if (response.status === 200 && response.body.success && Array.isArray(response.body.contacts)) {
      console.log('✓ Contacts retrieved successfully');
      console.log(`  Total contacts: ${response.body.contacts.length}`);
      if (response.body.contacts.length > 0) {
        console.log(`  Latest contact: ${response.body.contacts[0].name}`);
      }
      testsPassed++;
    } else {
      console.log('✗ Failed to retrieve contacts');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testCreateComment() {
  console.log('\n📋 Teste 6: Criar Comentário');
  try {
    const response = await makeRequest('POST', '/api/comments', {
      project_id: 'project-1',
      name: 'Ana Silva',
      email: 'ana@example.com',
      text: 'Excelente projeto!',
    });

    if (response.status === 200 && response.body.success) {
      console.log('✓ Comment created successfully');
      console.log(`  Comment ID: ${response.body.id}`);
      testsPassed++;
    } else {
      console.log('✗ Failed to create comment');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testGetComments() {
  console.log('\n📋 Teste 7: Listar Comentários de um Projeto');
  try {
    const response = await makeRequest('GET', '/api/comments/project-1');

    if (response.status === 200 && response.body.success && Array.isArray(response.body.comments)) {
      console.log('✓ Comments retrieved successfully');
      console.log(`  Total comments: ${response.body.comments.length}`);
      if (response.body.comments.length > 0) {
        console.log(`  Latest comment: ${response.body.comments[0].name}`);
      }
      testsPassed++;
    } else {
      console.log('✗ Failed to retrieve comments');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

async function testDeleteComment() {
  console.log('\n📋 Teste 8: Deletar Comentário');
  try {
    // First, create a comment to delete
    const createResponse = await makeRequest('POST', '/api/comments', {
      project_id: 'project-2',
      name: 'Carlos Mendes',
      email: 'carlos@example.com',
      text: 'Comentário para deletar',
    });

    if (!createResponse.body.success) {
      console.log('✗ Failed to create comment for deletion test');
      testsFailed++;
      return;
    }

    const commentId = createResponse.body.id;

    // Now delete it
    const deleteResponse = await makeRequest('DELETE', `/api/comments/${commentId}`);

    if (deleteResponse.status === 200 && deleteResponse.body.success) {
      console.log('✓ Comment deleted successfully');
      testsPassed++;
    } else {
      console.log('✗ Failed to delete comment');
      testsFailed++;
    }
  } catch (err) {
    console.log('✗ Error:', err.message);
    testsFailed++;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 KittyHub - Testes Automatizados');
  console.log('==================================\n');

  try {
    await testHealthCheck();
    await testCreateContact();
    await testCreateContactInvalidEmail();
    await testCreateContactMissingFields();
    await testGetContacts();
    await testCreateComment();
    await testGetComments();
    await testDeleteComment();

    console.log('\n==================================');
    console.log(`\n📊 Resultados Finais:`);
    console.log(`✓ Testes Passaram: ${testsPassed}`);
    console.log(`✗ Testes Falharam: ${testsFailed}`);
    console.log(`Total: ${testsPassed + testsFailed}\n`);

    if (testsFailed === 0) {
      console.log('🎉 Todos os testes passaram com sucesso!\n');
    } else {
      console.log('⚠️  Alguns testes falharam. Verifique os erros acima.\n');
    }

    process.exit(testsFailed === 0 ? 0 : 1);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

// Wait a moment for server to be ready, then run tests
setTimeout(runAllTests, 1000);
