'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATEONLY
      },
      trackId: {
        type: Sequelize.INTEGER
      },
      appleStoreUrl: {
        type: Sequelize.STRING
      },
      previewUrl: {
        type: Sequelize.STRING
      },
      artworkUrl: {
        type: Sequelize.STRING
      },
      trackTimeMillis: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users' },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};
