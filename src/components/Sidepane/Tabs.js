/* Container */

import ReactGA from 'react-ga';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeTab } from '../../actions/sidepaneActions';
import Tab from './Tab';
import '../../styles/tabs.css';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  render() {
    const { children, activeTab } = this.props;
    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={this.props.changeTab(label)}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sidepane }) => {
  return {
    activeTab: sidepane.activeTab
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: tab => () => {
      ReactGA.event({
        category: 'User',
        action: 'Tab Click',
        label: tab
      });
      dispatch(changeTab(tab));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
