export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: string;
    large: string;
  };
  status: null;
  followed: boolean;
};

export type UsersStateType = {
  users: Array<UserType>;
};

enum UsersActionsType {
  setUsers = "SET_USERS",
  follow = "FOLLOW",
  unfollow = "UNFOLLOW",
}
type followActionType = {
  type: UsersActionsType.follow;
  userId: number;
};
type unfollowActionType = {
  type: UsersActionsType.unfollow;
  userId: number;
};
type setUsersActionType = {
  type: UsersActionsType.setUsers;
  users: Array<UserType>;
};

export type RootActionType =
  | setUsersActionType
  | followActionType
  | unfollowActionType;

const initialState: UsersStateType = {
  users: [],
};

const usersReducer = (
  state: UsersStateType = initialState,
  action: RootActionType
): UsersStateType => {
  switch (action.type) {
    case UsersActionsType.follow:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: true } : { ...u }
        ),
      };
    case UsersActionsType.unfollow:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: false } : { ...u }
        ),
      };
    case UsersActionsType.setUsers:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };

    default:
      return state;
  }
};

export const setUsersAC = (users: Array<UserType>): setUsersActionType => {
  return {
    type: UsersActionsType.setUsers,
    users: users,
  };
};
export const followAC = (userId: number): followActionType => {
  return {
    type: UsersActionsType.follow,
    userId: userId,
  };
};
export const unfollowAC = (userId: number): unfollowActionType => {
  return {
    type: UsersActionsType.unfollow,
    userId: userId,
  };
};

export default usersReducer;
