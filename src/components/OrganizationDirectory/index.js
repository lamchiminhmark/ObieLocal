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

/**
 * Retrieves the data from a document in the organizations collection.
 * @param {ExtendedFirestoreInstance} fsRef Firestore reference from rrf React Hook
 * @param {string} oid Organization id string
 */
const getOrgInformation = async (fsRef, oid) => {
  let doc;
  try {
    doc = await fsRef.collection('organizations').doc(oid).get();
  } catch (err) {
    console.error(err);
    return err;
  }

  if (!doc.exists) {
    console.error(
      `Organization with id ${oid} does not exist in the collection.`
    );
  }
  return (
    doc.data() || {
      err: 'There is no data for this organization. Sorry about that!',
    }
  );
};

const OrganizationDirectory = (props) => {
  const firestore = useFirestore();
  const [orgsListDisplay, setOrgsListDisplay] = useState({});
  const [orgsListContent, setOrgsListContent] = useState({});

  const handleOrgClick = async (e) => {
    const oid = e.target.dataset.orgid;
    if (!oid) return;

    if (orgsListContent[oid]) {
      // Org information already exists in state; switch the display mode
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: !orgsListDisplay[oid] });
    } else {
      // Else, retrieve current org information and display it
      const data = await getOrgInformation(firestore, oid);
      setOrgsListContent({ ...orgsListContent, [oid]: data });
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: true });
    }
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
