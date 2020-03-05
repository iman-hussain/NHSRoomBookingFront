import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default class Title extends Component {

    backArrowVisible(){
        if (this.props.title !== "Homepage"){
            if(!this.props.route){
                return(
                <a href='/' id="backIcon">
                    <h4><FontAwesomeIcon icon={faArrowAltCircleLeft} /></h4>
                </a>
                )
            }else{
                return(
                    <a href={this.props.route} id="backIcon">
                        <h4><FontAwesomeIcon icon={faArrowAltCircleLeft} /></h4>
                    </a>
                )
            }
        }
    }

    render() {
        return (
            <div className="title">
                {this.backArrowVisible()}
                <h4>{this.props.title}</h4>
            </div>
        )
    }
}