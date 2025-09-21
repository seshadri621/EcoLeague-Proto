import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Icon from '../../../components/AppIcon';

const ItemTypes = { TRASH: 'trash' };

const TrashItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TRASH,
    item: { id: item.id, category: item.category },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div ref={drag} className={`p-2 bg-gray-100 rounded-lg text-center ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <Icon name={item.icon} size={40} />
      <p className="text-sm">{item.name}</p>
    </div>
  );
};

const Bin = ({ category, icon, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TRASH,
    drop: (item) => onDrop(item, category),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <div ref={drop} className={`p-4 border-2 border-dashed rounded-lg text-center ${isOver ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}>
      <Icon name={icon} size={48} />
      <p className="mt-2 font-bold">{category}</p>
    </div>
  );
};

const RecycleRushGame = () => {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const allItems = [
    { id: 1, name: 'Bottle', category: 'Recycle', icon: 'GlassWater' },
    { id: 2, name: 'Apple Core', category: 'Compost', icon: 'Apple' },
    { id: 3, name: 'Newspaper', category: 'Recycle', icon: 'Newspaper' },
    { id: 4, name: 'Battery', category: 'Hazardous', icon: 'Battery' },
    { id: 5, name: 'Plastic Bag', category: 'Trash', icon: 'ShoppingBag' },
  ];

  useEffect(() => {
    setItems(allItems.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleDrop = (item, binCategory) => {
    if (item.category === binCategory) {
      setScore(score + 10);
      setItems(items.filter((i) => i.id !== item.id));
    } else {
      setScore(score - 5);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setItems(allItems.sort(() => Math.random() - 0.5));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recycle Rush</h2>
          <div className="text-xl">Score: {score} | Time Left: {timeLeft}s</div>
        </div>

        {gameOver ? (
          <div className="text-center">
            <h3 className="text-3xl font-bold">Game Over!</h3>
            <p className="text-xl my-4">Your final score is {score}</p>
            <button onClick={restartGame} className="px-4 py-2 bg-green-500 text-white rounded-lg">Play Again</button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {items.map((item) => <TrashItem key={item.id} item={item} />)}
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Bin category="Recycle" icon="Recycle" onDrop={handleDrop} />
              <Bin category="Compost" icon="Sprout" onDrop={handleDrop} />
              <Bin category="Hazardous" icon="Radiation" onDrop={handleDrop} />
              <Bin category="Trash" icon="Trash2" onDrop={handleDrop} />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default RecycleRushGame;
