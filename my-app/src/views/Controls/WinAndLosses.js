import React from "react";
import { callApi } from "../../utils/utils";
import { config } from "../../utils/config";

/**
 * WINS AND LOSSES BY TEAM
 * @component
 */
class WinAndLosses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winsLosses:this.props.winsLosses,
    };
  }

  componentDidMount() {
    
  }

  render() {
    const wl = this.state.winsLosses;

    if (wl === undefined) return;

    return (
      <span>
        ({wl.Wins}-{wl.Losses})
      </span>
    );
  }
}
export default WinAndLosses;
