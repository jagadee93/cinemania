import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard(props) {
    const {name,profilePic,email,count}=props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" width={180} height={180} src={profilePic} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          email: {email}
        </Card.Text>
        <Card.Text>
          reviewed movies {count}
        </Card.Text>
        <Card.Text>
          {}
        </Card.Text>
        <Button variant="primary">delete</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;






