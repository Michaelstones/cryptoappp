import React, { useState } from "react";
import { Select, Typography, Col, Row, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosNewsApiQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImag =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const [newsCat, setNewsCat] = useState("cryptocurrency");
  const { data: cryptoNews } = useGetCryptosNewsApiQuery({
    newsCat,
    count: simplified ? 6 : 12,
  });
  // console.log(cryptoNews);
  if (!cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            showSearch
            placeholder="select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCat(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="cryptocurrency">Currency</Option>
            {data?.data?.coins.map((curr, i) => (
              <Option value={curr.name} key={i}>
                {curr.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => {
        return (
          <Col xm={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title level={4} className="news-title">
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: "300px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImag}
                    alt="news"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.subString(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl || demoImag
                    }
                    alt=""
                  />
                  <Text className="provider.name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datepublished).startOf("ss").fromNow()}
                </Text>
              </a>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default News;
