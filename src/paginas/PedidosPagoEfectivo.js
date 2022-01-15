import React from 'react';
import ListaPedidosPagoEfectivo from '../componentes/ListaPedidosPagoEfectivo';
import './styles/Pedidos.scss'
import {useUser, firestore, useFirebaseApp} from 'reactfire';

function PedidosPagaEfectivo(props){
    const [idPedidos, setIdPedidos] = React.useState('');
    const db = firestore();
    const user = useUser();
    const [admin, setAdmin] = React.useState('');
    const firebase = useFirebaseApp();
    /* Salir */
    const salirSesion = async()=>{
     await firebase.auth().signOut();
    }

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



    const consultarPedidos= async ()=>{
        if(idPedidos !==''){
            return
        }
        await db.collection('Pedido')
        .where("TipoPago","==","Pago Efectivo")
        .onSnapshot(querySnapShot=>{
            if(querySnapShot.empty){
                return;
            }
            let misPedidosId = [];
            querySnapShot.forEach((PedidoUsuario)=>{
                if(PedidoUsuario.data().Estado === 'PENDIENTE'){
                    misPedidosId.push({
                        id: PedidoUsuario.id,
                        Estado: PedidoUsuario.data().Estado,
                        Fecha: PedidoUsuario.data().Fecha,
                        Departamento: PedidoUsuario.data().Departamento,
                        Provincia: PedidoUsuario.data().Provincia,
                        Distrito: PedidoUsuario.data().Distrito,
                        Telefono: PedidoUsuario.data().Telefono,
                        TipoPago: PedidoUsuario.data().TipoPago,
                        TotalPedido: PedidoUsuario.data().TotalPedido,
                        Direccion: PedidoUsuario.data().Direccion,
                        Usuario: PedidoUsuario.data().Usuario,
                    })
                }

            })
            setIdPedidos(misPedidosId);

        })
    }
    {user &&
        consultarPedidos();
    
    }

    return(
        <div className="MisPedidosUsuario">
                <h1>PEDIDOS PAGO EFECTIVO</h1>
                
            <div className="container-mis-pedidos">
                    {
                       idPedidos &&
                       idPedidos.map(miPedido=>(
                           <ListaPedidosPagoEfectivo 
                           key={miPedido.id} 
                           Id={miPedido.id} 
                           Estado={miPedido.Estado}
                           Fecha={miPedido.Fecha}
                           Departamento={miPedido.Departamento}
                           Provincia={miPedido.Provincia}
                           Distrito={miPedido.Distrito}
                           Telefono={miPedido.Telefono}
                           TipoPago={miPedido.TipoPago}
                           TotalPedido={miPedido.TotalPedido}
                           Direccion={miPedido.Direccion}
                           Usuario={miPedido.Usuario}
                           />                
                           ))            
                    }
               
            </div>
        </div>)
        
        
}
export default PedidosPagaEfectivo;
