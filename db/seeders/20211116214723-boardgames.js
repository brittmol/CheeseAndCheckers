"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "BoardGames",
      [
        {
          title: "Checkers",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Checkers Inc.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81qe4VEfaFS.__AC_SY300_SX300_QL70_FMwebp_.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Chess",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Chess Inc.",
          image: "https://cdn.shopify.com/s/files/1/0121/2740/4090/products/3224-familyclassics-chess-box-1112-v-700x442_1200x1200.png?v=1611505351",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Monoply",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Monopoly Dude Inc.",
          image: "https://media.istockphoto.com/photos/monopoly-board-game-box-picture-id458577337",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Chutes and Ladders",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Stuff people Inc.",
          image: "https://www.ultraboardgames.com/img/slideshow/chutes-and-ladders.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Life",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "God",
          image: "https://cf.geekdo-images.com/c4S2XDRb_DCYCAV-ZAzDpg__imagepage/img/w6c1ugeBPWsIC5d-nX9vHZ4l0jo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic288405.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BoardGames", null, {});
  },
};
