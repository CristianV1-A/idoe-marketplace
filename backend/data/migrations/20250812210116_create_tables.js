// Dentro do seu arquivo de migração (ex: ..._create_tables.js)

// A função 'up' é executada quando aplicamos a migração. Ela cria as coisas.
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id'); // Chave primária auto-incrementável (1, 2, 3...)
      tbl.string('name', 128).notNullable();
      tbl.string('email', 128).notNullable().unique(); // Email deve ser único
      tbl.string('password', 128).notNullable(); // Guardaremos a senha criptografada aqui
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('announcements', tbl => {
      tbl.increments('id');
      tbl.string('title', 255).notNullable();
      tbl.string('location', 128).notNullable();
      // Mudamos de dataCriacao para um timestamp mais robusto
      tbl.timestamp('creation_date').defaultTo(knex.fn.now());
      tbl.date('expiration_date'); // Data em que o anúncio expira
      tbl.string('image_url').notNullable();
      // Chave Estrangeira: Conecta o anúncio a um usuário
      tbl.integer('user_id')
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE') // Se o id do usuário mudar, atualiza aqui também
         .onDelete('CASCADE'); // Se um usuário for deletado, seus anúncios também serão
    })
    .then(() => {
    // Insere um usuário de teste
    return knex('users').insert({
        id: 1,
        name: 'Usuário Teste',
        email: 'teste@idoe.com',
        password: '123' // AINDA NÃO É SEGURO, vamos arrumar isso
    });
    })
    .then(() => {
        // Insere anúncios de teste
        return knex('announcements').insert([
            { title: 'Doação de Camisetas (Tam. M)', location: 'Manaus, AM', image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600', user_id: 1 },
            { title: 'Calça Jeans Feminina (Tam. 38)', location: 'Iranduba, AM', image_url: 'https://images.unsplash.com/photo-1602293589922-2542a3973169?w=600', user_id: 1 },
            { title: 'Lote de Roupas de Bebê', location: 'Manaus, AM', image_url: 'https://images.unsplash.com/photo-1522771793082-6142c019a3e2?w=600', user_id: 1 }
        ]);
    });
};


// A função 'down' é executada quando revertemos uma migração. Ela desfaz o que a 'up' fez.
exports.down = function(knex) {
  // Devemos derrubar as tabelas na ordem inversa da criação para evitar erros de chave estrangeira
  return knex.schema
    .dropTableIfExists('announcements')
    .dropTableIfExists('users');
    
};



