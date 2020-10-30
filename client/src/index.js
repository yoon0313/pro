
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";


import NewPage from "views/examples/NewPage.js"
import OldPage from "views/examples/OldPage.js";
import NewDescriptPage from "views/examples/NewDescriptPage.js"
import OrderPage from "views/examples/OrderPage.js"
import OrderCompletePage from "views/examples/OrderCompletePage.js"
import OldDescriptPage from "views/examples/OldDescriptPage.js";
import UploadOldPage from "views/examples/UploadOldPage.js"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={props => <Index {...props} />} />
      <Route
        path="/old-page"
        render={props => <OldPage {...props} />}
      />
      <Route
        path="/new-page"
        render={props => <NewPage {...props} />}
      />
      <Route
        path="/new-descript-page"
        render={props => <NewDescriptPage {...props} />}
      />

      <Route
        path="/order-page"
        render={props => <OrderPage {...props} />}
      />
      <Route
        path="/order-complete-page"
        render={props => <OrderCompletePage {...props} />}
      />
      <Route
        path="/old-descript-page"
        render={props => <OldDescriptPage {...props} />}
      />
      <Route
       exact path="/upload-old-page"
        render={props => <UploadOldPage {...props} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
