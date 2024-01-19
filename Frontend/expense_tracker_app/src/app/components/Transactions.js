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
        this.onChangeIsRecurring = this.onChangeIsRecurring.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeRecurringEvery = this.onChangeRecurringEvery.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            transactions : [],
            message: '',
            date:'',
            description:'',
            categoryId: '',
            transactionId: '',
            amount: '',
            id: null,
            isRecurring: false,
            endDate: '',
            recurringEvery: '',
            note: '',
            buttonName:'Add',
        }
        this.getTransactions();
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
            categoryId: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeIsRecurring(e) {
        this.setState(prevState => ({
            isRecurring: !prevState.isRecurring
        }));
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }

    onChangeRecurringEvery(e) {
        this.setState({
            recurringEvery: e.target.value
        });
    }

    onChangeNote(e) {
        this.setState({
            note: e.target.value
        });
    }

    onUpdate = (Id) => {

    }

    onRemove = (Id) => {
        axios.delete(APIs.TRANSACTIONS_BASE_URL+APIs.transaction.DELETE_BY_ID+Id)
            .then(res => {
                    window.location.href = "/transactions";
                    this.setState({
                        message: 'Record deleted successfully'
                    });
                }
            );
    }

    onSubmit(e) {
        e.preventDefault();
        let API = APIs.TRANSACTIONS_BASE_URL;
        const obj = {
            date: this.state.date,
            description: this.state.description,
            categoryId: this.state.categoryId,
            amount: this.state.amount,
        };
        if(this.state.isRecurring){
            obj.endDate = this.state.endDate;
            obj.recurringEvery = this.state.recurringEvery;
            obj.note = this.state.note;
            API = API+APIs.transaction.ADD_NEW_RECURRING;
        }
        axios.post(API, obj)
            .then(res => {
                window.location.href = "/transactions";
                this.setState({
                    message: 'New record added successfully'
                });
                }
            );
        this.setState({
            date: '',
            description: '',
            categoryId: '',
            amount: '',
        });
        if(this.state.isRecurring){
            this.setState({
                endDate: '',
                recurringEvery: '',
                note: ''
            });
        }
    }

    getTransactions(){
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
            <div align="center">
                <h2>My Transactions</h2>
                <div className="Add_Record" align="left">
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
                                id="categoryId"
                                name="categoryId"
                                value={this.state.categoryId}
                                onChange={this.onChangeCategoryId}
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="required">Amount</Form.Label>
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.onChangeAmount}
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Group style={{ display: 'flex', alignItems: 'center', padding: '20px'}}>
                                <Form.Label>Recurring Transaction</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    id="isRecurring"
                                    onChange={this.onChangeIsRecurring}
                                    checked={this.state.isRecurring}
                                />
                            </Form.Group>
                        </Form.Group>
                        {this.state.isRecurring && (
                            <>
                                <Form.Group>
                                    <Form.Label className="required">End Date</Form.Label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChangeEndDate}
                                        required={this.state.isRecurring}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="required">Recurring Every</Form.Label>
                                    <select
                                        id="recurringEvery"
                                        name="recurringEvery"
                                        value={this.state.recurringEvery}
                                        onChange={this.onChangeRecurringEvery}
                                        required={this.state.isRecurring}
                                    >
                                        <option value="Day">Day</option>
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Note</Form.Label>
                                    <input
                                        type="text"
                                        id="note"
                                        name="note"
                                        value={this.state.note}
                                        onChange={this.onChangeNote}
                                        required={true}
                                    />
                                </Form.Group>
                            </>
                        )}
                        <div align="center" className="buttons">
                            <Button variant="primary" type="submit">
                                <span>{this.state.buttonName}</span>
                            </Button>
                            <br/>
                        </div>
                    </Form>
                </div>

                <h3>Transactions</h3>

                <div className="Records">
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
                                    <th>Recurring Transaction End Date</th>
                                    <th>Recurring Every</th>
                                    <th>Note</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.transactions.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td width="100px">{transaction.date}</td>
                                        <td width="200px">{transaction.description}</td>
                                        <td width="100px" align="right">{transaction.categoryId}</td>
                                        <td width="100px" align="right">{transaction.amount}</td>
                                        <td width="200px" align="right">{transaction.endDate}</td>
                                        <td width="100px" align="right">{transaction.recurringEvery}</td>
                                        <td width="100px" align="right">{transaction.note}</td>
                                        <td width="300px" align="center">
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