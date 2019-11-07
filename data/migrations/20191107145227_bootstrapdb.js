exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable();
    })
    .createTable('steps', tbl => {
      tbl.increments();

      tbl.string('step', 255).notNullable();
      tbl.integer('step_number').notNullable();

      tbl
        .integer('recipe_id')
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('ingredients', tbl => {
      tbl.increments();

      tbl.string('name', 255).notNullable();
    })
    .createTable('recipes_ingredients', tbl => {
      tbl.increments();

      tbl.float('quantity');

      tbl
        .integer('recipe_id')
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      tbl
        .integer('ingredient_id')
        .unsigned()
        .references('id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipes_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes');
};
