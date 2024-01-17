import React,{Component} from 'react';
import axios from 'axios';
import APIs from "../constants/APIs";
import {Button, Form} from "react-bootstrap";

export default class Transactions extends Component{
    constructor(props) {
        super(props);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.getWorkouts = this.getWorkouts.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            transactions : [],
            message: '',
            date:'',
            description:'',
            categoryId: '',
            amount: '',
            id: null,
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
    onChangeCategoryId(e) {
        this.setState({
            weight: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onUpdate = (Id) => {
        /*this.setState({
            buttonName: 'Update'
        });

        for (let i = 0; i < this.state.my_cheatmeals.length; i++) {
            if (this.state.my_cheatmeals[i].cheatmealID === Id) {
                this.setState({
                    cheatmealID: Id,
                    date: new Date(this.state.my_cheatmeals[i].date).toISOString().split('T')[0],
                    description:this.state.my_cheatmeals[i].name,
                    weight: this.state.my_cheatmeals[i].weight,
                });
            }
        }*/
    }

    onRemove = (Id) => {
        /*axios.delete(APIs.FITNESS_BASE_URL+APIs.cheatmeal.DELETE_CHEATMEALS+Id)
            .then(res => {
                    window.location.href = "/workouts";
                    this.setState({
                        message: 'Record deleted successfully'
                    });
                }
            );*/
    }

    onSubmit(e) {
        /*e.preventDefault();
        if(this.state.cheatmealID != null){
            const obj = {
                CheatmealID: this.state.cheatmealID,
                UserID: this.state.user.UserID,
                Date: this.state.date,
                Name: this.state.description,
                Weight: this.state.weight,
            };
            axios.put(APIs.FITNESS_BASE_URL + APIs.cheatmeal.UPDATE_CHEATMEALS+this.state.cheatmealID, obj)
                .then(res => {
                        window.location.href = "/cheatmeals";
                        this.setState({
                            message: 'Record updated successfully'
                        });
                    }
                );
            this.setState({
                date: '',
                description: '',
                weight: '',
                cheatmealID: null,
                buttonName:'Add',
            });

        }else {
            const obj = {
                UserID: this.state.user.UserID,
                Date: this.state.date,
                Name: this.state.description,
                Weight: this.state.weight,
            };
            const weight = {
                weight: this.state.weight,
            };
            axios.post(APIs.FITNESS_BASE_URL + APIs.cheatmeal.ADD_CHEATMEALS, obj)
                .then(res => {
                    axios.put(APIs.USER_BASE_URL + APIs.user.UPDATE_WEIGHT+this.state.user.UserID,weight)
                        .then(res => {
                                console.log(res.data.message);
                            }
                        );
                        window.location.href = "/cheatmeals";
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
        }*/
    }

    getWorkouts(){
        axios.get(APIs.TRANSACTIONS_BASE_URL
        )
            .then(
                (response) => {
                    if(response.data.length > 0){

                        this.setState(
                            {
                                transactions: response.data
                            },
                            () => {
                                console.log("No of transactions:", this.state.transactions.length);
                            })
                    }
                    else{
                        this.setState({
                            message:'No transactions at the moment'
                        });
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        message:'No transactions at the moment'
                    });
                }
            );
    }
    render(){
        return (
            <div className="workouts" align="center">
                <h2>My Transactions</h2>
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
                            <Form.Label className="required">Category Id</Form.Label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={this.state.weight}
                                onChange={this.onChangeCategoryId}
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

                <h3>Transactions</h3>

                <div className="my_workout">
                    {
                        (this.state.message) ? (
                            <h5 align="center" className="alert-warning"><i className="fa fa-warning"> {this.state.message}</i> </h5>
                        ) : (
                            <table width="100%">
                                <thead >
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category Id</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.transactions.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td width="200px">{transaction.date}</td>
                                        <td>{transaction.description}</td>
                                        <td width="100px" align="right">{transaction.categoryId}</td>
                                        <td width="100px" align="right">{transaction.amount}</td>
                                        <td width="200px" align="center">
                                            <Button style={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '5px',
                                                width: '70px',
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                textAlign: 'center',}}
                                                    onClick={() => this.onUpdate(transaction.id)}>Update</Button>
                                            <Button style={{
                                                backgroundColor: '#Cb0c0f',
                                                padding: '5px',
                                                margin: '3px',
                                                width: '70px',
                                                color: 'white',
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                textAlign: 'center',}}
                                                    onClick={() => this.onRemove(transaction.id)}>Delete</Button>
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