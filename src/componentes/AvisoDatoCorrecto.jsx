import React from 'react';
import './styles/AvisoDatoCorrecto.scss'
class AvisoDatoCorrecto extends React.Component{
    render(){
        return(
            <div className="aviso-correcto">
                <h6 className="texto-aviso-correo">{this.props.text}</h6>
            </div>
        )
    }
}
export default AvisoDatoCorrecto;