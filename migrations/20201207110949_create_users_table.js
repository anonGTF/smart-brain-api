exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name');
        table.string('email').notNullable();
        table.integer('entries').defaultTo(0);
        table.timestamp('joined').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};