export interface UserItem {
	id: number,
	name: string,
	role: string,
	ctime: number
}

export interface UsersResponse {
	total: number,
	per_page: number,
	page: number,
	limit: number,
	offset: number,
	items: Array<UserItem>
}

export interface WSMessage {
  ctime: number,
  event: string
}


