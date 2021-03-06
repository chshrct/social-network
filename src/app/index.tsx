import React, { ReactNode } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import DialogsContainer from 'pages/Dialogs/DialogsContainer';
import HeaderContainer from 'pages/Header/HeaderContainer';
import Login from 'pages/Login/Login';
import Navbar from 'pages/Navbar/Navbar';
import ProfileContainer from 'pages/Profile/ProfileContainer';
import UsersContainer from 'pages/Users/UsersContainer';
import Preloader from 'shared/ui/Preloader/Preloader';
import { AppRootStateType, initializeApp } from 'store';

class App extends React.Component<AppReduxPropsType> {
  componentDidMount(): void {
    const { initializeApp: initApp } = this.props;
    initApp();
  }

  render(): ReactNode {
    const { initialized } = this.props;
    if (!initialized) return <Preloader />;
    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <div className="app-wrapper-header">
            <HeaderContainer />
          </div>
          <div className="app-wrapper-nav">
            <Navbar />
          </div>
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/users/*" element={<UsersContainer />} />
              <Route path="/login/*" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppRootStateType) =>
  ({
    initialized: state.app.isInitialized,
  } as const);

const connector = connect(mapStateToProps, { initializeApp });
type AppReduxPropsType = ConnectedProps<typeof connector>;

export default connector(App);
