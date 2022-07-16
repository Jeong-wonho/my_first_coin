import { useState, useCallback } from "react";
import { Modal } from "./Modal";
import { Coinrow } from "./Coinrow";
import { useExchangeState } from "../contexts/CoinContext";

export default function Cointable() {
  const [isModal, setIsModal] = useState(false);
  const [coinInfo, setCoinInfo] = useState([]);
  const [coinTitle] = useState({});
  const [columnName, setColumnName] = useState("trade_price");
  const [sortButton, setSortButton] = useState("△");

  //test용 코드
  const state = useExchangeState();
  const { data: markets } = state.market;
  const { data: realtimeData } = state.realtimeData;

  const columnSortedData = useCallback(
    (columnName, sortButton) => {
      if (sortButton === "▽") {
        return (
          realtimeData &&
          realtimeData.sort((a, b) => a[columnName] - b[columnName])
        );
      } else if (sortButton === "△") {
        return (
          realtimeData &&
          realtimeData.sort((a, b) => b[columnName] - a[columnName])
        );
      }
    },
    [realtimeData]
  );

  //-----------------------------
  //click할 때 데이터를 가져올 함수도 필요하다.!

  const getCoinInfo = async (coin) => {
    const response = await fetch(
      `https://crix-api-cdn.upbit.com/v1/crix/trades/days?code=CRIX.UPBIT.${coin.code}&count=50`
    );
    const json = await response.json();
    setCoinInfo(
      json.sort((a, b) => new Date(a.tradeDate) - new Date(b.tradeDate))
    );
  };

  const changeLiteral = useCallback((change) => {
    // 가격변동 +, - 함수
    if (change === "RISE") {
      return "+";
    } else if (change === "FALL") {
      return "-";
    }
    return "";
  }, []);

  const showModal = () => setIsModal(true);
  const handleOnClose = () => setIsModal(false);
  return (
    <div className="table mx-0 xl:m-10">
      <table className="table-fixed text-white w-full text-center">
        <thead className="text-sm md:text-xl pb-3 m-10 xl:text-3xl">
          <tr className="border-separate border-bottom border-slate-400">
            <th>종목</th>
            <th>
              가격(KRW){" "}
              <button
                onClick={() => {
                  setColumnName("trade_price");
                  setSortButton("▽");
                }}
              >
                ▽
              </button>
              <button
                onClick={() => {
                  setColumnName("trade_price");
                  setSortButton("△");
                }}
              >
                △
              </button>
            </th>
            <th className={"hidden md:inline-flex"}>
              거래량(24H){" "}
              <button
                onClick={() => {
                  setColumnName("acc_trade_volume_24h");
                  setSortButton("▽");
                }}
              >
                ▽
              </button>
              <button
                onClick={() => {
                  setColumnName("acc_trade_volume_24h");
                  setSortButton("△");
                }}
              >
                △
              </button>
            </th>
            <th>
              변동(24H){" "}
              <button
                onClick={() => {
                  setColumnName("change_rate");
                  setSortButton("▽");
                }}
              >
                ▽
              </button>
              <button
                onClick={() => {
                  setColumnName("change_rate");
                  setSortButton("△");
                }}
              >
                △
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="text-md xl:text-2xl">
          {columnSortedData(columnName, sortButton) &&
            columnSortedData(columnName, sortButton).map((coin) => (
              <Coinrow
                coin={coin}
                name={
                  markets.filter((list) => list.market === coin.code)[0]
                    .korean_name
                }
                key={coin.code}
                showModal={showModal}
                getCoinInfo={getCoinInfo}
                changeLiteral={changeLiteral}
              />
            ))}
        </tbody>
      </table>

      <Modal
        onClose={handleOnClose}
        visible={isModal}
        datas={coinInfo}
        title={coinTitle}
        changeLiteral={changeLiteral}
      />
    </div>
  );
}
