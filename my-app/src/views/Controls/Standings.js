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
    let totalPointsReciveHome = standings.HomeTeam[0].PointsPerGameAgainst;

    // Promedio o Media de Puntos
    let mediaPointsHome = (totalPointsHome + totalPointsReciveHome)/2;
 
    //Equipo Away
    let totalPointsAway = standings.AwayTeam[0].PointsPerGameFor;
    let totalPointsReciveAway = standings.AwayTeam[0].PointsPerGameAgainst;

      // Promedio o Media de Puntos
      let mediaPointsAway = (totalPointsAway + totalPointsReciveAway)/2;

    return (
    <div>

      <table className="tg">
      <thead>
        <tr>
          <th className="tg-a4lg">Total Points</th>
        </tr>
     
      </thead>
      <tbody>
      <tr>
      <td className="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold",display:"flex",justifyContent:"center"}}>{Number(mediaPointsHome + mediaPointsAway).toFixed(2)}</td>
    </tr>
    <tr>
      <td className="tg-4hcd" style={{fontSize:"16px",fontWeight:"bold",display:"flex",justifyContent:"center"}}>{Number(mediaPointsHome).toFixed(2)}  + {Number(mediaPointsAway).toFixed(2)}</td>
    </tr>
      </tbody>
      </table>

    </div>);
  }
}
export default Standings;
