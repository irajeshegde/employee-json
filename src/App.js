import React from "react";
import {
  Button,
  Form,
  Container,
  Message,
  Grid,
  Header,
  Divider,
} from "semantic-ui-react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container>
          <div className="box">
            <Message
              attached
              header="Employee Data"
              content="Enter details and add employee data"
            />
            <Form className="attached fluid segment">
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Name</Header>
                  <Form.Input
                    name="name"
                    placeholder="Employee's Name"
                    type="text"
                  />
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Designation</Header>
                  <Form.Input
                    name="des"
                    placeholder="Employee's Designation"
                    type="text"
                  />
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column>
                  <Header as="h5">Contact Details</Header>
                  <Form.Group>
                    <Form.Input placeholder="Type" type="text" />
                    <Form.Field>
                      <input placeholder="Phone Number" />
                    </Form.Field>
                    <Button icon="plus" />
                  </Form.Group>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Skills</Header>
                  <Form.Group>
                    <Form.Input
                      name="skills"
                      placeholder="Employee's Skills"
                      type="text"
                    />
                    <Button icon="plus" />
                  </Form.Group>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Date of Birth</Header>
                  <Form.Group>
                    <Form.Input name="date" type="date" />
                  </Form.Group>
                </Grid.Column>
              </Grid>
            </Form>
          </div>
          <div className="box-center">
            <Button>Add Employee</Button>
          </div>
          <Divider />
          <div className="box-center">
            <Button>View Data</Button>
          </div>
          <div className="box">
            <Message
              header="Employee Details"
              content="Following are the current employee details"
            ></Message>
          </div>
          <div className="box-center">
            <Button>Download JSON</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
