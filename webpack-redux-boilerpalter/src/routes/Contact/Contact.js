import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContactPerson } from '../../actions';
import DepartTree from './DepartTree';
import css from './assets/Contact.css';

class Contact extends Component {
  render() {
    return (
      <div className={css.body}>
        <DepartTree { ...this.props }/>
        <div className={css.main}>
          {this.props.children}
        </div>
      </div>
    );
  };
};


const mapDispatchtoProps = {
  fetchContactPerson
};

const mapStateToProps = state => ({
  contactPerson: state.contactPerson
});

export default connect(mapStateToProps, mapDispatchtoProps)(Contact);
