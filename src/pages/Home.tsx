import { Tabs, TabsProps } from "antd";
import { Redirect } from "wouter";
import ShopContent from "../components/ShopContent";
import UsersTable from "../components/UsersTable";
import EventsTable from "../components/EventsTable";

export default function Home() {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Главная страница',
      children: (
        <div className="flex flex-col lg:flex-row py-4 gap-10">
          <UsersTable />
          <EventsTable />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Авторизация',
      children: <Redirect to="/login" />
    },
    {
      key: '3',
      label: 'Магазин',
      children: <ShopContent />
    },
  ];

  return (
    <div className="p-10">
      <Tabs 
      items={items}
      defaultActiveKey="1" />
    </div>
  );
}