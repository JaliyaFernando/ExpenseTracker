import React,{Component} from 'react';
import axios from 'axios';
import APIs from "../constants/APIs";
import {Button, Form} from "react-bootstrap";

export default class Categories extends Component{
    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onChangeCategoryType = this.onChangeCategoryType.bind(this);
        this.onChangeCategoryBudget = this.onChangeCategoryBudget.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            categories : [],
            message: '',
            categoryId: '',
            categoryName:'',
            categoryType: '',
            categoryBudget: '',
            buttonName:'Add',
        }
        this.getCategories();
    }
    onChangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value
        });
    }
    onChangeCategoryType(e) {
        this.setState({
            categoryType: e.target.value
        });
    }
    onChangeCategoryBudget(e) {
        this.setState({
            categoryBudget: e.target.value
        });
    }

    onUpdate = (Id) => {
        // this.setState({
        //     buttonName: 'Update'
        // });

        // for (let i = 0; i < this.state.my_workouts.length; i++) {
        //     if (this.state.my_workouts[i].workoutID === Id) {
        //         this.setState({
        //             workoutID: Id,
        //             date: new Date(this.state.my_workouts[i].date).toISOString().split('T')[0],
        //             description:this.state.my_workouts[i].name,
        //             time: this.state.my_workouts[i].time,
        //             weight: this.state.my_workouts[i].weight,
        //         });
        //     }
        // }
    }

    // localhost:8080/categories/deleteCategory?id=E5
    // http://localhost:8080/categories/deleteCategory?id=
    onRemove = (Id) => {
        console.log("xxxxxxx ", Id)
        axios.delete(APIs.CATEGORIES_BASE_URL+APIs.category.DELETE_CATEGORY+Id)
            .then(res => {
                console.log("after delete")
                    window.location.href = "/categories";
                    this.setState({
                        message: 'Record deleted successfully'
                    });
                }
            );
    }

    onSubmit(e) {
        // e.preventDefault();
        // if(this.state.workoutID != null){
        //     const obj = {
        //         WorkoutID: this.state.workoutID,
        //         UserID: this.state.user.UserID,
        //         Date: this.this.state.date,
        //         Name: this.state.description,
        //         Time: this.state.time,
        //         Weight: this.state.weight,
        //     };
        //     axios.put(APIs.FITNESS_BASE_URL + APIs.workout.UPDATE_NEW_WORKOUT+this.state.workoutID, obj)
        //         .then(res => {
        //                 window.location.href = "/workouts";
        //                 this.setState({
        //                     message: 'Record updated successfully'
        //                 });
        //             }
        //         );
        //     this.setState({
        //         date: '',
        //         description: '',
        //         time: '',
        //         weight: '',
        //         workoutID: null,
        //         buttonName:'Add',
        //     });

        // }else {
        //     const obj = {
        //         UserID: this.state.user.UserID,
        //         Date: this.state.date,
        //         Name: this.state.description,
        //         Time: this.state.time,
        //         Weight: this.state.weight,
        //     };
        //     const weight = {
        //         weight: this.state.weight,
        //     };
        //     axios.post(APIs.FITNESS_BASE_URL + APIs.workout.ADD_NEW_WORKOUT, obj)
        //         .then(res => {
        //             axios.put(APIs.BASE_URL + APIs.user.UPDATE_WEIGHT+this.state.user.UserID,weight)
        //                 .then(res => {
        //                         console.log(res.data.message);
        //                     }
        //                 );

        //                 window.location.href = "/workouts";
        //                 this.setState({
        //                     message: 'New record added successfully'
        //                 });
        //             }
        //         );
        //     this.setState({
        //         date: '',
        //         description: '',
        //         time: '',
        //         weight: '',
        //     });
        // }
    }

    getCategories(){
        axios.get(APIs.CATEGORIES_BASE_URL
        )
            .then(
                (response) => {
                    if(response.data.length > 0){

                        this.setState(
                            {
                                categories: response.data
                            },
                            () => {
                                // Callback function after state is updated
                                console.log("Length of categories:", this.state.categories.length);
                            })
                    }
                    else{
                        this.setState({
                            message:'No categories'
                        });
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        message:'No categories'
                    });
                }
            );
    }
    render(){
        return (
            <div className="workouts" align="center">
                <h2>Add Category</h2>
                <div className="add_workout" align="center">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <input
                                id="categoryName"
                                name="categoryName"
                                value={this.state.categoryName}
                                onChange={this.onChangeCategoryName}
                                required = {true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <input
                                id="categoryType"
                                name="categoryType"
                                value={this.state.categoryType}
                                onChange={this.onChangeCategoryType}
                                required = {true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Budget</Form.Label>
                            <input
                                id="categoryBudget"
                                name="categoryBudget"
                                value={this.state.categoryBudget}
                                onChange={this.onChangeCategoryBudget}
                                required = {true}
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

                <h3>Categories</h3>
                <div className="categories">
                    {
                        (this.state.message) ? (
                            <h5 align="center" className="alert-warning"><i className="fa fa-warning"> {this.state.message}</i> </h5>
                        ) : (
                            <table width="80%">
                                <thead>
                                <tr>
                                    <th>Category Id</th>
                                    <th>Category Name</th>
                                    <th>Type</th>
                                    <th>Budget</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.categories.map(category => (
                                        <tr key={category.categoryId}>
                                            <td width="100px" align="center">{category.categoryId}</td>
                                            <td width="100px" align="center">{category.categoryName}</td>
                                            <td width="100px" align="center">{category.categoryType}</td>
                                            <td width="100px" align="center">{category.categoryBudget}</td>
                                            <td width="200px" align="center">
                                            <Button style={{
                                                backgroundColor: '#f5f5f5',
                                                padding: '5px',
                                                width: '70px',
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                textAlign: 'center',}}
                                                    onClick={() => this.onUpdate(category.categoryId)}>Update</Button>
                                            <Button style={{
                                                backgroundColor: '#Cb0c0f',
                                                padding: '5px',
                                                margin: '3px',
                                                width: '70px',
                                                color: 'white',
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                textAlign: 'center',}}
                                                    onClick={() => this.onRemove(category.categoryId)}>Delete</Button>
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