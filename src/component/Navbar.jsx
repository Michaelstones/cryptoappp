import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  FundOutlined,
} from "@ant-design/icons";
import icon from "../image/cryptocurrency.png";
function Navbar() {
  const [active, setActive] = useState(true);
  const [screen, setScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screen < 768) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [screen]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoVerse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActive(!active)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {active && (
        <Menu theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FundOutlined />}>
            <Link to="/cryptoVerse">CryptoVerse</Link>
          </Menu.Item>{" "}
          <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>{" "}
          <Menu.Item key="4" icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>{" "}
        </Menu>
      )}
    </div>
  );
}

export default Navbar;
