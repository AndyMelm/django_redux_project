import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllJournals, createJournalEntry, updateJournalEntry, deleteJournalEntry, selectJournals, selectViewedData, updateViewJournal } from './journalSlice';
import { selectUserId , } from '../login/loginSlice';
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
    buyprice: '',
    sellprice: '',
    position: '',
    image: null as File | null,
    user: userid,
    quantity: '',
    winorlose: '',
    showAddForm: false,
  });
  

  useEffect(() => {
    console.log(journals);
    dispatch(getAllJournals());
    console.log("user" ,userid)
  }, [dispatch]);

  const handleAdd = () => {
    if (
      !journalData.strategy ||
      !journalData.description ||
      !journalData.buyprice ||
      !journalData.sellprice ||
      !journalData.position ||
      !journalData.quantity ||
      !journalData.winorlose
    ) {
      alert('Please fill in all the required fields.');
      return;
    }
    console.log('strategy:', journalData.strategy);
    console.log('description:', journalData.description);
    console.log('buyprice:', journalData.buyprice);
    console.log('sellprice:', journalData.sellprice);
    console.log('position:', journalData.position);
    console.log('image:', journalData.image);
    console.log('user:', String(userid));
    console.log('quantity:', journalData.quantity);
    console.log('winorlose:', journalData.winorlose);

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

    console.log('Form Data:', formData); 

    dispatch(createJournalEntry(formData));
    console.log(formData)
    setJournalData({
      strategy: '',
      description: '',
      buyprice: '',
      sellprice: '',
      position: '',
      image: null,
      user:userid,
      quantity: '',
      winorlose: '',
      showAddForm: false,
    });
  };
  const handleView = (journal: {
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
    setJournalData({
      ...journalData,
      strategy: journal.strategy,
      buyprice: journal.buyprice,
      sellprice: journal.sellprice,
      position: journal.position,
      description: journal.description,
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
//  const handleUpdate = (journal: {
//   id: any;
//   strategy: any;
//   buyprice: any;
//   sellprice: any;
//   position: any;
//   description: any;
//   image: any;
//   user: any;
//   quantity: any;
//   winorlose: any;
// }) => {
//   const updatedJournal = {
//     id: journal.id,
//     strategy: journalData.strategy || journal.strategy,
//     buyprice: journalData.buyprice || journal.buyprice,
//     sellprice: journalData.sellprice || journal.sellprice,
//     position: journalData.position || journal.position,
//     description: journalData.description || journal.description,
//     image: journalData.image === null ? null : journalData.image || journal.image,
//     user: userid || journal.user,
//     quantity: journalData.quantity || journal.quantity,
//     winorlose: journalData.winorlose || journal.winorlose,
//   };

//   dispatch(updateJournalEntry(updatedJournal));
//   setJournalData({
//     strategy: '',
//     description: '',
//     buyprice: '',
//     sellprice: '',
//     position: '',
//     image: null,
//     user: 0,
//     quantity: '',
//     winorlose: '',
//     showAddForm: false,
//   });
// };


  const handleDelete = (id: number) => {
    dispatch(deleteJournalEntry(id));
    console.log(id);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setJournalData({ ...journalData, image: file });
  };

  const toggleAddForm = () => {
    setJournalData({ ...journalData, showAddForm: !journalData.showAddForm });
  };

 

  const handleCloseForm = () => {
    setJournalData({
      strategy: '',
      description: '',
      buyprice: '',
      sellprice: '',
      position: '',
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
      <h1>Journal</h1>
      <div>
        <h3>Add Your New Trade</h3>
        {!journalData.showAddForm ? (
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={toggleAddForm}>
              Add Trade
            </Button>
          </div>

        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">


            <Form className="border border-secondary rounded p-4" style={{ width: '800px' }}>
              <h4>Please Fill All Fields Except Image to Add a Trade</h4>
              <Form.Group controlId="strategy">
                <Form.Label style={{ fontWeight: 'bold' }}>Strategy:</Form.Label>
                <Form.Control
                  type="text"
                  value={journalData.strategy}
                  onChange={(e) => setJournalData({ ...journalData, strategy: e.target.value })}
                  required
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
                >
                  <option value="">Select Position</option>
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="buyprice">
                <Form.Label style={{ fontWeight: 'bold' }}>Buy Price:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.buyprice}
                    onChange={(e) => setJournalData({ ...journalData, buyprice: e.target.value.replace(/^0+/, '') })}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="sellprice">
                <Form.Label style={{ fontWeight: 'bold' }}>Sell Price:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={journalData.sellprice}
                    onChange={(e) => setJournalData({ ...journalData, sellprice: e.target.value.replace(/^0+/, '') })}
                    required
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
                  style={{ minHeight: '6rem' }}
                  value={journalData.description}
                  onChange={(e) => setJournalData({ ...journalData, description: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label style={{ fontWeight: 'bold' }}>Image:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <br />

              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleAdd} disabled={!journalData.strategy || !journalData.position || !journalData.buyprice || !journalData.sellprice || !journalData.quantity || !journalData.winorlose || !journalData.description}>
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
      <hr />

    
      {journals.length > 0 ? (
        <Container>
          <Row>
            {journals.map((journal) => (
              <Col key={journal.id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Text><strong>Position:</strong> {journal.position}</Card.Text>
                    <Card.Text><strong>Strategy:</strong> {journal.strategy}</Card.Text>
                    <Card.Text><strong>Description:</strong> {journal.description}</Card.Text>
                    <Card.Text><strong>Buy Price:</strong> {journal.buyprice}</Card.Text>
                    <Card.Text><strong>Sell Price:</strong> {journal.sellprice}</Card.Text>
                    <Card.Text><strong>Quantity:</strong> {journal.quantity}</Card.Text>
                    <Card.Text><strong>Win or Lose:</strong> {journal.winorlose}</Card.Text>

                    {journal.position === 'Long' ? (
                      journal.winorlose === 'Win' ? (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.sellprice - journal.buyprice)}</Card.Text>
                      ) : (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.buyprice - journal.sellprice)}</Card.Text>
                      )
                    ) : (
                      journal.winorlose === 'Win' ? (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * Math.abs(journal.sellprice - journal.buyprice)}</Card.Text>
                      ) : (
                        <Card.Text><strong>Profit/Loss:</strong> {journal.quantity * (journal.sellprice - journal.buyprice)}</Card.Text>
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
        <p>No journal entries found.</p>
      )}
    </div>
  );
};

export default JournalPage;
