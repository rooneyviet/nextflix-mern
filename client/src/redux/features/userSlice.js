import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        listFavorites: []
    },
    reducers: {
        setUser: (state, action)=> {
            if(action.payload ===null) {
                localStorage.removeItem("actkn");
                localStorage.removeItem("userItem")
            } else {
                if(action.payload.token) localStorage.setItem("actkn", action.payload.token);
                localStorage.setItem("userItem", JSON.stringify(action.payload));
                console.log(action.payload);
            }

            state.user = action.payload;
        },
        setListFavorites: (state, action) => {
            state.listFavorites = action.payload;
        },
        removeFavorite: (state, action) => {
            const {mediaId} = action.payload;
            state.listFavorites = [...state.listFavorites].filter(e => e.mediaId.toString() !== mediaId.toString())
        },
        addFavorite: (state, action) => {
            console.log("already list" + JSON.stringify(state.listFavorites));
            console.log("new item" + JSON.stringify(action.payload));
            
            state.listFavorites = [action.payload, ...state.listFavorites];
            console.log("after list" + JSON.stringify(state.listFavorites));
        }
    }
});

export const {
    setUser,
    setListFavorites,
    addFavorite,
    removeFavorite
} = userSlice.actions;

export default userSlice.reducer;