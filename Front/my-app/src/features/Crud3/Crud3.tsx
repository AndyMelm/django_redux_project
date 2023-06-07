import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Journal } from '../../Models/Crud3';
import { addAsync, deleteAsync, getAllAsync, selectJournals, updateAsync } from './Crud3Slice';

const Crud3 = () => {
  const dispatch = useAppDispatch();
  const journals = useAppSelector(selectJournals);
  const [journal, setJournal] = useState<Journal>({
    id: 0,
    strategy: '',
    buyprice: 0,
    sellprice: 0,
    position: '',
    description: '',
    user_id: 0,
  });

  useEffect(() => {
    dispatch(getAllAsync());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJournal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    dispatch(addAsync(journal));
    setJournal({
      id: 0,
      strategy: '',
      buyprice: 0,
      sellprice: 0,
      position: '',
      description: '',
      user_id: 0,
    });
  };

  const handleUpdateClick = (id: number) => {
    dispatch(updateAsync({ id, journal }));
    setJournal({
      id: 0,
      strategy: '',
      buyprice: 0,
      sellprice: 0,
      position: '',
      description: '',
      user_id: 0,
    });
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteAsync(id));
  };

  return (
    <div>
      <h1>CRUD</h1>
      <div>
        <label htmlFor="strategy">Strategy:</label>
        <input type="text" id="strategy" name="strategy" value={journal.strategy} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="buyprice">Buy Price:</label>
        <input
          type="number"
          id="buyprice"
          name="buyprice"
          value={journal.buyprice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="sellprice">Sell Price:</label>
        <input
          type="number"
          id="sellprice"
          name="sellprice"
          value={journal.sellprice}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="position">Position:</label>
        <input type="text" id="position" name="position" value={journal.position} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={journal.description} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={handleAddClick}>Add Data</button>
        <button onClick={() => dispatch(getAllAsync())}>Load Data</button>
      </div>
      <div>
        {journals.map((j) => (
          <div key={j.id}>
            {j.strategy} : {j.buyprice} - {j.sellprice}
            <button onClick={() => handleDeleteClick(j.id)}>Delete</button>
            <button onClick={() => handleUpdateClick(j.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crud3;
