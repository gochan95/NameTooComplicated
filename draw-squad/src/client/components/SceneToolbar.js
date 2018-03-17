import React, { Component } from 'react';
import {
  MuiThemeProvider,
  Toolbar,
  ToolbarGroup,
  IconButton
} from 'material-ui';
import {
  CropSquare,
  ChangeHistory,
  RadioButtonUnchecked,
  TextFormat
} from 'material-ui-icons';
import '../styles/App.css';

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: 20,
  backgroundColor: '#0FF',
  height: 120,
  width: '100%'
};

class SceneToolbar extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup style={toolbarStyle} firstChild>
            <IconButton>
              <CropSquare />
            </IconButton>
            <IconButton>
              <ChangeHistory />
            </IconButton>
            <IconButton>
              <RadioButtonUnchecked />
            </IconButton>
            <IconButton>
              <TextFormat />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

export default SceneToolbar;
