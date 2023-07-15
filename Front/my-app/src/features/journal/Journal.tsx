import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, createJournalEntry, updateJournalEntry, deleteJournalEntry, selectJournals, selectViewedData, updateViewJournal } from './journalSlice';
import { selectUserId, getUserIdAsync, navigateToHome } from '../login/loginSlice';
import { Form, Button, Row, Col, InputGroup, Container, Card, Modal } from 'react-bootstrap';
import ViewandUpdate from './VIewandUpdate';


const JournalPage = () => {
  const dispatch = useAppDispatch();
  const journals = useAppSelector(selectJournals);
  const userid = useAppSelector(selectUserId);

  console.log('User ID:', userid);

  const viewjournal = useAppSelector(selectJournals);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [journalData, setJournalData] = useState({
    strategy: '',
    description: '',
    entryprice: '',
    exitprice: '',
    position: '',
    instrument: '',
    date: '',
    time: '',
    image: null as File | null,
    user: userid,
    quantity: '',
    winorlose: '',
    showAddForm: false,
  });


  useEffect(() => {
    console.log(journals);
    if (userid !== null) {
      dispatch(getAllJournals(userid));
    }
    dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));

    console.log("user", userid);
  }, [dispatch, userid]);


  const handleAdd = () => {
    if (
      !journalData.strategy ||
      !journalData.description ||
      !journalData.entryprice ||
      !journalData.exitprice ||
      !journalData.position ||
      !journalData.instrument ||
      !journalData.quantity ||
      !journalData.winorlose
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (
      !/^\d{2}-\d{2}-\d{4}$/.test(journalData.date) ||
      !/^\d{2}:\d{2}$/.test(journalData.time)
    ) {
      alert('Please enter a valid date and time format (DD-MM-YYYY HH:MM).');
      return;
    }

    const dateParts = journalData.date.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const formattedTime = journalData.time;

    const formData = new FormData();
    formData.append('strategy', journalData.strategy);
    formData.append('description', journalData.description);
    formData.append('entryprice', String(journalData.entryprice));
    formData.append('exitprice', String(journalData.exitprice));
    formData.append('position', journalData.position);
    formData.append('instrument', journalData.instrument);
    formData.append('date', formattedDate);
    formData.append('time', formattedTime);
    if (journalData.image !== null) {
      formData.append('image', journalData.image);
    }
    formData.append('user', String(userid));
    formData.append('quantity', String(journalData.quantity));
    formData.append('winorlose', journalData.winorlose);

    console.log('Form Data:', formData);

    dispatch(createJournalEntry(formData));

    setJournalData({
      strategy: '',
      description: '',
      entryprice: '',
      exitprice: '',
      position: '',
      instrument: '',
      date: '',
      time: '',
      image: null,
      user: userid,
      quantity: '',
      winorlose: '',
      showAddForm: false,
    });
  };

  const handleView = (journal: {
    id: any;
    strategy: any;
    entryprice: any;
    exitprice: any;
    position: any;
    description: any;
    instrument: any,
    date: any,
    time: any,
    image: any;
    user: any;
    quantity: any;
    winorlose: any;
  }) => {
    setJournalData({
      ...journalData,
      strategy: journal.strategy,
      entryprice: journal.entryprice,
      exitprice: journal.exitprice,
      position: journal.position,
      description: journal.description,
      instrument: journal.instrument,
      date: journal.date,
      time: journal.time,
      image: journal.image,
      user: journal.user,
      quantity: journal.quantity,
      winorlose: journal.winorlose,
      showAddForm: false,
    });

    console.log(journal); // Log the updated journal object to the console
    scrollToTop();
    dispatch(updateViewJournal(journal));

  };

  const handleDelete = (id: number) => {
    dispatch(deleteJournalEntry(id));
    console.log(id);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setJournalData({ ...journalData, image: file });
  };

  const toggleAddForm = () => {
    setJournalData({
      ...journalData, showAddForm: true, strategy: '', description: '',
      entryprice: '', exitprice: '', position: '', instrument: '', date: '', time: '',
      image: null, quantity: '', winorlose: ''
    });
  };




  const handleCloseForm = () => {
    setJournalData({
      strategy: '',
      description: '',
      entryprice: '',
      exitprice: '',
      position: '',
      instrument: '',
      date: '',
      time: '',
      image: null,
      user: userid,
      quantity: '',
      winorlose: '',
      showAddForm: false,
    });
  };

  return (
    <div>
      <ViewandUpdate></ViewandUpdate>
      <h1 style={{ marginTop: '50px' }}>Journal</h1>
      <div>
        <h3>Add Your New Trade</h3>
        {!journalData.showAddForm ? (
          <div className="d-flex justify-content-center">
            <Button variant="success" onClick={toggleAddForm}>
              Add Trade
            </Button>
          </div>

        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100 bg-green" style={{ marginTop: '150px' }}>


            <Form className="border border-black rounded p-4" style={{ width: '800px' }}>
              <h4>Please Fill All Fields Except Image to Add a Trade</h4>
              <Form.Group controlId="strategy">
                <Form.Label style={{ fontWeight: 'bold' }}>Strategy:</Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.strategy}
                  onChange={(e) => setJournalData({ ...journalData, strategy: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="instrument">
                <Form.Label style={{ fontWeight: 'bold' }}>Instrument:</Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.instrument}
                  onChange={(e) => setJournalData({ ...journalData, instrument: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label style={{ fontWeight: 'bold' }}>Date:</Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.date}
                  onChange={(e) => setJournalData({ ...journalData, date: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <Form.Group controlId="time">
                <Form.Label style={{ fontWeight: 'bold' }}>Time:</Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.time}
                  onChange={(e) => setJournalData({ ...journalData, time: e.target.value })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>


              <Form.Group controlId="position">
                <Form.Label style={{ fontWeight: 'bold' }}>Position:</Form.Label>
                <Form.Control
                  as="select"
                  value={journalData.position}
                  onChange={(e) => setJournalData({ ...journalData, position: e.target.value })}
                  className="text-center"
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                >
                  <option value="">Select Position</option>
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="entryprice">
                <Form.Label style={{ fontWeight: 'bold' }}>Entry Price:</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.entryprice}
                    onChange={(e) => setJournalData({ ...journalData, entryprice: e.target.value.replace(/^0+/, '') })}
                    required
                    style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="exitprice">
                <Form.Label style={{ fontWeight: 'bold' }}>Exit Price:</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#DDF7E3', border: '1px solid black', borderRight: "1" }}>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.exitprice}
                    onChange={(e) => setJournalData({ ...journalData, exitprice: e.target.value.replace(/^0+/, '') })}
                    required
                    style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label style={{ fontWeight: 'bold' }}>Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  value={journalData.quantity}
                  onChange={(e) => setJournalData({ ...journalData, quantity: e.target.value.replace(/^0+/, '') })}
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  onWheel={(e) => e.preventDefault()}
                />
              </Form.Group>

              <Form.Group controlId="winorlose">
                <Form.Label style={{ fontWeight: 'bold' }}>Win or Lose:</Form.Label>
                <Form.Control
                  as="select"
                  value={journalData.winorlose}
                  onChange={(e) => setJournalData({ ...journalData, winorlose: e.target.value })}
                  className="text-center"
                  required
                  style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                >
                  <option value="">Select Win or Lose</option>
                  <option value="Win">Win</option>
                  <option value="Lose">Lose</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label style={{ fontWeight: 'bold' }}>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ minHeight: '6rem', backgroundColor: '#DDF7E3', border: '1px solid black' }}
                  value={journalData.description}
                  onChange={(e) => setJournalData({ ...journalData, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label style={{ fontWeight: 'bold' }}>Image:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} style={{ backgroundColor: '#DDF7E3', border: '1px solid black' }}
                />
              </Form.Group>

              <br />

              <div className="d-flex justify-content-center">
                <Button variant="success" onClick={handleAdd} disabled={!journalData.strategy || !journalData.position || !journalData.entryprice || !journalData.exitprice || !journalData.quantity || !journalData.winorlose || !journalData.description}>
                  Add Trade
                </Button>
                <Button variant="danger" onClick={handleCloseForm}>
                  Close
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
      <hr style={{ marginTop: "120px" }} />


      {journals.length > 0 ? (
        <Container>
          <Row>
            {journals.map((journal) => (
              <Col key={journal.id} md={4} className="mb-4">
                <Card>
                  <Card.Body style={{ backgroundColor: '#DDF7E3', border: '1px solid #000' }}>
                    <Card.Text><strong>Position:</strong> {journal.position}</Card.Text>
                    <Card.Text><strong>Strategy:</strong> {journal.strategy}</Card.Text>
                    <Card.Text><strong>Instrument:</strong> {journal.instrument}</Card.Text>
                    <Card.Text><strong>Date:</strong> {new Date(journal.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</Card.Text>
                    <Card.Text><strong>Time:</strong> {journal.time.substring(0, 5)}</Card.Text>
                    <Card.Text><strong>Description:</strong> {journal.description}</Card.Text>
                    <Card.Text><strong>Entry Price:</strong> {journal.entryprice}$</Card.Text>
                    <Card.Text><strong>Exit Price:</strong> {journal.exitprice}$</Card.Text>
                    <Card.Text><strong>Quantity:</strong> {journal.quantity}</Card.Text>
                    <Card.Text><strong>Win or Lose:</strong> {journal.winorlose}</Card.Text>

                    {journal.position === 'Long' ? (
                      journal.winorlose === 'Win' ? (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.exitprice - journal.entryprice)}$</Card.Text>
                      ) : (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.entryprice - journal.exitprice)}$</Card.Text>
                      )
                    ) : (
                      journal.winorlose === 'Win' ? (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * Math.abs(journal.exitprice - journal.entryprice)}$</Card.Text>
                      ) : (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.exitprice - journal.entryprice)}$</Card.Text>
                      )
                    )}

                    {journal.image && <Card.Img variant="top" src={`http://127.0.0.1:8000${journal.image}`} alt="Trade" />}


                    <br /><br />
                    <Button variant="primary" style={{ backgroundColor: 'green' }} onClick={() => handleView(journal)}>
                      View
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(journal.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <p>No journal entries yet.</p>
      )}
    </div>
  );
};

export default JournalPage;
