// TODO use the correct client_type
export const clientType = {
  private: 0,
  enterprise: 1
}

export const formatClientsDataForView = (clients = []) => {
  return clients.map(item => ({
    id: item.id,
    name: item.full_name,
    type: item.client_type
  }))    
}

export const getClientsByType = (clients = [], type = '') => {
  return clients.filter(item => item.type === clientType[type]) 
}

export const searchClientsByName = (clients = [], searchQuery = '') => {
  return clients.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) 
}