import React,{Component} from 'react';
import { Card,Button } from 'react-bootstrap';

export default class MenuCard extends Component{
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }
    onClickButton(e) {
        e.preventDefault();
        window.location.href = this.props.link;
    }
    render(){
        return (
            <Card style={{borderColor:this.props.backgroundColor,borderWidth:'5px',borderRadius:'65px',color:this.props.backgroundColor}} className="menuCard" >
                <Card.Img className="mainCardImg" variant="top" src={this.props.image} />
                <Card.Footer style={{backgroundColor:'transparent',padding:'0px'}} onClick={this.onClickButton}>
                    <Button style={{backgroundColor:this.props.backgroundColor}}><span>{this.props.description}</span></Button>
                </Card.Footer>
            </Card>
        );
    }
}