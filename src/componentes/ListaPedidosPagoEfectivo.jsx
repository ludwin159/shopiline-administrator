import React from 'react';
import './styles/ListaPedidosDepositoBancario.scss';
import {useUser, useFirebaseApp} from 'reactfire';

function ListaPedidosPagoEfectivo(props){
    const Id = props.Id;
    const Estado = props.Estado;
    const Fecha = props.Fecha;
    const Departamento = props.Departamento;
    const Provincia = props.Provincia;
    const Distrito = props.Distrito;
    const Telefono = props.Telefono;
    const TipoPago = props.TipoPago;
    const TotalPedido = props.TotalPedido;
    const Direccion = props.Direccion;
    const Usuario = props.Usuario;
    const [productosPedidos, setProductosPedidos]= React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [dni, setDni] = React.useState('');
    const firebase = useFirebaseApp();
    const user = useUser();
    const db = firebase.firestore();

    const consultarDatosUsuario = async()=>{
        if(Usuario.trim()===''){
            return "";
        }
        await  db.collection('Usuario')
        .where('idUsuario','==',Usuario)
        .onSnapshot(querySnapshot=>{
            if(querySnapshot=>{
                return;
            })
            querySnapshot.forEach((usuarioDePedido)=>{
                setNombre(usuarioDePedido.data().nombre);
                setApellido(usuarioDePedido.data().apellido);
                setDni(usuarioDePedido.data().dni);
            })
        })

    }
    {user &&
        consultarDatosUsuario();
    }

    const consultarProductosPedidos= async()=>{

        if(productosPedidos !== ''){
            return
        };

        await db.collection('ProductoPedido')
        .where('idPedido','==',Id)
        .onSnapshot(querySnapshot=>{
            if(querySnapshot.empty){
                return
            }
            let MisProductosRegistrados= [];
            querySnapshot.forEach(
                (ProductoRegistrado)=>{
                    MisProductosRegistrados.push({
                        cantidad: ProductoRegistrado.data().cantidad,
                        detalle: ProductoRegistrado.data().detalle,
                        idPedido: ProductoRegistrado.data().idPedido,
                        idProducto: ProductoRegistrado.data().idProducto,
                        imagen: ProductoRegistrado.data().imagen,
                        nombre: ProductoRegistrado.data().nombre,
                        precio: ProductoRegistrado.data().precio,
                        subTotal: ProductoRegistrado.data().subTotal,
                        idProductoPedido: ProductoRegistrado.id,
                    })
                })
                setProductosPedidos(MisProductosRegistrados);
        })
    };
    consultarProductosPedidos()

    const actualizarPedidoAEntrega= async()=>{

        await db.collection('Pedido')
        .doc(Id)
        .update({
            Estado: "PEDIDO A ENTREGAR",
        })
        

    }
    const cancelarPedido = async()=>{
        await db.collection('Pedido')
        .doc(Id)
        .update({
            Estado: "CANCELADO"
        })
    }

    return(
        <div className="container-pedido">
        <h3> <strong>Nombre : </strong> {nombre} {apellido} </h3>
        <h3> <strong>DNI : </strong> {dni}  </h3>

        <h3> <strong>Telefono: </strong> {Telefono} </h3>
        <h3> <strong>Fecha Registrada :</strong> {Fecha}</h3>
        <h3> <strong>Id Pedido : </strong> {Id} </h3>
        <h3> <strong>Tipo de Pago : </strong> {TipoPago}</h3>
        <h3> <strong>Estado : </strong> {Estado}</h3>
        <h3> <strong>Dirección : </strong> {Departamento}/{Provincia}/{Distrito} - {Direccion} </h3>
        <div className="container-productos-lista-pedidos">
            <h2 className="title">Producto</h2>
            <h2 className="title">Detalle</h2>
            <h2 className="title">Precio</h2>
            <h2 className="title">Cantidad</h2>
            <h2 className="title">Sub Total</h2>

            {productosPedidos &&
            productosPedidos.map(Producto=>(
                <React.Fragment key={Producto.idProductoPedido} >
                    <h2 className="element ">{Producto.nombre}</h2>
                    <h2 className="element">{Producto.detalle}</h2>
                    <h2 className="element">S/{Producto.precio} </h2>
                    <h2 className="element">{Producto.cantidad} </h2>
                    <h2 className="element">S/{Producto.subTotal}</h2>
                </React.Fragment>
                
            ))
            }


        </div>
        <h5 className="Total-pedido"> <small>Total:</small> S/ {TotalPedido} </h5>
         <button onClick={actualizarPedidoAEntrega} className="confirmarPedidoEntrega">CONFIRMAR PEDIDO A ENTREGA</button>
         <button onClick={cancelarPedido} className="confirmarPedidoEntrega cancelar">ELIMINAR</button>

    </div>
    )
}
export default ListaPedidosPagoEfectivo;