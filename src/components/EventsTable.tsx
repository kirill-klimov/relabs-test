import { Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { WSMessage } from "../types/api-response";
import { formatTimestamp } from "../helpers/utils";

const WS = import.meta.env.VITE_WS;

export default function EventsTable() {

  const { lastMessage } = useWebSocket(WS);
  const [messages, setMessages] = useState<WSMessage[]>([]);

  useEffect(() => {
    if (lastMessage === null || lastMessage?.data == null) return;
    const message = JSON.parse(lastMessage.data) as WSMessage;
    setMessages([message, ...messages]);
  }, [lastMessage]);

  const columns: TableColumnsType<WSMessage> = [
    {
      title: 'Дата',
      dataIndex: 'ctime',
      key: 'ctime',
      render: value => formatTimestamp(value)
    },
    {
      title: 'Событие',
      dataIndex: 'event',
      key: 'event',
    },
  ];

  return (
    <div className="lg:max-w-lg flex flex-col items-center">
      <h2 className="text-lg font-medium mb-4">События</h2>
      <Table
      scroll={{
        y: '400px'
      }}
      rowClassName='event-row'
      columns={columns}
      pagination={false}
      dataSource={messages.map(m => ({
        ...m,
        key: m.ctime.toString() + m.event
      }))} />
    </div>
  );
}