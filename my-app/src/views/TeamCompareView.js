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
import Stats from "./Controls/Stats";
import WinAndLosses from "./Controls/WinAndLosses";
import Standings from "./Controls/Standings";

/**
 * Componente Base para comparar equipos
 * @component
 */

const ACTUAL_SEASON = "2024";
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
let countAsserts = 0;
class TeamCompareView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensaje: "",
      gamesArr: [],
      isLoading: false,
      isLoading2: false,
      date: new Date(),
      asserts: 0
    };

    this.componentDOMref = React.createRef();
  }

  GetData = (dataType, params, callback) => {
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
        if(dataType === 'games_today'){
          this.setState({
            games: result,
            isLoading: false,
          });
        } else if(dataType === 'stats')
        {
          this.setState({
            stats: result,
            isLoading: false,
          });
        }
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

  UpdateData = (dataType, params,callback) => {
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
        callback(result);
        
          this.setState({
           
            isLoading: false,
          });
         
      })
      .catch((error) => {
        callback(error);
     
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
      case "GS":
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
      case "NO":
        logo = <NOP size={40} />;
        break;
      case "NY":
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
      case "PHO":
        logo = <PHX size={40} />;
        break;
      case "POR":
        logo = <POR size={40} />;
        break;
      case "SAC":
        logo = <SAC size={40} />;
        break;
      case "SA":
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

  onSelectDate = (data) => {
    this.setState({ games: [] });
    this.GetGames(getTodayFromDateObject(data));

    this.setState({ date:data});
  };

  LoadTeams=()=>{
    let params = { season: ACTUAL_SEASON };
    this.UpdateData("teams", JSON.stringify(params),(response)=>{
      alert(response);
    });
  };

  LoadGamesToday=()=>{
    this.UpdateGames(getTodayFromDateObject(this.state.date));
    //this.GetGames('2024-02-15');
  };

  UpdateGames = (date) =>{
    
    let params = { date:date };
    this.UpdateData("games_today", JSON.stringify(params),(response)=>{
      this.GetGames(date);
      
    });
  };

  GetGames =(date)=>{
    countAsserts = 0;
    let params = { date:date };
    //this.UpdateData("games_today", JSON.stringify(params),(response)=>{
      this.GetData("games_today", JSON.stringify(params),(games)=>{
        // Get Stats 
          let params ={ date:date };
          this.GetData("stats", JSON.stringify(params),(stats)=>{
              // merge with games
            let gamesMerge =[];
            games.forEach(game => {
              for (let i=0; i < stats.length; i++) {
              if (stats[i].GameID === game.GameID) {
                 let gameM = {game:game,stats:stats[i].Stats,
                  winAndLosses:stats[i].WinAndLosses,
                  lastGameResults:stats[i].LastGameResults,
                  standings:stats[i].Standings,
                  backToBack:stats[i].BackToBack
                }
                 gamesMerge.push(gameM);
              }
              }
            });

           console.log(gamesMerge);
          this.setState({ gamesArr:gamesMerge, asserts:0});

          
     });

    }); 
 // }); 
  }

  FuncCountAsserts = (assert)=>{
    countAsserts = countAsserts  + assert 
    this.setState({asserts: countAsserts});
  };
  
  // onSelectSeason = (data) => {
  //   this.setState({ games: [] });
  //   let params = { date:  getTodayFromDateObject(this.state.date)};
  //   this.GetData("games_today", JSON.stringify(params),(games)=>{
  //     this.getStatsOfGames(games);
  //   });

  //   this.setState({ season: data });
    
  // };

  componentDidMount() {
   
    this.LoadGamesToday();
  }
 
  render() {
    let games = this.state.gamesArr;

    const GamesComponent = games.map((obj,index) => (
      <Col key={obj.game.GameID}>
        <Card className="nbax-game-card" >
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title>
              <div style={{ fontFamily: "monospace", fontSize: "9px" }}>
                {obj.game.GameID}
              </div>
              <div className="nbax-vs-teams">
                <div className="nbax-logo-winlose">
                  {this.GetLogo(obj.game.HomeTeam)}
                   <WinAndLosses
                    winsLosses={obj.winAndLosses.HomeTeam[0]}
                  />
                    {/* Se muestra solo para hoy */}
                    {/* {(getTodayFormatDate() === getTodayFromDateObject(this.state.date))?(obj.lastGameResults.HomeTeam.length > 0 ? obj.lastGameResults.HomeTeam[0].IsWin: -1):''}
                    <br/> */}
                    {(getTodayFormatDate() === getTodayFromDateObject(this.state.date))?(obj.backToBack.HomeTeam.length > 0 ?  'B2B: ' + obj.backToBack.HomeTeam[0].JugoAyer: -1):''}
                   
                </div>
                &nbsp; {obj.game.HomeTeam} Vs {obj.game.AwayTeam} &nbsp;
                <div className="nbax-logo-winlose">
                  {this.GetLogo(obj.game.AwayTeam)}
                  <WinAndLosses
                    winsLosses={obj.winAndLosses.AwayTeam[0]}
                  />
                   {/* Se muestra solo para hoy */}
                  {/* {(getTodayFormatDate() === getTodayFromDateObject(this.state.date))?(obj.lastGameResults.AwayTeam.length > 0 ? obj.lastGameResults.AwayTeam[0].IsWin: -1):''}
                  <br/> */}
                 {(getTodayFormatDate() === getTodayFromDateObject(this.state.date))?(obj.backToBack.AwayTeam.length > 0 ? 'B2B: ' + obj.backToBack.AwayTeam[0].JugoAyer: -1):''}
                </div>
              </div>
              <div className="nbax-scores">
                {obj.game.HomeTeamScore > 0 ? obj.game.HomeTeamScore : ""} -{" "}
                {obj.game.AwayTeamScore > 0 ? obj.game.AwayTeamScore : ""}
              </div>
              <div className="nbax-dates">
                {obj.game.DateTime} &nbsp;&nbsp;| &nbsp;&nbsp;{obj.game.Status}
              </div>

              <div className="nbax-dates">
                {"Total Points: "} {obj.game.HomeTeamScore + obj.game.AwayTeamScore}
              </div>
            </Card.Title>
            <Card.Text style={{ backgroundColor: "#3c3c3c" }}></Card.Text>
            <div className="nbax_stats">
              <Stats stats={obj.stats} resHome ={obj.game.HomeTeamScore} resAway ={obj.game.AwayTeamScore}  componentDOM = {this.componentDOMref} indexComponent = {index} countAsserts={this.FuncCountAsserts} />
              <br/>
              <Standings standings={obj.standings} resHome ={obj.game.HomeTeamScore} resAway ={obj.game.AwayTeamScore}/>
            </div> 
          
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
                      onClick={() => this.LoadTeams()}
                      className="nbax_btn1"
                    >
                      Update Teams
                    </Button>
                  
                    
                    <Button
                      onClick={() => {
                       this.LoadGamesToday()
                      }}
                      className="nbax_btn1"
                    >
                      Update Games For:
                    </Button>

                    <DatePicker
                      value={this.state.date}
                      onSelect={this.onSelectDate}
                    />

                    {/* <Combobox
                      defaultValue={this.state.season}
                      name="season"
                      placeholder="season"
                      data={SEASONSYEARS}
                      onSelect={this.onSelectSeason} 
                    /> */}
                    <div className="nbax-evaluator">
                      EP: {Number((this.state.asserts/games.length) * 100).toFixed(0)}% &nbsp;&nbsp;| &nbsp;&nbsp; TSG:{" "}
                      {this.state.asserts} / {games.length}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="nbax-games-cont" ref={this.componentDOMref}>{GamesComponent}</Row>
        </Container>
        {/* <ModalDemo /> */}
      </div>
    );
  }
}
export default TeamCompareView;
