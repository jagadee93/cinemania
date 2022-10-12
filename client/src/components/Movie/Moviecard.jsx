import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function MovieCard(props) {

  return (
  <div className='PendingMovieCard'>
    <Card>
      <Card.Header as="h5">{props.title}</Card.Header>
      <Card.Body>
        <Card.Title>{props.year}</Card.Title>
        <Card.Text>
        {props.plot}
        </Card.Text>
        <p> added By  {props.username}</p>
        <div className='PendingMovieCard-btns'>
        <Button className='pen-btn1' onClick={() =>{
            props.click(props.id)
        }}>Approve</Button>
        <Button className='pen-btn2' onClick={() => props.reject(props.id)}>Reject</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}