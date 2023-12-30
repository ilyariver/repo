//GET

export interface ToDoListGetModel {
  tasks: ToDo[];
  total_task_count: string;
}

// POST
export interface ToDoListPostModel {
  status?: 'ok' | 'error';
  message: ToDo;
}

// login
export interface ToDoListLoginModel extends Omit<ToDoListPostModel, 'message'> {
  message: LoginMessage
}


export interface ToDo {
  id?: number;
  username?: string;
  email?: string;
  text?: string;
  statusCode?: number;
  status?: boolean;
  token?: string;
}

export interface LoginMessage {
  username?: string;
  password?: string;
  token?: string;
}

export interface GetParams {
  sort_field?: string;
  sort_direction?: 'asc' | 'desc';
  page ?: number;
}

