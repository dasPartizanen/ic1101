import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { Home } from './views/home/Home';
import { Authorization } from './views/authorization/Authorization';
import { AddNote } from './views/addNote/AddNote';
import { Note } from './views/note/Note';

export const useRouters = ( isAuthenticated ) => {
    if ( isAuthenticated ) {
        return (
            <Switch>
                <Route path='/home' exact>
                    <Home />
                </Route>
                <Route path='/add' exact>
                    <AddNote />
                </Route>
                <Route path='/note/:id' exact>
                    <Note />
                </Route>
                <Redirect to='/home' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/auth' exact>
                <Authorization />
            </Route>
            <Route path='/reg' exact>
                <Authorization registration />
            </Route>
            <Redirect to='/auth' />
        </Switch>
    )
}