import React, { Component } from "react";
import { Admin, Login, Resource } from "react-admin";
import loopbackRestClient, { authClient } from "aor-loopback";

import { Config } from "./config";
import ContactUs from "./pages/ContactUs";
import Resources from "./pages/Resource";
import WhatWorks from "./pages/WhatWorks";
import WhatWorksTest from "./pages/WhatWorksTest";
import Blog from "./pages/Blog";
import Event from "./pages/Event";
import Story from "./pages/Story";
import Teams from "./pages/Teams";

import "./App.css";
import Indicators from "./pages/Indicators";
import SubIndicators from "./pages/SubIndicators";
import ManagePages from "./pages/ManagePages";

const LoginPage = () => (
  <Login backgroundImage="https://images.unsplash.com/photo-1504438190342-5951e134ffee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
);

class App extends Component {
  componentDidMount() {
    document.title = Config.app.name;
  }

  render() {
    console.log('res', {...Event})

    return ( 
      <Admin
        loginPage={LoginPage}
        dataProvider={loopbackRestClient(Config.api())}
        authProvider={authClient(Config.api() + "/Users/login")}
      >
        <Resource options={{ label: 'Inquiries' }} {...ContactUs} />
        <Resource options={{ label: 'Resources' }} {...Resources} />
        {/* <Resource {...Indicators} /> */}
        {/* <Resource {...SubIndicators} /> */}
        {/* <Resource options={{ label: 'What Works' }} {...WhatWorks} /> */}
        <Resource options={{ label: 'What Works' }} {...WhatWorksTest} />
        <Resource options={{ label: 'Blogs' }} {...Blog} />
        <Resource options={{ label: 'Events' }} {...Event} />
        <Resource options={{ label: 'Stories' }} {...Story} />
        <Resource options={{ label: 'Teams' }} {...Teams} />
        {/* <Resource options={{ label: 'Manage Pages' }} {...ManagePages} /> */}
      </Admin>
    );
  }
}

export default App;
