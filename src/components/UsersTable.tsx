import { Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { UsersResponse } from "../types/api-response";
import { getColumns } from "../helpers/table-columns";

const API = import.meta.env.VITE_API;
const limit = 5;

export default function UsersTable() {

  const [data, setData] = useState<UsersResponse | null>(null);

  useEffect(() => {
    if (data === null) {
      fetchData().then(parsed => setData(parsed));
    }
  }, []);

  const fetchData = useCallback(async (page?: number) => {
    const response = await fetch(API + (page !== undefined ? `?limit=${limit}&offset=${(page - 1) * limit}` : ''));
    return response.json() as Promise<UsersResponse>;
  }, []);

  const handlePageChange = useCallback(async (page: number) => {
    setData(null);
    const parsed = await fetchData(page);
    setData(parsed);
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (!data) return;
    const newItems = data.items.filter(item => item.id !== id);
    setData({
      ...data,
      items: newItems,
    });
  }, [data]);

  return (
    <div className="grow flex flex-col items-center">
      <h2 className="text-lg font-medium mb-4">Список пользователей</h2>
      <Table
      showHeader={true}
      className="w-full"
      pagination={{ 
        position: ['bottomCenter'],
        pageSize: limit,
        current: (data?.offset || 0) / limit + 1,
        total: data?.total,
        onChange: handlePageChange
      }}
      dataSource={data?.items.map(item => ({
        ...item,
        action: item.id,
        key: item.id,
      }))}
      columns={getColumns(handleDelete)}
      loading={data === null ? true : false} />
    </div>
  );
}