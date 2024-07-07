import BasePostEditor
 from "../../../../components/base/BasePostNew";
const News = ({ notify }) => {
  return (
    <div className="container">
      <h1>Chỗ này để đăng tin tức</h1>
      <BasePostEditor />
    </div>
  );
};

export default News;
