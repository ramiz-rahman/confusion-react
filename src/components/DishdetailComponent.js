import React from 'react';
import Moment from 'moment';
import {Label, Col, Row, Card, CardHeader, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isCommentOpen : false
    };

    this.toggleForm = this.toggleForm.bind(this);
  };

  toggleForm(){
    this.setState ({
      isCommentOpen : !this.state.isCommentOpen
    });
  }

  submitForm(values){
    alert("Values: " + JSON.stringify(values));
  }

  render(){
    const closeBtn = <button className="close" onClick={this.toggleForm}>&times;</button>
    return(
      <>
        <Button onClick={this.toggleForm} type="submit" value="submit" className="bg-primary"><span className="fa fa-pencil">  Submit Comment</span></Button>
        <Modal toggle={this.toggleForm} isOpen = {this.state.isCommentOpen}>
          <ModalHeader toggle={this.toggleForm} close={closeBtn}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className= "col-12">
              <LocalForm onSubmit={(values) => this.submitForm(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    className="form-control"
                    name="rating"
                    placeholder="Enter your rate">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="yourName">Your Name</Label>
                  <Control.text
                    model=".yourName"
                    id="yourName"
                    className="form-control"
                    name="yourName"
                    placeholder="Enter your name:"
                    validators ={{
                      minLength: minLength(2), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourName"
                    show="touched"
                    messages ={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="leaveComment">Comment</Label>
                  <Control.textarea
                    model=".leaveComment"
                    id="leaveComment"
                    className="form-control"
                    name="leaveComment"
                    placeholder="Leave your comment"
                    rows = "6"
                    />
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary">Submit</Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}



function RenderComments({dish}){
  Moment.locale('en');
  if(dish != null){
    const commentDish = dish.map( (dis) => {
      return(
        <div>
          <CardText>{dis.comment}</CardText>
          <CardText><strong>Author: </strong> {dis.author}, <strong>Date: </strong>{Moment(dis.date).format('d MMM YYYY')}</CardText>
          <br></br>
        </div>
      );
    });

    return(
      <div>
        <Card>
          <CardHeader tag="h4" className="text-center">Comments</CardHeader>
          <CardBody>
            {commentDish}
            <CommentForm />
          </CardBody>
        </Card>
      </div>
    );
  }
  else{
    return(
      <div></div>
    );
  }
}

function RenderDish({dish}){
    if(dish != null){
      return(
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    else{
      return(
         <div></div>
      );
    }
  }

const DishDetail = (props) => {
  return(
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish = {props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish = {props.comments} />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
