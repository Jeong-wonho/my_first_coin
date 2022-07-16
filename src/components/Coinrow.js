import React, { useCallback } from "react";
import { useSummaryDispatch } from "../contexts/CoinContext";

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
      name,
    });
  }, [coin.code, dispatch, name]);
  return (
    <tr
      className="hover:bg-slate-900 cursor-pointer"
      key={coin.code}
      onClick={() => {
        showModal();
        getCoinInfo(coin);
        selectCoin();
      }}
    >
      <td className={"md:pt-4"}>{name}</td>
      <td className={"md:pt-4"}>{Math.round(coin.trade_price.toFixed(1))}</td>

      <td className={"hidden md:inline-flex text-center pt-4"}>{coin.acc_trade_volume_24h.toFixed(2)}</td>
      <td
        className={`${
          coin.change === "FALL" ? "text-blue-500" : "text-red-500"
        } md:pt-4 `}
      >
        {changeLiteral(coin.change)}
        {(coin.change_rate * 100).toFixed(2)}%
      </td>
    </tr>
  );
};
