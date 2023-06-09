import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, createJournalEntry, updateJournalEntry, deleteJournalEntry, selectJournals } from './journalSlice';
import { Journal } from '../../Models/Journal';
import {selectUserId} from '../login/loginSlice'

const JournalPage = () => {
  const dispatch = useAppDispatch();
  const journals = useAppSelector(selectJournals);
  const userid = useAppSelector(selectUserId)
  const [journalData, setJournalData] = useState<Partial<Journal>>({});
  const { strategy, description, buyprice, sellprice, position, image, user } = journalData;

  useEffect(() => {
    dispatch(getAllJournals());
  }, [dispatch]);

  const handleAdd = () => {
    const newJournal: Journal = {
      strategy: strategy || '',
      buyprice: buyprice || 0,
      sellprice: sellprice || 0,
      position: position || '',
      description: description || '',
      image: image || null,
      user: userid || 0
    };

    if (image instanceof File) {
      // If `image` is a `File` object, assign it to `newJournal.image`
      newJournal.image = image;
    }

    dispatch(createJournalEntry(newJournal));
    setJournalData({});
  };

  const handleUpdate = (journal: Journal) => {
    const updatedJournal: Journal = {
      id: journal.id,
      strategy: strategy || journal.strategy,
      buyprice: buyprice || journal.buyprice,
      sellprice: sellprice || journal.sellprice,
      position: position || journal.position,
      description: description || journal.description,
      image: image || journal.image,
      user: userid|| journal.user,
    };

    dispatch(updateJournalEntry(updatedJournal));
    setJournalData({});
  };

  const handleDelete = (id: number) => {
    dispatch(deleteJournalEntry(id));
    console.log(id)
  };

  return (
    <div>
      <h1>Journal</h1>
      <label htmlFor="strategy">Strategy:</label>
      <input
        type="text"
        id="strategy"
        value={strategy || ''}
        onChange={(e) => setJournalData({ ...journalData, strategy: e.target.value })}
      />

      <label htmlFor="position">Position:</label>
      <select id="position" value={position || ''} onChange={(e) => setJournalData({ ...journalData, position: e.target.value })}>
        <option value="">Select Position</option>
        <option value="Long">Long</option>
        <option value="Short">Short</option>
      </select>

      <label htmlFor="buyprice">Buy Price:</label>
      <input
        type="number"
        id="buyprice"
        value={buyprice || ''}
        onChange={(e) => setJournalData({ ...journalData, buyprice: +e.target.value })}
      />

      <label htmlFor="sellprice">Sell Price:</label>
      <input
        type="number"
        id="sellprice"
        value={sellprice || ''}
        onChange={(e) => setJournalData({ ...journalData, sellprice: +e.target.value })}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description || ''}
        onChange={(e) => setJournalData({ ...journalData, description: e.target.value })}
      />

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        onChange={(e) => setJournalData({ ...journalData, image: e.target.files?.[0] })}
      />

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

            {journal.position === 'Long' ? (
              <p>Profit/Loss: {journal.sellprice - journal.buyprice}</p>
            ) : (
              <p>Profit/Loss: {Math.abs(journal.sellprice - journal.buyprice)}</p>
            )}

            <button onClick={() => handleUpdate(journal)}>Update</button>
            <button onClick={() => handleDelete(journal.id || 0)} >Delete</button>
          </div>
        ))
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default JournalPage;
