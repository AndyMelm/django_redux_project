import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, createJournalEntry, updateJournalEntry, deleteJournalEntry, selectJournals } from './journalSlice';
import { selectUserId } from '../login/loginSlice';

const JournalPage = () => {
  const dispatch = useAppDispatch();
  const journals = useAppSelector(selectJournals);
  const userid = useAppSelector(selectUserId);
  const [journalData, setJournalData] = useState({
    strategy: '',
    description: '',
    buyprice: '',
    sellprice: '',
    position: '',
    image: null as File | null,
    user: 0,
    quantity: '',
    winorlose: '',
  });

  useEffect(() => {
    dispatch(getAllJournals());
  }, [dispatch]);

  const handleAdd = () => {
    const formData = new FormData();
    formData.append('strategy', journalData.strategy);
    formData.append('description', journalData.description);
    formData.append('buyprice', String(journalData.buyprice));
    formData.append('sellprice', String(journalData.sellprice));
    formData.append('position', journalData.position);
    if (journalData.image !== null) {
      formData.append('image', journalData.image);
    }
    formData.append('user', String(userid));
    formData.append('quantity', String(journalData.quantity));
    formData.append('winorlose', journalData.winorlose);

    dispatch(createJournalEntry(formData));
    setJournalData({
      strategy: '',
      description: '',
      buyprice: '',
      sellprice: '',
      position: '',
      image: null,
      user: 0,
      quantity: '',
      winorlose: '',
    });
  };

  const handleUpdate = (journal: {
    id: any;
    strategy: any;
    buyprice: any;
    sellprice: any;
    position: any;
    description: any;
    image: any;
    user: any;
    quantity: any;
    winorlose: any;
  }) => {
    const updatedJournal = {
      id: journal.id,
      strategy: journalData.strategy || journal.strategy,
      buyprice: journalData.buyprice || journal.buyprice,
      sellprice: journalData.sellprice || journal.sellprice,
      position: journalData.position || journal.position,
      description: journalData.description || journal.description,
      image: journalData.image || journal.image,
      user: userid || journal.user,
      quantity: journalData.quantity || journal.quantity,
      winorlose: journalData.winorlose || journal.winorlose,
    };

    dispatch(updateJournalEntry(updatedJournal));
    setJournalData({
      strategy: '',
      description: '',
      buyprice: '',
      sellprice: '',
      position: '',
      image: null,
      user: 0,
      quantity: '',
      winorlose: '',
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteJournalEntry(id));
    console.log(id);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setJournalData({ ...journalData, image: file });
  };

  return (
    <div>
      <h1>Journal</h1>
      <label htmlFor="strategy">Strategy:</label>
      <input
        type="text"
        id="strategy"
        value={journalData.strategy}
        onChange={(e) => setJournalData({ ...journalData, strategy: e.target.value })}
      />

      <label htmlFor="position">Position:</label>
      <select
        id="position"
        value={journalData.position}
        onChange={(e) => setJournalData({ ...journalData, position: e.target.value })}
      >
        <option value="">Select Position</option>
        <option value="Long">Long</option>
        <option value="Short">Short</option>
      </select>

      <label htmlFor="buyprice">Buy Price:</label>
      <input
        type="number"
        id="buyprice"
        value={journalData.buyprice}
        onChange={(e) => setJournalData({ ...journalData, buyprice: e.target.value.replace(/^0+/, '') })}
      />

      <label htmlFor="sellprice">Sell Price:</label>
      <input
        type="number"
        id="sellprice"
        value={journalData.sellprice}
        onChange={(e) => setJournalData({ ...journalData, sellprice: e.target.value.replace(/^0+/, '') })}
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={journalData.quantity}
        onChange={(e) => setJournalData({ ...journalData, quantity: e.target.value.replace(/^0+/, '') })}
      />

      <label htmlFor="winorlose">Win or Lose:</label>
      <select
        id="winorlose"
        value={journalData.winorlose}
        onChange={(e) => setJournalData({ ...journalData, winorlose: e.target.value })}
      >
        <option value="">Select Win or Lose</option>
        <option value="Win">Win</option>
        <option value="Lose">Lose</option>
      </select>

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={journalData.description}
        onChange={(e) => setJournalData({ ...journalData, description: e.target.value })}
      />

      <label htmlFor="image">Image:</label>
      <input type="file" id="image" onChange={handleImageChange} />

      <button onClick={handleAdd}>Add Trade</button>

      <hr />

      {journals.length > 0 ? (
        journals.map((journal) => (
          <div key={journal.id}>
            <p>Position: {journal.position}</p>
            <p>Strategy: {journal.strategy}</p>
            <p>Description: {journal.description}</p>
            <p>Buy Price: {journal.buyprice}</p>
            <p>Sell Price: {journal.sellprice}</p>
            <p>Quantity: {journal.quantity}</p>
            <p>Win or Lose: {journal.winorlose}</p>

            {journal.position === 'Long' ? (
              journal.winorlose === 'Win' ? (
                <p>Profit/Loss: {journal.quantity * (journal.sellprice - journal.buyprice)}</p>
              ) : (
                <p>Profit/Loss: {journal.quantity * (journal.buyprice - journal.sellprice)}</p>
              )
            ) : (
              journal.winorlose === 'Win' ? (
                <p>Profit/Loss: {journal.quantity * Math.abs(journal.sellprice - journal.buyprice)}</p>
              ) : (
                <p>Profit/Loss: {journal.quantity * (journal.sellprice - journal.buyprice)}</p>
              )
            )}

            <button onClick={() => handleUpdate(journal)}>Update</button>
            <button onClick={() => handleDelete(journal.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default JournalPage;
