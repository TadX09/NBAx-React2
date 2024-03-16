import React from "react";

/**
 * STANDINGS
 * @component
 */
const TOTAL_MAX_POINTS = 220;
class Standings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      standings: this.props.standings,
        //Equipo Home
      totalPointsHome : this.props.standings.HomeTeam[0].PointsPerGameFor,
      totalPointsReciveHome : this.props.standings.HomeTeam[0].PointsPerGameAgainst,
      //Equipo Away
      totalPointsAway : this.props.standings.AwayTeam[0].PointsPerGameFor,
      totalPointsReciveAway : this.props.standings.AwayTeam[0].PointsPerGameAgainst,
      
      TP:0,
      TP_Home:0,
      TP_Away:0,
      UnderTP:0,
      OverTP:0,
      FinalResult:0,
      DiffTP:0,
      DiffHome:0,
      DiffVisitor:0
    };
  }

  componentDidMount() {
    let mediaPointsHome = this.state.totalPointsHome;// (this.state.totalPointsHome + this.state.totalPointsReciveHome)/2;
    
    let mediaPointsAway = this.state.totalPointsAway;//(this.state.totalPointsAway + this.state.totalPointsReciveAway)/2;
  
     // Board
     let TP = mediaPointsHome + mediaPointsAway - 3.5;
     let TP_Home = mediaPointsHome;
     let TP_Away =mediaPointsAway;
 
     let factor = Math.abs(TP_Home - TP_Away);
 
     let OverTP = TP - factor;
     let UnderTP = TP + factor;
 
     let FinalResult  = this.props.resHome + this.props.resAway;

     let DiffTP = TP - FinalResult;
     let DiffHome = TP_Home - this.props.resHome;
     let DiffVisitor = TP_Away - this.props.resAway;

    this.setState({TP,TP_Home,TP_Away,OverTP,UnderTP,FinalResult,DiffTP,DiffHome,DiffVisitor});
  }

  render() {
    const standings = this.state.standings;

    // Calcula Totales
    //Equipo Home
    // let totalPointsHome = standings.HomeTeam[0].PointsPerGameFor;
    // let totalPointsReciveHome = standings.HomeTeam[0].PointsPerGameAgainst;

    // Promedio o Media de Puntos
    //let mediaPointsHome = (totalPointsHome + totalPointsReciveHome)/2;
 
    //Equipo Away
    // let totalPointsAway = standings.AwayTeam[0].PointsPerGameFor;
    // let totalPointsReciveAway = standings.AwayTeam[0].PointsPerGameAgainst;

    // Promedio o Media de Puntos
    //let mediaPointsAway = (totalPointsAway + totalPointsReciveAway)/2;

    // Board
    // let TP = Math.round(Number(mediaPointsHome + mediaPointsAway).toFixed(2));
    // let TP_Home = Math.round(Number(mediaPointsHome).toFixed(2));
    // let TP_Away = Math.round(Number(mediaPointsAway).toFixed(2));

    // let factor = Math.abs(TP_Home - TP_Away);

    // let OverTP = TP - factor;
    // let UnderTP = TP + factor;

    // let FinalResult  = this.props.resHome + this.props.resAway;

    // Evaluation
    let colorUnder='';
    let colorOver='';
    let colorMaxPoints ='';

    if(this.state.FinalResult > 0){
        if(this.state.FinalResult < this.state.UnderTP)
        {
          colorUnder = 'c_blue';
        }else{
          colorUnder = 'c_red';
        }
        
        if (this.state.FinalResult > this.state.OverTP)
        {
          colorOver='c_blue'
        }
        else{
          colorOver = ''
        }
    }

    if(this.state.TP >= TOTAL_MAX_POINTS ){
      colorMaxPoints ='c_yellow';
    }else{
      colorMaxPoints ='';
    }

     
    return (
    <div>

      <table className="tg">
      <thead>
        <tr>
          <th className="tg-a4lg">Total Points | Diff:{this.state.DiffTP<0?" + ":" - "}{Math.abs(this.state.DiffTP)}</th>
        </tr>
     
      </thead>
      <tbody>
      <tr>
      <td className="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold",display:"flex",justifyContent:"center"}}> 
      <tr className={colorMaxPoints}>TP:{this.state.TP}</tr>|
      <tr className={colorOver}>O:{this.state.OverTP}</tr>|
      <tr className={colorUnder}>U:{this.state.UnderTP}</tr>|
      </td>
    </tr>
    <tr>
      <td className="tg-4hcd" style={{fontSize:"13px",fontWeight:"bold",display:"flex",justifyContent:"center"}}>
      <tr>H:{this.state.TP_Home}&nbsp;|&nbsp;</tr>
      <tr>DH:{this.state.DiffHome < 0?" + ":" - "}{Math.abs(this.state.DiffHome)}&nbsp;|&nbsp;</tr>
      <tr>V:{this.state.TP_Away}&nbsp;|&nbsp;</tr>
      <tr>DV:{this.state.DiffVisitor < 0?" + ":" - "}{Math.abs(this.state.DiffVisitor)}</tr>
       </td>
       <td className="tg-4hcd" style={{fontSize:"13px",fontWeight:"bold",display:"flex",justifyContent:"center"}}>
      <tr>ppH:{this.state.totalPointsReciveHome}&nbsp;|&nbsp;</tr>
      <tr>ppV:{this.state.totalPointsReciveAway}&nbsp;</tr>
     
       </td>
    </tr>
      </tbody>
      </table>

    </div>);
  }
}
export default Standings;
