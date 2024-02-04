import React from "react";
import { callApi, callApi2, getTodayFormatDate } from "../../utils/utils";
import { config } from "../../utils/config";

/**
 * PAST GAMES STATS
 * @component
 */

const DIF_PERCENTAGE_WIN = 34;

class PastGamesStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      teamNameh: "",
      teamNamev: "",
    };
  }
  //   this.setState({
  //     isLoading: true,
  //   });
    
  //   callApi(
  //     config.UrlApiProject +
  //       "nbaX_api/getData?dataName=" +
  //       dataType +
  //       "&params=" +
  //       params,
  //     "GET",
  //     null
  //   )
  //     .then((result) => {
  //       console.log(result);
  //       this.setState({
  //         stats: result,
  //         isLoading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });

  // };

  componentDidMount() {

    localStorage.setItem("hits", 0);
    
    this.setState({ isLoading:false });
  }
  componentDidUpdate(prevProps, prevState) {
    // Hard Count for hits for evaluation sheet
    if (prevState.isLoading !== this.state.isLoading) {
      if (
        (this.props.h_score > this.props.v_score &&
          (this.props.percentage_wins_t1 >
            this.props.percentage_wins_t2 ||
            this.props.percentage_winst1_ppts_index >
              this.props.percentage_winst2_ppts_index) &&
          (this.props.h_score > 0 || this.props.v_score > 0)) ||
        (this.props.h_score < this.props.v_score &&
          (this.props.percentage_wins_t1 <
            this.props.percentage_wins_t2 ||
            this.props.percentage_winst1_ppts_index <
              this.props.percentage_winst2_ppts_index) &&
          (this.props.h_score > 0 || this.props.v_score > 0))
      ) {
        let hits = Number(localStorage.getItem("hits"));
        hits++;
        localStorage.setItem("hits", hits);

        var avgEval = parseFloat(
          (100 / this.props.total_games_count) *
            Number(localStorage.getItem("hits"))
        ).toFixed(2);
        this.props.sendData(avgEval);
      }
    }
  }
  render() {
    const past_games = this.props;
    let oneOrtwo = "";

    if (
      (this.props.h_score > this.props.v_score &&
        past_games.percentage_wins_t1 > past_games.percentage_wins_t2 &&
        (this.props.h_score > 0 || this.props.v_score > 0)) ||
      (this.props.h_score < this.props.v_score &&
        past_games.percentage_wins_t1 < past_games.percentage_wins_t2 &&
        (this.props.h_score > 0 || this.props.v_score > 0))
    ) {
      //oneOrtwo = "c_green2";
      if (
        this.props.h_score > this.props.v_score &&
        past_games.percentage_winst1_ppts_index >
          past_games.percentage_winst2_ppts_index &&
        (this.props.h_score > 0 || this.props.v_score > 0)
      ) {
        oneOrtwo = "c_orange";
      } else if (
        this.props.h_score < this.props.v_score &&
        past_games.percentage_winst1_ppts_index <
          past_games.percentage_winst2_ppts_index &&
        (this.props.h_score > 0 || this.props.v_score > 0)
      ) {
        oneOrtwo = "c_orange";
      } 
      else{oneOrtwo = "c_green2"}
    } else if (
      (this.props.h_score > this.props.v_score &&
        past_games.percentage_winst1_ppts_index >
          past_games.percentage_winst2_ppts_index &&
        (this.props.h_score > 0 || this.props.v_score > 0)) ||
      (this.props.h_score < this.props.v_score &&
        past_games.percentage_winst1_ppts_index <
          past_games.percentage_winst2_ppts_index &&
        (this.props.h_score > 0 || this.props.v_score > 0))
    ) {
      oneOrtwo = "c_blue2";
    } else {
      oneOrtwo = "";
    }

    return (
      // <div
      //   className={
      //     (this.props.h_score > this.props.v_score &&
      //       past_games.percentage_wins_t1 > past_games.percentage_wins_t2 &&
      //       (this.props.h_score > 0 || this.props.v_score > 0)) ||
      //     (this.props.h_score < this.props.v_score &&
      //       past_games.percentage_wins_t1 < past_games.percentage_wins_t2 &&
      //       (this.props.h_score > 0 || this.props.v_score > 0))
      //       ? "c_green2"
      //       : ""
      //   }
      // >

      // (this.props.h_score > this.props.v_score &&
      //   (past_games.percentage_wins_t1 > past_games.percentage_wins_t2 ||
      //     past_games.percentage_winst1_ppts_index >
      //       past_games.percentage_winst2_ppts_index) &&
      //   (this.props.h_score > 0 || this.props.v_score > 0)) ||
      // (this.props.h_score < this.props.v_score &&
      //   (past_games.percentage_wins_t1 < past_games.percentage_wins_t2 ||
      //     past_games.percentage_winst1_ppts_index <
      //       past_games.percentage_winst2_ppts_index) &&
      //   (this.props.h_score > 0 || this.props.v_score > 0))
      //   ? "c_green2"
      //   : ""
      <div className={oneOrtwo} style={{width:"100%",borderRadius:"7px",display:"grid"}} >
        <table>
          <tbody>
            <tr>
              <td>{this.props.teamLongName1}</td>
              <td
                style={{ fontSize: "20px" }}
                className={
                  past_games.percentage_wins_t1 > past_games.percentage_wins_t2
                    ? "c_green"
                    : "c_red"
                }
              >
                {past_games.percentage_wins_t1}%
              </td>
              {/* <td>Avg P. Dif.</td>
              <td style={{ fontSize: "14px" }}>{past_games.avg_pofD}</td> */}
            
              <td style={{ fontSize: "10px" ,display:this.props.display_lw === 0?"none":""}}
               className={
                past_games.team1_last_win > 0
                  ? "c_green"
                  : "c_red"
              }
              >{past_games.team1_last_win > 0 ? "Viene de Ganar":"Viene de Perder" }</td> 
            </tr>
            <tr>
              <td>{this.props.teamLongName2}</td>
              <td
                style={{ fontSize: "20px" }}
                className={
                  past_games.percentage_wins_t1 < past_games.percentage_wins_t2
                    ? "c_green"
                    : "c_red"
                }
              >
                {past_games.percentage_wins_t2}%
              </td>
              {/* <td>Avg. TP</td>
              <td style={{ fontSize: "14px" }}>
                {past_games.avg_total_points}
              </td> */}
            
            <td style={{ fontSize: "10px" ,display:this.props.display_lw === 0?"none":""}}
               className={
                past_games.team2_last_win > 0
                  ? "c_green"
                  : "c_red"
              }
              >{past_games.team2_last_win > 0 ? "Viene de Ganar":"Viene de Perder" }</td> 
            </tr>
            {/* <tr>
                 
                </tr>
                <tr className="table_tr_color">
                 
                </tr> 
            <tr>
              <td>Perc. Dif.</td>
              <td
                className={
                  Math.abs(
                    past_games.percentage_wins_t1 -
                      past_games.percentage_wins_t2
                  ) > DIF_PERCENTAGE_WIN
                    ? "c_blue"
                    : ""
                }
              >
                {Math.abs(
                  past_games.percentage_wins_t1 - past_games.percentage_wins_t2
                )}
                %
              </td>
              <td>Is Par</td>
              <td style={{ fontSize: "14px" }}>
                {past_games.percentage_isParGame}%
              </td>
            </tr>
            <tr>
              <td>{this.props.teamLongName1}</td>
              <td
                style={{ fontSize: "16px" }}
                className={
                  past_games.percentage_winst1_ppts_index >
                  past_games.percentage_winst2_ppts_index
                    ? "c_green"
                    : "c_red"
                }
              >
                {past_games.percentage_winst1_ppts_index}%
              </td>
              <td>{this.props.teamLongName2}</td>
              <td
                style={{ fontSize: "16px" }}
                className={
                  past_games.percentage_winst2_ppts_index >
                  past_games.percentage_winst1_ppts_index
                    ? "c_green"
                    : "c_red"
                }
              >
                {past_games.percentage_winst2_ppts_index}%
              </td>
            </tr>*/}
          </tbody>
        </table>
      </div>
    );
  }
}
export default PastGamesStats;
