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
    };
  }

  componentDidMount() {
   
  }

  render() {
    const stats = this.state.stats;

    // Calcula Totales
    //Equipo Home
    let teamHome = stats[0].Team;
    let totaleFGHome = stats[0].eFG + stats[2].eFG;
    let totalppTsHome = stats[0].ppTs + stats[2].ppTs;
    let totalPFHome = stats[0].PF + stats[2].PF;

    //Equipo Away
    let teamAway = stats[1].Team;
    let totaleFGAway = stats[1].eFG + stats[3].eFG;
    let totalppTSAway = stats[1].ppTs + stats[3].ppTs;
    let totalPFAway = stats[1].PF + stats[3].PF;

    const StatsComponentTable = stats.map((stat) => (
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
        <tr>
        <th className="tg-a4lg">Team</th>
        <th className="tg-a4lg">Total eFg</th>
        <th className="tg-a4lg">Total ppTs</th>
        <th className="tg-a4lg">Total PF</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td className="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold"}}>{teamHome}</td>
        <td className={ totaleFGHome > totaleFGAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGHome).toFixed(4)}</td>
        <td className={ totalppTsHome > totalppTSAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTsHome).toFixed(4)}</td>
        <td className={ totalPFHome > totalPFAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFHome).toFixed(4)}</td>
      </tr>
      <tr>
        <td className="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{teamAway}</td>
        <td className={ totaleFGHome < totaleFGAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGAway).toFixed(4)}</td>
        <td className={ totalppTsHome < totalppTSAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTSAway).toFixed(4)}</td>
        <td className={ totalPFHome < totalPFAway ? "c_green tg-4hcd": "c_red tg-4hcd"} style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFAway).toFixed(4)}</td>
      </tr>
      </tbody>
      </table>
    </div>);
  }
}
export default Stats;
