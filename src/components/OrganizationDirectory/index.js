import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, useFirestore } from 'react-redux-firebase';
import styled from 'styled-components';

const Div = styled.div`
  display: block;
  color: black;
  background: lightgray;
  text-align: left;

  ul {
    display: block;
  }

  li {
    list-style-type: none;
    padding: 3px;
    margin: 5px 0px;
    background: palevioletred;
    border: 2px solid black;
    cursor: pointer;
  }

  li div {
    cursor: auto;
  }
`;

const DetailsDiv = styled.div`
  display: ${(props) => (props.displayMe ? 'block' : 'none')};
  background: green;
`;

const StyledSearchDiv = styled.div`
  background: coral;
  text-align: center;
`;

const OrganizationDirectory = (props) => {
  const firestore = useFirestore();
  const [orgsListDisplay, setOrgsListDisplay] = useState({});
  const [orgsListContent, setOrgsListContent] = useState({});

  const handleOrgClick = (e) => {
    e.preventDefault();
    const oid = e.target.dataset.orgid;
    if (!oid) return;
    console.log(`You clicked org with id ${oid}`);
    if (orgsListContent[oid] && orgsListDisplay[oid] === true) {
      // Close the information box if it's being displayed
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: false });
      return;
    } else if (orgsListContent[oid]) {
      // If org information already has been loaded, just display it
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: true });
      return;
    }
    // Else, retrieve current org information and display it
    firestore
      .collection('organizations')
      .doc(oid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.error(`Organization with id ${oid} does not exist`);
        }
        const data = doc.data() || {
          err: 'There is no data for this organization. Sorry about that!',
        };
        setOrgsListContent({ ...orgsListContent, [oid]: data });
        setOrgsListDisplay({ ...orgsListDisplay, [oid]: true });
      })
      .catch((err) => console.error(err));
  };

  if (!props.organizationList) return null;

  const orgList = props.organizationList.map((org) => {
    const attrList = org.attributes.join(', ');
    const oid = org.id;
    const liProps = {
      'data-orgid': oid,
      key: oid,
      onClick: handleOrgClick,
    };

    // TODO(CP): Fix onClick inheritance
    return (
      <li {...liProps}>
        {org.name} has attributes {attrList}.
        <DetailsDiv displayMe={orgsListDisplay[oid]}>
          {orgsListContent[oid] ? JSON.stringify(orgsListContent[oid]) : null}
        </DetailsDiv>
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
