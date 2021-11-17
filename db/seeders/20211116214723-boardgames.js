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
          image: "https://media.wired.com/photos/5f592bfb643fbe1f6e6807ec/16:9/w_2400,h_1350,c_limit/business_chess_1200074974.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Monoply",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Monopoly Dude Inc.",
          image: "https://images.heb.com/is/image/HEBGrocery/000176249?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Chutes and Ladders",
          summary: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
          company: "Stuff people Inc.",
          image: "https://images-na.ssl-images-amazon.com/images/I/91KHM1l9qmL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
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
