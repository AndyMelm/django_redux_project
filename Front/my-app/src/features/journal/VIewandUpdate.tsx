import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectViewedData, closeViewedData, updateJournalEntry } from './journalSlice';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { selectUserId , } from '../login/loginSlice';

const ViewandUpdate = () => {
  const dispatch = useAppDispatch();
  const viewedData = useAppSelector(selectViewedData);
  const userid = useAppSelector(selectUserId);
  const [showForm, setShowForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    strategy: '',
    description: '',
    buyprice: '',
    sellprice: '',
    position: '',
    image: null as File | null,
    user: userid,
    quantity: '',
    winorlose: '',
    showAddForm: false,
  });
  

  const handleViewinviewandupdate = (viewedData: any) => {
    console.log(viewedData); // Log the data to the console
  };

  const handleUpdate = () => {
    const updatedEntry = {
      id: viewedData.id,
      strategy: updatedData.strategy,
      description: updatedData.description,
      buyprice: updatedData.buyprice,
      sellprice: updatedData.sellprice,
      position: updatedData.position,
      image: updatedData.image,
      user: userid,
      quantity: updatedData.quantity,
      winorlose: updatedData.winorlose,
    };
    console.log(updatedEntry)
    dispatch(updateJournalEntry(updatedEntry));
  };

  useEffect(() => {
    handleViewinviewandupdate(viewedData);
    if (viewedData) {
      setUpdatedData(viewedData);
    }
  }, [viewedData]);

  if (!viewedData) {
    return <div></div>;
  }

  return (
    <div>
      <div className="selected-trade">
        <div className="container border-custom">
          <h3>
            <strong>Your Selected Trade</strong>
          </h3>
          <p>
            <strong>Position:</strong> {viewedData.position}
          </p>
          <p>
            <strong>Strategy:</strong> {viewedData.strategy}
          </p>
          <p>
            <strong>Description:</strong> {viewedData.description}
          </p>
          <p>
            <strong>Buy Price:</strong> {viewedData.buyprice}
          </p>
          <p>
            <strong>Sell Price:</strong> {viewedData.sellprice}
          </p>
          <p>
            <strong>Quantity:</strong> {viewedData.quantity}
          </p>
          <p>
            <strong>Win or Lose:</strong> {viewedData.winorlose}
          </p>
          {viewedData.position === 'Long' ? (
            viewedData.winorlose === 'Win' ? (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.sellprice - viewedData.buyprice)}
              </p>
            ) : (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.buyprice - viewedData.sellprice)}
              </p>
            )
          ) : (
            viewedData.winorlose === 'Win' ? (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * Math.abs(viewedData.sellprice - viewedData.buyprice)}
              </p>
            ) : (
              <p>
                <strong>Profit/Loss:</strong> {viewedData.quantity * (viewedData.sellprice - viewedData.buyprice)}
              </p>
            )
          )}
        </div>
        {viewedData.image && <img className="responsive-image" src={`http://127.0.0.1:8000${viewedData.image}`} alt="Trade" />}
      </div>

      {showForm ? (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <Form  className="border border-secondary rounded p-4" style={{ width: '800px' }}>
            <Form.Group controlId="formStrategy">
            <Form.Label  style={{ fontSize: '16px', fontWeight: 'bold' }}>Update Form</Form.Label> <br />
              <Form.Label>Strategy</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.strategy}
                onChange={(e) => setUpdatedData({ ...updatedData, strategy: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.position}
                onChange={(e) => setUpdatedData({ ...updatedData, position: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBuyPrice">
              <Form.Label>Buy Price</Form.Label>
              <Form.Control
                type="number"
                value={updatedData.buyprice}
                onChange={(e) => setUpdatedData({ ...updatedData, buyprice: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formSellPrice">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                type="number"
                value={updatedData.sellprice}
                onChange={(e) => setUpdatedData({ ...updatedData, sellprice: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={updatedData.quantity}
                onChange={(e) => setUpdatedData({ ...updatedData, quantity: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formWinLose">
              <Form.Label>Win or Lose</Form.Label>
              <Form.Control
                type="text"
                value={updatedData.winorlose}
                onChange={(e) => setUpdatedData({ ...updatedData, winorlose: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedData.description}
                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
        </div>
      ) : (
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Update Trade
        </Button>
      )}

      <Button variant="danger" onClick={() => { dispatch(closeViewedData()); setShowForm(false); }}>
        Close
      </Button>
      <hr />

    </div>
  );
};

export default ViewandUpdate;
