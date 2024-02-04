import React from "react";
import { Row, Col, Card, Button, Container, Modal } from "react-bootstrap";
import {
  callApi,
  getTodayFormatDate,
  getTodayFromDateObject,
  getTomorrow
} from "../utils/utils";
import { config } from "../utils/config";
import DatePicker from "react-widgets/DatePicker";
import Combobox from "react-widgets/Combobox";

import logo from "../assets/img/logo.svg";
import ATL from "../assets/img/logosNBA/atl";
import BKN from "../assets/img/logosNBA/bkn";
import BOS from "../assets/img/logosNBA/bos";
import CHA from "../assets/img/logosNBA/cha";
import CHI from "../assets/img/logosNBA/chi";
import CLE from "../assets/img/logosNBA/cle";
import DAL from "../assets/img/logosNBA/dal";
import DEN from "../assets/img/logosNBA/den";
import DET from "../assets/img/logosNBA/det";
import GSW from "../assets/img/logosNBA/gsw";
import HOU from "../assets/img/logosNBA/hou";
import IND from "../assets/img/logosNBA/ind";
import LAC from "../assets/img/logosNBA/lac";
import LAL from "../assets/img/logosNBA/lal";
import MEM from "../assets/img/logosNBA/mem";
import MIA from "../assets/img/logosNBA/mia";
import MIL from "../assets/img/logosNBA/mil";
import MIN from "../assets/img/logosNBA/min";
import NOP from "../assets/img/logosNBA/nop";
import NYK from "../assets/img/logosNBA/nyk";
import OKC from "../assets/img/logosNBA/okc";
import ORL from "../assets/img/logosNBA/orl";
import PHI from "../assets/img/logosNBA/phi";
import PHX from "../assets/img/logosNBA/phx";
import POR from "../assets/img/logosNBA/por";
import SAC from "../assets/img/logosNBA/sac";
import SAS from "../assets/img/logosNBA/sas";
import TOR from "../assets/img/logosNBA/tor";
import UTA from "../assets/img/logosNBA/uta";
import WAS from "../assets/img/logosNBA/was";
import LoaderScreen from "./Controls/LoadScreen";
//import Stats from "./Controls/Stats";
import PastGamesStats from "./Controls/PastGamesStats";
//import PastGamesStatsF from "./Controls/PastGamesStatsF";
//import WinAndLosses from "./Controls/WinAndLosses";

/**
 * Componente Base para comparar equipos
 * @component
 */

const ACTUAL_SEASON = "2023";
const SEASONSYEARS = [
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023"
];

