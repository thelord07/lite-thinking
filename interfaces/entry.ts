


export interface Entry {
    _id: string,
    companyId: string,
    description: string,
    createdAt: number,
    status: EntryStatus,
}

export type EntryStatus = 'active' | 'inactive' ;