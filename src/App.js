import React from "react";
import {
  Button,
  Form,
  Container,
  Message,
  Grid,
  Header,
  Divider,
  Label,
} from "semantic-ui-react";
import "./App.css";
import moment from "moment";
import validator from "validator";

class App extends React.Component {
  state = {
    name: "",
    designation: "",
    type: "",
    number: "",
    skill: "",
    dob: "",
    show: false,
    contactError: false,
    contactOverflow: false,
    phoneError: false,
    skillsError: false,
  };
  contact = [];
  skills = [];
  employee = [];

  handleChange = (e) => {
    if (e.target.value !== " ") {
      this.setState({
        [e.target.name]: e.target.value,
        contactError: false,
        phoneError: false,
        skillsError: false,
        contactOverflow: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.contact.length === 0) {
      this.setState({ contactError: true });
      return;
    }

    this.employee = [
      ...this.employee,
      {
        name: this.state.name,
        designation: this.state.designation,
        contact: this.contact,
        skills: this.skills,
        dob:
          this.state.dob.length > 0
            ? moment(this.state.dob).format("DD-MMM-YYYY")
            : ``,
      },
    ];
    this.setState({ name: "", designation: "", dob: "" });
    this.contact = [];
    this.skills = [];
  };
  handleSkills = (e) => {
    e.preventDefault();
    if (this.state.skills === "") {
      this.setState({ skillsError: true });
      return;
    }
    this.skills = [...this.skills, this.state.skill];
    this.setState({
      skill: "",
    });
  };
  handleContact = (e) => {
    e.preventDefault();

    if (this.contact.length > 3) {
      this.setState({ contactOverflow: true });
      this.setState({
        type: "",
        number: "",
      });
      return;
    }
    if (this.state.type === "" || this.state.number === "") {
      this.setState({ contactError: true });
      return;
    } else {
      if (
        validator.isMobilePhone(this.state.number) &&
        this.state.number.length === 10
      ) {
        this.contact = [
          ...this.contact,
          { type: this.state.type, number: this.state.number },
        ];
      } else {
        this.setState({ phoneError: true, number: "" });
        return;
      }
    }

    this.setState({
      type: "",
      number: "",
    });
  };
  render() {
    const {
      name,
      designation,
      type,
      number,
      skill,
      dob,
      show,
      contactOverflow,
      contactError,
      phoneError,
      skillsError,
    } = this.state;
    return (
      <div className="App">
        <Container>
          <div className="box">
            <Message
              attached
              header="Employee JSON"
              content="Fill form, View data, Download JSON"
            />
            <Form
              className="attached fluid segment"
              onSubmit={this.handleSubmit}
            >
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Name</Header>
                  <Form.Input
                    required
                    name="name"
                    placeholder="Employee's Name"
                    type="text"
                    value={name}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Designation</Header>
                  <Form.Input
                    required
                    placeholder="Employee's Designation"
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={this.handleChange}
                  />
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column>
                  <Header as="h5">Contact Details</Header>
                  <div className="mr">
                    {this.contact.map((c) => (
                      <div key={this.contact.indexOf(c)} className="mr">
                        <Button
                          onClick={(e) => e.preventDefault()}
                          basic
                          color="grey"
                          content={`${c.type}: ${c.number}`}
                        />
                      </div>
                    ))}
                  </div>
                  <Form.Group>
                    <Form.Input
                      name="type"
                      value={type}
                      onChange={this.handleChange}
                      placeholder="Type"
                      type="text"
                    />

                    <Form.Field>
                      <input
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                        placeholder="Phone Number"
                      />
                    </Form.Field>
                    <Button
                      onClick={this.handleContact}
                      color="grey"
                      icon="plus"
                    />
                  </Form.Group>
                  {contactOverflow && (
                    <Label basic color="red">
                      Contact details cann't be more than 4{" "}
                    </Label>
                  )}
                  {contactError && (
                    <Label basic color="red">
                      Type and Number cann't be empty
                    </Label>
                  )}
                  {phoneError && (
                    <Label basic color="red">
                      Invalid phone number
                    </Label>
                  )}
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={16}>
                  <Header as="h5">Skills</Header>
                  <div className="mr">
                    {this.skills.map((skill) => (
                      <div key={this.skills.indexOf(skill)} className="in mr">
                        <Button
                          onClick={(e) => e.preventDefault()}
                          basic
                          color="grey"
                          content={skill}
                        />
                      </div>
                    ))}
                  </div>

                  <Form.Group>
                    <Form.Input
                      name="skill"
                      value={skill}
                      onChange={this.handleChange}
                      placeholder="Employee's Skill"
                      type="text"
                    />
                    <Button
                      color="grey"
                      onClick={this.handleSkills}
                      icon="plus"
                    />
                  </Form.Group>
                  {skillsError && (
                    <Label basic color="red">
                      Skills cann't be empty
                    </Label>
                  )}
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h5">Date of Birth</Header>
                  <Form.Group>
                    <Form.Input
                      name="dob"
                      value={dob}
                      onChange={this.handleChange}
                      type="date"
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid>
              <div className="box-center">
                <Button secondary type="submit">
                  Add Employee
                </Button>
              </div>
            </Form>
          </div>
          <div className="box-center">
            <Button
              secondary
              onClick={() => {
                this.setState({ show: !show });
              }}
            >
              View Data
            </Button>
          </div>
          {show && (
            <div className="box">
              <Message>
                {this.employee.length === 0 ? `Empty` : ``}
                {this.employee.map((e) => {
                  return (
                    <Message key={this.employee.indexOf(e)}>
                      <div className="in-m">
                        <Header as="h4">
                          Employee#{this.employee.indexOf(e) + 1}
                        </Header>
                        <Divider />
                        <Grid divided="vertically">
                          <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                              <Header as="h4">Name:</Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4">{e.name}</Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid divided="vertically">
                          <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                              <Header as="h4">Designation:</Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4"> {e.designation}</Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid divided="vertically">
                          <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                              <Header as="h4"> Contact:</Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4">
                                {e.contact.map((c) => {
                                  return (
                                    <div key={e.contact.indexOf(c)}>
                                      {`${c.type} - ${c.number}\n\n`}
                                    </div>
                                  );
                                })}
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid divided="vertically">
                          <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                              <Header as="h4">Skills:</Header>
                            </Grid.Column>
                            <Grid.Column>
                              <Header as="h4">
                                {e.skills.length === 0 ? `N/A` : ``}
                                {e.skills.map((s) => {
                                  return (
                                    <div
                                      key={e.skills.indexOf(s)}
                                      className="in mr"
                                    >
                                      {s}
                                      {e.skills.indexOf(s) + 1 !==
                                      e.skills.length
                                        ? ","
                                        : " "}
                                    </div>
                                  );
                                })}
                              </Header>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid divided="vertically">
                          <Grid.Row columns={2}>
                            <Grid.Column width={3}>
                              <Header as="h4">DOB:</Header>
                            </Grid.Column>
                            <Grid.Column>
                              {e.dob === "" ? (
                                <Header as="h4">N/A</Header>
                              ) : (
                                <Header as="h4">{e.dob}</Header>
                              )}
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    </Message>
                  );
                })}
              </Message>
            </div>
          )}
          <div className="box-center">
            <Button
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(this.employee, null, 2)
              )}`}
              download={`employee-json-${Date.now()}.json`}
              secondary
            >
              Download JSON
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
