import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem }) => {
  const [doneItems, setDoneItems] = useState([]); // Make sure to import useState

  const toggleDone = (id) => {
    if (doneItems.includes(id)) {
      setDoneItems(doneItems.filter(item => item !== id));
    } else {
      setDoneItems([...doneItems, id]);
    }
  };

  return (
    <div className='todo-list'>
      {items.map((item) => {
        const { id, title } = item;
        const isDone = doneItems.includes(id);

        return (
          <article
            className={`todo-item${isDone ? ' done' : ''}`}
            key={id}
            onClick={() => toggleDone(id)}
          >
            <p className={`title${isDone ? ' done' : ''}`}>{title}</p>
            <div className='btn-container'>
              <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
