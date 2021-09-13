import { ForkOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Layout from './Layout';

interface AddProps {
  loading: boolean;
  back: () => void;
  logout: () => void;
}

const Add: React.FC<AddProps> = ({ loading, back, logout }) => {
  const click = () => {};

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ForkOutlined /> Add Book
          </div>
        }
        subTitle="Add Your Book"
        extra={
          <Button key="1" type="primary" onClick={logout}>
            Logout
          </Button>
        }
      />
      <div>
        <div>
          Title<span> *</span>
        </div>
        <div>
          <Input placeholder="Title" />
        </div>
        <div>
          Comment<span> *</span>
        </div>
        <div>
          <TextArea rows={4} placeholder="Comment"></TextArea>
        </div>
        <div>
          Author<span> *</span>
        </div>
        <div>
          <Input placeholder="Author"></Input>
        </div>
        <div>
          URL<span> *</span>
        </div>
        <div>
          <Input placeholder="URL"></Input>
        </div>
        <div>
          <Button size="large" loading={loading} onClick={click}>
            Add
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Add;
