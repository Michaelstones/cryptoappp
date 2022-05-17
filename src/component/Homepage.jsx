import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../component";
import Loader from "./Loader";

const { Title } = Typography;
const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data.stats;
  // console.log(data); dont uncomment this cause the app will break
  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            value={millify(globalStats.total)}
            title="Total Cryptocurrencies"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalStats.totalExchanges)}
            title="Total Exchanges"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalStats.totalMarketCap)}
            title="Total MarketCap"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalStats.total24hVolume)}
            title="Total 24h Volume"
          />
        </Col>
        <Col span={12}>
          <Statistic
            value={millify(globalStats.totalMarkets)}
            title="Total Markets"
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top ten Cryptocurrencies in the World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top ten Cryptocurrencies in the World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
