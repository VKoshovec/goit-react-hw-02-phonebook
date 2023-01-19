import { Component } from "react";
import css from './phoneBook.module.css';
import ContactList from "../ContactList/ContactList";
import ContactAddForm from "../ContactAddForm/ContactAddForm";
import ContactFilter from "../ContactFilter/ContactFilter";

class PhoneBook extends Component {

    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        ],
        filter: '' 
    }

    addContact = (newContact) => {
        const newContacts  = this.state.contacts;
        const isPresentContact = newContacts.find(element => element.name === newContact.name) ? true: false;
        
        if (isPresentContact){
            alert(`${newContact.name} is already in contacts.`)
        } else {
            newContacts.push(newContact);
            this.setState({contacts: newContacts});
        }        
    }

    addFilter = (newFilter) => {
        this.setState({
            filter: newFilter,
        })
    };

    fileteredContacts = (filterName) => {
        const currentContacts = this.state.contacts;

        return currentContacts.filter(contact =>      
             contact.name.toLowerCase().includes(filterName.toLowerCase())
    )};

    deleteContact = (e) => {
        const currentContacts = this.state.contacts;
        const delContact = e.currentTarget.name;
        const newStateContacts = currentContacts.filter(element=> element.name !== delContact);
        this.setState(
           { contacts: newStateContacts } 
        );
    }

    render () {
        
        const filterStatus = this.state.filter;
        const currentContactList = this.state.contacts;
        const contactList = filterStatus ? this.fileteredContacts(filterStatus):currentContactList;

        return (
        <div className= {css.phoneBook}>
            <h1>Phonebook</h1>
            <ContactAddForm onSubmit = { res => this.addContact(res) } />
            <h2>Contacts</h2>
            <ContactFilter onChange = { filter => this.addFilter(filter) } />
            <ContactList contacts={ contactList } onClick = { this.deleteContact }/>
        </div>
        )
    }
}

export default PhoneBook;