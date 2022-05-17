import React, { useEffect, useState } from "react";
import millify from "millify";
import { Row, Col, Card, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(cryptos);
  useEffect(() => {
    const filtered = cryptoList?.data?.coins.filter((co) =>
      co.name.toLowerCase().includes(search.toLowerCase())
    );
    setCryptos(filtered);
  }, [cryptoList, search]);
  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr) => (
          <Col key={curr.uuid} xs={24} sm={12} lg={6} className="crypto-card">
            <Link to={`/crypto/${curr.uuid}`}>
              <Card
                title={`${curr.rank}. ${curr.name}`}
                extra={
                  <img src={curr.iconUrl} alt="icon" className="crypto-image" />
                }
                hoverable
              >
                <p>Price: {millify(curr.price)}</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>Daily change: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
