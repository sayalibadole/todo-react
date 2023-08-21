import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else {
      showAlert(true, 'success', 'task added!');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'task removed');
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className='app-container'>
      <h3>todo today</h3>
    <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className='form-control'>
          <input
            type='text'
            className='todo'
            placeholder='enter your todo task'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      {list.length > 0 && (
        <div className='todo-container'>
          <List items={list} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
    </div>
  );
}

export default App;