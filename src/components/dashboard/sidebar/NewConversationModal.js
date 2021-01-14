import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useUserContext } from "../../../contexts/UserProvider";
import { useConversations } from "../../../contexts/ConversationProvider";

export default function NewConversationModal(props) {
  const { contacts } = useUserContext();
  const { createConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { closeModal } = props;
  const [keywordSearch, setKeywordSearch] = useState('')

  function handleCheckboxChange(id) {
    setSelectedContactIds((prevSelectedContactIds) => {
      const cloneSelectedContactIds = [...prevSelectedContactIds];
      // remove the id if it is already been added, i.e the id is deselected
      if (cloneSelectedContactIds.includes(id)) {
        return cloneSelectedContactIds.filter((contactId) => contactId !== id);
      }
      // add it to the array otherwise
      else {
        cloneSelectedContactIds.push(id);
        return cloneSelectedContactIds;
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }
  return (
    <div>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <div className="searchfield">
          <form className="col-12">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={(e) => setKeywordSearch(e.target.value)}
            />
          </form>
        </div>

        <Form onSubmit={handleSubmit}>
          {contacts
          .filter(contact => contact.name.toLowerCase().includes(keywordSearch.toLowerCase()))
          .map((contact) => (
            <Form.Group controlId={contact._id} key={contact._id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact._id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact._id)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
