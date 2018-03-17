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
  justifyContent: 'space-around',
  backgroundColor: '#0FF',
  padding: 10,
  width: '60%',
};

class SceneToolbar extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toolbar style={{ backgroundColor: 'transparent' }}>
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
