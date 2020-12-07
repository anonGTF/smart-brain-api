exports.up = function(knex) {
    return knex.schema.createTable('login', function(table) {
        table.increments();
        table.string('email').notNullable();
        table.string('hash');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('login');
};