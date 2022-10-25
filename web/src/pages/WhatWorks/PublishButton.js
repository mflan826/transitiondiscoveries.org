// in src/comments/ApproveButton.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showNotification as showNotificationAction } from "react-admin";
import { push as pushAction } from "connected-react-router";
import { Config } from "../../config";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class PublishButton extends Component {
  handleClick = () => {
    debugger;
    const { push, record, showNotification } = this.props;

    const updatedRecord = { ...record };
    fetch(Config.api() + `/whatworks/${record.id}/publish`, {
      method: "POST",
      body: updatedRecord,
    })
      .then(() => {
        showNotification("Whatworks Data published");
        push("/whatworks");
      })
      .catch((e) => {
        console.error(e);
        showNotification("Error: Data not approved", "warning");
      });
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        color="primary"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Publish
      </Button>
    );
  }
}

PublishButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction,
})(PublishButton);
