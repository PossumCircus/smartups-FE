import { RootState } from '../../app/store';
import { UserDataType, UsersInitialStateDataType } from '../../types/usersType'; // Ensure this path is correct

export const selectUser = (state: RootState): UserDataType => state.users.entity;

export const usersStatus = (state: RootState): UsersInitialStateDataType["status"] => state.users.status;

export const usersError = (state: RootState): UsersInitialStateDataType["error"] => state.users.error;