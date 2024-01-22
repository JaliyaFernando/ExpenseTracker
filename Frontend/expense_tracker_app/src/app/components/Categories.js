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
            categoryId: null,
            categoryName:'',
            categoryType: '',
            categoryBudget: '',
            buttonName:'Add',
            typeDisable: false,
            typeDropDownLabel: "Select a type",
            title: "Add Category"
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
        this.setState({
            buttonName: 'Update',
            typeDisable: true,
            title: "Update Category"
        });

        for (let i = 0; i < this.state.categories.length; i++) {
            if (this.state.categories[i].categoryId === Id) {
                this.setState({
                    categoryId: this.state.categories[i].categoryId,
                    categoryName: this.state.categories[i].categoryName,
                    categoryType: this.state.categories[i].categoryType,
                    categoryBudget: this.state.categories[i].categoryBudget,
                    typeDropDownLabel: this.state.categories[i].categoryType
                });
            }
        }
    }

    onRemove = (Id) => {
        axios.delete(APIs.CATEGORIES_BASE_URL+APIs.category.DELETE_CATEGORY+Id)
            .then(res => {
                    window.location.href = "/categories";
                    this.setState({
                        message: 'Record deleted successfully'
                    });
                }
            );
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.categoryId != null) {

            const obj = {
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName,
                categoryType: this.state.categoryType,
                categoryBudget: this.state.categoryBudget
            };
            axios.put(APIs.CATEGORIES_BASE_URL + APIs.category.UPDATE_CATEGORY+this.state.categoryId, obj)
                .then(res => {
                    window.location.href = "/categories"
                    this.setState({
                        message: 'Record updated successfully'
                    })
                });
            this.setState({
                categoryId: null,
                categoryName: '',
                categoryType: '',
                categoryBudget: '',
                typeDisable: false,
                typeDropDownLabel: "Select a type",
                buttonName: "Add",
                title: "Add Category"
            })
        } else {
            const obj = {
                categoryName: this.state.categoryName,
                categoryType: this.state.categoryType,
                categoryBudget: this.state.categoryBudget
            }
            axios.post(APIs.CATEGORIES_BASE_URL + APIs.category.ADD_CATEGORY, obj)
                .then(res => {
                        window.location.href = "/categories"
                        this.setState({
                            message: 'New record added successfully'
                        });
                    }
                );
            this.setState({
                categoryName: '',
                categoryType: '',
                categoryBudget: '',
                typeDisable: false
            });
        }
    }

    onCancelUpdate(e) {
        this.setState({
            categoryId: null,
            categoryName:'',
            categoryType: '',
            categoryBudget: '',
            typeDisable: false,
            buttonName: 'Add',
            typeDropDownLabel: "Select a type",
            title: "Add Category"
        });
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
            <div align="center">
                <h2>{this.state.title}</h2>
                <div className="Add_Record" align="center">
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
                            <select
                                id="categoryType"
                                name="categoryType"
                                value={this.state.categoryType}
                                onChange={this.onChangeCategoryType}
                                disabled={this.state.typeDisable}
                                required={true}
                            >
                                <option value="" disabled>Select a type</option>
                                {["Expense", "Income"].map((categoryType) => (
                                    <option key={categoryType} value={categoryType}>
                                        {categoryType}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Budget</Form.Label>
                            <input
                                id="categoryBudget"
                                name="categoryBudget"
                                value={this.state.categoryBudget}
                                onChange={this.onChangeCategoryBudget}
                                required={true}
                            />
                        </Form.Group>
                        <div align="center" className="buttons">
                            <Button variant="primary" type="submit">
                                <span>{this.state.buttonName}</span>
                            </Button>
                            <br/>
                        </div>

                        {
                            (this.state.categoryId) ? (
                                <div align="center" className="buttons">
                                    <Button style={{
                                        backgroundColor: 'gray',
                                        color: 'black',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        textAlign: 'center',}}
                                            onClick={() => this.onCancelUpdate()}>Cancel</Button>
                                    <br/>
                                </div>
                            ) : (<div></div>)
                        }
                    </Form>
                </div>

                <h3>Categories</h3>
                <div className="categories">
                    {
                        (this.state.message) ? (
                            <h5 align="center" className="alert-warning"><i
                                className="fa fa-warning"> {this.state.message}</i></h5>
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

