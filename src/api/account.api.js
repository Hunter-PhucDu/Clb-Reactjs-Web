import { AxiosAuth } from "../services/AxiosService";

const getAccounts = async (params = {}) => {
    let {data} = await AxiosAuth.get('/accounts', {params})
    return data
};

export const updateAccount = async (account, accountId) => {
    let {data} = await AxiosAuth.put(`/accounts/${accountId}`, account)
    return data
};

export const deleteAccount = async (accountId) => {
    let {data} = await AxiosAuth.delete(`/accounts/${accountId}`)
    return data
};

export const addAccount = async (account) => {
    let {data} = await AxiosAuth.post(`/accounts`, account)
    return data
};

const accountAPI = {
    getAccounts,
    updateAccount,
    deleteAccount,
    addAccount
}

export default accountAPI;