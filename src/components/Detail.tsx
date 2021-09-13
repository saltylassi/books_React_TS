import { ForkOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import Layout from './Layout';
import styles from './Edit.module.css';
import { BookType } from '../types';

interface DetailProps {
  loading: boolean;
  back: () => void;
  logout: () => void;
  target: BookType | undefined;
  error: Error | null;
}

const Detail: React.FC<DetailProps> = ({ loading, back, logout, target }) => {
  return loading ? null : (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ForkOutlined /> {target?.title}
          </div>
        }
        subTitle={target?.author}
        extra={
          <Button key="1" type="primary" onClick={logout} className={styles.button_logout}>
            Logout
          </Button>
        }
      />
      <div className={styles.add}>
        <div className={styles.input_title}>Title : {target?.title}</div>
        <div className={styles.input_comment}>bookId : {target?.bookId}</div>
        <div className={styles.input_author}>Author : {target?.author}</div>
        <div className={styles.input_url}>createdAt : {target?.createdAt}</div>
        <div className={styles.input_url}>URL : {target?.url}</div>
      </div>
    </Layout>
  );
};

export default Detail;
