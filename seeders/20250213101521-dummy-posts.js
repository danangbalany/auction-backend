'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('posts', [{
      title: 'Hello World',
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      tags: 'hello,world',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Lorem Ipsum',
      content: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tags: 'lorem,ipsum',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
