 import React, { Component } from "react";
 import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select';
import "./Login.css";

const teams = [
    { value: 1, label: 'Team 1' },
    { value: 2, label: 'Team 2' },
    { value: 3, label: 'Team 3' }
  ];

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: "",
        password: "",
        teamId: 0
      };
  
      this.users = [
          {username:'mike',password:'admin123@', teamId: 1},
          {username:'john',password:'admin123@', teamId: 2},
          {username:'rocky',password:'admin123@', teamId: 3}
      ];      
  }

  handleChangeTeam = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.state.teamId = selectedOption.value;
    console.log(`this state:`, this.state);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.teamId > 0 ;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      validationError: ''
    });
   
  }

  handleSubmit = event => {
    event.preventDefault();

    var i = this.users.length;
    this.validUser=null;
    while(i--) {
        if(this.state.username === this.users[i].username 
            && this.state.password === this.users[i].password
            && this.state.teamId == this.users[i].teamId) {
            this.validUser = this.users[i];
            console.log("user matched: " + this.validUser.username);
            this.props.history.push("/Welcome");
            break;
        }
        else
        {
            this.setState({
                validationError: 'Please enter valid details.'
              })
        }
    }
  }

  RenderErrorMessage()
  {
    const { validationError } = this.state;
    return <div style={{color:"#ff0000"}}>{validationError}</div>;
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormControl
             autoFocus
             value={this.state.username}
             onChange={this.handleChange}
             placeholder = "User Name"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder = "Password"
            />
          </FormGroup>
          <FormGroup controlId="team" bsSize="large" style={{marginBottom: 0 + 'em'}}>
             <Select
              value={selectedOption}
              onChange={this.handleChangeTeam}
              options={teams}
              placeholder="Team"
              />
          </FormGroup>
          <p style={{fontSize:0.9 + 'em'}}>Forgot username or password? <Link to="/">Click here.</Link></p>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            className="btn-primary"
          >
            Login
          </Button>
          <FormGroup controlId="rememberMe" bsSize="large" style={{marginTop: 1 + 'em'}}>
          <p>
            <input
                name="chkRememberMe"
                type="checkbox" /> Remember Me
            </p>
          </FormGroup>
          {this.RenderErrorMessage()}
        </form>
      </div>
    );
  }
}
