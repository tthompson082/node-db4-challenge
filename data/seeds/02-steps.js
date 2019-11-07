exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('steps').insert([
        { step: 'knead', step_number: '1', recipe_id: 1 },
        { step: 'bake', step_number: '2', recipe_id: 1 },
        { step: 'boil', step_number: '1', recipe_id: 2 }
      ]);
    });
};
