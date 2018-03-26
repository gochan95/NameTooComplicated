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
  TextFormat,
  Save
} from 'material-ui-icons';
import '../styles/App.css';

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#0FF',
  padding: 10,
  width: '60%'
};

class SceneToolbar extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Toolbar style={{ backgroundColor: 'transparent' }}>
          <ToolbarGroup style={toolbarStyle} firstChild>
            <IconButton onClick={this.props.addPlane}>
              <CropSquare />
            </IconButton>
            <IconButton onClick={this.props.addCone}>
              <ChangeHistory />
            </IconButton>
            <IconButton onClick={this.props.addSphere}>
              <RadioButtonUnchecked />
            </IconButton>
            <IconButton>
              <TextFormat />
            </IconButton>
            <IconButton onClick={this.props.saveScene}>
              <Save />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}

export default SceneToolbar;
