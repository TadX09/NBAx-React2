import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { callApi } from "../../utils/utils";
import { config } from "../../utils/config";


/**
 * STATS
 * @component
 */
class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {},
      isLoading: false,
      
    };
  }

  GetStats = (dataType, params) => {
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
          stats:result,
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
    const teamName = this.props.teamName
    const season = this.props.season

    let params= { name: teamName , season: season};
    this.GetStats("game_stats", JSON.stringify(params));
  }

  render() {
    const stats = this.state.stats;
    return (
      <div>
       <table>
		<tbody>
			<tr>
				<td>Avg Points Dif.</td>
				<td>{stats.avg_pofD}</td>
			</tr>
			<tr className="table_tr_color">
				<td>Wins</td>
				<td className={(stats.percentage_wins < 50)?'c_orange':'none'}>{stats.percentage_wins}%</td>
			</tr>
			<tr>
				<td>TP Home</td>
				<td>{stats.avg_total_points_home}</td>
			</tr>
			<tr className="table_tr_color" >
				<td>TP Visitor</td>
				<td>{stats.avg_total_points_visitor}</td>
			</tr>
			<tr>
				<td>TP</td>
				<td>{stats.avg_total_points}</td>
			</tr>
			<tr className="table_tr_color">
				<td>Is Par Game</td>
				<td>{stats.percentage_isParGame}%</td>
			</tr>
			<tr>
				<td>LorW Past Game</td>
				<td className={(stats.lw_past_game == 0)?'c_red':'c_green'}>{(stats.lw_past_game == 0)?'Lost':'Win'}</td>
			</tr>
			<tr className="table_tr_color">
				<td>TP Team</td>
				<td>{stats.avg_team_points}</td>
			</tr>
			<tr>
				<td>Is Par Team</td>
				<td>{stats.percentage_isParTeam}%</td>
			</tr>
		</tbody>
	</table>
       
      </div>
    );
  }
}
export default Stats;
