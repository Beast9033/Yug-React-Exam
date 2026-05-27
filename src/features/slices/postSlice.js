import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'http://localhost:3000/posts'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch posts')
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (Data, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Data,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      })
      if (!response.ok) throw new Error('Failed to add post')
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Data,
          id,
          updatedAt: new Date().toISOString()
        })
      })
      if (!response.ok) throw new Error('Failed to update post')
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete post')
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  currentPost: null,
  loading: false,
  error: null
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearCurrentPost: state => {
      state.currentPost = null
    }
  },
  extraReducers: builder => {
    builder
      // Fetch all
      .addCase(fetchPosts.pending, state => {
        state.loading = true
        state.error = null
      })
      
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch by id
      .addCase(fetchPostById.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false
        state.currentPost = action.payload
      })

      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add
      .addCase(addPost.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })

      .addCase(addPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updatePost.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        state.currentPost = action.payload
        const index = state.items.findIndex(p => p.id == action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deletePost.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(p => p.id != action.payload)
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearCurrentPost } = postSlice.actions
export default postSlice.reducer
