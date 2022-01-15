import React from 'react';
import './styles/AvisoDatoIncorrecto.scss'
class AvisoDatoIncorrecto extends React.Component{
    render(){
        return(
            <div className="container-info-error" id="container-info-error">
                 <small className="info">{this.props.text}
                 </small>
            </div>
        )
    }
}
export default AvisoDatoIncorrecto;