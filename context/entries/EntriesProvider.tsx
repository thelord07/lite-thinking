import { useEffect, useReducer, ReactNode } from 'react';

import { useSnackbar } from 'notistack';


import { liteApi } from '../../api';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider = ({ children }: {children: ReactNode }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );



    const addNewEntry = async( description: string, id: string ) => {

        const { data } = await liteApi.post<Entry>('/entries', { description, id });
        dispatch({ type: '[Entry] Add-Entry', payload: data });

    }

    const updateEntry = async( { _id, description, status }: Entry ) => {
        try {
            const { data } = await liteApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] Entry-Updated', payload: data });
            

        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntries = async() => {
        const { data } = await liteApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    useEffect(() => {
      refreshEntries();
    }, []);
    


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};