class TeamCompareView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensaje: "",
      games: [],
      stats: [],
      stats: null,
      isLoading: false,
      isLoading2: false,
      date: new Date(),
      modalVMOpen: false,
      selectedGame: {},
      past_games: {},
      evalData: 0,
      season: "2018",
    };
  }

  Load = (dataType, params) => {
    this.setState({
      isLoading: true,
    });

    if(params === undefined)
    params ="{}";

    callApi(
      config.UrlApiProject +
        "nbaX_api/updateData?dataName=" +
        dataType +
        "&params=" +
        params,
      "GET",
      null
    )
      .then((result) => {
        alert(result);
        this.setState({
          mensaje: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        // this.setState({ isLoading: false });
        console.log("Error", error);
        this.setState({
          isLoading: false,
        });
      });
  };

  GetGames = (dataType, params, callback) => {
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
        callback(result);
        this.setState({
          games: result,
          isLoading: false,
        });
       
      })
      .catch((error) => {
        // this.setState({ isLoading: false });
        console.log("Error", error);  
        callback([]);
        this.setState({
          isLoading: false,
        });
      
      });
  };

  // GetPastGames = (dataType, params) => {
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
  //       this.setState({
  //         past_games: result,
  //         isLoading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       // this.setState({ isLoading: false });
  //       console.log("Error", error);
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  // };

  GetDataWithParams = (dataType, params) => {
    this.setState({
      isLoading: true,
    });
    callApi(
      config.UrlApiProject +
        "nbaX_api/updateDataWithParams?dataName=" +
        dataType +
        "&params=" +
        params,
      "GET",
      null
    )
      .then((result) => {
        this.setState({
          games: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        // this.setState({ isLoading: false });
        console.log("Error", error);
        this.setState({
          isLoading: false,
        });
      });
  };

  GetLogo = (name) => {
    let logo = null;
    switch (name) {
      case "ATL":
        logo = <ATL size={40} />;
        break;
      case "BKN":
        logo = <BKN size={40} />;
        break;
      case "BOS":
        logo = <BOS size={40} />;
        break;
      case "CHA":
        logo = <CHA size={40} />;
        break;
      case "CHI":
        logo = <CHI size={40} />;
        break;
      case "CLE":
        logo = <CLE size={40} />;
        break;
      case "DAL":
        logo = <DAL size={40} />;
        break;
      case "DEN":
        logo = <DEN size={40} />;
        break;
      case "DET":
        logo = <DET size={40} />;
        break;
      case "GSW":
        logo = <GSW size={40} />;
        break;
      case "HOU":
        logo = <HOU size={40} />;
        break;
      case "IND":
        logo = <IND size={40} />;
        break;
      case "LAC":
        logo = <LAC size={40} />;
        break;
      case "LAL":
        logo = <LAL size={40} />;
        break;
      case "MEM":
        logo = <MEM size={40} />;
        break;
      case "MIA":
        logo = <MIA size={40} />;
        break;
      case "MIL":
        logo = <MIL size={40} />;
        break;
      case "MIN":
        logo = <MIN size={40} />;
        break;
      case "NOP":
        logo = <NOP size={40} />;
        break;
      case "NYK":
        logo = <NYK size={40} />;
        break;
      case "OKC":
        logo = <OKC size={40} />;
        break;
      case "ORL":
        logo = <ORL size={40} />;
        break;
      case "PHI":
        logo = <PHI size={40} />;
        break;
      case "PHX":
        logo = <PHX size={40} />;
        break;
      case "POR":
        logo = <POR size={40} />;
        break;
      case "SAC":
        logo = <SAC size={40} />;
        break;
      case "SAS":
        logo = <SAS size={40} />;
        break;
      case "TOR":
        logo = <TOR size={40} />;
        break;
      case "UTA":
        logo = <UTA size={40} />;
        break;
      case "WAS":
        logo = <WAS size={40} />;
        break;
    }
    return logo;
  };

  GetPastGames(dataType, params,callback) {
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
        callback(JSON.parse(result));
        this.setState({
          stats: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("Error", error);
        callback([]);
        this.setState({
          isLoading: false,
        });
      });

  };


  // showModal = () => {
  //   this.setState({ modalVMOpen: true });
  // };

  // hideModal = () => {
  //   this.setState({ modalVMOpen: false });
  // };

  // ShowMoreStats = (game) => {
  //   let params = { team_1: game.home, team_2: game.visitor };
  //   this.GetPastGames("game_past_stats", JSON.stringify(params));

  //   // this.setState({ selectedGame: game });
  //   // this.showModal();
  // };
  ReciveData = (data) => {
    console.log(data);
    this.setState({ evalData: data });
  };

  getAllgamesYearsAgo = (years) => {
    let yearSeason = Number(ACTUAL_SEASON);
    let limit = yearSeason - years;
    while (yearSeason >= limit) {
      let params = { season: limit };
      this.GetDataWithParams("games", JSON.stringify(params));
      limit++;
    }
  };

  getAllPlayerStats = () => {
    // All teams of NBA
    let i = 1;
    while (i <= 30) {
      let params = { season: ACTUAL_SEASON, team_id: i };
      this.GetDataWithParams("team_players_stats", JSON.stringify(params));
      i++;
    }
  };

  onSelectDate = (data) => {
    this.setState({ games: [] });
    let params = { date: getTodayFromDateObject(data) };
    this.GetGames("games_today", JSON.stringify(params),(games)=>{
      this.getStatsOfGames(games);
    });

    this.setState({ date: data });
  };

  onSelectSeason = (data) => {
    this.setState({ games: [] });
    let params = { date:  getTodayFromDateObject(this.state.date)};
    this.GetGames("games_today", JSON.stringify(params),(games)=>{
      this.getStatsOfGames(games);
    });

    this.setState({ season: data });
    
  };

  getGamesParamsArray =(games,season,actualSeason)=>{
    let gamesParams = [];

    games.forEach(game => {
      let params = {  
        game_id: game.id,   
        team_1: game.homeShort,
        team_2: game.visitorShort,
        id_team_1: game.home_id,
        id_team_2: game.visitor_id,
        num_players: 5,
        season: season,
        actual_season: actualSeason
      }
      gamesParams.push(params);
    });
   

    return gamesParams;
  };

  getStatsOfGames = (games)=>{
    let gamesParams = this.getGamesParamsArray(games,this.state.season,ACTUAL_SEASON);

    this.GetPastGames("game_past_stats_array", JSON.stringify(gamesParams),(stats)=>{
       // merge with games
       let gamesMerge =[];

       games.forEach(game => {
            for (let i=0; i < stats.length; i++) {
              if (stats[i].game_id === game.id) {
                 let gameM = Object.assign(game, stats[i]);;
                 gamesMerge.push(gameM);
              }
          }

            this.setState({games:gamesMerge});
       });

      
     });


  };
  componentDidMount() {
    let params = { date: getTodayFormatDate() };
    this.GetGames("games_today", JSON.stringify(params),(games)=>{
     this.getStatsOfGames(games);
    });

  }
  // componentDidUpdate(prevProps, prevState) {
  //   // Hard for evaluation sheet
  //   if (prevState.date !== this.state.date) {
  //     var avgEval = parseFloat((100/this.state.games.length) * Number(localStorage.getItem('hits'))).toFixed(2);
  //     this.setState({avgEvaluation:avgEval});
  //   }

  // }

  // shouldComponentUpdate(prevProps, prevState){
  //     if (prevState.isLoading !== this.state.isLoading) {
  //   var avgEval = parseFloat((100/this.state.games.length) * Number(localStorage.getItem('hits'))).toFixed(2);
  //   // this.setState({avgEvaluation:avgEval});
  //     }
  // }

  render() {
    let games = this.state.games;
    // let past_games = this.state.past_games;
    // let past_games = this.state.past_games.games;
    // console.log("ACTUAL:",games ,"PAST:", past_games);

    // const PastGamesComponent = (past_games !== undefined)?past_games.map((game) => (
    //   <Col key={game.id}>
    //     <Card className="nbax-past-game-card">
    //       <Card.Header></Card.Header>
    //       <Card.Body>
    //         <Card.Title>
    //           <div className="nbax-vs-teams">
    //             {this.GetLogo(game.homeShort)} &nbsp; {game.home_team_score} -{" "}
    //             {game.visitor_team_score} &nbsp;
    //             {this.GetLogo(game.visitorShort)}
    //           </div>
    //           <div className="nbax-dates">{game.date}</div>
    //         </Card.Title>
    //         <Card.Text style={{ backgroundColor: "#3c3c3c" }}></Card.Text>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    // )):"";

    // const ModalDemo = () => (
    //   <Modal
    //     show={this.state.modalVMOpen}
    //     size="lg"
    //     aria-labelledby="contained-modal-title-vcenter"
    //     centered
    //   >
    //     <Modal.Header closeButton>
    //       <Modal.Title id="contained-modal-title-vcenter">
    //         <div className="nbax-vs-teams">
    //           {this.GetLogo(this.state.selectedGame.homeShort)} &nbsp;{" "}
    //           <h4>
    //             {" "}
    //             {this.state.selectedGame.home} Vs{" "}
    //             {this.state.selectedGame.visitor} &nbsp;
    //           </h4>
    //           {this.GetLogo(this.state.selectedGame.visitorShort)}
    //         </div>
    //       </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {/* <Row className="nbax-past-games-cont">{PastGamesComponent}</Row> */}

    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button className="nbax_btn1" onClick={this.hideModal}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // );

    const GamesComponent = games.map((game) => (
      <Col key={game.id}>
        <Card className="nbax-game-card">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
              <div style={{ fontFamily: "monospace", fontSize: "9px" }}>
                {game.id}
              </div>
              <div className="nbax-vs-teams">
                <div className="nbax-logo-winlose">
                  {this.GetLogo(game.homeShort)}
                  {/* <WinAndLosses
                    teamName={game.homeShort}
                    season={ACTUAL_SEASON}
                  /> */}
                </div>
                &nbsp; {game.home} Vs {game.visitor} &nbsp;
                <div className="nbax-logo-winlose">
                  {this.GetLogo(game.visitorShort)}
                  {/* <WinAndLosses
                    teamName={game.visitorShort}
                    season={ACTUAL_SEASON}
                  /> */}
                </div>
              </div>
              <div className="nbax-scores">
                {game.home_team_score > 0 ? game.home_team_score : ""} -{" "}
                {game.visitor_team_score > 0 ? game.visitor_team_score : ""}
              </div>
              <div className="nbax-dates">
                {game.date} &nbsp;&nbsp;| &nbsp;&nbsp;{game.status}
              </div>
            </Card.Title>
            <Card.Text style={{ backgroundColor: "#3c3c3c" }}></Card.Text>
            {/* <div className="nbax_stats">
              <Stats teamName={game.homeShort} season={this.state.season} />
              <Stats teamName={game.visitorShort} season={this.state.season} />
            </div> */}
            <hr />
            <div className="nbax_pastgames_stats">
            
              {/* <PastGamesStatsF game={game} season={this.state.season} actualSeason ={ACTUAL_SEASON}/> */}
              <PastGamesStats
                total_games_count={games.length}
                h_score={game.home_team_score}
                v_score={game.visitor_team_score}
                teamLongName1={game.home}
                teamName1={game.homeShort}
                teamLongName2={game.visitor}
                teamName2={game.visitorShort}
                id_team_1={game.home_id}
                id_team_2={game.visitor_id}
                sendData={this.ReciveData}
                season ={this.state.season}
                actual_season ={ACTUAL_SEASON}
                display_lw  = { (getTodayFromDateObject(this.state.date) === getTodayFormatDate() || getTodayFromDateObject(this.state.date) === getTomorrow())?1:0}
                percentage_wins_t1 ={game.percentage_wins_t1}
                percentage_wins_t2 ={game.percentage_wins_t2}
                percentage_winst1_ppts_index ={game.percentage_winst1_ppts_index}
                percentage_winst2_ppts_index ={game.percentage_winst2_ppts_index}
                team1_last_win ={game.team1_last_win}
                team2_last_win ={game.team2_last_win}
              />
            </div>
            {/* <div className="nbax-buttons">
              <Button
                onClick={() => this.ShowMoreStats(game)}
                className="nbax_btn1"
              >
                View More Stats
              </Button>
            </div> */}
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <div className="content">
        <LoaderScreen
          width={this.props.windowWidth}
          height={this.props.windowHeight}
          show={this.state.isLoading}
        />
        <Container className="s-content">
          <Row className="align-items-start ">
            <Col md="8">
              <Card className="navbar-wrapper">
                <Card.Header className="ch-t-1"></Card.Header>
                <Card.Body>
                  <div className="nbax-menu">
        
                    <Button
                      onClick={() => this.Load("teams")}
                      className="nbax_btn1"
                    >
                      Update Teams
                    </Button>
                  
                    
                    <Button
                      onClick={() => {
                        let params = { date: getTodayFormatDate() };
                        this.GetGames("games_today", JSON.stringify(params),(games)=>{
                          this.getStatsOfGames(games);
                        });
                        this.setState({ date: new Date() });
                      }}
                      className="nbax_btn1"
                    >
                      Get Today's Games
                    </Button>
                   
                    {/* <Button
                      onClick={() => {
                        this.getAllPlayerStats();
                      }}
                      className="nbax_btn1"
                    >
                      Get Players Stats all teams
                    </Button> */}
                    <DatePicker
                      value={this.state.date}
                      onSelect={this.onSelectDate}
                    />

                    <Combobox
                      defaultValue={this.state.season}
                      name="season"
                      placeholder="season"
                      data={SEASONSYEARS}
                      onSelect={this.onSelectSeason}
                    />
                    {/* <div className="nbax-evaluator">
                      EP: {this.state.evalData}% TSG:{" "}
                      {localStorage.getItem("hits")} / {games.length}
                    </div> */}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="nbax-games-cont">{GamesComponent}</Row>
        </Container>
        {/* <ModalDemo /> */}
      </div>
    );
  }
}
export default TeamCompareView;
