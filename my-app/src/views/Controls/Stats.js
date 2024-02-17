import React from "react";

/**
 * STATS
 * @component
 */

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: this.props.stats,
      //Equipo Home
      teamHome :this.props.stats[0].Team,
      totaleFGHome : this.props.stats[0].eFG + this.props.stats[2].eFG,
      totalppTsHome: this.props.stats[0].ppTs + this.props.stats[2].ppTs,
      totalPFHome: this.props.stats[0].PF + this.props.stats[2].PF,
      //Equipo Away
      teamAway : this.props.stats[1].Team,
      totaleFGAway : this.props.stats[1].eFG + this.props.stats[3].eFG,
      totalppTSAway : this.props.stats[1].ppTs + this.props.stats[3].ppTs,
      totalPFAway : this.props.stats[1].PF + this.props.stats[3].PF,

      promedioHome :0,
      promedioAway : 0,
     
    };
  }

  CheckWinLose=(resHome,resAway,pronHome,pronAway)=>{
   
    if(resHome > resAway){
        //Gana el equipo de Casa
        if(pronHome > pronAway){
           this.props.componentDOM.current.children[this.props.indexComponent].children[0].style.backgroundColor = '#1a9d00'
           this.props.countAsserts(1);
        }
        else 
          this.props.componentDOM.current.children[this.props.indexComponent].children[0].style.backgroundColor = '#b70404'
       }
       else{
        //Gana el Visitante
        if(pronAway > pronHome)
        {
          this.props.componentDOM.current.children[this.props.indexComponent].children[0].style.backgroundColor = '#1a9d00'
          this.props.countAsserts(1);
        }
        else 
          this.props.componentDOM.current.children[this.props.indexComponent].children[0].style.backgroundColor = '#b70404'
       }
  };

  componentDidMount() {
    let promedioHome = Number((this.state.totalPFHome + this.state.totaleFGHome + this.state.totalppTsHome)/3).toFixed(4);
    let promedioAway = Number((this.state.totalPFAway + this.state.totaleFGAway + this.state.totalppTSAway)/3).toFixed(4);

    // Verificar si es atinado o no
    if( this.props.resHome > 0 && this.props.resAway > 0){
    this.CheckWinLose(this.props.resHome,this.props.resAway,promedioHome,promedioAway);
    }

    this.setState({promedioHome,promedioAway});
 
  }

  render() {
    //const stats = this.state.stats;

    // // Calcula Totales
    // //Equipo Home
    // let teamHome = stats[0].Team;
    // let totaleFGHome = stats[0].eFG + stats[2].eFG;
    // let totalppTsHome = stats[0].ppTs + stats[2].ppTs;
    // let totalPFHome = stats[0].PF + stats[2].PF;

    // //Equipo Away
    // let teamAway = stats[1].Team;
    // let totaleFGAway = stats[1].eFG + stats[3].eFG;
    // let totalppTSAway = stats[1].ppTs + stats[3].ppTs;
    // let totalPFAway = stats[1].PF + stats[3].PF;

    // let promedioHome = Number((totalPFHome + totaleFGHome + totalppTsHome)/3).toFixed(4);
    // let promedioAway = Number((totalPFAway + totaleFGAway + totalppTSAway)/3).toFixed(4);

    const StatsComponentTable = this.state.stats.map((stat) => (
      <tr>
      <td className="tg-4hcd">{stat.Team}</td>
      <td className="tg-4hcd">{stat.Title}</td>
      <td className="tg-4hcd">{stat.eFG}</td>
      <td className="tg-4hcd">{stat.ppTs}</td>
      <td className="tg-4hcd">{stat.PF}</td>
    </tr>
    ));
      
    return (
    <div>

      {/* <table className="tg">
      <thead>
        <tr>
          <th className="tg-a4lg">Team</th>
          <th className="tg-a4lg">Title</th>
          <th className="tg-a4lg">eFG</th>
          <th className="tg-a4lg">ppTs</th>
          <th className="tg-a4lg">PF</th>
        </tr>
      </thead>
      <tbody>
        {StatsComponentTable}
      </tbody>
      </table>
      <hr /> */}
      <table className="tg" style={{display:"inline"}}>
      <thead>
        {/*<tr>
        <th className="tg-a4lg">Team</th>
        <th className="tg-a4lg">Result</th>
         <th className="tg-a4lg">Total ppTs</th>
        <th className="tg-a4lg">Total PF</th> 
        </tr>*/}
      </thead>
      <tbody>
      <tr>
        <td className="tg-4hcd" style={{fontSize:"18px",fontWeight:"bold"}}>{this.state.teamHome}</td>
        <td className={ this.state.promedioHome > this.state.promedioAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{this.state.promedioHome}</td> 
        {/* <td className={ totaleFGHome > totaleFGAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGHome).toFixed(4)}</td>
        <td className={ totalppTsHome > totalppTSAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTsHome).toFixed(4)}</td>
        <td className={ totalPFHome > totalPFAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFHome).toFixed(4)}</td> */}
      </tr>
      <tr>
        <td className="tg-4hcd"style={{fontSize:"18px",fontWeight:"bold"}}>{this.state.teamAway}</td>
        <td className={ this.state.promedioHome < this.state.promedioAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{this.state.promedioAway}</td> 
        {/* <td className={ totaleFGHome < totaleFGAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGAway).toFixed(4)}</td>
        <td className={ totalppTsHome < totalppTSAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTSAway).toFixed(4)}</td>
        <td className={ totalPFHome < totalPFAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFAway).toFixed(4)}</td> */}
      </tr>
      </tbody>
      </table>
    </div>);
  }
}
export default Stats;
