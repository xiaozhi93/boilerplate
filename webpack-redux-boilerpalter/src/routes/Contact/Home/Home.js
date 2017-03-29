import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContactExtension, fetchContactPerson, handleContactExtension } from '../../../actions';
import ActiveBar from './ActiveBar';
import SearchBar from './SearchBar';
import Table from './Table';
import Footer from './Footer';
import css from '../assets/Contact.css';

class Home extends Component {
  componentDidMount() {
    this.props.fetchContactExtension();
  };
  render() {
    return (
      <div>
        <ActiveBar {...this.props} />
        <SearchBar {...this.props} />
        <Table {...this.props} />
        <Footer {...this.props} />
      </div>
    );
  };
};

const mapDispatchtoProps = {
  fetchContactExtension,
  fetchContactPerson,
  handleContactExtension
};

const mapStateToProps = state => {
  const { contactPerson, contactExtension } = state;
  return {
    contactPerson,
    contactExtension
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Home)
