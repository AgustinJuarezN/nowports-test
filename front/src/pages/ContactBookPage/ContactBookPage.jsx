import React, { Fragment, useEffect } from "react";
import { useSession } from "react-session-persist";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ContactItem from "../../components/ContactItem/ContactItem";
import AddContactForm from "../../components/AddContactForm/AddContactForm";
import { useDispatch } from "react-redux";
import { fetchContacts } from '../../actions/contacts.action';
import "./ContactBookPage.scss";

const ContactBookPage = () => {
    const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated, user } = useSession();
  const contactsState = useSelector((state) => state.contacts);

  useEffect(() => {
    if (!authenticated) {
      history.push("/login");
    } else {
        dispatch(fetchContacts(user.id));
    }
  }, []);

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center">
        <div className="mx-4 my-2 contact-list">
          <h1>Contact Book</h1>
          <div className="list-group-item d-flex flex-column justify-content-between align-items-center mt-4">
            <div className="m-2">
              <h3>Add a Contact</h3>
            </div>
            <AddContactForm owner={user.id} />
          </div>
          {contactsState.contacts &&
            contactsState.contacts.length &&
            !contactsState.loading ? (
              <ul className="list-group py-4">
                {contactsState.contacts.map((c, i) => {
                  return <ContactItem data={c} key={i} />;
                })}
              </ul>
            ) : ''}
          {contactsState.contacts && !contactsState.contacts.length && !contactsState.loading && (
            <span>You haven't added contacts</span>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default ContactBookPage;
