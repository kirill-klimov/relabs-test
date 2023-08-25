import { TableColumnsType } from "antd";
import { UserItem } from "../types/api-response";
import TrashSvg from '../assets/trash.svg';
import { formatTimestamp } from "./utils";

export const getColumns = function(handleDelete: (id: number) => void) {
  return ([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Дата создания',
      dataIndex: 'ctime',
      key: 'ctime',
      render: value => formatTimestamp(value)
    },
    {
      title: 'Действия',
      dataIndex: 'action',
      key: 'action',
      render: (id: number) => {    
        return (
          <button
          onClick={() => handleDelete(id)} 
          className="button max-w-fit px-4 red">
            <TrashSvg className="h-4 w-4" />
          </button>
        );
      }
    },
  ] as TableColumnsType<UserItem>);
}
