import React,{Component} from 'react';
import {CardDeck, Container} from 'react-bootstrap';
import CardData from "./ComponentCardData";
import Cards from "./MenuCard";

export default class DashboardCard extends Component{
    render(){
        const icons = CardData.map(icon =><Cards key={icon.id} image={icon.image} description={icon.description} backgroundColor={icon.backgroundColor} link={icon.link}/>);
        return (
            <div className="dashboard">
                <Container align="center">
                    <CardDeck>
                        {icons}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}