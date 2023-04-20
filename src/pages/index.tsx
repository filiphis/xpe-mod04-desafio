import { Button } from "@/components/Button";
import { CoinList } from "@/components/CoinList";
import { Input } from "@/components/Input";
import * as S from "@/styles/home";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { CoinProps } from "@/components/Coin";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MoonLoader from "react-spinners/ClipLoader";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

type CoinsListProps = {
  coins: CoinProps[];
};

// export async function getStaticProps() {
//   const coins = await getCoins(2);

//   return { props: { coins } };
// }

export default function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const {
    data: coins,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [`coins/${page}`, page],
    queryFn: () => getCoins(page),
    // initialData: initialCoins,
    // cacheTime: 10000 * 60,
    staleTime: 1000 * 60 * 5,
  });

  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    if (page == 1) {
      return;
    } else {
      setPage(page - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <S.Wrapper>
          <Button onClick={previousPage} disabled={page === 1}>
            Página Anterior
          </Button>
          <Button onClick={nextPage} disabled={page === 5}>
            Próxima Página
          </Button>
        </S.Wrapper>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtre por nome"
        />

        {isLoading ? (
          <S.SpinnerWrapper>
            <MoonLoader color="##c0c0c0" />
          </S.SpinnerWrapper>
        ) : isFetching ? (
          <S.SpinnerWrapper>
            <MoonLoader color="##c0c0c0" />
          </S.SpinnerWrapper>
        ) : coins ? (
          <CoinList coinList={coins} filter={filter} />
        ) : null}
      </main>
    </>
  );
}

export const coinList = [
  {
    id: "binance",
    name: "Binance",
    year_established: 2017,
    country: "Cayman Islands",
    description: "",
    url: "https://www.binance.com/",
    image:
      "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250",
    has_trading_incentive: false,
    trust_score: 10,
    trust_score_rank: 1,
    trade_volume_24h_btc: 390182.2290034726,
    trade_volume_24h_btc_normalized: 247999.01763899473,
  },
  {
    id: "gdax",
    name: "Coinbase Exchange",
    year_established: 2012,
    country: "United States",
    description: "",
    url: "https://www.coinbase.com",
    image:
      "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
    has_trading_incentive: false,
    trust_score: 10,
    trust_score_rank: 2,
    trade_volume_24h_btc: 43208.89121506847,
    trade_volume_24h_btc_normalized: 43208.89121506847,
  },
];

async function getCoins(page = 1) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=${page}`
  );
  const coins = res.data;

  return coins;
}
