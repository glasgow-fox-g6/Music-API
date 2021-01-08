'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User)
      // define association here
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    genre: {
        type: DataTypes.STRING
      },
      releaseDate: {
        type: DataTypes.DATEONLY
      },
      trackId: {
        type: DataTypes.INTEGER
      },
      appleStoreUrl: {
        type: DataTypes.STRING
      },
      previewUrl: {
        type: DataTypes.STRING
      },
      artworkUrl: {
        type: DataTypes.STRING
      },
      trackTimeMillis: {
        type: DataTypes.INTEGER,
      },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
