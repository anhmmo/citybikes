import React from "react";

import { Spinner } from "react-bootstrap";

function Loading(props) {
  return <Spinner id="spinner" animation="grow" role="status"></Spinner>;
}

export default Loading;
