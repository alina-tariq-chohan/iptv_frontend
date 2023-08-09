import { Layout } from "antd";
import { LayoutWrapper } from "./styles";
import theme from "styles/Theme";
import Sidebar from "components/shared/Sidebar";
const { Content } = Layout;

const CustomLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Layout className="layout-container">
        <Sidebar />
        <Layout
          className="site-layout"
          style={{
            transition: "0.15s ease all",
            minHeight: "100vh",
            background: theme.colors.background,
            padding: 15,
          }}
        >
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

export default CustomLayout;
