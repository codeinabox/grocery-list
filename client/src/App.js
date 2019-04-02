import React, { useCallback, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import getItems from './queries/getItems'
import addItem from './commands/addItem'
import markItemAsPurchased from './commands/markItemAsPurchased'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: 'rgb(23, 149, 212)',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    getItems().then(items => setItems(items))
  }, [])

  const addItemHandle = useCallback(() => {
    addItem(newItemName)
      .then(item => setItems(items.concat([ item ])))
      .then(() => setNewItemName(''))
  }, [items, setItems, newItemName, setNewItemName]);

  const itemCheckHandle = useCallback( (id, checked) => {
    if (!checked) {
      return
    }

    markItemAsPurchased(id).then(() => {
      setItems(items.map(item => ({
        ...item,
        purchased: (item.id === id ? true : item.purchased)
      })))
    })
  }, [items, setItems])

  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <Grid container spacing={24}>
        <Grid item xs={12}>
         <List>
              {items.map(item =>
                <ListItem key={item.id}>
                  <Checkbox
                    checked={item.purchased}
                    onChange={(event, checked) => itemCheckHandle(item.id, checked)}
                  />
                  <ListItemText primary={item.purchased ? <span style={{ "text-decoration": "line-through" }}>{item.name}</span> : item.name} />
                </ListItem>
              )}
          </List>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="newItem"
            label="New item"
            value={newItemName}
            onChange={event => setNewItemName(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addItemHandle}>
            Add item
          </Button>
        </Grid>
      </Grid>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
