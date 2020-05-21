// Adapted from Cloud Developer ND - Udacity Project 4

import React, { Component } from 'react';
import update from 'immutability-helper'
import {
  Divider,
  Grid,
  Input,
  Loader
} from 'semantic-ui-react'
import  Auth from '../auth/Auth'
import createHistory from 'history/createBrowserHistory'
import { createItem, deleteItem, getItems, patchItem } from '../api/items-api'

const history = createHistory()
const auth = new Auth(history)


class Items extends Component {
    state = {
      items: [],
      newItemName: '',
      loading: true
    }
  
    handleNameChange = (event) => {
      this.setState({ newItemName: event.target.value })
    }
  
    onItemCreate = async (event) => {
      try {
        const newItem = await createItem(auth.getIdToken(), {
          name: this.state.newItemName
        })
        this.setState({
          items: [...this.state.items, newItem],
          newItemName: ''
        })
      } catch {
        alert('Item creation failed')
      }
    }
  
    onItemDelete = async (itemId) => {
      try {
        await deleteItem(auth.getIdToken(), itemId)
        this.setState({
          items: this.state.items.filter(item => item.itemId !== itemId)
        })
      } catch {
        alert('Item deletion failed')
      }
    }
  
    onItemCheck = async (pos) => {
      try {
        const item = this.state.items[pos]
        await patchItem(auth.getIdToken(), item.itemId, {
          name: item.name,
          done: !item.done
        })
        this.setState({
          items: update(this.state.items, {
            [pos]: { done: { $set: !item.done } }
          })
        })
      } catch {
        alert('Item check failed')
      }
    }
  
    async componentDidMount() {
      try {
        const items = await getItems(auth.getIdToken())
        this.setState({
          items,
          loading: false
        })
      } catch (e) {
        alert(`Failed to fetch items: ${e.message}`)
      }
    }
  
    render() {
      document.title = 'Dashboard';
      return (
        <div>
 
          {this.renderCreateItemInput()}
  
          {this.renderItems()}
        </div>
      )
    }
  
    renderCreateItemInput() {
      return (
        <Grid.Row>
          <Grid.Column width={16}>
            <Input
              action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'add',
                content: 'Add',
                onClick: this.onItemCreate
              }}
              fluid
              actionPosition="left"
              placeholder="Enter item name..."
              onChange={this.handleNameChange}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Divider />
          </Grid.Column>
        </Grid.Row>
      )
    }
  
    renderItems() {
      if (this.state.loadingItems) {
        return this.renderLoading()
      }
  
      return this.renderItemsList()
    }
  
    renderLoading() {
      return (
        <Grid.Row>
          <Loader indeterminate active inline="centered">
            Loading items ...
          </Loader>
        </Grid.Row>
      )
    }
  
    renderItemsList() {
      return (
        <Grid padded>
          <ul className="item-container">
          {
              this.state.items.map((item, pos) => {
                return (
                  <li key={item.itemId} id={item.itemId} className="item">
                    <div>
                      <input type="checkbox" className="item-done" checked={item.done} onChange={() => this.onItemCheck(pos)} />
                      <div className="item-name">{item.name}</div>
                      <button className="btn-delete" onClick={() => this.onItemDelete(item.itemId)}>x</button>
                    </div>                    
                  </li>              
                )
              }
            )
          }
          </ul>
        </Grid>
      )
    }
  }

  export default Items;