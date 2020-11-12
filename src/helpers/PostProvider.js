import React from 'react'

export const PostContext = React.createContext();

export default function PostContextProvider(props) {

    const [post, setPost] = React.useState({ key: "", name: "", image: "", title: "", body: "", datePublished: "" , uid: null});

    return (
        <PostContext.Provider value={{ post, setPost: setPost }}>
            {props.children}
        </PostContext.Provider>
    )
}

