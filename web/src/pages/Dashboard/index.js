import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { Config } from "../../config";

class Dashboard extends Component {
  componentDidMount() {
    document.title = Config.app.name + " - Dashboard";
  }

  render() {
    return (
      <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
          <p>Welcome title.</p>
          <p>Welcome message</p>
        </CardContent>
      </Card>
    );
  }
}

export default Dashboard;
