"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "BoardGames",
      [
        {
          title: "Carcassonne",
          summary: "Develop the landscape of a medieval fortress city one tile at a time. Whether blocking a city's growth or connecting with your opponent’s road to share the points, Carcassonne provides plenty of ways to use your cunning and outsmart your opponents.",
          company: "Hans im Glück",
          image: "https://source.unsplash.com/M8iNjXU4B5o/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Checkers",
          summary: "Abstract strategy game where players move disc-shaped pieces across an 8 by 8 cross-hatched or checker board. A player wins by removing all of his opponent's pieces from the board or by blocking the opponent so that he has no more moves.",
          company: "Public Domain",
          image: "https://source.unsplash.com/DC-UrroFRr4/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Chess",
          summary: "Chess is a two-player, abstract strategy board game that represents medieval warfare on an 8x8 board with alternating light and dark squares. Opposing pieces, traditionally designated White and Black, are initially lined up on either side. Each type of piece has a unique form of movement and capturing occurs when a piece, via its movement, occupies the square of an opposing piece.",
          company: "Public Domain",
          image: "https://source.unsplash.com/8Bc9CJgXHXs/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Concordia",
          summary: "Two thousand years ago, the Roman Empire ruled the lands around the Mediterranean Sea. With peace at the borders, harmony inside the provinces, uniform law, and a common currency, the economy thrived and gave rise to mighty Roman dynasties as they expanded throughout the numerous cities. Guide one of these dynasties and send colonists to the remote realms of the Empire.",
          company: "PD-Verlag",
          image: "https://source.unsplash.com/NrS53eUKgiE/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Dominoes",
          summary: "A traditional tile game played in many different cultures around the world. This entry is for Western Dominoes; the standard set being the 28 'Double Six' tiles. Chinese Dominoes use a 32 tile set with different distributions.",
          company: "Public Domain",
          image: "https://source.unsplash.com/8pwPnveOEiE/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Merv: The Heart of the Silk Road",
          summary: "Merv: The Heart of the Silk Road is a tense economic game charting the rise and fall of the greatest city in the world. In Merv, players are vying to amass power and wealth in the prosperous heart of the Silk Road. Through careful court intrigue, timely donations to the grand mosque, and favorable trade deals, players attempt to redirect as much of that prosperity as possible into their own pockets.",
          company: "Osprey Games",
          image: "https://source.unsplash.com/fwRMK19zavc/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Monoply",
          summary: "It's the fast-dealing property trading game where players buy, sell, dream and scheme their way to riches. This version of the Monopoly game welcomes the Rubber Ducky, Tyrannosaurus Rex, and Penguin into its family of tokens. Choose your token, place it on GO! and roll the dice to own it all! There can be only one winner in the Monopoly game. Will it be you?.",
          company: "Hasbro",
          image: "https://source.unsplash.com/c-jTL24e50c/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Parcheesi",
          summary: "Pachisi, also called Ludo, or Parcheesi, board game, sometimes called the national game of India. Race your pawns around the gameboard from start to home. Capture opponents, from blockades and do a little artful dodging to escape.",
          company: "Samuel Loyd",
          image: "https://source.unsplash.com/3WceTBlUoMs/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Risk",
          summary: "Possibly the most popular, mass market war game. The goal is conquest of the world. Players control countries or regions on a map of the world, and through simple combat (dice-rolling) they try to eliminate all opponents from the game board.",
          company: "Hasbro",
          image: "https://source.unsplash.com/BDIFIT1ILDs/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Scrabble",
          summary: "In this classic word game, players use their seven drawn letter-tiles to form words on the gameboard. Each word laid out earns points based on the commonality of the letters used, with certain board spaces giving bonuses. But a word can only be played if it uses at least one already-played tile or adds to an already-played word. ",
          company: "Public Domain",
          image: "https://source.unsplash.com/LI03w3L-PxU/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Settlers of Catan",
          summary: "Trade, build and settle the Island of CATAN in this addictively fun strategy game previously called Settlers of CATAN. Players control their own civilization and look to spread across a modular hex board in a competition for victory points.",
          company: "Kosmos",
          image: "https://source.unsplash.com/w7eaCH6ShR4/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "The Game of Life",
          summary: "This game attempts to mirror life events many people go through from going to college, raising a family, buying a home, working and retiring. The intent of the game is to have the most assets at the end of the game, assets are earned primarily by working and earning tokens with dollars amount on them.",
          company: "Basic Fun, Inc.",
          image: "https://source.unsplash.com/KJMz5Tmbw0k/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ticket to Ride",
          summary: "Ticket to Ride is a cross-country train adventure game in which players collect and play matching train cards to claim railway routes connecting cities through North America! Build your tracks across the United States in this fast-paced and strategic board game.",
          company: "Days of Wonder",
          image: "https://source.unsplash.com/FdTmaUlEr4A/1920x1080",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "7 Wonders",
          summary: "Players draft cards over multiple rounds, carefully building towards long-term goals. Keep an eye on your neighbors’ progress since they share similar ambitions. Will your wonder transcend the millennia to come?",
          company: "Repos Production",
          image: "https://cf.geekdo-images.com/EuAV8fsFNzBBuL7f9h6Arw__imagepagezoom/img/onDwiX61pILOyr80BdPAaAV_6W8=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic806195.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // {
        //   title: "Chutes and Ladders",
        //   summary: "",
        //   company: "",
        //   image: "https://source.unsplash.com/xxx/1920x1080",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   title: "Clue",
        //   summary: "",
        //   company: "",
        //   image: "https://source.unsplash.com/xxx/1920x1080",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   title: "Code Names",
        //   summary: "",
        //   company: "",
        //   image: "https://source.unsplash.com/xxx/1920x1080",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   title: "Sorry",
        //   summary: "",
        //   company: "",
        //   image: "https://source.unsplash.com/xxx/1920x1080",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   title: "",
        //   summary: "",
        //   company: "",
        //   image: "https://source.unsplash.com/xxx/1920x1080",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BoardGames", null, {});
  },
};
