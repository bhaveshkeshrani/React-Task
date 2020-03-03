import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import {Modal,Button,Spinner} from "react-bootstrap";

// Designed the hooks for confirmation box
function ModalHooks() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your course has been successfully registered.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    // maintaining the state
    this.state = {
      errorMessage: '',
      classname:'',
      subjects:[],
      startDate: '',
      errorMsgNotes:'',
      errorMsgStartDate:'',
      toggle: false,
      toggleSuccessScreen: false,
    }
    this.handleAdditionalChange = this.handleAdditionalChange.bind(this);
  }
  // Designed for handling the form submit (API call too)
  handleFormSubmit = event => {
    event.preventDefault();
    if(this.state.errorMsgStartDate || this.state.errorMsgNotes) {
      return false;
    }
    this.setState({ toggle: true });
    setTimeout(() => {
      this.setState({ toggle: false });
    }, 2000);

    setTimeout(() => {
      this.setState({ toggleSuccessScreen: true });
    }, 2000);

    setTimeout(() => {
      this.setState({ toggleSuccessScreen: false });
    }, 4000);

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }
  // Course On change event
  onClick = selectedData => () => {
    if(selectedData == 1) {
        this.setState({
        radio: selectedData,
        subjects: [
          {id: '1', Subject: 'Short Reports'},
          {id: '2', Subject: 'Annual Reports'},
          {id: '3', Subject: 'Presentations'}
        ]
      })
    }
    else if(selectedData == 2) {
      this.setState({
        radio: selectedData,
        subjects: [
          {id: '1', Subject: 'Poetry'},
          {id: '2', Subject: 'Short Stories'},
          {id: '3', Subject: 'Drama'}
        ]
      })
    }
    else if(selectedData == 3) {
      this.setState({
        radio: selectedData,
        subjects: [
          {id: '1', Subject: 'Web Development'},
          {id: '2', Subject: 'Desktop Software Development'},
          {id: '3', Subject: 'Research and Analysis'}
        ]
      })
    }
  };

  // Start date - Date picker on change event
  handleDateChange = inputDate => {
    // design for date manipulation
    var date = new Date(inputDate)
    var dd = date.getDate(); 
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear(); 
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm};
    var finalDate = dd+'/'+mm+'/'+yyyy;
    if(finalDate == "20/12/2019" || finalDate == "15/01/2020" || finalDate == "01/02/2020") {
      this.setState({errorMsgStartDate: undefined});
      this.setState({classname: undefined});
    }
    else {
      this.setState({errorMsgStartDate: "Your selected course and subject is not offered beginning from your selected date"});
      this.setState({classname: "alert alert-danger"});
    }
    this.setState({
      startDate: date
    });
  };
  // Additional notes on change event
  handleAdditionalChange() {
    var data = document.getElementById("additionalNotes").value;
    if(!data)
    {
      this.setState({errorMsgNotes: undefined});
      this.setState({classname: undefined});
    }
    else if(data.length < 20 || data.length > 500)
    {
      this.setState({errorMsgNotes: "Notes is not less than 20 characters and not more than 500 characters"});
      this.setState({classname: "alert alert-danger"});
    } 
    else {
      this.setState({errorMsgNotes: undefined});
      this.setState({classname: undefined});
    }
  };
  // render method for actual output
  render() {
    const { subjects,toggle,toggleSuccessScreen } = this.state;
    let subjectsList = subjects.length > 0
    	&& subjects.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.Subject}</option>
      )
    }, this);
    return (
        // form with all field components
        <form onSubmit={this.handleFormSubmit} id="registrationForm">
            { this.state.toggleSuccessScreen && <ModalHooks /> }
            <h3>Registration Form</h3>
            { this.state.errorMessage && <div className={ this.state.classname } role="alert"> { this.state.errorMessage } </div> }
            <div className="form-group">
                <label>First name</label>
                <input type="text" name="fname" className="form-control" placeholder="First name" required/>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" name="lname" className="form-control" placeholder="Last name" required/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" required/>
            </div>
            <div className="form-group">
              <label>Course</label>
              <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" onClick={this.onClick(1)} id="technicalReportWriting" name="groupOfCourseRadios" required/>
                <label className="custom-control-label" htmlFor="technicalReportWriting">Technical Report Writing</label>
              </div>
              <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" onClick={this.onClick(2)} id="englishLiterature" name="groupOfCourseRadios" required/>
                <label className="custom-control-label" htmlFor="englishLiterature">English Literature</label>
              </div>
              <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" onClick={this.onClick(3)} id="computerSciences" name="groupOfCourseRadios" required/>
                <label className="custom-control-label" htmlFor="computerSciences">Computer Sciences</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="selectSubject">Select Subject:</label>
              <select className="form-control" id="selectSubject" name="selectSubject" required>
                {subjectsList}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="selectSubject">Start date:</label>
              <DatePicker className="form-control ml-4" id="startDatePicker" name="startDatePicker"
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                required />
              { this.state.errorMsgStartDate && <div className={ this.state.classname } id="startDatePickerAlert" role="alert"> { this.state.errorMsgStartDate } </div> }

            </div>
            <div className="form-group">
              <label htmlFor="comment">Additional Notes:</label>
              <textarea className="form-control" rows="5" onChange={this.handleAdditionalChange} id="additionalNotes" name="additionalNotes"></textarea>
              { this.state.errorMsgNotes && <div className={ this.state.classname } id="additionalNotesAlert" role="alert"> { this.state.errorMsgNotes } </div> }
            </div>
          <button type="submit" className="btn btn-primary btn-block">{ this.state.toggle &&
           <span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
          } Sign Up
          </button>
      </form>
    );
  }
}