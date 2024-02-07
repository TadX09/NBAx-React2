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

      <table className="tg">
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
      <hr />
      <table className="tg" style={{display:"inline"}}>
      <thead>
        <tr>
        <th class="tg-a4lg">Team</th>
        <th class="tg-a4lg">Total eFg</th>
        <th class="tg-a4lg">Total ppTs</th>
        <th class="tg-a4lg">Total PF</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td class="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold"}}>{teamHome}</td>
        <td class="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGHome).toFixed(4)}</td>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTsHome).toFixed(4)}</td>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFHome).toFixed(4)}</td>
      </tr>
      <tr>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{teamAway}</td>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totaleFGAway).toFixed(4)}</td>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalppTSAway).toFixed(4)}</td>
        <td class="tg-4hcd"style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPFAway).toFixed(4)}</td>
      </tr>
      </tbody>
      </table>
    </div>);
  }
}
export default Stats;
