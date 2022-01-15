import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 /* Para accesder a servicios Firebase */
import {FirebaseAppProvider} from 'reactfire';
import firebaseConfig from './firebase-config';

/* Importamos la Paginas */
import Inicio from './paginas/Inicio';
import PedidosPendienteEntrega from './paginas/PedidosPendienteEntrega';
import PedidosPagoEfectivo from './paginas/PedidosPagoEfectivo';
import PedidosPagoDepositoBancario from './paginas/PedidosPagoDepositoBancario';
import PedidosCocluidos from './paginas/PedidosCocluidos';

/* Router */
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <React.Suspense fallback={ "Cargando" }>
      {/*   <div className="">menu</div> */}
      <BrowserRouter>
       <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/Inicio" component={Inicio} />
          <Route exact path="/PedidosPendienteEntrega" component={PedidosPendienteEntrega}/>
          <Route exact path="/PedidosPagoEfectivo" component={PedidosPagoEfectivo}/>
          <Route exact path="/PedidosCocluidos" component={PedidosCocluidos} />
          <Route exact path="/PedidosPagoDepositoBancario" component={PedidosPagoDepositoBancario} />
       </Switch>
      </BrowserRouter>
      
    </React.Suspense>
  </FirebaseAppProvider>
  ,document.getElementById('root')
);