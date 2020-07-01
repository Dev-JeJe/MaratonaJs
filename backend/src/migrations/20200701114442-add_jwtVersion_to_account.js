/*
  o migration server para caso queria fazer uma implementação no banco
  → criando um migration:
   → 1º: precisa criar um arquivo .sequelizerc e configura-lo como quiser
   → 2º: ir no terminal e digitar 'npx sequelize-cli migration:create --name (add_jwtVersion_to_account = nome do arquivo do migration)'
  → utilizando o migration:
   → 1º: após gerar o arquivo do migration é só configurar o que vai querer adicionar ou deletar
   → 2º: ir no terminar e digitar 'npx sequelize-cli db:migrate' que irá criar no banco o que foi pedido
*/
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
     
      Example:
      await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     return queryInterface.addColumn('Accounts', 'jwtVersion', {
       type: Sequelize.INTEGER,
       allowNull: false,
       after: 'password',
       defaultValue: 0
     })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
     
      Example:
      await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Accounts', 'jwtVersion');
  }
};
