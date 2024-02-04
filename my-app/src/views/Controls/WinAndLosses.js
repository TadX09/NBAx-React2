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
      stats: {},
      isLoading: false,
      winsLosses: [],
    };
  }

  GetWinsAndLosses = (dataType, params) => {
    this.setState({
      isLoading: true,
    });
    callApi(
      config.UrlApiProject +
        "nbaX_api/getData?dataName=" +
        dataType +
        "&params=" +
        params,
      "GET",
      null
    )
      .then((result) => {
        console.log(result);
        this.setState({
          winsLosses: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("Error", error);
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidMount() {
    const teamName = this.props.teamName;
    const season = this.props.season;

    let params = { team_name: teamName, season: season };
    this.GetWinsAndLosses("get_win_and_loss_games", JSON.stringify(params));
  }

  render() {
    const wl = this.state.winsLosses[0];
    if (wl === undefined) return;

    return (
      <span>
        ({wl.Wins}-{wl.Losses})
      </span>
    );
  }
}
export default WinAndLosses;
