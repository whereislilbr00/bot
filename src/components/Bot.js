import React, { useState, useEffect } from 'react';
import BotArmy from './BotArmy';
import Delete from './Delete';

function Bot({ bots }) {
  const [army, setArmy] = useState([]);
  const [clickedBots, setClickedBots] = useState({});
  const [sortedBots, setSortedBots] = useState([]);

  useEffect(() => {
    setSortedBots([...bots]);
  }, [bots]);

  const handleClick = (bot) => {
    setArmy([...army, bot]);
  };

  const toggleDetails = (botId) => {
    setClickedBots((prevClickedBots) => ({
      ...prevClickedBots,
      [botId]: !prevClickedBots[botId],
    }));
  };

  const sortBotArmy = (criteria) => {
    const sorted = [...sortedBots].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a[criteria] - b[criteria];
      }
    });
    setSortedBots(sorted);
  };

  return (
    <div>
      <BotArmy arr={army} updateBotArmy={setArmy} />
      <div>
        <h1>ALL BOTS</h1>
        <button onClick={() => sortBotArmy('name')}>Sort by Name</button>
        <button onClick={() => sortBotArmy('health')}>Sort by Health</button>
        <button onClick={() => sortBotArmy('damage')}>Sort by Damage</button>
        <button onClick={() => sortBotArmy('armor')}>Sort by Armor</button>
      </div>
      <div className='box-container'>
        {sortedBots.map((bot) => (
          <div key={bot.id} className='box'>
            <img
              src={bot.avatar_url}
              alt={bot.name}
              onClick={() => toggleDetails(bot.id)}
            />
            <h3>{bot.name}</h3>
            <h4>{bot.bot_class}</h4>

            {clickedBots[bot.id] && (
              <div>
                <div className="details">
                  <p>Health {bot.health}</p>
                  <br/>
                  <p>Damage {bot.damage}</p>
                  <br/>
                  <p>Armor {bot.armor}</p>
                </div>
                <br />
                <Delete element={bot} />
              </div>
            )}

            <button onClick={() => handleClick(bot)}>Add to Army</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bot;