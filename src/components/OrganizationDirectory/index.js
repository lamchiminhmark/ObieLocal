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

  .orglist-item {
    list-style-type: none;
    padding: 3px;
    margin: auto;
    background: palevioletred;
    border: 2px solid black;
    cursor: pointer;
    width: 60%;
    text-align: center;
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

// TODO(CP): Order these attributes correctly.
// TODO(CP): Add key props
const makeOrgContentDiv = (data) => {
  const contentAttributes = ['name', 'description', 'attributes'];
  if (data.err)
    return (
      <div>
        <h3>Error</h3>
        <p>{data.err}</p>
      </div>
    );
  let children = [];
  for (const attr in data) {
    if (contentAttributes.includes(attr)) {
      children.push(<p>{`${attr.toUpperCase()}: ${data[attr]}`}</p>);
    }
  }
  return (
    <div>
      <h3>Org Details</h3>
      {children}
    </div>
  );
};

const toOrgListItem = ({ id, name, attributes }, display, content, handler) => {
  content = content || null;
  const attrList = attributes.join(', ');
  const oid = id;
  const liProps = {
    'data-orgid': oid,
    key: oid,
    onClick: handler,
  };

  return (
    <li {...liProps} className="orglist-item">
      {name} [{attrList}].
      <DetailsDiv displayMe={display}>{content}</DetailsDiv>
    </li>
  );
};

const OrganizationDirectory = (props) => {
  const firestore = useFirestore();
  const [orgsListDisplay, setOrgsListDisplay] = useState({});
  const [orgsListContent, setOrgsListContent] = useState({});
  const [searchText, setSearchText] = useState();

  const handleOrgClick = async (e) => {
    const oid = e.target.dataset.orgid;
    if (!oid) return;

    if (orgsListContent[oid]) {
      // Org information already exists in state; switch the display mode
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: !orgsListDisplay[oid] });
    } else {
      // Else, retrieve current org information and display it
      const data = await getOrgInformation(firestore, oid);
      const orgContentDiv = makeOrgContentDiv(data);
      setOrgsListContent({ ...orgsListContent, [oid]: orgContentDiv });
      setOrgsListDisplay({ ...orgsListDisplay, [oid]: true });
    }
  };

  if (!props.organizationList) return null;

  const regex = new RegExp(searchText, 'ig');
  const orgList = props.organizationList
    .filter((org) => org.name.match(regex))
    .map((org) => {
      const display = orgsListDisplay[org.id];
      const content = orgsListContent[org.id];
      return toOrgListItem(org, display, content, handleOrgClick);
    });

  return (
    <Div id="orgdir">
      <StyledSearchDiv id="orgdir-search">
        <input
          id="orgdir-searchbox"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </StyledSearchDiv>
      <ul>{orgList}</ul>
    </Div>
  );
};

export default compose(
  firestoreConnect(() => [{ collection: 'meta' }]),
  connect(({ firestore: { data } }) => ({
    organizationList: data.meta && data.meta.organizations.all,
    attributesList: data.meta && data.meta.attributes.all,
  }))
)(OrganizationDirectory);
