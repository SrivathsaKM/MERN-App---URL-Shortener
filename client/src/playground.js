const data = [
  {
    id: Number(new Date()),
    name: 'srivathsa',
  },
  {
    data2: [
      {
        id: Number(new Date()),
        age: 25,
      },
    ],
  },
];
//console.log(data[1]);
const result = data.map((ele) => {
  const { id, name } = ele;
  return ele;
});
const result2 = Object.values(data[0]).length > 0 && Object.values(data[1]);
console.log(result2);
//console.log(result2.flat(2).map((e) => e.age));


{/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [urlData, setUrlData] = useState([]);
  const [addTitle, setAddTitle] = useState('');
  const [addUrl, setAddUrl] = useState('');
  //const [shortUrl, setShortUrl] = useState('');

  const listAllUrl = () => {
    axios
      .get('http://localhost:3050/api/url')
      .then((response) => {
        // console.log(response.data);
        const result = response.data;
        setUrlData(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    listAllUrl();
  }, []);

  // const handleUrlChange = (hashUrl) => {
  //   axios.get(`http://localhost:3050/api/url/${hashUrl}`).then((response) => {
  //     console.log(response);
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlData = {
      title: addTitle,
      originalUrl: addUrl,
    };
    axios.post(`http://localhost:3050/api/url/`, urlData).then(() => {
      listAllUrl();
    });
  };

  const handleCount = (id, inc) => {
    axios.put(`http://localhost:3050/api/url/${id}?type=${inc}`).then((response) => {
      const result = response.data;
      const updatedData = urlData.map((data) => {
        if (data._id === result._id) {
          return { ...data, ...result };
        } else {
          return { ...data };
        }
      });
      setUrlData(updatedData);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3050/api/url/${id}`).then((response) => {
      const result = response.data;
      const filteredData = urlData.filter((url) => url._id !== result._id);
      setUrlData(filteredData);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={addTitle} onChange={(e) => setAddTitle(e.target.value)} placeholder='title...' />
        <br />
        <input type='text' value={addUrl} onChange={(e) => setAddUrl(e.target.value)} placeholder='url..' />
        <br />
        <button type='submit'>Add</button>
      </form>
      <h1>URL-Shortner</h1>
      <table border={2}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Original Url</th>
            <th>Hash Url</th>
            <th>Click Count</th>
            <th>Created At</th>
            <th>Action</th>
            <th>Count-2</th>
          </tr>
        </thead>
        <tbody>
          {urlData.map((url, idx) => {
            const { _id, title, originalUrl, hashUrl, createdAt, count, otherCount } = url;
            return (
              <tr key={_id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{originalUrl}</td>
                {/* <td onClick={() => handleUrlChange(hashUrl)}>
                  {shortUrl ? (
                    <a href={shortUrl} target='blank'>
                      {hashUrl}
                    </a>
                  ) : (
                    <a>{hashUrl}</a>
                  )}
                </td>*/}
                <td onClick={() => handleCount(_id, 'inc')}>
                  <a href={`http://localhost:3050/api/url/${hashUrl}`} target='_blank'>
                    {hashUrl}
                  </a>
                </td>
                <td>{count}</td>
                <td>{createdAt}</td>
                <td>
                  <button onClick={() => handleDelete(_id)}>delete</button>
                </td>
                {otherCount.map((ele) => {
                  return <td key={ele._id}>{ele.count}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
*/}