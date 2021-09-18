import cls from 'classnames';
import React, { useState } from 'react';
import xirr from 'xirr';

function App() {
  const [data, setData] = useState<{ when: string; amount: number }[]>([
    { when: '', amount: '' as any },
    { when: '', amount: '' as any },
  ]);
  const [rate, setRate] = useState<number>(0);
  return (
    <div className='container mx-auto m-4'>
      <p className='mb-2 text-lg'>
        本工具基于
        <a className='text-blue' href='https://baike.baidu.com/item/XIRR%E5%87%BD%E6%95%B0/1495098' target='_blank' rel='noreferrer'>
          XIRR 函数
        </a>
        来计算资金收益率，可计算多笔投资的综合收益率。每笔投入资金计为负值，该笔投入的最后的总资金量（本金+收益）计为正值。
      </p>
      {data.map((item, index) => {
        return (
          <div className='flex flex-row items-center mb-2' key={index}>
            <input
              className='block border rounded border-solid border-black  mr-2 p-2'
              type='date'
              placeholder='请选择日期'
              value={item.when}
              onChange={(e) => {
                setData(data.map((tt, tIndex) => (index === tIndex ? { when: e.target.value, amount: item.amount } : tt)));
              }}
            />
            <input
              className='block border rounded border-solid border-black mr-2 p-2'
              type='number'
              placeholder='请输入金额'
              value={item.amount}
              onChange={(e) => {
                setData(data.map((tt, tIndex) => (index === tIndex ? { when: item.when, amount: Number(e.target.value) } : tt)));
              }}
            />
            <button
              className={cls('block', 'border', 'rounded', 'border-solid', 'border-blue', 'bg-blue', 'text-white', 'mr-2', 'px-2', 'py-1', 'w-36')}
              onClick={() => {
                setData(data.filter((tt, tIndex) => tIndex !== index));
              }}
            >
              删除
            </button>
          </div>
        );
      })}
      <div className={cls('flex flex-row')}>
        <button
          className={cls('block', 'border', 'rounded', 'border-solid', 'border-blue', 'bg-blue', 'text-white', 'mr-2', 'px-2', 'py-1', 'w-36')}
          onClick={() => {
            setData([...data, { when: '', amount: '' as any }]);
          }}
        >
          添加一行
        </button>
        <button
          className={cls('block', 'border', 'rounded', 'border-solid', 'border-blue', 'bg-blue', 'text-white', 'px-2', 'py-1', 'w-36')}
          onClick={() => {
            if (!data.length) {
              alert('请先输入资金信息~');
              return;
            }
            let valid = true;
            let message = '';
            let hasNegtive = false;
            let hasPositive = false;
            data.forEach((tt) => {
              if (!tt.amount || !tt.when) {
                valid = false;
                message = '某些资金信息补全，请补全~';
              } else {
                if (tt.amount < 0) {
                  hasNegtive = true;
                } else if (tt.amount > 0) {
                  hasPositive = true;
                }
              }
            });
            if (!valid) {
              alert(message);
              return;
            }
            if (!hasNegtive || !hasPositive) {
              alert('请确保输入的资金信息正确，至少两笔，一笔为负，一笔为正~');
              return;
            }
            if (data.find((tt) => tt.amount)) setRate(xirr(data.map((tt) => ({ when: new Date(tt.when), amount: tt.amount }))));
          }}
        >
          计算
        </button>
      </div>
      <p className='mt-2 text-xl'>年化收益率：{Number(rate % 100).toFixed(2)}%</p>
    </div>
  );
}

export default App;
