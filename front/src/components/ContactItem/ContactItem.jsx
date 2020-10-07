import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import axios from 'axios';
import config from '../../config';
import EditContactForm from "../EditContactForm/EditContactForm";
import { getSession } from "react-session-persist";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import "./ContactItem.scss";
import { fetchContacts } from '../../actions/contacts.action';

const ContactItem = ({ data }) => {
    const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { id, lastname, firstname, createdAt, owner, phone } = data;

  const onEdit = () => {
    setEdit(!edit);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const session = await getSession();
      const { token } = session;
      await axios.delete(
        `${config.app.SERVER}/contacts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    dispatch(fetchContacts(data.owner));
      toast.success('Contact deleted !');
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  }

  return (
    <li className="list-group-item d-flex flex-column justify-content-between align-items-center">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div style={{ minWidth: 150 }}>
          <span>
            {firstname} {lastname}
          </span>
        </div>
        <div>
          <span className="badge badge-primary badge-pill">{phone}</span>
        </div>
        <div>
          <EditIcon className="buttonIcon mr-4" onClick={onEdit} />
          <DeleteIcon className="buttonIcon" onClick={onDelete} />
        </div>
      </div>
      {edit && (
        <div className="w-100">
          <hr className="my-4" />
          <div>
            <EditContactForm contactData={data} />
          </div>
        </div>
      )}
    </li>
  );
};

export default ContactItem;
