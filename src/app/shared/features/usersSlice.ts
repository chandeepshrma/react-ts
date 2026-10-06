import { createSlice, nanoid } from "@reduxjs/toolkit";
export type UserSliceType = {
    id: string,
    name: string,
    email: string,
}
const initialState: {users: UserSliceType[]} = {
   users: [{ id: nanoid(), name: 'Aman Kumar', email: 'aman01@gmail.com'}]
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
       addUser: (state, action) => {
        const newUser = {
            id: nanoid(),
            name: action.payload.name,
            email: action.payload.email,
        }
        state.users.push(newUser)
       },
       removeUser: (state, action) => {
        const existingUser = state.users.find((user: UserSliceType)=> user.id === action.payload);
        state.users = state.users.filter((user: UserSliceType) => user.id !== existingUser?.id)
       },
    }
});

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;