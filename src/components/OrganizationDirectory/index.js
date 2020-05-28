import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const OrganizationDirectory = (props) => {
  if (!props.organizationList) return null;
  const orgList = props.organizationList.map((org) => {
    const attrList = org.attributes.join(', ');
    return (
      <li>
        {org.name} has attributes {attrList}.
      </li>
    );
  });

  return (
    <div id="organization-directory">
      <ul>{orgList}</ul>
    </div>
  );
};

export default compose(
  firestoreConnect(() => [{ collection: 'meta' }]),
  connect(({ firestore: { data } }) => ({
    organizationList: data.meta && data.meta.organizations.all,
  }))
)(OrganizationDirectory);
