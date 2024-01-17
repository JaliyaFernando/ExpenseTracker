import React,{Component} from 'react';
import axios from 'axios';
import APIs from "../constants/APIs";
import {Button, Form} from "react-bootstrap";

export default class Categories extends Component{
    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.getWorkouts = this.getWorkouts.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            my_workouts : [],
            message: '',
            date:'',
            description:'',
            time: '',
            weight: '',
            workoutID: null,
            buttonName:'Add',
        }
        this.getWorkouts();
    }
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }
    onChangeWeight(e) {
        this.setState({
            weight: e.target.value
        });
    }

    onUpdate = (Id) => {
        this.setState({
            buttonName: 'Update'
        });

        for (let i = 0; i < this.state.my_workouts.length; i++) {
            if (this.state.my_workouts[i].workoutID === Id) {
                this.setState({
                    workoutID: Id,
                    date: new Date(this.state.my_workouts[i].date).toISOString().split('T')[0],
                    description:this.state.my_workouts[i].name,
                    time: this.state.my_workouts[i].time,
                    weight: this.state.my_workouts[i].weight,
                });
            }
        }
    }

    onRemove = (Id) => {
        axios.delete(APIs.FITNESS_BASE_URL+APIs.workout.DELETE_NEW_WORKOUT+Id)
            .then(res => {
                    window.location.href = "/workouts";
                    this.setState({
                        message: 'Record deleted successfully'
                    });
                }
            );
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.workoutID != null){
            const obj = {
                WorkoutID: this.state.workoutID,
                UserID: this.state.user.UserID,
                Date: this.this.state.date,
                Name: this.state.description,
                Time: this.state.time,
                Weight: this.state.weight,
            };
            axios.put(APIs.FITNESS_BASE_URL + APIs.workout.UPDATE_NEW_WORKOUT+this.state.workoutID, obj)
                .then(res => {
                        window.location.href = "/workouts";
                        this.setState({
                            message: 'Record updated successfully'
                        });
                    }
                );
            this.setState({
                date: '',
                description: '',
                time: '',
                weight: '',
                workoutID: null,
                buttonName:'Add',
            });

        }else {
            const obj = {
                UserID: this.state.user.UserID,
                Date: this.state.date,
                Name: this.state.description,
                Time: this.state.time,
                Weight: this.state.weight,
            };
            const weight = {
                weight: this.state.weight,
            };
            axios.post(APIs.FITNESS_BASE_URL + APIs.workout.ADD_NEW_WORKOUT, obj)
                .then(res => {
                    axios.put(APIs.BASE_URL + APIs.user.UPDATE_WEIGHT+this.state.user.UserID,weight)
                        .then(res => {
                                console.log(res.data.message);
                            }
                        );

                        window.location.href = "/workouts";
                        this.setState({
                            message: 'New record added successfully'
                        });
                    }
                );
            this.setState({
                date: '',
                description: '',
                time: '',
                weight: '',
            });
        }
    }

    getWorkouts(){
        axios.get(APIs.FITNESS_BASE_URL+APIs.workout.MY_WORKOUTS+this.state.user.UserID
        )
            .then(
                (response) => {
                    if(response.data.length > 0){

                        this.setState(
                            {
                                my_workouts: response.data
                            },
                            () => {
                                // Callback function after state is updated
                                console.log("Updated my_workouts:", this.state.my_workouts);
                                console.log("Length of my_workouts:", this.state.my_workouts.length);
                            })
                    }
                    else{
                        this.setState({
                            message:'No workouts at the moment'
                        });
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        message:'No workouts at the moment'
                    });
                }
            );
    }
    render(){
        return (
            <div className="workouts" align="center">
                <h2>Categories</h2>
                <div className="add_workout" align="left">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={this.state.date}
                            onChange={this.onChangeDate}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="required">Time(mm)</Form.Label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            value={this.state.time}
                            onChange={this.onChangeTime}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="required">Weight(kg)</Form.Label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={this.state.weight}
                            onChange={this.onChangeWeight}
                            required={true}
                        />
                    </Form.Group>
                    <div align="center" className="buttons">
                        <Button variant="primary" type="submit">
                            <span>{this.state.buttonName}</span>
                        </Button>
                        <br/>
                    </div>
                </Form>
                </div>

                <h3>My Workouts</h3>

                <div className="my_workout">
                {
                    (this.state.message) ? (
                        <h5 align="center" className="alert-warning"><i className="fa fa-warning"> {this.state.message}</i> </h5>
                    ) : (
                        <table width="100%">
                            <thead >
                            <tr>
                                <th>Date</th>
                                <th>Details</th>
                                <th>Time(mm)</th>
                                <th>Weight(kg)</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                                    <tbody>
                                    {this.state.my_workouts.map(my_workout => (
                                        <tr key={my_workout.workoutID}>
                                            <td width="200px">{my_workout.date}</td>
                                            <td>{my_workout.name}</td>
                                            <td width="100px" align="right">{my_workout.time}</td>
                                            <td width="100px" align="right">{my_workout.weight}</td>
                                            <td width="200px" align="center">
                                                <Button style={{
                                                    backgroundColor: '#f5f5f5',
                                                    padding: '5px',
                                                    width: '70px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    textAlign: 'center',}}
                                                        onClick={() => this.onUpdate(my_workout.workoutID)}>Update</Button>
                                                <Button style={{
                                                    backgroundColor: '#Cb0c0f',
                                                    padding: '5px',
                                                    margin: '3px',
                                                    width: '70px',
                                                    color: 'white',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    textAlign: 'center',}}
                                                        onClick={() => this.onRemove(my_workout.workoutID)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                        </table>
                    )
                }
                </div>
            </div>
        );
    }
}