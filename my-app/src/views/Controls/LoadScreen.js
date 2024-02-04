import React from 'react';
import loader from '../../assets/img/load.svg';
import PropTypes from 'prop-types';

class LoaderScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const widthLoader = 35; // pixeles
    return (
      <div
        className={`loadscreen noselect ${this.props.show ? '' : 'd-none'}`}
        style={{ width: "100%", height: this.props.height}}
      >
        <div style={{ left: this.props.width/2 - 50, top: this.props.height/2 - 100}} className='loadscreen-load'>
        <img
          src={loader}
          style={{ width: widthLoader }}
          className="noselect" 
          alt="load"
        />
       <span style={{color: "white",fontWeight: "bold"}}>Loading...</span>
       </div>
      </div>
    );
  }
}

LoaderScreen.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoaderScreen;
