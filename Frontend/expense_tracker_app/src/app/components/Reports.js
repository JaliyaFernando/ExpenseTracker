import React,{Component} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";
import APIs from "../constants/APIs";

export default class Reports extends Component{
    constructor(props) {
        super(props);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.onGenerate = this.onGenerate.bind(this);
        this.onViwe = this.onViwe.bind(this);
        this.state = {
            userDetails: [],
            userXMLReport: [],
            userReport: [],
            reportAvailable: false,
            message: '',
            viewReport: false
        }
        this.getUserDetails();
    }
    getUserDetails(){
        axios.get(APIs.USER_BASE_URL+APIs.user.MY_DETAILS+this.state.user.UserID)
            .then(
                (response) => {
                    if(response.data){

                        console.log("user:", this.state.userDetails.length);
                        this.setState(
                            {
                                userDetails: response.data
                            },
                            () => {
                                // Callback function after state is updated
                                console.log("user:", this.state.userDetails);
                            })
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    onGenerate(e) {
        const obj = {
            UserID: this.state.user.UserID,
            UserName: this.state.userDetails.userName,
            Age: this.state.userDetails.age,
            Weight: this.state.userDetails.weight,
            Height: this.state.userDetails.height,
            Password: "null",
            LastUpdate: "2023-08-02T17:03:01.888Z",
        };
        axios.post(APIs.REPORT_BASE_URL + APIs.report.GENERATE, obj)
            .then(res => {
                    this.setState({
                        message: 'Report generated successfully'
                    });
                }
            );
    }


    onViwe(e) {
        axios.get(APIs.REPORT_BASE_URL + APIs.report.GET_REPORT+this.state.user.UserID)
            .then(
                (response) => {
                    const parser = new DOMParser();

                    // Parse the XML string
                    const xmlDoc = parser.parseFromString(response.data, "text/xml");

                    // Access the elements and their text values
                    const userElement = xmlDoc.querySelector("User");

                    const name = userElement.querySelector("Name").textContent;
                    const age = parseInt(userElement.querySelector("Age").textContent);
                    const weight = parseFloat(userElement.querySelector("Weight").textContent);
                    const height = parseFloat(userElement.querySelector("Height").textContent);
                    const bmi = parseFloat(userElement.querySelector("BMI").textContent);

                    const obj = {
                        UserName: name,
                        Age: age,
                        Weight: weight,
                        Height: height,
                        BMI:bmi,
                    };

                    if(response.data){
                        this.setState(
                            {
                                userXMLReport: response.data,
                                userReport: obj,
                                viewReport: true
                            },
                            () => {
                                // Callback function after state is updated
                                console.log("userReport:", this.state.userReport);
                            })
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        message: 'Report not found'
                    });
                }
            );
    }


    render(){
        return (
            <div align="center">
                <h2>Reports</h2>
                <div className="my_workout">
                    {
                        (this.state.message) ? (
                            <h5 align="center" className="alert-warning"><i className="fa fa-warning"> {this.state.message}</i> </h5>
                        ) : null
                    }
                    <table width="400px">
                        <tbody align="left">
                        <tr>
                            <td>Generate Report</td>
                            <td>
                                <Button variant="primary" type="submit"  onClick={this.onGenerate}>
                                    <span>Generate Report</span>
                                </Button>
                            </td>
                            <td>
                                <Button variant="primary" type="submit" onClick={this.onViwe}>
                                    <span>View Report</span>
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    {
                        (this.state.viewReport) ? (
                            <div>
                                <h3>My Report</h3>
                                <table width="400px">
                                    <tbody align="left">
                                    <tr>
                                        <td>User Name</td>
                                        <td>{this.state.userReport.UserName}</td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td>{this.state.userReport.Age}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight(kg)</td>
                                        <td>{this.state.userReport.Weight}</td>
                                    </tr>
                                    <tr>
                                        <td>Height(m)</td>
                                        <td>{this.state.userReport.Height}</td>
                                    </tr>
                                    <tr>
                                        <td>BMI</td>
                                        <td>{this.state.userReport.BMI}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}