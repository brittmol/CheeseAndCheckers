"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "BoardGames",
      [
        {
          title: "Settlers of Catan",
          summary: "Trade, build and settle the Island of CATAN in this addictively fun strategy game previously called Settlers of CATAN. Players control their own civilization and look to spread across a modular hex board in a competition for victory points.",
          company: "Kosmos",
          image: "https://source.unsplash.com/w7eaCH6ShR4/1920x1080",
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
          title: "Merv: The Heart of the Silk Road",
          summary: "Merv: The Heart of the Silk Road is a tense economic game charting the rise and fall of the greatest city in the world. In Merv, players are vying to amass power and wealth in the prosperous heart of the Silk Road. Through careful court intrigue, timely donations to the grand mosque, and favorable trade deals, players attempt to redirect as much of that prosperity as possible into their own pockets.",
          company: "Osprey Games",
          image: "https://source.unsplash.com/fwRMK19zavc/1920x1080",
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
          title: "Chess",
          summary: "Chess is a two-player, abstract strategy board game that represents medieval warfare on an 8x8 board with alternating light and dark squares. Opposing pieces, traditionally designated White and Black, are initially lined up on either side. Each type of piece has a unique form of movement and capturing occurs when a piece, via its movement, occupies the square of an opposing piece.",
          company: "Public Domain",
          image: "https://source.unsplash.com/8Bc9CJgXHXs/1920x1080",
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
