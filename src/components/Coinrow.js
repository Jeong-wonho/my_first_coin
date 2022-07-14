import React,{useCallback} from "react";
import {useSummaryDispatch} from "../contexts/CoinContext";

export const Coinrow = ({
  coin,
  name,
  changeLiteral,
  showModal,
  getCoinInfo,
}) => {
  const dispatch = useSummaryDispatch();
  const selectCoin = useCallback(() => {
    dispatch({
      type: "SELECT_COIN",
      code: coin.code,
      name
    })
  }, [coin.code, dispatch, name])
  return (
    <tr
      className="hover:bg-indigo-900"
      key={coin.code}
      onClick={() => {
        showModal();
        getCoinInfo(coin);
        selectCoin();
      }}
    >
      <td className={"pt-4"}>{name}</td>
      <td className={"pt-4"}>{Math.round(coin.trade_price.toFixed(1))} KRW</td>
      <td className="text-red-500 pt-4">{coin.high_price} KRW</td>
      <td className="text-blue-500 pt-4">{coin.low_price} KRW</td>
      <td className={"pt-4"}>{coin.acc_trade_volume_24h.toFixed(2)}</td>
      <td className={`pt-4 ${coin.change === "FALL" ? "text-blue-500" : "text-red-500"}`}>
        {changeLiteral(coin.change)}
        {(coin.change_rate * 100).toFixed(2)}%
      </td>
    </tr>
  );
};
