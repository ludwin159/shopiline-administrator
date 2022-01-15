import './styles/IniciarSesionAdmin.scss'
import React, { useEffect } from 'react';
import './styles/IniciarSesionAdmin.scss';
import { useUser, useFirebaseApp, firestore } from 'reactfire';
import {Link} from 'react-router-dom';
import imagenAdmin from '../imagenes/admin.png';


function IniciarSesionAdmin(props){
    
    const [correo,setCorreo]= React.useState('');
    const [password, setPassword] = React.useState('') 
    const [admin, setAdmin] = React.useState('');
    const user = useUser();
    
    const firebase = useFirebaseApp();
       /* Salir */
    const salirSesion = async()=>{
        await firebase.auth().signOut();
    }
   
    
    useEffect(()=>{ 
    });
    /* Ingresar */
    const iniciarSesion = async()=>{
        if(correo.trim()===""|| password.trim()===""){
            return
        }
        await firebase.auth().signInWithEmailAndPassword(correo,password)
        .then(result=>{
            setCorreo('');
            setPassword('');
        })
        .catch(error=>{
        })
    }

    const db = firestore();

    const consultarAdmin= async()=>{
        await db.collection('Administrador')
        .where("idUsuario","==",user.uid)
        .where("Cargo","==","Administrador")
        .onSnapshot(querySnapshot=>{
            if(querySnapshot.empty){
                setAdmin(false)
                return;
            }
            querySnapshot.forEach((admin)=>{
                if(admin.data().idUsuario === user.uid){
                    setAdmin(true);
                    return
                    
                }
                else{setAdmin(false)
                }

            })


        })

    }
    if(admin===false){
        salirSesion();

    }



    {user &&
        consultarAdmin();
        
    }


    return(
        <div className="IniciarSesionAdmin">
            {!user &&
            <div className="Iniciar-sesion-admin"> 
                <div className="iniciar-sesion-container">
                    <div className="formulario-ingreso">
                        <h1>ADMINISTRADOR</h1>
                        <img src={imagenAdmin} alt=""/>
                        <h2>Correo</h2>
                        <input type="text" onChange={(ev)=>setCorreo(ev.target.value)} />
                        <h2>Contraseña</h2>
                        <input type="password" onChange={(ev)=>setPassword(ev.target.value)}/>
                        <button type="button" onClick={iniciarSesion} >INGRESAR</button>
                    </div>
                </div>   
            </div>
            }
            {user &&
            <div className="MenuAdmi">
                <div className="container-menu">
                    <div className="menu-datos">
                        <img src={imagenAdmin} alt=""/>
                        <div className="datos-admin">
                            <h1 className="dato"><strong>Nombre : </strong>{user.displayName}</h1>
                            <button type="button" onClick={salirSesion} >Salir</button>
                        </div>

                        <div className="opciones-admi">
                            
                            <Link to="/PedidosPagoEfectivo" className="opcion"><button>Pedido Pago Efectivo</button></Link>
                            <Link to="PedidosPagoDepositoBancario" className="opcion"><button>Pedido Desposito Bancario</button></Link>
                            <Link to="/PedidosPendienteEntrega" className="opcion"><button>Pedido Pendiente Entrega</button></Link>
                            <Link to="/PedidosCocluidos" className="opcion"><button>Pedidos Concluidos</button></Link>
                        </div>
                    </div>
                </div>
                
            </div>
            }
        </div>
    )
        
} 
export default IniciarSesionAdmin;