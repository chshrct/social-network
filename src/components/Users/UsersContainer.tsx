import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import {
  follow,
  setCurrentPage,
  setFetchPreloader,
  setTotalUsersCount,
  setUsers,
  unfollow,
} from "../../redux/users-reducer";
import Preloader from "../../shared/Preloader/Preloader";
import Users from "./Users";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = typeof mapDispatchToProps

export type UsersPropsType = MapDispatchToPropsType & MapStateToPropsType;

class UsersAPIComponent extends Component<UsersPropsType> {
  onPageSelect = (page: number) => {
    this.props.setFetchPreloader(true);
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setFetchPreloader(false);
        this.props.setUsers(response.data.items);
      });
  };

  componentDidMount() {
    this.props.setFetchPreloader(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setFetchPreloader(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  render() {
    return (
      <>
        {this.props.isFetching && <Preloader />}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageSelect={this.onPageSelect}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

const mapDispatchToProps ={
    setUsers,
    follow,
    unfollow,
    setCurrentPage,
    setTotalUsersCount,
    setFetchPreloader,

};
const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);

export default UsersContainer;
