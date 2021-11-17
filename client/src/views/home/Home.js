import React, {useCallback, useContext, useState, useEffect} from 'react'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { NoteList } from '../../components/NoteList/NoteList';
import { Loader } from '../../components/Loader/Loader';


export const Home = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [notes, setNotes] = useState([])

    const getNotes = useCallback( async () => {
        try {
            const data = await request(`/api/note/list`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setNotes(data)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getNotes()
    }, [getNotes])

    if (loading) {
        return <Loader fullScreen />
    }

    return (
        <div className='home'>
            <NoteList
                notes={notes}
                getNotes={getNotes}
            />
        </div>
    )
}
