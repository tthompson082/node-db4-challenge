const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions
};

function getRecipes() {
  db.select('*').from('recipes');
}

function getShoppingList(id) {
  db.select('c.quantity', 'i.name', 'r.name')
    .from('recipes_ingredients as c')
    .join('recipes as r', 'c.recipe_id', '=', 'r.id')
    .join('ingredients as i', 'c.ingredient_id', '=', 'i.id')
    .where('c.recipe_id', '=', id);
}

function getInstructions(id) {
  db.select('s.step_number', 's.step', 'r.name')
    .from('steps as s')
    .join('recipes as r', 's.recipe_id', '=', 'r.id')
    .where('r.id', '=', id)
    .orderBy('s.step_number', 'desc');
}
