import React, { useState, useEffect } from 'react';

function BotArmy({ arr, updateBotArmy }) {
  if (typeof updateBotArmy!== 'function') {
    throw new Error('updateBotArmy must be a function');
  }

  const [botArmy, setBotArmy] = useState([]);

  useEffect(() => {
    setBotArmy(arr);
  }, [arr]);

  // Function to sort the bot army based on a specific property
  const sortBotArmy = (property) => {
    const sortedArmy = [...botArmy].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setBotArmy(sortedArmy);
  };

  const handleClick = (bot) => {
    const updatedBotArmy = botArmy.filter((army) => army.id!== bot.id);
    updateBotArmy(updatedBotArmy);
  };

  return (
    <div className="container">
      <h1>MY ARMY</h1>
      <button onClick={() => sortBotArmy('name')}>Sort by Name</button>
      <button onClick={() => sortBotArmy('health')}>Sort by Health</button>
      <button onClick={() => sortBotArmy('damage')}>Sort by Damage</button>
      <button onClick={() => sortBotArmy('armor')}>Sort by Armor</button>
      {botArmy.map((bot) => (
        <div
          className={`box ${arr.some((armyBot) => armyBot.id === bot.id)? 'blue-background' : ''}`}
          key={bot.id}
        >
          <img src={bot.avatar_url} alt={bot.name} />
          <br />
          <h3>{bot.name}</h3>
          <h4>{bot.bot_class}</h4>
          <button type="button" onClick={() => handleClick(bot)}>
            Release
          </button>
        </div>
      ))}
    </div>
  );
}

export default BotArmy;