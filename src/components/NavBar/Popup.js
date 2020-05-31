import React from 'react';
import { StyledPopup } from './styles';
import OrganizationDirectory from '../OrganizationDirectory';

const bodyTexts = {
  contact: <p>Comments, questions, or suggestions for how we can make ObieLocal 
    better? Feel free to contact us by emailing Colton.Potter@oberlin.edu.</p>,
  about: <p>ObieLocal is a web service created by Oberlin students to help other 
    students find out what's happening on campus through a visual interface.
    The first version of ObieLocal was developed by Colton Potter, Minh Lam,
    Thomas Nemeh, and Lukas Griffin for their 'Systems Programming' final
    project. It continues to be developed by Colton, Minh, and Khang Nguyen.</p>,
  orgdir: <OrganizationDirectory />,
};

const titles = {
  contact: `Contact`,
  about: `About`
};

class Popup extends React.Component {
  handleClick = e => {
    const navbar = document.getElementById('navbar');
    if (this.node.contains(e.target) || navbar.contains(e.target)) {
      return;
    } else {
      this.props.handleClose(e);
    }
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  render() {
    const title = titles[this.props.type];
    const body = bodyTexts[this.props.type];

    return (
      <StyledPopup>
        <div className="popup" ref={node => (this.node = node)}>
          <button onClick={this.props.handleClose} id="x">
            X
          </button>
          <h1>{title}</h1>
          <div>{body}</div>
        </div>
      </StyledPopup>
    );
  }
}

export default Popup;
