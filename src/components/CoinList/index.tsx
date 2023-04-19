import { Coin, CoinProps } from "../Coin";
import * as S from "./styles";

export type CoinListProps = {
  coinList: CoinProps[];
};

export const CoinList = ({ coinList }: CoinListProps) => (
  <S.Wrapper>
    {coinList.map(
      ({
        id,
        name,
        image,
        year_established,
        country,
        trade_volume_24h_btc,
        trust_score,
      }: CoinProps) => (
        <Coin
          key={id}
          id={id}
          name={name}
          image={image}
          year_established={year_established}
          country={country}
          trade_volume_24h_btc={trade_volume_24h_btc}
          trust_score={trust_score}
        />
      )
    )}
  </S.Wrapper>
);