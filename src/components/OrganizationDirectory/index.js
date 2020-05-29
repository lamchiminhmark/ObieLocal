import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

const Div = styled.div`
  display: block;
  color: black;
  background: lightgray;
  text-align: left;

  ul {
    display: block;
  }
`;

const StyledSearchDiv = styled.div`
  background: coral;
  text-align: center;
`;

const handleOrgClick = (e) => {
  e.preventDefault();
  const oid = e.target.dataset.orgid;
  console.log(`This org has id ${oid}`);
};

const OrganizationDirectory = (props) => {
  if (!props.organizationList) return null;
  const orgList = props.organizationList.map((org) => {
    const attrList = org.attributes.join(', ');
    const liProps = {
      'data-orgid': org.id,
      key: org.id,
      onClick: handleOrgClick,
    };
    return (
      <li {...liProps}>
        {org.name} has attributes {attrList}.
      </li>
    );
  });

  return (
    <Div id="orgdir">
      <StyledSearchDiv id="orgdir-search">
        <input id="orgdir-searchbox" type="text" />
      </StyledSearchDiv>
      <ul>{orgList}</ul>
    </Div>
  );
};

export default compose(
  firestoreConnect(() => [{ collection: 'meta' }]),
  connect(({ firestore: { data } }) => ({
    organizationList: data.meta && data.meta.organizations.all,
  }))
)(OrganizationDirectory);
