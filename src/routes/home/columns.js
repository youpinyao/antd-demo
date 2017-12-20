import {
  renderAcccount,
} from './renders';

export function table1Columns() {
  return [
    {
      title: '推广账户',
      dataIndex: 'real_name',
      sorter: false,
      render: renderAcccount,
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      sorter: false,
    },
    {
      title: '点击数',
      dataIndex: 'clicks',
      sorter: true,
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      sorter: true,
    },
    {
      title: '消费（元）',
      dataIndex: 'amount',
      sorter: true,
    },
    {
      title: '剩余预算（元）',
      dataIndex: 'remain_amount',
      sorter: true,
    },
  ];
}
export function table2Columns(props) {
  const {
    table2SortInfo,
  } = props.home;

  return [
    {
      title: '推广账户',
      dataIndex: 'real_name',
      sorter: false,
      width: '33%',
      render: renderAcccount,
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      sorter: false,
      width: '34%',
    },
    {
      title: '剩余预算（元）',
      dataIndex: 'remain_amount',
      sorter: true,
      width: '33%',
      sortOrder: table2SortInfo.field === 'remain_amount' && table2SortInfo.order,
    },
  ];
}
