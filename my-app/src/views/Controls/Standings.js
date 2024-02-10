import React from "react";

/**
 * STANDINGS
 * @component
 */
class Standings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      standings: this.props.standings,
    };
  }

  componentDidMount() {
   
  }

  render() {
    const standings = this.state.standings;

    // Calcula Totales
    //Equipo Home
    let totalPointsHome = standings.HomeTeam[0].PointsPerGameFor;
 
    //Equipo Away
    let totalPointsAway = standings.AwayTeam[0].PointsPerGameFor;
 

    return (
    <div>

      <table className="tg">
      <thead>
        <tr>
          <th className="tg-a4lg">TotalPoints</th>
        </tr>
     
      </thead>
      <tbody>
      <tr>
      <td className="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold"}}>{Number(totalPointsHome + totalPointsAway).toFixed(2)}</td>
    </tr>
      </tbody>
      </table>
      <hr />
     
    </div>);
  }
}
export default Standings;
