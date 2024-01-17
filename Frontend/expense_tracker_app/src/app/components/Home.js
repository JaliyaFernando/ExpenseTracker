import React,{Component} from 'react';
import DashboardCard from "./DashboardCard";
import {Container} from "react-bootstrap";

export default class Home extends Component{
    render(){
        return (
            <div className="home" id="home" align="center">
                <h1>My Expense Tracker</h1>
                <Container>
                    <DashboardCard/>
                </Container>
            </div>
        );
    }
}